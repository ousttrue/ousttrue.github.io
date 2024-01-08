<script lang="ts">
  import type { PostType } from "$lib";
  export let data: {
    tree: object[];
    select: object | undefined;
    posts: PostType[];
  };
  import PageTag from "$lib/PageTag.svelte";

  // @ts-ignore
  $: sp = data.select.slug.split("/");
</script>

<PageTag
  data={{
    tag: sp[sp.length - 1],
    posts: data.posts,
  }}
/>
