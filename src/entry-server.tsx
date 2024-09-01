import http from "node:http";
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server.js"
import { Pages, Posts } from './pages.ts';
import { Markdown } from "./Markdown.tsx";


export async function render(_req: http.IncomingMessage, res: http.ServerResponse) {
  let url = _req.originalUrl || '';
  if (url.endsWith('/')) {
    url += 'index.html';
  }

  const routes = [];
  for (const [key, post] of Object.entries(Posts)) {
    function Tmp()
    {
      return <Markdown path={key} post={post} />;
    }
    routes.push({
      path: key,
      Component: Tmp,
    });
  }
  for (const [key, App] of Object.entries(Pages)) {
    routes.push({
      path: key,
      Component: App,
    });
  }

  const { query, dataRoutes } = createStaticHandler(routes);
  const headers = new Headers(_req.headers)
  const req = new Request(`http://xxx${url}`, {
    headers,
    method: _req.method,
    // body: _req,
    // signal: ctrl.signal,
    // referrer: headers.get(referrer)
  })
  // console.log(req.url);
  const context = await query(req);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }
  const router = createStaticRouter(dataRoutes, context);

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode >
  )
  return { html }
}
