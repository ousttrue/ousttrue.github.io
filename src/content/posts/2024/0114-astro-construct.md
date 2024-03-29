---
title: astro 構築
date: 2024-01-14
tags: ["ssg", "astro", "markdown"]
---

サイトのcss整備とかやります。
TOC や tag の整備。

慣れてきた。`astro` いいじゃない。

## ⛔ storybook

部品の動作確認用に最初に準備。
`svelte` のときにあったのだけど `histoire` に入れかえて消滅したので やりなおし。
と思ったら stroybook の astro component 対応がなかった。

https://github.com/storybookjs/storybook/issues/18356

- https://github.com/withastro/roadmap/issues/533
- 進行中ぽい。

こちらは、一見 storybook に空目するのだけど `storyblok` デス。

https://docs.astro.build/ja/guides/cms/storyblok/

## ✅ tailwind と DaisyUI

- https://docs.astro.build/ja/guides/integrations-guide/tailwind/

```sh
> npx astro add tailwind
```

- [Style rendered Markdown with Tailwind Typography | Docs](https://docs.astro.build/en/recipes/tailwind-rendered-markdown/)

`class = "prose"`

### ✅ theme-change

- https://github.com/saadeghi/daisy-blog
- https://github.com/saadeghi/theme-change

DaisyUI のデフォルトテーマを全部つっこんでみた。

## ContentCollection

### ✅ tag

- https://docs.astro.build/ja/tutorial/5-astro-api/2/

### ✅ next / prev

素直に実装。

```ts title="タイトルだよー"
const posts = await getCollection("posts");
posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
const index = posts.findIndex((p) => p.slug == post.slug);
let prev = index + 1 < posts.length ? posts[index + 1] : null;
let next = index > 0 ? posts[index - 1] : null;
```

### 🟩 search

サーバー使わない簡易な検索。

### ✅ pagination

- [ページネーション](https://docs.astro.build/ja/core-concepts/routing/#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

`[page].astro` を足したら動いた。同じディレクトリに同居できるぽい。

```txt
/src/pages/posts/[...slug].astro
/src/pages/posts/[page].astro # 👈
index.astro
```

## ✅ icon

https://www.astroicon.dev/

https://alpacat.com/blog/introduction-of-astro-icon/

```sh
npm i -D @iconify-json/mdi @iconify-json/devicon
```

<br/>

```html title="mdx で Icon !"
<Icon name="devicon:astro" class="text-4xl" />
```

## markdown

### ✅ TOC

- [Astro で Table of Contents(目次)を実装する](https://egashira.dev/blog/astrojs-toc)
- [Building a table of contents from Astro&#39;s markdown headings](https://kld.dev/building-table-of-contents/)

render 関数から見出し一覧を取得できる。
なるほどー。

```ts
const { Content, headings } = await post.render();
```

### markdown 拡張

#### ✅ directive / admonition ( info, warning とかの囲み)

- [Contentlayer で目次を生成する　ほか #Next.js - Qiita](https://qiita.com/kedama-t/items/091ea23b8ae7f73595da)

:::tip

`admonitions` is pretty great!

:::

:::note-error

エラーノート

:::

#### GFM

デフォルトに入っている？

#### ✅ 外部リンクのマーカー

[Add icons to external links | Docs](https://docs.astro.build/en/recipes/external-links/)

`contents` を使うと後ろに入るので、`properties` と `css` を組み合わせて前に入れた。

```css title="css で前へ"
a[data-external]::before {
  content: attr(data-external);
}
```

#### ✅🚧 linkcard

https://futabooo.com/blog/2023/link-card/

TODO: aspect比固定するべし

### ✅ codeblock title

いろいろ調べたけど astro では `astro-expressive-code` がいいです。

:::warning build時エラーに

`no grammar...`

preivew 時はエラーにならない。
codeblock がシンタックス違反をしているとエラーになる！

astro の markdown-sytnax-guide とかだめ。

だめなときは文法を `txt` 指定にすればエラーは回避できる。
:::

#### astro-expressive-code

https://expressive-code.com/reference/configuration/

- [Markdownでリッチなコードブロックを実現する「Expressive Code」 - ろぼいんブログ](https://roboin.io/article/2023/12/16/how-to-use-expressive-code-in-markdown-and-astro/)
- 👀 `expressive-code` [Expressive Code Blocks in Astro](https://scottwillsey.com/astro-expressive-code/)

#### rehype-pretty-code

- `rehype-pretty-code` [Ryan Schachte&#39;s Blog](https://ryan-schachte.com/blog/fun_with_code_blocks/)
- `rehype-pretty-code` [Highlight a line on code block with Astro](https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/)

#### Prism

- `mdx用？` `Prism` [Astro でコードブロックのシンタックスハイライトをしつつタイトルも付ける | monolithic kernel](https://blog.mono0x.net/2023/07/10/astro-syntax-highlight-with-title/)

#### remark-flexible-code-titles

- `remark-flexible-code-titles` [2023年6月版 Astro.js 小ネタ集 その2 Markdownの表示カスタマイズいろいろ. Markdown のコードブロックにタイトルをつける](https://zenn.dev/asopitech/articles/20230604-012854_1#3.-markdown-%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AB%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B)

##### data-language 属性 を before で表示

`rehype-pretty-code` と組合せるなど。

- [ソースコードの右上に言語名を表示するやつ - Object.create(null)](https://susisu.hatenablog.com/entry/2017/08/06/235706)

## 🟩 Starlight

https://starlight.astro.build/ja/

sidebar に category tree を作る予定。
