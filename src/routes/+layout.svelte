<script lang="ts">
  import "../app.css";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import type { StaticDataType } from "$lib/StaticDataType";
  export let data: StaticDataType;
  import Tree from "$lib/Tree.svelte";
  import { getChildren } from "$lib/getCategories";
  import CategoryLink from "$lib/CategoryLink.svelte";

  import { TreeView } from "@skeletonlabs/skeleton";
</script>

<AppShell>
  <svelte:fragment slot="header"><Header /></svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <div id="sidebar-left" class="hidden lg:block">
      {#each data.categories.filter((x) => {
        return x.slug.split("/").length == 1;
      }) as current}
        <TreeView>
          <Tree
            tree={data.categories}
            {current}
            select={data.current}
            {getChildren}
            component={CategoryLink}
          />
        </TreeView>
      {/each}
    </div>
  </svelte:fragment>

  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />

  <!-- ---- / ---- -->
  <!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
  <!-- (footer) -->
  <svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
