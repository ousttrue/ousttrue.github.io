<script lang="ts">
  export let tree: object[];
  export let current: object | undefined = undefined;
  export let select: object | undefined = undefined;
  export let getChildren: (tree: object[], current?: object) => object[];
  export let component: any;
  const children = getChildren(tree, current);

  import { TreeViewItem } from "@skeletonlabs/skeleton";
</script>

<div>
  {#if children.length == 0}
    <TreeViewItem>
      <svelte:component this={component} data={current} {select} />
    </TreeViewItem>
  {:else}
    <TreeViewItem>
      <svelte:component this={component} data={current} {select} />
      <svelte:fragment slot="children">
        {#each children as child}
          <svelte:self
            {tree}
            current={child}
            {getChildren}
            {component}
            {select}
          />
        {/each}
      </svelte:fragment>
    </TreeViewItem>
  {/if}
</div>
