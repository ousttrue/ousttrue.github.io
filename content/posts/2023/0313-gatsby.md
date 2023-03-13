---
title: gatsby やってみる
---

なんとなく gatsby やってみる。

- `mdx` は `jinja` テンプレートより先進的でおもしろい
- graphql おもしろい

弱点

- frontmatter が yaml 必要。toml 食えない。
- 既存の markdown がエラーになる。`<url> 記法` とか。エラーがあると全部失敗になる。

ということで、 python のスクリプトで既存の markdown を改変して様式を合わせることにした。

- yaml 変換
- <url> 記法除去
- frontmatter.title が無い場合に先頭の見出しを title に付け替える(sphinx の myst 向けの記事？)
