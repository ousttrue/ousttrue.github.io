<script>
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import rehypeHighlight from "rehype-highlight";
  import "highlight.js/styles/github.css";
  import "./markdown.css";
  import PostTitle from "../PostTitle.svelte";

  const plugins = [
    gfmPlugin(),
    {
      rehypePlugin: [rehypeHighlight, { ignoreMissing: true }],
    },
  ];

  export let data;
</script>

<PostTitle post={data} />
<div class="markdown">
  <Markdown md={data.body} {plugins} />
</div>
