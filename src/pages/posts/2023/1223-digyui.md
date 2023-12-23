---
title: "react-daisyui 導入"
date: 2023-12-23
tags: ["ssg"]
---

見た目を作るのに

https://react.daisyui.com/

を入れてみた。

# tailwind

なんとなく tailwind を敬遠していたのだが、
react-daisyui が tailwind 依存だったのでなんとなく tailwind にもなった。

blog にまるっと theme を適用するのに比べて、粒度が小さいので部品ごとに設定を作る手間があるがそれなりにカスタマイズができる。 なるほどー。

# react の component

`jsx` の `html template` として分かりやすさは圧倒的です。
hugo や jinja temlate に比べると、楽さが違う。
プログラミングで関数を分割するのに近い感覚で `HTML` を切り貼りしていけるし、
languge-server で支援が受けられる。至れり尽くせりです。
おかげでわりとすんなり行くことが多くなって、html template のレファレンスを見たり、試行錯誤の回数が少ない感じがする。
if とか for とかの制御構造も js 側に来たので、 template語の動きを類推しなくていいので楽になった。

# 参考

- [GitHub Flavored MarkdownをTailwindCSSでスタイリング](https://zenn.dev/hayato94087/articles/07f238b686d0a3)

