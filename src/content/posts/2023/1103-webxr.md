---
title: "webxr の仕込み"
date: 2023-11-03
tags: ["webxr"]
---

`Apple Vision Pro` が気になっていたのだが、
あっさりと相対的に安価な `Quest3` に流れました。
お値段的には、Hololens(初代) が限界かも。
あと、mac使いではないので腰が重い。
いちおう、 `MacMini` を調達して `Metal` とか練習しようとは思っていたのだが。。。

とりあえず、

- WebXR
  - MR
  - HandTracking
- WebRTC
- xrterm

でおもちゃを作ってみようという方向性になった。
`WebXR` なら `VisionPro` でも動く可能性が高そうだし。

で、`WebXR` 周辺を探っていた。

[xrterm](https://xrterm.com/) に目を付けて、
xrterm が使っている、
[xterm.js](http://xtermjs.org/) と [A-Frame](https://aframe.io/docs/1.4.0/introduction/) を使ってみた。

## xterm.js

vscode の terminal 実装の部品ということで強そう。
typescript だった。
xrterm の解読過程である程度動きがわかってきた。

ユーザーのキーボード入力を受けつけて `shell stdin` へと渡す文字列を生成する `input` と、
`shell stdout` を受けて描画する Renderer の機能がある。
`shell stdout` は、エスケープシーケンスで色がついていたりする。
`Terminal` という `class` の上にキーボード入力と Renderer の両方がまとまっている。
入力は WebBrowser の textarea が裏に隠してあって、これに `focus` して `keydown` イベントを処理する。Terminal.onData へと出力される。
出力は、デフォルトでは `canvas 2d` への描画となる。
`AddOn` で `WebGL` 描画するものがあり,

https://hyper.is/

という terminal emulator もある。
同じ部品を WebXR に持ちこみたいわね。

## A-Frame

Three.js のラッパー。
シンプルで薄い感じが使いやすいのだが、
実装が素直でない prototype をごにょごにょする`class 継承` を使っていたりして
`LanguageServer` の恩恵が受けにくい。
時代が良くなかった w

[A-Frame の hand tracking 実験](https://ousttrue.github.io/aframe-hands/)

## A-Frame の板に xterm.js を描画する

https://github.com/RangerMauve/aframe-xterm-component

xrterm より先らしく実際に `QuestPro` で動かしてみました。
動いたけど重かった。落ちました w
毎フレーム dom の 2d canvas を、three.js のテクスチャにコピーするような実装になっていて、
そりゃ重いよね。

https://xrterm.com/

aframe-xterm-component と比べて軽量化されていて、
xterm.js の WebGL addon を改造しているぽい(解読中)。

xterm.js + PTY(WebSocket) + WebGL 描画 の目処がついた。
これで MR 内に テキスト端末を持ちこみたい。

## Vite とか React

xterm.js を解読するにあたって typescript を使う環境として `Vite` を試してみた。
なるほど `ESModule` いいですね。となった。
`Vite` 使うと `WebPack(苦手)` を回避できる。

調べながら `js` やっている中で、 なんとなく `JSX` を知る。
`JSX` やるなら、ついでにセットで `TypeScript` もやるか。わかる。
逆もまた然り。
このサイトを Gatsby から `Astro` に変えて寄り道する。
Astro は、`Vite` で `TypeScript` で `JSX` だ。

## Three.js + React

じゃぁ Three.js と React を組みあわせて使うのがよいのでは。
Three.js にインスペクターつけるのに、React を使う。

