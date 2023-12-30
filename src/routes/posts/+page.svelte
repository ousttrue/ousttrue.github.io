<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let data: { summaries: PostType[] };
  import PostTitle from "./PostTitle.svelte";
</script>

{#each data.summaries as post}
  <PostTitle {post} />
{/each}
