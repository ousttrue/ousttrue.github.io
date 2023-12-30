<script>
  import Markdown from "svelte-exmarkdown";
  import { gfmPlugin } from "svelte-exmarkdown/gfm";
  import rehypeHighlight from "rehype-highlight";
  import "highlight.js/styles/github.css";

  const plugins = [
    gfmPlugin(),
    {
      rehypePlugin: [rehypeHighlight, { ignoreMissing: true }],
    },
  ];

  export let data;
</script>

<h1>{data.post.title}</h1>
<Markdown md={data.post.content} {plugins} />
