<script>
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import rehypeHighlight from "rehype-highlight";
  import "highlight.js/styles/github.css";
  import "./markdown.css";

  const plugins = [
    gfmPlugin(),
    {
      rehypePlugin: [rehypeHighlight, { ignoreMissing: true }],
    },
  ];

  export let data;
</script>

<h1>{data.post.title}</h1>
<div class="markdown">
  <Markdown md={data.post.content} {plugins} />
</div>
