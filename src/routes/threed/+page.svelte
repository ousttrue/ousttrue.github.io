<script lang="ts">
  import CustomMarkdown from "$lib/CustomMarkdown.svelte";
  import PostTags from "../tags/PostTags.svelte";
  import md from "./page.md?raw";
  import { onMount } from "svelte";
  import { App } from "$lib/three/App";

  let threeApp: App;

  // https://svelte.jp/tutorial/onmount
  onMount(async () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    threeApp = new App(canvas);
  });
</script>

<div>
  <canvas id="canvas" />
</div>

<PostTags tags={["webgl", "threejs"]} />

<CustomMarkdown {md} />
