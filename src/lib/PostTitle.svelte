<script lang="ts">
  import type { PostType } from "$lib/postTypes";
  export let post: PostType;
  import PostDate from "$lib/PostDate.svelte";
  import PostTags from "$lib/PostTags.svelte";
</script>

<div class="card bg-base-100 shadow-xl m-2">
  <div class="card-body flex p-1">
    <h2 class="card-title">
      <PostDate date={post.date} />
    </h2>

    <div class="m-4 grow">
      <h2 class="card-title text-xl">
        {#if post.extra && post.extra.url}
          🔗<a
            class="link link-warning underline text-blue-400"
            href={post.extra.url}
            target="_blank"
            rel="noopener noreferrer">{post.title}</a
          >
        {:else}
          <a href={`/posts/${post.slug}`}>{post.title}</a>
        {/if}
      </h2>
    </div>

    <div class="card-actions flex">
      {#if post.tags}
        <PostTags tags={post.tags} />
      {/if}
    </div>
  </div>
</div>
