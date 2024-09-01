import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import App from './App.tsx'
import { StaticRouter } from "react-router-dom/server.js"
import { Routes, Route } from "react-router-dom"
import { Pages } from './pages.ts';


type Matter = {
  title: string,
};

export function render(url: string) {
  if (url.endsWith('/')) {
    url += 'index.tsx';
  }
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          {Object.entries(Pages).map(([key, value]) => {
            if (key.endsWith('.md')) {
              const matter = value as Matter;
              return (
                <Route
                  key={key}
                  path={key}
                  element={
                    <div>{matter.title}</div>
                  }
                >
                </Route>
              );
            }
            else if (key.endsWith('.tsx')) {
              const App = value as () => React.ReactNode;
              return (
                <Route
                  key={key}
                  path={key}
                  element={
                    <App />
                  }
                >
                </Route>
              );
            }
            else {
              throw new Error(key);
            }
          })}
        </Routes>
      </StaticRouter>
    </React.StrictMode>
  )
  return { html }
}
