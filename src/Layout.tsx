import React from 'react';
// import styles from './Layout.css?inline'

type LayoutProps = {
  title?: string,
  children?: any,
};

export default function Layout(props: LayoutProps) {
  return (<html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>{props.title ? props.title : "三次元日誌"}</title>
      <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      <link href="/Layout.css" rel="stylesheet" />
    </head>
    <body>
      <div className="layout_header">
        <nav>
          <ul>
            <li><a href="/">三次元日誌</a></li>
            <li><a href="/posts/">posts</a></li>
            <li><a href="/tags/">tags</a></li>
            <li className="right"><a href="https://github.com/ousttrue/ousttrue.github.io">github</a></li>
          </ul>
        </nav>
      </div>
      <div className="layout_container">
        {props.children ?? ''}
      </div>
      <div className="layout_footer">vite + react</div>
    </body>
  </html>);
}
