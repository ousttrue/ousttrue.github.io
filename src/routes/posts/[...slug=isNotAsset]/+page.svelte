<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import PagePost from "$lib/PagePost.svelte";
</script>

<PagePost post={data} />
