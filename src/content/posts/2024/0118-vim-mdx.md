---
title: nvim の mdx 設定。あと astro
date: 2024-01-19
tags: [nvim, treesitter, markdown, astro]
---

index.astro を index.mdx に変えてみました。
なんか React ぽい書き方が動いてしまいます。
不思議な感じがしますね。

```txt title="/src/pages/index.mdx"
---
layout: ../layouts/ProseLayout.astro
title: 三次元日誌
items: [
  {
    name: "MesonBook(docusaurus)",
    url: "https://ousttrue.github.io/meson_book/",
    icon: "🔗",
  },
  {
    name: "CmakeBook(docusaurus)",
    url: "https://ousttrue.github.io/cmake_book/",
    icon: "🔗",
  },
  {
    name: "BlenderBook(docusaurus)",
    url: "https://ousttrue.github.io/blender_book/",
    icon: "🔗",
  },
  {
    name: "NvimNote(vitepress)",
    url: "https://ousttrue.github.io/my_nvim/",
    icon: "🔗",
  },
]
---

MDX テステス。

`/src/pages/index.mdx`

export function Item(props) {
  return <div>
    {props.icon}
    <a href={props.url}>{props.name}</a>
  </div>
}

export function Items(props) {
  return <> 
    {props.items.map((item) => <Item {...item} />)}
  </>
}

<Items items={frontmatter.items} />
```

## nvim の mdx 設定

ついでに nvim の mdx 対応を探索。
発見しました。

[Good enough syntax highlight for MDX in Neovim using Treesitter](https://phelipetls.github.io/posts/mdx-syntax-highlight-treesitter-nvim/)

- ~/.config/nvim/file.lua に mdx 拡張子設定を追加
- treesitter 設定で mdx を markdown に結びつける

の2点で作業完了。
最近の nvim は treesitter が強力で、既に主力の syntaxhight 定義は
treesitter に移り変わっているように感じます。

## astro の mdx

astro の ContentsCollection 経由の md/mdx とpages 配下の md/mdx で微妙に扱いが異なります。
だいたい同じだけどpages 配下の場合 render() の呼び出しが暗黙になっているなどの違いがありました。

pages 配下の md /mdx に対してLayout を適用する方法。

- [.md、.mdx、.astroに対し同一のレイアウトを使用する](https://docs.astro.build/ja/core-concepts/layouts/#mdmdxastro%E3%81%AB%E5%AF%BE%E3%81%97%E5%90%8C%E4%B8%80%E3%81%AE%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)

render 結果が `slot` に `Content` が入ってくるのはわかるのだが、副次的な `headings` などは取得できるのであろうか。読まないとわからないですな。
