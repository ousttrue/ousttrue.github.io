import fs from 'node:fs'
import path from 'node:path'
import { Pages, Posts } from './pages.ts';
import { render } from './entry-server.tsx';

// pre-render each route...
function prerenderAndWrite(url: string, dist: string) {
  const filePath = dist + url;
  console.log('pre-render...:', filePath)

  const { html } = render(url)
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    // console.log('mkdir', dir);
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, html)
}

export function generate(dist: string) {
  for (const [url, _] of Object.entries(Posts)) {
    prerenderAndWrite(url, dist);
  }
  for (const [url, _] of Object.entries(Pages)) {
    prerenderAndWrite(url, dist);
  }
}
