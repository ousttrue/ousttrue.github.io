<script lang="ts">
  export let tag;
  import PostTag from "$lib/PostTag.svelte";
  import PostTitle from "$lib/PostTitle.svelte";
</script>

<PostTag tag={{ name: tag.tag, count: tag.posts.length }} />

{#each tag.posts as post}
  <PostTitle {post} />
{/each}
