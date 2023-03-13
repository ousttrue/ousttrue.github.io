---
date: 2023-03-13
title: gatsby やってみる
tags: ["ssg"]
---

なんとなく gatsby やってみる。

- `mdx` はおもしろそう。カスタマイズはの記法は `hugo` や `jinja` よりも素直で簡単そうに見えた
- GraphQL もわりと素直で簡単そうに見える

弱点

- frontmatter が yaml 必要。toml 食えない。
- 既存の markdown がエラーになる。`<url> 記法` とか。エラーがあると全部失敗になる。

ということで、 python のスクリプトで既存の markdown を改変して様式を合わせることにした。

- yaml 変換
- `<url> 記法` 除去
- frontmatter.title が無い場合に先頭の見出しを title に付け替える(sphinx の myst 向けの記事？)

かくして、白いサイトに戻った。
適当に組み立てて行こう。
