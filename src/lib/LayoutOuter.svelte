<script lang="ts">
  import Header from "$lib/Header.svelte";

  // <div class="flex flex-col h-full bg-green-300">
  //   <header class="flex justify-between items-center bg-blue-300 p-4">
  //     <div class="">Left</div>
  //     <div class="">Right</div>
  //   </header>
  //   <footer class="flex justify-between items-center bg-blue-300 p-4">
  //     <div class="">Left</div>
  //     <div class="">Right</div>
  //   </footer>
  // </div>
</script>

<div id="root">
  <Header />

  <div class="main bg-orange-100">
    <slot />
  </div>

  <footer class="p-10 bg-neutral text-neutral-content">
    powered by
    <a href="https://svelte.dev/">svelte</a>
  </footer>
</div>
