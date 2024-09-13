import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { PAGES, POSTS, TAGS } from './pages.ts';
import { render } from './entry-server.tsx';
import type { IncomingMessage } from 'connect';

// pre-render each route...
async function prerenderAndWrite(template: string, url: string, dist: string) {
  const filePath = dist + url;
  console.log('pre-render...:', filePath)

  const rendered = await render({
    originalUrl: url,
  } as IncomingMessage)
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
  for(const tag of TAGS){
    await prerenderAndWrite(template_src, `/tags/${tag}/`, dist);
  }
}
