<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let data: PostType;

  import { unified } from "unified";
  import { visit } from "unist-util-visit";
  import { parseSelector } from "hast-util-parse-selector";

  import type unist from "unist";
  import remarkParse from "remark-parse";
  import remarkGfm from "remark-gfm";
  import remarkSlug from "remark-slug";
  import remarkToc from "remark-toc";
  import remark2rehype from "remark-rehype";
  import rehypeSlug from "rehype-slug";
  import rehypeToc from "rehype-toc";
  import rehypeHighlight from "rehype-highlight";
  import rehypeStringify from "rehype-stringify";
  import "highlight.js/styles/github.css";
  import "./markdown.css";
  import PostTitle from "../PostTitle.svelte";

  function transform(tree: unist.Node) {
    visit(
      tree,
      (node) => node.type == "root",
      (node, i, parent) => {
        // console.log(node, i, parent);
        // const wrap = parseSelector("div.root");
        // wrap.children = [...node.children];
        node.children = [node.children[0]];
      },
    );
  }
  function onlyToc() {
    return (tree: unist.Node) => {
      transform(tree);
    };
  }

  // body
  const mkBody = unified()
    // mdast
    .use(remarkParse)
    .use(remarkGfm)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify);
  const body = mkBody.processSync(data.body).value;

  const mkToc = unified()
    // mdast
    .use(remarkParse)
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeToc, {})
    .use(onlyToc)
    .use(rehypeStringify);
  const toc = mkToc.processSync(data.body).value;
</script>

<div class="container">
  <div class="toc">
    <div class="markdown">
      {@html toc}
    </div>
  </div>
  <div class="body">
    <PostTitle post={data} />
    <div class="divider"></div>
    <div class="markdown">
      {@html body}
    </div>
  </div>
</div>
