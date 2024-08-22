---
title: vite で React 再
date: 2024-08-23
tags: [vite]
---

zig で wasm のサンプルを量産する修行

https://ousttrue.github.io/learnopengl-examples/

を作っている。

始め、
python で playwright による screenshot を作成して、
並べて html にしていた。

あとで  react のサイトに wasm を埋めこむかもしれないので、
手始めに docusaurus 化してみた。
この内容なら vite でもっと小規模に手作りでよいと思った。


[Viteで作成したReactアプリをSSGで出力出来るように変更 #JavaScript - Qiita](https://qiita.com/otohusan/items/16f8d244859a1f1af46d)

を参考に Vanilla で構築してみる。
