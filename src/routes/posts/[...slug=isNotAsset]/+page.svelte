<script lang="ts">
  import type { PostType } from "$lib";
  import CustomMarkdown from "$lib/CustomMarkdown.svelte";
  export let data: PostType;
  import PostTitle from "../PostTitle.svelte";
  import "$lib/markdown.css";
</script>

<div class="toc_space">
  <PostTitle post={data} />

  <div class="divider"></div>

  <CustomMarkdown md={data.body} slug={data.slug} />
</div>
