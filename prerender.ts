import path from 'node:path';
import url from 'node:url';
import fs from 'node:fs';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, 'dist');

import { createServer } from "vite";
const vite = await createServer();

const { generate } = await vite.ssrLoadModule('/src/entry-ssg.ts')
generate(dist);
vite.close();
