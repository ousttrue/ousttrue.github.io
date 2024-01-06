<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import LayoutOuter from "./LayoutOuter.svelte";
</script>

<svelte:component this={Hst.Story}>
  <!-- component -->
  <LayoutOuter>
    <main class="grow h-96 bg-orange-300">main</main>
  </LayoutOuter>
</svelte:component>
