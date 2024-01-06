<script lang="ts">
  import type { PostType } from "$lib";
  export let data: { tag: string; posts: PostType[] };
  import PostTag from "$lib/PostTag.svelte";
  import PostTitle from "$lib/PostTitle.svelte";
</script>

<PostTag tag={{ name: data.tag, count: data.posts.length }} />

{#each data.posts as post}
  <PostTitle {post} />
{/each}
