<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import Quad from "$lib/Quad.svelte";
</script>

{#each data.quads as quad}
  <Quad {quad} />
{/each}
