<script>
  import Markdown from "svelte-exmarkdown";
  export let data;
</script>

{#if data.post.slug.endsWith(".jpg")}
  <img src={data.post.slug} alt={data.post.slug} />
{:else}
  <h1>{data.post.title}</h1>
  <Markdown md={data.post.content} />
{/if}
