<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let post: PostType;
  import PostData from "./PostDate.svelte";
</script>

<div class="card bg-white m-2">
  <div class="card-title">
    <PostData date={post.date} />
    <a href={`/posts/${post.slug}`}>{post.title}</a>
  </div>
  {#if post.tags}
    <div class="flex">
      {#each post.tags as tag}
        <div class="badge">{tag}</div>
      {/each}
    </div>
  {/if}
</div>
