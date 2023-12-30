<script lang="ts">
  export let data;
  import PostTag from "../PostTag.svelte";
  import PostTitle from "../../posts/PostTitle.svelte";
</script>

<PostTag tag={{ name: data.tag, count: data.posts.length }} />

{#each data.posts as post}
  <PostTitle {post} />
{/each}
