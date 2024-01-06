<script lang="ts">
  import type { QuadData } from "$lib/QuadData.d.ts";
  export let quad: QuadData;
</script>

<a class="w-60 h-60 m-2" href={quad.url}>
  {quad.icon}
  {quad.name}
</a>
