---
title: astro 2回め
date: 2024-01-13
tags: ["ssg", "astro"]
---

以下、手順メモ

## nvim 準備

https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#astro

前回はnvim を `astro` ファイル対応させるのが面倒くさくて敬遠していたのだけど、
`svelte` で慣れたのでしっかりやっていく。

```
TSInstall astro
```

であっさりとシンタックスハイライトも有効になります。
わりとマイナー？な言語でも、 `tree-sitter` あるので強い。

### astro の formatter

TODO:

## astro 初期化

```sh
> npm create astro@latest
```

typescript を有効にした。
生成されたファイルを svelte で運用していたフォルダに上書き。

## posts に記事投入

`/posts/**/*.md` を `/src/contents/posts` に投入した。

## front matter の定義修正

- description を `default('')`
- pubDate を date に変更

[コンテンツコレクション | Docs](https://docs.astro.build/ja/guides/content-collections/#zod%E3%81%AB%E3%82%88%E3%82%8B%E3%83%87%E3%83%BC%E3%82%BF%E5%9E%8B%E3%81%AE%E5%AE%9A%E7%BE%A9)

### rss.xml.js

```js
		items: posts.map((post) => (
    {
			...post.data,
      pubDate: post.data.date, // pubDate 無いとエラー
			link: `/posts/${post.slug}/`,
		})),
```

## typescript を効かせる

型を定義したにも関わらず、language-server がエラーを報告してこない。
`ts-plugin` が追加で必要だった。

https://github.com/withastro/language-tools/tree/main/packages/ts-plugin

```sh
> npm install --save-dev @astrojs/ts-plugin
```

`getCollection` が型エラーを伝えてくれるようになった。
さくさくっと修正。
`blog` テンプレートに記事を投入して動いた。

blog サイトはいわゆる `FileBaseRouting` とはちょっと違うので
記事収集部分の手作りとか設定を強いられることが多かったのだけど、
astro の `ContentCollections` はディレクトリから markdown を集めて frontmatter を読みこんでコレクションにしてくれるのですごい楽ですね。
web 周りの知識をある程度得てから見ると、良さみがわかりみ。
記事と同じフォルダにある画像も素直に収集してくれますね。

## build 確認

```
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

### キャッシュ周りの挙動が怪しいような

当初あったゴミファイルを後で消した場合に反映されない場合がありそう。
`.astro`, `node_modules` 等を消したらなおったケースがある。

### ローカル確認

```sh
> npx http-server dist
```

## 構築

