---
title: "docusaurus お試し"
date: 2023-12-21
tags: ["ssg"]
---

ちょっと Docusaurus を使うかもしれないので練習する。

`minista` の方が好みにあっているので後で戻るかもしれない。

戻るときに記事管理に https://contentlayer.dev/ と組み合わせてみたい。
`getStaticPaths` を調べているとき見つけたのだけど、
手作業で markdown 記事を収集しているところにマッチしている感じがする。

# docusaurus memo

https://docusaurus.io/docs

の手順通りに初期サイトを作成。
`package.json` を起点に関係ありそうなファイルを手作業でコピーすることで
システムを入れ替えた。

markdown を移植すると細かいエラーが出たりするものだが、
エラーメッセージがわかりやすいので簡単に対処できた。
これはポイントが高い。

docusaurus はあっという間に体裁が整う。
お手軽でよいかもしれない。

# build error

```
TypeError: pathname.match is not a function
```

npm 掃除がなっていなかった。

- https://github.com/facebook/docusaurus/issues/7532
- https://qiita.com/takagimeow/items/03099241250dac7670ac


```
rm -rf package-lock.json node_modules
```

でなおった。

dead link. 治せるエラーメッセージになった。

```
[cause]: Error: Docusaurus found broken links!
```

… 内部リンクのdead link はちゃんとなおそう w
