<script>
  import "../app.css";
  import Header from './Header.svelte';
</script>

<div id="root">
  <Header />

  <article class="bg-orange-100">
    <slot />
  </article>

  <footer class="p-10 bg-neutral text-neutral-content">
    powered by
    <a href="https://svelte.dev/">svelte</a>
  </footer>
</div>
