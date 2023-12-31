<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let data: PostType;

  import { unified } from "unified";
  import remarkParse from "remark-parse";
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

  const md2html = unified()
    // mdast
    .use(remarkParse)
    // .use(remarkSlug)
    // .use(remarkToc, {
    //   heading: "目次",
    //   tight: true,
    // })
    // hast
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypeHighlight)
    .use(rehypeStringify);
  const file = md2html.processSync(data.body);
  // console.log(file);
</script>

<PostTitle post={data} />
<div class="markdown">
  {@html file.value}
</div>
