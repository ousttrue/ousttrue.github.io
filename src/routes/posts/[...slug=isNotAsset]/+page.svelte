<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import LayoutPost from "./LayoutPost.svelte";
</script>

<LayoutPost post={data} />
