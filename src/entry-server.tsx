import React from 'react'
import ReactDOMServer from 'react-dom/server'
// import App from './App.tsx'
import { StaticRouter } from "react-router-dom/server.js"
import { Routes, Route } from "react-router-dom"
const ROUTES = import.meta.glob<() => React.ReactNode>(
  '/src/pages/**/*.tsx',
  {
    import: 'default',
    eager: true
  }
)

export function render(url: string) {
  if (url.endsWith('/')) {
    url += 'index.tsx';
  }
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <Routes>
          {Object.entries(ROUTES).map(([key, App]) => {
            return (
              <Route
                key={key}
                path={key}
                element={
                  <App />
                }
              >
              </Route>
            )
          })}
        </Routes>
      </StaticRouter>
    </React.StrictMode>
  )
  return { html }
}
