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
`svelte` のきにあったのだけど `histoire` に入れかえて消滅したので やりなおし。
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

### theme-change

- https://github.com/saadeghi/daisy-blog
- https://github.com/saadeghi/theme-change

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

### search

サーバー使わない簡易な検索。

### pagination

- [ページネーション](https://docs.astro.build/ja/core-concepts/routing/#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

## icon

https://www.astroicon.dev/

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

#### info, warning とかの囲み。
#### GFM
デフォルトに入っている？

#### 外部リンクのマーカー

[Add icons to external links | Docs](https://docs.astro.build/en/recipes/external-links/)
#### linkcard

#### ✅ codeblock title


- [Highlight a line on code block with Astro](https://sat0shi.dev/posts/highlight-line-on-codeblock-with-astro/)
- [Astro でコードブロックのシンタックスハイライトをしつつタイトルも付ける | monolithic kernel](https://blog.mono0x.net/2023/07/10/astro-syntax-highlight-with-title/)
- [2023年6月版 Astro.js 小ネタ集 その2 Markdownの表示カスタマイズいろいろ. Markdown のコードブロックにタイトルをつける](https://zenn.dev/asopitech/articles/20230604-012854_1#3.-markdown-%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%81%AB%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B)

##### data-language 属性 を before で表示
- [ソースコードの右上に言語名を表示するやつ - Object.create(null)](https://susisu.hatenablog.com/entry/2017/08/06/235706)

## Starlight

https://starlight.astro.build/ja/

sidebar に category tree を作る予定。

