import http from "node:http";
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Pages, Posts } from './pages.ts';
import { markdownParser, MarkdownRenderer } from "./mdast_utils.tsx";

export async function render(_req: http.IncomingMessage, res: http.ServerResponse) {
  let url = _req.originalUrl || '';
  if (url.endsWith('/')) {
    url += 'index.html';
  }

  {
    const post = Posts[url];
    if (post) {
      const ast = await markdownParser(post.content);
      const html = ReactDOMServer.renderToString(
        <React.StrictMode>
          <MarkdownRenderer node={ast} />
        </React.StrictMode >
      );
      return { html }
    }
  }

  {
    const App = Pages[url];
    if (App) {
      const html = ReactDOMServer.renderToString(
        <React.StrictMode>
          <App posts={Posts} />
        </React.StrictMode >
      );
      return { html }
    }
  }

  // return { html: `"${url}" not found` };
}
