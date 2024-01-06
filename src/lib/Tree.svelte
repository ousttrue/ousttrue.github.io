<script lang="ts">
  export let tree: object[];
  export let current: object | undefined = undefined;
  export let select: object | undefined = undefined;
  export let getChildren: (tree: object[], current?: object) => object[];
  export let component: any;
  const children = getChildren(tree, current);
</script>

{#if children.length > 0}
  <ul>
    {#each getChildren(tree, current) as child}
      <li>
        <svelte:component this={component} data={child} {select} />
        <div style="margin-left: 1em;">
          <svelte:self {tree} current={child} {getChildren} {component} {select} />
        </div>
      </li>
    {/each}
  </ul>
{/if}
