<script lang="ts">
  import type { PostTagType } from "$lib";
  export let tags: (string | PostTagType)[];
  import "../app.css";
  import PostTag from "$lib/PostTag.svelte";
</script>

<div style="display: flex; flex-wrap: wrap; width: 100%;">
  {#each tags as tag}
    <PostTag {tag} />
  {/each}
</div>
