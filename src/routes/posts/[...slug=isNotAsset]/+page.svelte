<script lang="ts">
  import type { PostType } from "$lib";
  export let data: PostType;
  import PostTitle from "../PostTitle.svelte";
  import "$lib/toc.css";
</script>

<article class=" mx-auto md:flex md:justify-center">
  <div class="md:w-4xl overflow-y-auto">
    <PostTitle post={data} />
    <div class="divider"></div>
    <div class="prose">
      {@html data.html}
    </div>
  </div>

  <div class="prose hidden md:flex flex-col w-64">
    {@html data.toc}
  </div>
</article>
