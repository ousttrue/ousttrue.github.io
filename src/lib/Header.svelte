<script>
  import "../app.css";

  const bg =
    process.env.NODE_ENV == "production" ? "bg-base-100" : "bg-green-400";
</script>

<nav class="navbar {bg}">
  <a class="btn btn-ghost text-xl" href="/">三次元日誌(svelte)</a>

  <div class="navbar-start">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/posts">📝posts</a></li>
      <li><a href="/tags">🔖tags</a></li>
      <li><a href="/histoire">📕histoire</a></li>
    </ul>
  </div>
  <div class="navbar-end">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a href="https://github.com/ousttrue/ousttrue.github.io"
          ><i class="devicon-github-original" style="font-size: 1.5rem;"></i></a
        >
      </li>
      <li><a href="/about">🤖about</a></li>
    </ul>
  </div>
</nav>
