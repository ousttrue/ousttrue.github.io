import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import App from './App.tsx'
import { StaticRouter } from "react-router-dom/server.js"
import { Routes, Route } from "react-router-dom"
const ROOT = '/src/pages';
const ROUTES = import.meta.glob(
  '/src/pages/**/*.(tsx|md)',
  {
    import: 'default',
    eager: true
  }
)

type Matter = {
  title: string,
};

export function render(url: string) {
  if (url.endsWith('/')) {
    url += 'index.tsx';
  }
  // console.log(url, Object.keys(ROUTES));
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          {Object.entries(ROUTES).map(([key, value]) => {
            if (key.endsWith('.md')) {
              const matter = value as Matter;
              return (
                <Route
                  key={key}
                  path={key.substring(ROOT.length)}
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
                  path={key.substring(ROOT.length)}
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
