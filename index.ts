import { createServer, loadConfigFromFile } from "vite";
const viteServer = await createServer();
await viteServer.listen()
viteServer.printUrls()
