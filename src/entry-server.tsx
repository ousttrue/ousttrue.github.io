import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server.js"
import { Routes, Route } from "react-router-dom"
import { Pages, Posts } from './pages.ts';

export function render(url: string) {
  if (url.endsWith('/')) {
    url += 'index.html';
  }

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          {Object.entries(Posts).map(([key, post]) => {
            return (
              <Route
                key={key}
                path={key}
                element={(<>
                  <div>{post.title}</div>
                  <div>{post.body}</div>
                </>)}
              >
              </Route>
            );
          })}
          {Object.entries(Pages).map(([key, App]) => {
            return (
              <Route
                key={key}
                path={key}
                element={
                  <App posts={Posts} />
                }
              >
              </Route>
            );
          })}
        </Routes>
      </StaticRouter>
    </React.StrictMode>
  )
  return { html }
}
