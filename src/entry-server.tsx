import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router-dom/server.js"
import { Routes, Route } from "react-router-dom"
import { Pages, Posts } from './pages.ts';

type Matter = {
  title: string,
};

export function render(url: string) {
  if (url.endsWith('/')) {
    url += 'index.html';
  }
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          {Object.entries(Posts).map(([key, value]) => {
            const matter = value as Matter;
            return (
              <Route
                key={key}
                path={key}
                element={(<>
                  <div>{matter.title}</div>
                  <div>{matter.body}</div>
                </>)}
              >
              </Route>
            );
          })}
          {Object.entries(Pages).map(([key, value]) => {
            const App = value as () => React.ReactNode;
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
