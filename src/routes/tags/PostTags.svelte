<script lang="ts">
  import type { PostTagType } from "$lib/getPosts";
  export let tags: (string | PostTagType)[];
  import "../../app.css";
  import { TagColorMap } from "./tagColorMap";
  import PostTag from "./PostTag.svelte";
</script>

{#each tags as tag}
  <PostTag {tag} />
{/each}
