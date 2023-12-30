<script>
  import "../app.css";
</script>

<div id="root">
  <nav class="bg-accent text-accent-content">
    <div class="flex-1">
      <a class="text-x1" href="/">三次元日誌(svelte)</a>
      <a href="/posts">blog</a>
      <a href="/tags">tags</a>
      <a href="/storybook">storybook</a>
    </div>
    <div class="flex-none">
      <a href="https://ousttrue.github.io/meson_book/">MesonBook</a>
      <a href="https://ousttrue.github.io/cmake_book/">CmakeBook</a>
      <a href="https://ousttrue.github.io/blender_book">BlenderBook</a>
      <a href="https://github.com/ousttrue/ousttrue.github.io">github</a>
    </div>
  </nav>

  <article class="bg-orange-100">
    <slot />
  </article>

  <footer class="p-10 bg-neutral text-neutral-content">
    powered by
    <a href="https://svelte.dev/">svelte</a>
  </footer>
</div>
