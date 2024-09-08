---
title: vite で ssg 構築
date: 2024-09-01
tags: [vite]
---

改めて vite による ssg に取り組んでみた。
遂にシンプルな vite ssg を捻り出すことに成功した。

理念として、

- [テンプレートエンジンに React を使いつつ、きれいな HTML を生成したいんじゃ！！](https://zenn.dev/otsukayuhi/articles/e52651b4e2c5ae7c4a17)

であり、生成物は static な HTML でいいのです。
なんとなく `vite` が核心であり、他はなるべく少なくしたいという気持ちがあった。

## vite の server / client の区別がついてなかった

vite の plugin にデバッガをアタッチしたくて 方法を探していたのだけど、
ようやく発見。
これにより、やっと vite のサーバー側の一歩を踏み出すことができた。
要するに vite コマンドではなくて、自前の js から launch すればできる。

```js
// server.ts
import { createServer } from "vite";
const viteServer = await createServer();
await viteServer.listen();
viteServer.printUrls();
```

さらに全体を `ts-node` の `esm` で始動させたい。

```js
node --nolazy --import \"data:text/javascript,import { register } from 'node:module'; import { pathToFileURL } from 'node:url'; register('ts-node/esm', pathToFileURL('./'));\" index.ts"
```

これで `vscode` のデバッガーをアタッチできるので、手に負える見通しができた。

## でも express も入れたくない

`vite` がサーバー能力あるからそれでいい。

https://ja.vitejs.dev/guide/ssr

に書いてある内容を vite の plugin の中に入れることでできる。
この手法は、 `minista` などが実践している。

https://github.com/qrac/minista/blob/main/packages/minista/src/cli/develop.ts

```ts
export default function pluginDevelop(): Plugin {
  return {
    name: "mydev-vite-plugin",

    configureServer: (vite: ViteDevServer) => {
      return () => {
        // https://ja.vitejs.dev/guide/ssr
        vite.middlewares.use(
          async (req: http.IncomingMessage, res: http.ServerResponse, next) => {
            // SSR
          },
        );
      };
    },
  };
}
```

## シンプル SSR で React が動くようにする

`@vitejs/plugin-react` なしでシンプルなものを作った。

`hyderate` も最初は要らない。
あとで必要になったら足そう。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <!--app-head-->
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/entry-client.jsx"></script>
    <!-- 👆 この行を削除した -->
  </body>
</html>
```

## React の Router 要らんかった

`hyderate` しないならば Router は無用だった。
あると複雑さが跳ね上がる。async とか。
無ければシンプルで、非同期も自然に記述できる。
`remark` の await を仕込むのに頭をひねる必要もない。

```js
// url でswitch して html 文字列を返すだけ
async function(url: string): {html: string}
{
  switch(url)
  {
    case "/" => "<html>root</html>";
    case "/hoge.html" => "<html>hoge/html>";
  }
}
```

## `import.meta.glob`

基本的に `import.meta.glob` で目的は達成できるのだけど、

ライブラリーに任せると markdown が ReactComponent 化するのが
早すぎて逆に難しくなるという状況だった。

この段階では frontmatter にアクセスしたい。
自作して `import.meta.glob` は frontmatter のコレションを返すようにした。
すべてのページで、すべての frontmatter にアクセスできるので
ナビゲーションの実装も簡単。

## prerender も`import.meta.glob` で OK

`vite.ssrLoadModule` 内で `import.meta.glob` して順に HTML 化して
ファイルに出力すればできた。
`React` の `ssr-manifest.json` は作れなかったのだけど、使わなかったのでよし。

```js
// prerender.ts
import path from "node:path";
import url from "node:url";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "dist");

import { createServer } from "vite";
const vite = await createServer();
const { generate } = await vite.ssrLoadModule("/src/entry-ssg.ts");
generate(dist);
vite.close(); // vite は listen せずに終了する
```

## remark & rehype を手作業で組込み

- [react-markdown をやめて remark から自力でレンダリングするようにした話 | stin&#x27;s Blog](https://blog.stin.ink/articles/replace-react-markdown-with-remark)

たしかに `mdast` => `dom` の方が
`mdast` => `hast` => `dom` より簡単かもしれない。

全体的に easy から simple に倒したのだが、
simple の要求する練度の高さがわりと険しいのであった。

