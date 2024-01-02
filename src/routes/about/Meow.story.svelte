<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import Meow from "./Meow.svelte";
</script>

<svelte:component this={Hst.Story}>
  <Meow />
</svelte:component>
