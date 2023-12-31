---
title: "サイト管理memo"
date: 2023-12-31
tags: ["ssg"]
---

無限にサイト管理している感じになってきた。
せっかく、`svelte` にしたので `webgl` とかがぐりぐりするようなところを目標にしている。

- https://www.svelvet.io/
- [tilemaker で vector tile を self hosting](https://zenn.dev/articles/ec47bc9d4de806/edit)

quest pro/ quest3 向けに webxr を弄りはじめて
ついでに WebRTC や React に手を出してみたのだが、
わりと GUI としてちゃんと動くものが作れそうな感じがしている。
`c++ と imgui` でなんとかしようとしていたのだが、
それよりも `React + WebGL` もよさそうだと思ったのだ。
かつ `WebXR` ものと部品をある程度共有する予定。

手が広がり過ぎでつらみがあったのだが `vite + typescript` が気に入ったので、
これを中心に要素を選択する。
だから、 `Next.js` には行かずに `svelte` に行くことにした。
あと、 `storybook` driven な開発ができそうな気がしているので環境を整備した。
おもしろ `storybook` 。 `babylon.js` らしい。

- [synthax storybook](https://62f6421c021f127287edd8fb-exirtzhlnf.chromatic.com/?path=/story/introduction--story)

backend も typescript にしようと思っていたのだけど、
vite で適当に typescript できる frontend に比べて 快適さに劣るような気がした。
WebSocket とか WebRTC で front と back でコードを共有してみたがよくなかった。
typescript を調整するのに手間がかかる。
express でやってみたのがうまくいかなかった。

backend は go を使う予定。
vite のbuild 結果を static host しつつ、
WebRTC の簡単な signaling を websocket + https でやる可能性が高い。
pion とかも使うかもしれない。

