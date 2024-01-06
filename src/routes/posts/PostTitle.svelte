<script lang="ts">
  import type { PostType } from "$lib/postTypes";
  export let post: PostType;
  import PostData from "./PostDate.svelte";
  import PostTag from "../tags/PostTag.svelte";
</script>

<div class="card bg-base-100 shadow-xl m-2">
  <div class="card-body p-1">
    <div class="card-actions">
      <h2 class="card-title">
        <PostData date={post.date} />
      </h2>
      {#if post.tags}
        {#each post.tags as tag}
          <PostTag {tag} />
        {/each}
      {/if}
      <h2 class="card-title">
        {#if post.extra && post.extra.url}
          🔗<a
            class="link link-warning"
            href={post.extra.url}
            target="_blank"
            rel="noopener noreferrer">{post.title}</a
          >
        {:else}
          <a href={`/posts/${post.slug}`}>{post.title}</a>
        {/if}
      </h2>
    </div>
  </div>
</div>
