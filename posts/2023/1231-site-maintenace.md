---
title: "だいぶ手が拡がってしまった"
date: 2023-12-31
tags: ["ssg", "webgl"]
---

quest3 を入手したあたりから webxr するべく web 周りを弄っているのだが芋蔓式に手が拡がっていき、 延々と ssg を作り替えているようになってきました。
ついに、前から気になっていた `svelte` まで来ました。
せっかく `svelte` にしましたし、`webgl` とかをサイトに組み込むぞー。

最初は手が拡がらないように typescript を避けて comment に jsdoc の型情報を書いていました。 確か `xrterm.js` を `webxr` 向けに改造するのに `import` を解りやすくするためにライブラリ全体を `esmodule` 化する作業(`ts` を `mts` に書き替え)をやったのだけど、この時の開発体験がよくて `vite` + `typescript` ならいけると確信しました。

webxr を中心に進めたところ、 `WebRTC` と `React` が射程に入りました。
この辺で、`https` と `websocket` が必須になってサンプルも `docker` を使っているものが多くなってきました。`electron` や `express` を試行錯誤したのだけど、`frontend` と比べてどうも `vite` の使い勝手が良くないと感じます。`deno` も下見しましたが、`backend` は `js` をやめて `go` にしようという判断になりました。frontend と backend がコードや `tsconfig.json` を共有するのが良くない感じでした。

`webgl` は、`A-Frame` を使うつもりで進めたのだけど、 `A-Frame` が `esmodule` 化されておらず、class生成が普通の class でない昔の prototype 的な実装であるため、今後もされなさそうなので候補から外しました。次に `Three.js` の `React` ラッパー `react-three-fiber` を使う方向で進めて、そのために素の React を使う感じの `minista` を使っていたのだけど、`svelte` が `vite` を主に使っていることを発見したので、`svelte` にも手を出してみました。 `svelte` の初期化や状態管理は、React の hook より簡単そうなので、`three-js` と組みあわせたときの使い勝手に期待しています。なので `three-js` の svelte ラッパーを採用予定。

- https://threlte.xyz/
- https://www.svelvet.io/

`Next.js` も下見したのだけど、`turbopack` は苦手な `webpack` の気配がしますので `svelte` に行くことにしました。あと、名前を良く目にする `tailwind` も取りいれてみました。 さらに `storybook` も取り入れています。
おもしろ `storybook` 。 `babylon.js` らしい。

- [synthax storybook](https://62f6421c021f127287edd8fb-exirtzhlnf.chromatic.com/?path=/story/introduction--story)

手を拡げすぎで大変だと思っていたのですが、
使う要素が定まってきました。

- vite
- typescript
- svelte
- tailwind
- storybook
- three.js
- WebXR
- WebRTC
- websocket
- https
- go

広いデス。

- [WebRTC+WebXR でVRリモートデスクトップ](https://qiita.com/binzume/items/52a4f4be5c316753e1b1)

こういうのを作ろうとしています。

# 記事とか repository の一覧

- [Qiita API を活用して、投稿記事の一覧をブログに表示する](https://geeawa.vercel.app/articles/get-qiita-posts-using-api)
- [Github のリポジトリ一覧取得](https://koko206.hatenablog.com/entry/2021/08/21/160949)
- [Zennの投稿を取得してブログに取り込む](https://zenn.dev/niiharamegumu/articles/8f00cfdf9753d1)

# 参考

- [Next.jsでブログをつくった](https://www.haxibami.net/blog/posts/blog-renewal)

