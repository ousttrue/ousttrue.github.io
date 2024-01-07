<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import Footer from "$lib/Footer.svelte";
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
/><svelte:component this={Hst.Story}>
  <Footer />
</svelte:component>
