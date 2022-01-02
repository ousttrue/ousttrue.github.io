#
# patch albog
#
import ablog.post
import yaml
import toml
import logging


def register_posts(app):
    """
    Register posts found in the Sphinx build environment.
    """

    from ablog.post import Blog
    blog = Blog(app)
    for docname, posts in getattr(app.env, "ablog_posts", {}).items():
        for postinfo in posts:
            date = postinfo.get('date')
            if date:
                postinfo['date'] = date.replace(tzinfo=None)
            blog.register(docname, postinfo)


ablog.post.register_posts = register_posts

#
#
#
# Process front matter and pass to cb
from math import floor


def front_matter_plugin(md):
    """Plugin ported from
    `markdown-it-front-matter <https://github.com/ParkSB/markdown-it-front-matter>`__.

    It parses initial metadata, stored between opening/closing dashes:

    .. code-block:: md

        ---
        valid-front-matter: true
        ---

    """

    yaml_frontmatter = make_front_matter_rule('-')
    toml_frontmatter = make_front_matter_rule('+')

    from markdown_it.common.utils import charCodeAt
    yaml_marker_char = charCodeAt('-', 0)
    toml_marker_char = charCodeAt('+', 0)

    def frontMatter(state, startLine: int, endLine: int,
                    silent: bool):
        if state.srcCharCode[0] == yaml_marker_char:
            return yaml_frontmatter(state, startLine, endLine, silent)
        elif state.srcCharCode[0] == toml_marker_char:
            return toml_frontmatter(state, startLine, endLine, silent)
        else:
            return False

    md.block.ruler.before(
        "table",
        "front_matter",
        frontMatter,
        {"alt": ["paragraph", "reference", "blockquote", "list"]},
    )


def make_front_matter_rule(marker_str: str):
    from markdown_it.common.utils import charCodeAt
    min_markers = 3
    marker_char = charCodeAt(marker_str, 0)
    marker_len = len(marker_str)

    def frontMatter(state, startLine: int, endLine: int,
                    silent: bool):
        auto_closed = False
        start = state.bMarks[startLine] + state.tShift[startLine]
        maximum = state.eMarks[startLine]
        src_len = len(state.src)

        # Check out the first character of the first line quickly,
        # this should filter out non-front matter
        if startLine != 0 or marker_char != state.srcCharCode[0]:
            return False

        # Check out the rest of the marker string
        # while pos <= 3
        pos = start + 1
        while pos <= maximum and pos < src_len:
            if marker_str[(pos - start) % marker_len] != state.src[pos]:
                break
            pos += 1

        marker_count = floor((pos - start) / marker_len)

        if marker_count < min_markers:
            return False

        pos -= (pos - start) % marker_len

        # Since start is found, we can report success here in validation mode
        if silent:
            return True

        # Search for the end of the block
        nextLine = startLine

        while True:
            nextLine += 1
            if nextLine >= endLine:
                # unclosed block should be autoclosed by end of document.
                return False

            if state.src[start:maximum] == "...":
                break

            start = state.bMarks[nextLine] + state.tShift[nextLine]
            maximum = state.eMarks[nextLine]

            if start < maximum and state.sCount[nextLine] < state.blkIndent:
                # non-empty line with negative indent should stop the list:
                # - ```
                #  test
                break

            if marker_char != state.srcCharCode[start]:
                continue

            if state.sCount[nextLine] - state.blkIndent >= 4:
                # closing fence should be indented less than 4 spaces
                continue

            pos = start + 1
            while pos < maximum:
                if marker_str[(pos - start) % marker_len] != state.src[pos]:
                    break
                pos += 1

            # closing code fence must be at least as long as the opening one
            if floor((pos - start) / marker_len) < marker_count:
                continue

            # make sure tail has spaces only
            pos -= (pos - start) % marker_len
            pos = state.skipSpaces(pos)

            if pos < maximum:
                continue

            # found!
            auto_closed = True
            break

        old_parent = state.parentType
        old_line_max = state.lineMax
        state.parentType = "container"

        # this will prevent lazy continuations from ever going past our end marker
        state.lineMax = nextLine

        token = state.push("front_matter", "", 0)
        token.hidden = True
        token.markup = marker_str * min_markers
        token.content = state.src[state.bMarks[startLine +
                                               1]:state.eMarks[nextLine - 1]]
        token.block = True

        state.parentType = old_parent
        state.lineMax = old_line_max
        state.line = nextLine + (1 if auto_closed else 0)
        token.map = [startLine, state.line]

        return True

    return frontMatter


