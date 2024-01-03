<script>
  import "../app.css";
  import Header from "./Header.svelte";
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
