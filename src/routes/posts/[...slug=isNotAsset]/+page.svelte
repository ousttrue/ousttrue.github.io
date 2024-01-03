<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import PostTitle from "../PostTitle.svelte";
  import "$lib/toc.css";
</script>

<div class="toc_space">
  <PostTitle post={data} />

  <div class="divider"></div>

  <article class="prose">
    {@html data.html}
  </article>
</div>
