import { createServer, } from "vite";
import viteConfig from './vite.config.ts';
const viteServer = await createServer(viteConfig);
await viteServer.listen()
viteServer.printUrls()
