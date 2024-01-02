<script lang="ts">
  import type { PostsType } from "$lib";
  export let data: PostsType;
  import PostTitle from "./PostTitle.svelte";
</script>

{#each data.posts as post}
  <PostTitle {post} />
{/each}
