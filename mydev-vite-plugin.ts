import fs from 'node:fs';
import path from 'node:path';
import { Plugin, ViteDevServer } from "vite";

export default function pluginDevelop(): Plugin {
  return {
    name: "mydev-vite-plugin",

    configureServer: (vite: ViteDevServer) => {

      return () => {
        // https://ja.vitejs.dev/guide/ssr
        vite.middlewares.use(async (req, res, next) => {

          const url = req.originalUrl || "";

          try {
            // 1. index.html を読み込む
            const template_src = fs.readFileSync(
              path.resolve(__dirname, 'index.html'),
              'utf-8',
            )

            // 2. Vite の HTML の変換を適用します。これにより Vite の HMR クライアントが定義され
            //    Vite プラグインからの HTML 変換も適用します。 e.g. global preambles
            //    from @vitejs/plugin-react
            const template = await vite.transformIndexHtml(url, template_src)

            // 3. サーバーサイドのエントリーポイントを読み込みます。 ssrLoadModule は自動的に
            //    ESM を Node.js で使用できるコードに変換します! ここではバンドルは必要ありません
            //    さらに HMR と同様な効率的な無効化を提供します。
            const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

            // 4. アプリケーションの HTML をレンダリングします。これは entry-server.js から
            //    エクスポートされた `render` 関数が、ReactDOMServer.renderToString() などの
            //    適切なフレームワークの SSR API を呼び出すことを想定しています。
            const appHtml = await render(url)

            // 5. アプリケーションのレンダリングされた HTML をテンプレートに挿入します。
            const html = template.replace(`<!--ssr-outlet-->`, appHtml.html)

            // 6. レンダリングされた HTML をクライアントに送ります。
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html)
          } catch (e) {
            console.error(e);
            // エラーが検出された場合は、Vite にスタックトレースを修正させ、実際のソースコードに
            // マップし直します。
            vite.ssrFixStacktrace(e)
            next(e)
          }

        })
      }

    }
  };
};
