<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  export let Hst: Hst;
  import LayoutSide from "$lib/LayoutSide.svelte";
</script>

<svelte:component this={Hst.Story}>
  <LayoutSide>
    <div slot="sidebar">Sidebar</div>
    <div
      class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed"
    >
      <div
        class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600"
      >
        Post
      </div>
      <div
        class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600"
      >
        Post
      </div>
      <div
        class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600"
      >
        Post
      </div>
      <div
        class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600"
      >
        Post
      </div>
      <div
        class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600"
      >
        Post
      </div>
    </div>
  </LayoutSide>
</svelte:component>
