<script lang="ts">
  import type { PostsType } from "$lib/getPosts";
  export let data: PostsType;
  import PostTag from "./PostTag.svelte";
</script>

<div style="display: flex; flex-wrap: wrap; width: 100%; height: 100%;">
  {#each data.tags as tag}
    <PostTag {tag} />
  {/each}
</div>
