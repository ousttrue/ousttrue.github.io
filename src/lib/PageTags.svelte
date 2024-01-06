<script lang="ts">
  import type { PostsType } from "$lib";
  export let data: PostsType;
  import PostTags from "$lib/PostTags.svelte";
</script>

<PostTags tags={data.tags} />
