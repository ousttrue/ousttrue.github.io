---
title: Vitepress お試し
date: 2024-01-11
tags: ["ssg", "vitepress"]
---

Web開発でわいが関心があるのは以下の3つ。

- document site。sphinx 的なサイト。markdown 記事。左にツリー。右にTOCという構成。
- blog site。markdown 記事。
- webxr とか webrtc の開発。ローカル https / websocket サーバー。インターネットにデプロイする気は無い。

このうち document に関しては `sphinx` の後継を探索しています。
`sphinx` とか `hugo` だと、`html` `template` が js 勢の jsx やそれに類する DSL 方式の快適さに勝てない感じです。jsx, svelte, astro, vue などは、 `language server` 対応がありつつ typescript も混ぜられるので `vscode` とか `nvim` からは快適に作業できます。この開発を経験すると、`jinja template` とか厳しい。

document 用途のツールを探索しているのですが、 React の `docusaurus` がいいかなぁと固まりつつあります。

- https://ousttrue.github.io/meson_book/
- https://ousttrue.github.io/cmake_book/

`docusaurus` はデフォルトのテーマが sphinx ぽいし見易い。
複数サイドバー対応やパン屑リストなど手堅い作り。
唯一気になるところは `vite` でなく `webpack` なところです。

`vite` で手頃な document ツール、ということで `svelte` の [KitDocs](https://kitdocs.vercel.app/docs/getting-started/introduction) を試しました。2階層以上の深い木ができなさそうでした。まだ、枯れていない感じ。今回は見送り。

まだ試していない `vue` 系の document ツールはどうかしら。

# Vuepress と Vuepress2 と Vitepress

[VuePress2 vs VitePress | N氏の記録](https://ryuden.org/vuepress2-vs-vitepress/)


わいは `vite` と シンプルが好きなので Vitepress を選択。

以前に sphinx で作業メモを放りこんだ残骸があったので、
`vitepress` にしてみた。

- https://ousttrue.github.io/my_nvim/

vitepress は vite で document するにはいい感じです。
シンプルでそっけない感じがします。よい。
これはこれで、しばらく使ってみます。

# react と svelte と vue

とりあえず `three.js` とか GUI 的に手のこんだものに関しては svelte を主に
やっていくつもりです。
React の state 管理はめんどくさかったので、 `svelte` の方が楽そうという目論見です。
あと、 `vite` 。

