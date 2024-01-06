<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;

  // import type { Meta, StoryObj } from "@storybook/svelte";
  import Header from "../routes/Header.svelte";
</script>

<svelte:component this={Hst.Story}>
  <Header />
</svelte:component>
