import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { PAGES, POSTS } from './pages.ts';
import { render } from './entry-server.tsx';

// pre-render each route...
async function prerenderAndWrite(template: string, url: string, dist: string) {
  const filePath = dist + url;
  console.log('pre-render...:', filePath)

  const incommingMessage = {
    originalUrl: url,
  };

  const rendered = await render(incommingMessage as unknown as http.IncomingMessage, null)
  if (rendered) {
    // 5. アプリケーションのレンダリングされた HTML をテンプレートに挿入します。
    const html = template.replace(`<!--ssr-outlet-->`, rendered);

    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      // console.log('mkdir', dir);
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, html)
  }
  else {
    console.error(`${url} failed`)
  }
}

export async function generate(dist: string) {

  // 1. index.html を読み込む
  const template_src = fs.readFileSync(
    'index.html',
    'utf-8',
  )

  // 2. Vite の HTML の変換を適用します。これにより Vite の HMR クライアントが定義され
  //    Vite プラグインからの HTML 変換も適用します。 e.g. global preambles
  //    from @vitejs/plugin-react
  // const template = await vite.transformIndexHtml(req.url || "", template_src)

  for (const [url, _] of Object.entries(POSTS)) {
    await prerenderAndWrite(template_src, url, dist);
  }
  for (const [url, _] of Object.entries(PAGES)) {
    await prerenderAndWrite(template_src, url, dist);
  }
}
