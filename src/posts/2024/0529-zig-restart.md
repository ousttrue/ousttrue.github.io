---
title: zig 再開
date: 2024-05-29
tags: [zig]
---

`zig-0.12` が出たので再開しようと思っていたのだが、
良いネタが無くてなかなか進まなかった。

raylib を眺めていたら zig binding を発見。

https://github.com/Not-Nik/raylib-zig

`zig-0.12` 対応で `raylib` も `5.0` でよさそう。

Windows で `zig init` して外部ライブラリー参照してみたところ、
さくっと動いた。
さらに Linux の `wayland` 環境でも動いた。

`raylib` の `C` 言語サンプルを `raylib-zig` に移植すると
zig と raylib を同時に練習できて一石二鳥なので、
これでやってみる。

https://github.com/ousttrue/raylib_sample
