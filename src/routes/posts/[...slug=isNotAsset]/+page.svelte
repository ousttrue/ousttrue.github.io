<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import LayoutPost from "$lib/LayoutPost.svelte";
</script>

<LayoutPost post={data} />
