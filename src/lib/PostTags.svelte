<script lang="ts">
  import type { PostTagType } from "$lib";
  export let tags: (string | PostTagType)[];
  import "../app.css";
  import { TagColorMap } from "./tagColorMap";
  import PostTag from "$lib/PostTag.svelte";
</script>

{#each tags as tag}
  <PostTag {tag} />
{/each}
