---
title: astro 2回め
date: 2024-01-13
tags: ["ssg", "astro"]
---

以下、手順メモ

## nvim 準備

https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro

前回はnvim を `astro` ファイル対応させるのが面倒くさい、というよりも
謎の独自フォーマットを敬遠していました。
その後 `jsx`, `svelte`, `vue` とひととおり眺めてきて、
Web界隈では良くあるものだということを理解したので `astro` もいけるだろうという気持ちになりました。

```vim
:TSInstall astro
```

であっさりとシンタックスハイライトも有効になります。
わりとマイナー？な言語でも、 `tree-sitter` あるので強い。

## astro 初期化

```sh
> npm create astro@latest
```

typescript を有効にした。
生成されたファイルを svelte で運用していたフォルダに上書き。

::: wraning

node_modules  をちゃんと削除しよう！
cache とか vite のキャッシュとか残っているかもしれぬ。
:::

## posts に記事投入

`/posts/**/*.md` を `/src/contents/posts` に投入した。

## front matter の型修正

- description を `default('')`
- pubDate を date に変更

[コンテンツコレクション | Docs](https://docs.astro.build/ja/guides/content-collections/#zod%E3%81%AB%E3%82%88%E3%82%8B%E3%83%87%E3%83%BC%E3%82%BF%E5%9E%8B%E3%81%AE%E5%AE%9A%E7%BE%A9)

### rss.xml.js

```js
items: posts.map((post) => (
    {
      ...post.data,
      pubDate: post.data.date, // pubDate 無いとbuildでエラー!
      link: `/posts/${post.slug}/`,
    })),
```

## typescript を効かせる

型を定義したにも関わらず、language-server がエラーを報告してこない。
`ts-plugin` が追加で必要だった。

https://docs.astro.build/en/guides/typescript/#setup

https://github.com/withastro/language-tools/tree/main/packages/ts-plugin

```sh
> npm install --save-dev @astrojs/ts-plugin
```

`getCollection` が型エラーを伝えてくれるようになった。
さくさくっと修正。
`blog` テンプレートに記事を投入して動いた。

## ContentCollections のよさみ

blog サイトはいわゆる `FileBaseRouting` とはちょっと違って、
記事収集部分の手作りとか設定を強いられることが多い。

`minsta`, `sveltekit` ... etc がそうでした。
`vitepress` とかも手作り `glob` とかが要りそう。
`docusaurus` は記事収集能力があってお手軽です。

blog タイプのコンテンツは `archive` とか `tags`  とか
の都合上、frontmatter の付属した記事一覧の管理が必要です。
`next`, `prev` なら date で `sort` されている必要があります。
原始的にやるなら`node` もしくは `vite` で `glob` して一覧を得る感じになる。
それなら`glob` したついでに `watch` してほしいです。
システム化されて `headless CMS` や `Gatsby` や `ContentLayer` になっていきます。
でもディレクトリで完結して簡単に済ませたいという気持ちもあります。
astro の `ContentCollections` はまさにディレクトリから markdown を集めて frontmatter を読みこんでコレクションにしてくれる機能です。 過不足なしでちょうど良い。
さらに記事と同じフォルダにある画像も素直に収集してくれました。

## build 確認

```sh
> npm run build
```

画像でこける。

```sh
> npm install sharp
```

正常終了するまでがんばってなおす。

```
20:23:54 [build] Complete!
```

### 横のフォルダを build 除外する手段が見つからない

`svelte` の src フォルダを `_src.bak` とかどけておいたのが、
ビルドされてエラーになる。除外方法がわからん(`srcDir` はではできないぽい)。
うーん。なんだこれは。消すことを強いられる。

### ローカル確認

```sh
> npx http-server dist
```

### gh-pages

https://docs.astro.build/ja/guides/deploy/github/

この時点で一度スマホでアクセスしてみる。
軽い。
前の svelte サイトはなんかやらかして、重くなっていたぽい。
ちゃんと軽量のサイトを作るってのは俄かでは難しいですね。

最低限で gh-pages まで動確できました。
