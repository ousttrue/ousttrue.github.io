<script lang="ts">
  import type { PostType } from "$lib/getPosts";
  export let data: PostType;
  import PostTitle from "../PostTitle.svelte";
  import "./markdown.css";
</script>

<div class="container">
  {#if data.date}
    <div class="toc">
      <div class="markdown">
        {@html data.toc}
      </div>
    </div>
    <div class="body">
      <PostTitle post={data} />
      <div class="divider"></div>
      <div class="markdown">
        {@html data.html}
      </div>
    </div>
  {/if}
</div>
