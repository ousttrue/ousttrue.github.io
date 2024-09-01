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
なんとなく `vite` が核心であり、他はなるべく少なくしたいという気持があった。

## vite の server / client の区別がついてなかった

vite の plugin にデバッガをアタッチしたくて 方法を探していたのだけど、
ようやく発見。
これにより、やっと vite のサーバー側の一歩を踏み出すことができた。
要するに vite コマンドではなくて、自前の js から launch すればできる。

```js
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

## シンプル SSR で React が動くようにする

`@vitejs/plugin-react` なしでシンプルなものを作った。

https://ja.vitejs.dev/guide/ssr

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
    // 👈 この行を削除した
  </body>
</html>
。
```

## `import.meta.glob` と StaticRouter

いままでフレームワークに隠蔽されてブラックボックスだったところが
ようやくわかった。

基本的に `import.meta.glob` で目的は達成できるのだけど、
この段階では frontmatter にアクセスしたい。
ライブラリーに任せると markdown が ReactComponent 化されていたりして、
逆に難しくなるという状況だった。
自作すればシンプル。
