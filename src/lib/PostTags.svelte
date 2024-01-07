<script lang="ts">
  import type { PostTagType } from "$lib";
  export let tags: (string | PostTagType)[];
  import "../app.css";
  import PostTag from "$lib/PostTag.svelte";
</script>

<div class="flex flex-wrap items-center">
  {#each tags as tag}
    <PostTag {tag} />
  {/each}
</div>
