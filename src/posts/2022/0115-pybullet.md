---
date: 2022-01-15
tags:
- python
- bullet
title: ExampleBrowser を読んでいる
---

# ExampleBrowser を読んでいる

fork して改造しながら読んでいる。

https://github.com/ousttrue/bullet3

やっと構造がわかってきた。
コードはディレクトリに別れているのだけど、
CMake を整理しながら推進。

ざっくりとこんな感じか。

```{digraph} G
rankdir="BT"

ExampleBrowser -> SimpleOpenGL3App -> gwen -> "Select DEMO";

```

で、この SimpleOpenGL3App を glfw に、gwen を imgui に置き換えてコードを単純化している。
`bulletphysic` の マルチクライアント システム ぽい `SharedMemory` を解読したい。
各 Demo は、 `CommonExampleInterface` できれいに分離されている。
`SharedMemory` と各クライアントの通信内容と `OpenGL` の繋ぎの部分が知りたい。 

この pybullet の下地の部分がシーン同期システムに使えないかと。
`Unity` とかだとノードに剛体をくっつけるのだけど、
`bullet` 的には、剛体に `Mesh` をつける考えになるような。

## 20220118

`各デモ` と `Physics` と `Renderer` を分離できればよいのだが。
わりと規模が大きい。

## 20220122

だいぶ読んだ。`GLInstancingRenderer` がレンダラー本体。
`btIDebugDraw` とは別に普通の Renderer が実装されていてこっちを解読したい。
btIDebugDraw だと wireframe になるのかな。

