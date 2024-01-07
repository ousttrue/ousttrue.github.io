<script lang="ts">
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
</script>

<div id="root">
  <Header />

  <div class="main bg-orange-100">
    <slot />
  </div>

  <Footer />
</div>
