import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { PAGES, POSTS, TAGS } from './pages.ts';
import { markdownParser, markdownModifyAsync, Markdown } from "./mdast_utils.tsx";
import Posts from './Posts.tsx';
import type { IncomingMessage } from 'connect';

export async function render(req: IncomingMessage): Promise<string | null> {
  let url = req.originalUrl || '';
  if (url.endsWith('/')) {
    url += 'index.html';
  }

  {
    const post = POSTS[url];
    if (post) {
      const ast = await markdownParser(post.content);

      await markdownModifyAsync(ast);

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
    const m = url.match(/^\/tags\/(.*)\/index\.html$/);
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
