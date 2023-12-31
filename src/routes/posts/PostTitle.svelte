<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let post: PostType;
  import PostData from "./PostDate.svelte";
  import PostTag from "../tags/PostTag.svelte";
</script>

<div class="card bg-base-100 shadow-xl m-2">
  <div class="card-body p-1">
    <h2 class="card-title">
      <PostData date={post.date} />
      <a href={`/posts/${post.slug}`}>{post.title}</a>
    </h2>
    {#if post.tags}
      <div class="card-actions justify-end">
        {#each post.tags as tag}
          <PostTag {tag} />
        {/each}
      </div>
    {/if}
  </div>
</div>
