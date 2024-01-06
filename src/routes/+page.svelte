<script lang="ts">
  import type { StaticDataType } from "$lib/StaticDataType.d.ts";
  export let data: StaticDataType;
  import LayoutSide from "$lib/LayoutSide.svelte";
  import Quad from "$lib/Quad.svelte";
  import Tree from "$lib/Tree.svelte";
  import { getChildren } from "$lib/getCategories";
  import CategoryLink from "$lib/CategoryLink.svelte";
</script>

<LayoutSide>
  <div slot="sidebar">
    <Tree tree={data.categories} {getChildren} component={CategoryLink} />
  </div>

  {#each data.quads as quad}
    <Quad {quad} />
  {/each}
</LayoutSide>
