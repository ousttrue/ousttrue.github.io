---
title: astro 構築
date: 2024-01-14
tags: ["ssg", "astro"]
---

サイトのcss整備とかやります。
TOC や tag の整備。

### ⛔ storybook

部品の動作確認用に最初に準備。
`svelte` のきにあったのだけど `histoire` に要れかえて消滅したので やりなおし。
と思ったら stroybook の astro component 対応がなかった。

https://github.com/storybookjs/storybook/issues/18356

- https://github.com/withastro/roadmap/issues/533
- 進行中ぽい。

こちらは、一見 storybook に空目するのだけど `storyblok` デス。

https://docs.astro.build/ja/guides/cms/storyblok/

### ✅ tailwind と DaisyUI

- https://docs.astro.build/ja/guides/integrations-guide/tailwind/

```sh
> npx astro add tailwind
```

- https://github.com/saadeghi/daisy-blog

- [Style rendered Markdown with Tailwind Typography | Docs](https://docs.astro.build/en/recipes/tailwind-rendered-markdown/)
- https://github.com/saadeghi/theme-change

### next / prev

### pagination

- [ページネーション](https://docs.astro.build/ja/core-concepts/routing/#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

### tag

- https://docs.astro.build/ja/tutorial/5-astro-api/2/

### markdown 拡張

- TOC
- [Building a table of contents from Astro&#39;s markdown headings](https://kld.dev/building-table-of-contents/)

- info, warning とかの囲み。
- GFM

- [Add icons to external links | Docs](https://docs.astro.build/en/recipes/external-links/)

- linkcard

### Starlight

https://starlight.astro.build/ja/

sidebar に category tree を作る予定。

