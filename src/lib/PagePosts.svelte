<script lang="ts">
  import PostTitle from "$lib/PostTitle.svelte";
  import type { PostType } from "$lib";
  export let posts: PostType[];
</script>

{#each posts as post}
  <PostTitle {post} />
{/each}
