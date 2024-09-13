export default function Layout(props) {
  return (<html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <title>{props.title ? props.title : "三次元日誌"}</title>
    </head>
    <link href="/index.css" rel="stylesheet" />
    <body>
      <header className="root">
        <nav>
          <a href="/">三次元日誌(vite)</a>
          <a href="/posts/">posts</a>
          <a href="/tags/">tags</a>
          <a href="https://github.com/ousttrue/ousttrue.github.io">github</a>
        </nav>
      </header>
      {props.children}
      <footer className="root">footer</footer>
    </body>
  </html>);
}
