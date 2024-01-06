<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import PostTag from "$lib/PostTag.svelte";
</script>

<svelte:component this={Hst.Story}>
  <Hst.Variant title="text">
  <PostTag tag="tag" />
    </Hst.Variant>
    <Hst.Variant title="TagType">
  <PostTag
    tag={{
      name: "tag",
      count: 10,
    }}
  />
    </Hst.Variant>
</svelte:component>
