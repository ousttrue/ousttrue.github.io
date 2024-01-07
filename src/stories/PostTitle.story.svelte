<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import PostTitle from "$lib/PostTitle.svelte";
</script>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
/>
<svelte:component this={Hst.Story}>
  <PostTitle
    post={{
      title: "タイトル",
      date: new Date(),
      tags: ["c++", "sgg", "webxr"],
      slug: "title",
    }}
  />
</svelte:component>
