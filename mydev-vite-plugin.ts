import fs from 'node:fs';
import path from 'node:path';
import type { ServerResponse } from 'node:http';
import type { IncomingMessage } from 'connect';
import { Plugin, ViteDevServer } from "vite";

function makeSsg(vite: ViteDevServer) {
  return function() {
    vite.middlewares.use(async (
      req: IncomingMessage, res: ServerResponse, next) => {
      try {
        const template_src = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        )
        const template = await vite.transformIndexHtml(req.url || "", template_src)
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
        const rendered = await render(req, res)
        if (rendered) {
          const html = template.replace(`<!--ssr-outlet-->`, rendered)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          res.end(html)
        }
        else {
          // do nothing ?
          res.statusCode = 404;
          res.end('not found')
        }
      } catch (e) {
        vite.ssrFixStacktrace(e)
        next(e)
        console.error(e);
      }
    })
  }
}

export default function pluginDevelop(): Plugin {
  return {
    name: "mydev-vite-plugin",
    configureServer: makeSsg,
  };
};
