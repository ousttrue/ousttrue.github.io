<script lang="ts">
  import type { PostsType } from "$lib";
  export let data: PostsType;
  import PostTag from "$lib/PostTag.svelte";
</script>

<div style="display: flex; flex-wrap: wrap; width: 100%;">
  {#each data.tags as tag}
    <PostTag {tag} />
  {/each}
</div>
