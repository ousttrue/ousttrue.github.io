import http from "node:http";
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { PAGES, POSTS, TAGS } from './pages.ts';
import { markdownParser, Markdown } from "./mdast_utils.tsx";
import Posts from './Posts.tsx';

export async function render(_req: http.IncomingMessage, res: http.ServerResponse): Promise<string | null> {
  // @ts-ignore
  let url = _req.originalUrl || '';
  if (url.endsWith('/')) {
    url += 'index.html';
  }

  {
    const post = POSTS[url];
    if (post) {
      const ast = await markdownParser(post.content);

      const html = ReactDOMServer.renderToString(
        <React.StrictMode>
          <Markdown path={url} frontmatter={post.frontmatter} node={ast} />
        </React.StrictMode >
      );
      return html;
    }
  }

  {
    const App = PAGES[url];
    if (App) {
      const html = ReactDOMServer.renderToString(
        <React.StrictMode>
          <App posts={POSTS} />
        </React.StrictMode >
      );
      return html;
    }
  }

  {
    const m = url.match(/^\/tags\/(.*)/);

    if (m) {
      const tag = m[1];
      if (TAGS.has(tag)) {
        const html = ReactDOMServer.renderToString(
          <React.StrictMode>
            <Posts tag={tag} />
          </React.StrictMode >
        );
        return html;
      }
    }
  }

}
