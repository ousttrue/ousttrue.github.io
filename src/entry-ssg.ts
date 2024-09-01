import fs from 'node:fs'
import path from 'node:path'
import { Pages, Posts } from './pages.ts';
import { render } from './entry-server.tsx';

// pre-render each route...
async function prerenderAndWrite(url: string, dist: string) {
  const filePath = dist + url;
  console.log('pre-render...:', filePath)

  const { html } = await render(url)
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    // console.log('mkdir', dir);
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, html)
}

export async function generate(dist: string) {
  for (const [url, _] of Object.entries(Posts)) {
    await prerenderAndWrite(url, dist);
  }
  for (const [url, _] of Object.entries(Pages)) {
    await prerenderAndWrite(url, dist);
  }
}
