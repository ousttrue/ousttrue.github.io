#!/usr/bin/env python
#
# patch albog
#
import ablog.post
import yaml
import toml


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

    yaml_frontmatter = make_front_matter_rule('_')
    toml_frontmatter = make_front_matter_rule('+')

    from markdown_it.rules_block import StateBlock

    def frontMatter(state: StateBlock, startLine: int, endLine: int,
                    silent: bool):
        if state.src[0] == '-':
            return yaml_frontmatter(state, startLine, endLine, silent)
        elif state.src[0] == '+':
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

    def frontMatter(state: StateBlock, startLine: int, endLine: int,
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


import myst_parser.main

myst_parser.main.front_matter_plugin = front_matter_plugin

#
#
#
yaml_safe_load = yaml.safe_load


def safe_load(src):
    try:
        return yaml_safe_load(src)
    except:
        return toml.loads(src)


yaml.safe_load = safe_load

#
#
#

# dialy build configuration file, created by
# `ablog start` on Sun Dec 19 21:35:12 2021.
#
# Note that not all possible configuration values are present in this file.
# All configuration values have a default; values that are commented out
# serve to show the default.

import os
import sys
import ablog
import alabaster

# -- General ABlog Options ----------------------------------------------------

# A path relative to the configuration directory for blog archive pages.
# blog_path = 'blog'

# The "title" for the blog, used in active pages.  Default is ``'Blog'``.
blog_title = "三次元日誌(ablog)"

# Base URL for the website, required for generating feeds.
# e.g. blog_baseurl = "http://example.com/"
blog_baseurl = "https://ousttrue.github.io/"

# Choose to archive only post titles. Archiving only titles can speed
# up project building.
# blog_archive_titles = False

blog_post_pattern = 'posts/**/*.md'

# -- Blog Authors, Languages, and Locations -----------------------------------

# A dictionary of author names mapping to author full display names and
# links. Dictionary keys are what should be used in ``post`` directive
# to refer to the author.  Default is ``{}``.
blog_authors = {
    "ousttrue": ("ousttrue", None),
}

# A dictionary of language code names mapping to full display names and
# links of these languages. Similar to :confval:`blog_authors`, dictionary
# keys should be used in ``post`` directive to refer to the locations.
# Default is ``{}``.
# blog_languages = {
#    'en': ('English', None),
# }

# A dictionary of location names mapping to full display names and
# links of these locations. Similar to :confval:`blog_authors`, dictionary
# keys should be used in ``post`` directive to refer to the locations.
# Default is ``{}``.
# blog_locations = {
#    'Earth': ('The Blue Planet', 'https://en.wikipedia.org/wiki/Earth),
# }

# -- Blog Post Related --------------------------------------------------------

# Format date for a post.
# post_date_format = '%%b %%d, %%Y'

# Number of paragraphs (default is ``1``) that will be displayed as an excerpt
# from the post. Setting this ``0`` will result in displaying no post excerpt
# in archive pages.  This option can be set on a per post basis using
# post_auto_excerpt = 1

# Index of the image that will be displayed in the excerpt of the post.
# Default is ``0``, meaning no image.  Setting this to ``1`` will include
# the first image, when available, to the excerpt.  This option can be set
# on a per post basis using :rst:dir:`post` directive option ``image``.
# post_auto_image = 0

# Number of seconds (default is ``5``) that a redirect page waits before
# refreshing the page to redirect to the post.
# post_redirect_refresh = 5

# When ``True``, post title and excerpt is always taken from the section that
# contains the :rst:dir:`post` directive, instead of the document. This is the
# behavior when :rst:dir:`post` is used multiple times in a document. Default
# is ``False``.
# post_always_section = False

# When ``False``, the :rst:dir:`orphan` directive is not automatically set
# for each post. Without this directive, Sphinx will warn about posts that
# are not explicitly referenced via another document. :rst:dir:`orphan` can
# be set on a per-post basis as well if this is false. Default is ``True``.
# post_auto_orphan = True

# -- ABlog Sidebars -------------------------------------------------------

# There are seven sidebars you can include in your HTML output.
# postcard.html provides information regarding the current post.
# recentposts.html lists most recent five posts. Others provide
# a link to a archive pages generated for each tag, category, and year.
# In addition, there are authors.html, languages.html, and locations.html
# sidebars that link to author and location archive pages.
html_sidebars = {
    '**': [
        'about.html',
        'postcard.html',
        'navigation.html',
        'recentposts.html',
        'tagcloud.html',
        'categories.html',
        'archives.html',
        'searchbox.html',
    ],
}

# -- Blog Feed Options --------------------------------------------------------

# Turn feeds by setting :confval:`blog_baseurl` configuration variable.
# Choose to create feeds per author, location, tag, category, and year,
# default is ``False``.
# blog_feed_archives = False

# Choose to display full text in blog feeds, default is ``False``.
# blog_feed_fulltext = False

# Blog feed subtitle, default is ``None``.
# blog_feed_subtitle = None

# Choose to feed only post titles, default is ``False``.
# blog_feed_titles = False

# Specify custom Jinja2 templates for feed entry elements:
#     `title`, `summary`, or `content`
# For example, to add an additional feed for posting to social media:
# blog_feed_templates = {
#     # Use defaults, no templates
#     "atom": {},
#     # Create content text suitable posting to social media
#     "social": {
#         # Format tags as hashtags and append to the content
#         "content": "{ title }{% for tag in post.tags %}"
#         " #{ tag.name|trim()|replace(' ', '') }"
#         "{% endfor %}",
#     },
# }
# Default: Create one `atom.xml` feed without any templates
# blog_feed_templates = {"atom": {} }

# Specify number of recent posts to include in feeds, default is ``None``
# for all posts.
# blog_feed_length = None

# -- Font-Awesome Options -----------------------------------------------------

# ABlog templates will use of Font Awesome icons if one of the following
# is ``True``

# Link to `Font Awesome`_ at `Bootstrap CDN`_ and use icons in sidebars
# and post footers.  Default: ``None``
# fontawesome_link_cdn = None

# Sphinx_ theme already links to `Font Awesome`_.  Default: ``False``
# fontawesome_included = False

# Alternatively, you can provide the path to `Font Awesome`_ :file:`.css`
# with the configuration option: fontawesome_css_file
# Path to `Font Awesome`_ :file:`.css` (default is ``None``) that will
# be linked to in HTML output by ABlog.
# fontawesome_css_file = None

# -- Disqus Integration -------------------------------------------------------

# You can enable Disqus_ by setting ``disqus_shortname`` variable.
# Disqus_ short name for the blog.
# disqus_shortname = None

# Choose to disqus pages that are not posts, default is ``False``.
# disqus_pages = False

# Choose to disqus posts that are drafts (without a published date),
# default is ``False``.
# disqus_drafts = False

# -- Sphinx Options -----------------------------------------------------------

# If your project needs a minimal Sphinx version, state it here.
needs_sphinx = '1.2'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.extlinks',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'alabaster',
    'ablog',
    'myst_parser',
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ["_templates", ablog.get_html_templates_path()]

# The suffix(es) of source filenames.
source_suffix = ".md"

# The encoding of source files.
# source_encoding = 'utf-8-sig'

# The master toctree document.
master_doc = "index"

# General information about the project.
project = "三次元日誌"
copyright = "2021, ousttrue"
author = "ousttrue"

# The version info for the project you're documenting, acts as replacement for
# |version| and |release|, also used in various other places throughout the
# built documents.
#
# The short X.Y version.
version = ""
# The full version, including alpha/beta/rc tags.
release = ""

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = "ja"

# There are two options for replacing |today|: either, you set today to some
# non-false value, then it is used:
# today = ''
# Else, today_fmt is used as the format for a strftime call.
# today_fmt = '%%B %%d, %%Y'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = [""]

# The reST default role (used for this markup: `text`) to use for all
# documents.
# default_role = None

# If true, '()' will be appended to :func: etc. cross-reference text.
# add_function_parentheses = True

# If true, the current module name will be prepended to all description
# unit titles (such as .. function::).
# add_module_names = True

# If true, sectionauthor and moduleauthor directives will be shown in the
# output. They are ignored by default.
# show_authors = False

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# A list of ignored prefixes for module index sorting.
# modindex_common_prefix = []

# If true, keep warnings as "system message" paragraphs in the built documents.
# keep_warnings = False

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = "False"

# -- Options for HTML output ----------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
html_theme = 'alabaster'

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
html_theme_options = {
    'github_button': False,
}

# Add any paths that contain custom themes here, relative to this directory.
html_theme_path = [alabaster.get_path()]

# The name for this set of Sphinx documents.  If None, it defaults to
# "<project> v<release> documentation".
# html_title = None

# A shorter title for the navigation bar.  Default is the same as html_title.
# html_short_title = None

# The name of an image file (relative to this directory) to place at the top
# of the sidebar.
# html_logo = None

# The name of an image file (within the static path) to use as favicon of the
# docs.  This file should be a Windows icon file (.ico) being 16x16 or 32x32
# pixels large.
# html_favicon = None

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ["_static"]

# Add any extra paths that contain custom files (such as robots.txt or
# .htaccess) here, relative to this directory. These files are copied
# directly to the root of the documentation.
# html_extra_path = []

# If not '', a 'Last updated on:' timestamp is inserted at every page bottom,
# using the given strftime format.
# html_last_updated_fmt = '%%b %%d, %%Y'

# If true, SmartyPants will be used to convert quotes and dashes to
# typographically correct entities.
# html_use_smartypants = True

# Additional templates that should be rendered to pages, maps page names to
# template names.
# html_additional_pages = {}

# If false, no module index is generated.
# html_domain_indices = True

# If false, no index is generated.
# html_use_index = True

# If true, the index is split into individual pages for each letter.
# html_split_index = False

# If true, links to the reST sources are added to the pages.
# html_show_sourcelink = True

# If true, "Created using Sphinx" is shown in the HTML footer. Default is True.
# html_show_sphinx = True

# If true, "(C) Copyright ..." is shown in the HTML footer. Default is True.
# html_show_copyright = True

# If true, an OpenSearch description file will be output, and all pages will
# contain a <link> tag referring to it.  The value of this option must be the
# base URL from which the finished HTML is served.
# html_use_opensearch = ''

# This is the file name suffix for HTML files (e.g. ".xhtml").
# html_file_suffix = None

# Language to be used for generating the HTML full-text search index.
# Sphinx supports the following languages:
#   'da', 'de', 'en', 'es', 'fi', 'fr', 'hu', 'it', 'ja'
#   'nl', 'no', 'pt', 'ro', 'ru', 'sv', 'tr'
# html_search_language = 'en'

# A dictionary with options for the search language support, empty by default.
# Now only 'ja' uses this config value
# html_search_options = {'type': 'default'}

# The name of a javascript file (relative to the configuration directory) that
# implements a search results scorer. If empty, the default will be used.
# html_search_scorer = 'scorer.js'

# Output file base name for HTML help builder.
htmlhelp_basename = "dialydoc"
