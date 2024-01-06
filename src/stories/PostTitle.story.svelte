<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;

  import PostTitle from "../routes/posts/PostTitle.svelte";
</script>

<svelte:component this={Hst.Story}>
  <PostTitle
    post={{
      title: "タイトル",
      date: new Date(),
      tags: ["c++", "sgg", "webxr"],
    }}
  />
</svelte:component>
