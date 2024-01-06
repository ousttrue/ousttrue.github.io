<script lang="ts">
  import type { PostType } from "$lib";
  export let post: PostType;
  import PostTitle from "$lib/PostTitle.svelte";
  import "$lib/toc.css";
</script>

<article class=" mx-auto md:flex md:justify-center">
  <div class="md:w-4xl overflow-y-auto">
    <PostTitle {post} />
    <div class="divider"></div>
    <div class="prose">
      {@html post.html}
    </div>
  </div>

  <div class="prose hidden md:flex flex-col w-64">
    {@html post.toc}
  </div>
</article>
