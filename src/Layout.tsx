import import_css from "../public/Layout.css?url";
const css = import.meta.env.DEV ? import_css : "/Layout.css";

type LayoutProps = {
  title?: string;
  children?: any;
};

export default function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title ? props.title : "三次元日誌"}</title>
        <link href="/vite.svg" rel="icon" type="image/svg+xml" />
        <link href={css} rel="stylesheet" />
      </head>
      <body>
        <div className="layout_header">
          <nav>
            <ul>
              <li>
                <a href="/">三次元日誌</a>
              </li>
              <li>
                <a href="/posts/">posts</a>
              </li>
              <li>
                <a href="/tags/">tags</a>
              </li>
              <li className="right">
                <a href="https://github.com/ousttrue/ousttrue.github.io">
                  github
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="layout_container">{props.children ?? ""}</div>
        <div className="layout_footer">bun + vite + react</div>
      </body>
    </html>
  );
}
