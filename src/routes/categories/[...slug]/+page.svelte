<script lang="ts">
  import type { CategoryType } from "$lib/CategoryType";
  import { getChildren } from "$lib/getCategories";
  export let data: { tree: CategoryType[]; select: CategoryType };
  import LayoutCategory from "$lib/LayoutCategory.svelte";
  import CategoryLink from "$lib/CategoryLink.svelte";
  import LayoutSide from "$lib/LayoutSide.svelte";
  import Tree from "$lib/Tree.svelte";
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

  <LayoutCategory category={data.select} />
</LayoutSide>
