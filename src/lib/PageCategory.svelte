<script lang="ts">
  import type { PostType } from "$lib";
  export let data: {
    tree: object[];
    select: object | undefined;
    posts: PostType[];
  };
  import { getChildren } from "$lib/getCategories";
  import CategoryLink from "$lib/CategoryLink.svelte";
  import LayoutSide from "$lib/LayoutSide.svelte";
  import Tree from "$lib/Tree.svelte";
  import PageTag from "$lib/PageTag.svelte";

  // @ts-ignore
  $: sp = data.select.slug.split("/");
</script>

<LayoutSide>
  <div slot="sidebar">
    <Tree
      tree={data.tree}
      select={data.select}
      {getChildren}
      component={CategoryLink}
    />
  </div>

  <PageTag
    data={{
      tag: sp[sp.length - 1],
      posts: data.posts,
    }}
  />
</LayoutSide>
