import React from 'react';
import styles from './index.css?inline'

type LayoutProps = {
  title?: string,
  children?: any,
};

export default function Layout(props: LayoutProps) {
  console.log(styles);

  return (<html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>{props.title ? props.title : "三次元日誌"}</title>
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link href="/index.css" rel="stylesheet" />
      <style>{styles}</style>
    </head>
    <body>
      <header className="root">
        <nav>
          <a href="/">三次元日誌(vite)</a>
          <a href="/posts/">posts</a>
          <a href="/tags/">tags</a>
          <a href="https://github.com/ousttrue/ousttrue.github.io">github</a>
        </nav>
      </header>
      {props.children ?? ''}
      <footer className="root">footer</footer>
    </body>
  </html>);
}
