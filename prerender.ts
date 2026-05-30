import path from 'node:path';
import url from 'node:url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, 'dist');

import { createServer } from "npm:vite";
const vite = await createServer();

process.env.PRERENDER = "true";
const { generate } = await vite.ssrLoadModule('/src/entry-ssg.ts')
generate(dist);
vite.close();
