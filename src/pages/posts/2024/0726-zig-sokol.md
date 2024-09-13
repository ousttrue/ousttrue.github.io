---
title: zig 再開(その2)
date: 2024-07-26
tags: [zig, sokol, gizmo]
---

なんとか zig を再開して軌道に乗ってきた。

zig で OpenGL をするとなると、
glew や glad の層がわりとめんどうで
`cImport` でビルドはできるがあまり快適ではない。

## raylib

OpenGL の薄いラッパー層として raylib を使ってみた。
raylib は本家が地味に `build.zig` を含んでいて、これを参考にすれば
zig でも簡単にビルドできる。

https://github.com/raysan5/raylib/blob/master/src/build.zig

ある程度やった。

https://github.com/ousttrue/raylib_sample

## sokol

なんとなく sokol のサイトを眺めていたら `sokol-zig` 発見。

https://github.com/floooh/sokol-zig

試してみたらさくっと動いた。
wasm もできた。
`cImport` でなくて `zig` の `extern` 定義があってすごく使いやすい。
`sokol` は前から気になっていたのだけど、
ビルドシステムが独自で良くわからなかったので敬遠していた。

sokol-zig は `build.zig` になっていて、 `shader` を前処理する仕組みがわかった。
かなり洗練された設計であることがわかった。
前処理で `glsl` を import 可能な `zig` に変換するのだけど、
これにより頂点レイアウトやuniform変数を静的型付けで過不足なく扱えるようになっている。
`build.zig` にコード生成 Step として組み込むこともできてとてもよい。

sokol のサンプルを zig に移植して練習中・・・

https://github.com/ousttrue/zig-sokol-sample

https://github.com/ousttrue/learnopengl-examples
