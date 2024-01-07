<script>
  import "../app.css";

  const bg =
    process.env.NODE_ENV == "production" ? "bg-base-100" : "bg-green-400";
</script>

<header
  class="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center {bg}"
>
  <a
    class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
    href="/">三次元日誌(svelte)</a
  >

  <nav
    class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
  >
    <a class="mr-5" href="/posts">📝posts</a>
    <a class="mr-5" href="/tags">🔖tags</a>
    <a class="mr-5" href="/histoire">📕histoire</a>
  </nav>

  <div class="grow" />

  <nav
    class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center"
  >
    <a href="https://github.com/ousttrue/ousttrue.github.io"
      ><i class="devicon-github-original" style="font-size: 1.5rem;"></i></a
    >
    <a href="/about">🤖about</a>
  </nav>
</header>
