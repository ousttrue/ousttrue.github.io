<script lang="ts">
  import type { PostsType } from "$lib/postTypes";
  export let data: PostsType;
  import PostTag from "./PostTag.svelte";
</script>

<div style="display: flex; flex-wrap: wrap; width: 100%;">
  {#each data.tags as tag}
    <PostTag {tag} />
  {/each}
</div>
