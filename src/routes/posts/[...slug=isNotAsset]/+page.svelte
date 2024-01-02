<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import PostTitle from "../PostTitle.svelte";
  import "$lib/markdown.css";
</script>

<div class="toc_space">
  <PostTitle post={data} />

  <div class="divider"></div>

  <div class="markdown">
    {@html data.html}
  </div>
</div>
