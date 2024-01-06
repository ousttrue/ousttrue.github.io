<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import Header from "$lib/Header.svelte";
</script>

<svelte:component this={Hst.Story}>
  <Header />
</svelte:component>
