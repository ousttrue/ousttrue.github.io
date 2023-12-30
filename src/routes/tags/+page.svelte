<script lang="ts">
  import type { PostsType } from "$lib/getPosts";
  export let data: PostsType;
  import PostTag from "./PostTag.svelte";
</script>

{#each data.tags as tag}
  <PostTag {tag} />
{/each}
