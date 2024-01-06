<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import PagePost from "$lib/PagePost.svelte";
</script>

<svelte:component this={Hst.Story}>
  <PagePost
    post={{
      slug: "title",
      title: "title",
      date: new Date(),
      html: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
      toc: `<h1>TOC</h1>`,
    }}
  />
</svelte:component>
