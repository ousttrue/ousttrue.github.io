---
date: 2023-03-13
title: gatsby やってみる
tags: ["ssg"]
---

# なんとなく gatsby やってみる

- `mdx` はおもしろそう。カスタマイズはの記法は `hugo` や `jinja` よりも素直で簡単そうに見えた
- GraphQL もわりと素直で簡単そうに見える

が、既存の markdown がわりとエラーになる。

- frontmatter が yaml 必要。toml 食えない。
- `<url> 記法` とか。エラーがあると全部失敗になる。

ということで、 python のスクリプトで既存の markdown を改変して様式を合わせることにした。

- frontmatter の yaml 変換
- 正規表現で `<url> 記法` 除去
- frontmatter.title が無い場合に先頭の見出しを title に付け替える(sphinx の myst 向けの記事？)

# MDXRenderer 無くなっているぽい

breaking change w

gatsby-plugin-mdx が 3 から 4 になるときに変更があって、
MDXRenderer が無くなって
MDXprovider を使う方式に変わったぽい？

- https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx
- https://www.gatsbyjs.com/docs/how-to/routing/mdx/

見よう見まねでセットアップしてなんとなく動いたのだが、
ちょっと変えたら動かなくなって、
調べていくとどうも最近のバージョンで `MDXRenderer` が無くなったぽい。

- https://stackoverflow.com/questions/74309351/how-to-render-mdx-with-gatsby-plugin-mdx-from-allmdx-query

```
Element type is invalid: expected a string
```

というエラーメッセージが出て全然意味がわからなかったのだが、
`MDXRenderer` が無くなっていて、import 失敗の結果出たエラーだったぽい。
わからねー。

```jsx
import { MDXRenderer } from "gatsby-plugin-mdx";
```

いまバージョンはどうも Rendering 済みの `children` を引数で受ける作法になっているぽい。

```jsx
// post template
function PostTemplate({ data: { mdx }, children }) {}
```

chidren を受けるには `createPages` を以下のようにする。

```javascript
// gatsby-node.js
data.allMdx.nodes.forEach((node) => {
  actions.createPage({
    path: node.frontmatter.slug,
    // 👇 この記述により template に children を供給できるぽい
    component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
    context: {
      id: node.id,
    },
  });
});
```

要するにドキュメントに書いてあるとおりにする必要があるのだが、
内容を理解していないのと、古い情報との混在で難航したのであった。

# gatsby-plugin-page-creator 無用

無くても動く。
というか `createPages` を変わりにやってくれるものぽい。

```javascript
exports.createPages = async ({ graphql, actions }) => {
```

# かくして、白いサイトに戻った。

はまったおかげで gatsby のデータの流れがわかってきた。
適当に組み立てて行こう。

# prism-react-renderer (syntax highlight) 導入

- https://paulie.dev/posts/2022/08/syntax-highlighting-with-gatsby-mdx-and-prism-react-renderer/#mdx-2-rc-version

- install prism-react-renderer
- MDXProvider.components
- gatsby-browser.js

の３ステップ。
これも難航したが、`MDX v2` の情報を見分けることが重要。
`MDXProvider` 探索するべし。

# layout

## list

## post

# tags

- https://www.gatsbyjs.com/docs/adding-tags-and-categories-to-blog-posts/
