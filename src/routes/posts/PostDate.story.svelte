<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import PostDate from "./PostDate.svelte";
</script>

<svelte:component this={Hst.Story}>
  <PostDate date={new Date("2023-10-01")} />
  <PostDate date={new Date("2023-12-01")} />
  <PostDate date={new Date("2024-01-01")} />
  <PostDate date={new Date("2024-03-01")} />
</svelte:component>