import mdit_py_plugins.front_matter.index
mdit_py_plugins.front_matter.index.front_matter_plugin = front_matter_plugin
# import myst_parser.main
import mdit_py_plugins.front_matter
mdit_py_plugins.front_matter.front_matter_plugin = front_matter_plugin

# myst_parser.main.front_matter_plugin = front_matter_plugin

#
#
#
yaml_safe_load = yaml.safe_load


def safe_load(src):
    try:
        data = yaml_safe_load(src)
        assert isinstance(data, dict), "not dict"
        return data
    except Exception:
        return toml.loads(src)


yaml.safe_load = safe_load


from sphinx.transforms import SphinxTransform
from docutils import nodes
from ablog.post import *
from ablog.blog import Blog
from docutils.parsers.rst import Directive, directives

def apply(self):
    # Check if page-level metadata has been given
    docinfo = list(self.document.traverse(nodes.docinfo))
    if not docinfo:
        return None
    docinfo = docinfo[0]

    # Pull the metadata for the page to check if it is a blog post
    metadata = {fn.children[0].astext(): fn.children[1].astext() for fn in docinfo.traverse(nodes.field)}
    tags = metadata.get("tags")
    if isinstance(tags, str):
        # myst_parser store front-matter field to TextNode in dict_to_fm_field_list.
        # like ["a", "b", "c"]
        # remove [] and quote
        try:
            tags = eval(tags)
            metadata["tags"] = ",".join(tags)
        except Exception:
            logging.warning(f"fail to eval tags: {tags}")
    if docinfo.traverse(nodes.author):
        metadata["author"] = list(docinfo.traverse(nodes.author))[0].astext()
    # These two fields are special-cased in docutils
    if docinfo.traverse(nodes.date):
        metadata["date"] = list(docinfo.traverse(nodes.date))[0].astext()
    if "blogpost" not in metadata and self.env.docname not in self.config.matched_blog_posts:
        return None
    if self.document.traverse(PostNode):
        logging.warning(f"Found blog post front-matter as well as post directive, using post directive.")

    # Iterate through metadata and create a PostNode with relevant fields
    option_spec = PostDirective.option_spec
    for key, val in metadata.items():
        if key in option_spec:
            if callable(option_spec[key]):
                new_val = option_spec[key](val)
            elif isinstance(option_spec[key], directives.flag):
                new_val = True
            metadata[key] = new_val

    node = PostNode()
    node.document = self.document
    node = ablog.post._update_post_node(node, metadata, [])
    node["date"] = metadata.get("date")

    if not metadata.get("excerpt"):
        blog = Blog(self.app)
        node["excerpt"] = blog.post_auto_excerpt

    sections = list(self.document.traverse(nodes.section))
    if sections:
        sections[0].children.append(node)
        node.parent = sections[0]
ablog.post.CheckFrontMatter.apply = apply


from myst_parser.main import default_parser
from markdown_it.token import Token
def parse(self, inputstring: str, document: nodes.document) -> None:
    """Parse source text.

    :param inputstring: The source string to parse
    :param document: The root docutils node to add AST elements to

    """
    config = document.settings.env.myst_config
    parser = default_parser(config)
    parser.options["document"] = document
    env: dict = {}
    tokens = parser.parse(inputstring, env)
    if not tokens or tokens[0].type != "front_matter":
        # we always add front matter, so that we can merge it with global keys,
        # specified in the sphinx configuration
        tokens = [Token("front_matter", "", 0,
                        content="{}", map=[0, 0])] + tokens

    header_text = None
    if tokens[1].type != 'heading_open':
        # insert heading
        import pathlib
        header_text = Token("text", "", 0, content=pathlib.Path(document.current_source).stem)
        tokens = [tokens[0],
                    Token("heading_open", "h1", 1, content="{}", map=[0, 0]),
                    Token("inline", "", 0, content="{}", map=[
                        0, 0], children=[header_text]),
                    Token("heading_close", "h1", -1,
                        content="{}", map=[0, 0])
                    ] + tokens[1:]

    parser.renderer.render(tokens, parser.options, env)

    # fix heading name from front matter
    if header_text:
        field_list = document.children[0]
        for field in field_list.children:
            name, body = field.children
            if name.rawsource == 'title':
                header_text.content = body.rawsource

import myst_parser.sphinx_parser
myst_parser.sphinx_parser.MystParser.parse = parse
