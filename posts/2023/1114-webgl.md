---
title: "生 webgl へ"
date: 2023-11-14
tags: ["webgl"]
---

結局、 `A-Frame` も `three.js` もやめて、
`webgl` 手作りへと進む。
正直、`WebXR` や `WebGL` の API がラップされているのが不便だった。
`WebXR` の新しい機能を直接使ったり、
`WebGL` のテクスチャーハンドルを直接操作して xtermj.js と連携したりしたいのだよ。

## vite と vitest 快適

vite と vitest で typescript 開発するのが快適すぎて、
language-server と相性の悪い設計の `A-Frame` がまず
使いにくくなってしまった。component のメンバーを
追加するとエラー表示が出てしまう。
`this` の型を誤魔化す必要がある。

A-Frame に
見切りをつけてシンプルなコードベースから再出発することにした。

https://immersive-web.github.io/webxr-samples/

のソースを `mts` 化して進めることにした。
`esmodule` 方式だし、量的にも小さくてよさそうだった。
`glTF` ローダーもあるし。

## webxr 意外と簡単

`webxr` はもっと大変だと思っていたのだけど、
`OpenXR` に比べるとはるかに簡単で拍子抜けだった。
`OpenXR` をラップしてまとめてあるのはわかるので、
うまいことやったなーという感想です。
`webgl` で triangle が描画できるところに、
`webxr` を追加するのはすぐにできる。

PROJECTION_MATRIX と VIEW_MATRIX が、webxr から
供給されるので camera 制御がなくなって
簡単になるくらいだ。

## webgl のパフォーマンス

`webgl` 界のソースコードは、vec3/mat4 とかが使い捨てではない。GC対策と推察。
three.js とか gl-matrix がそうなのだ。
V8 の最適化に頼る場合に使い捨てにしないことで、
変数のスコープが広くなって、最適化の邪魔になったりしないのかしら。と思った。知らないが。
少なくとも読み難くはなるからのう。

`Quest3` `QuestPro` で 90FPS 出るので
実機確認をしながら細々とやっていく。
100個未満のキューブがあるくらいなので、
これでフレームレートが落ちる方がおかしいのだが、
Android + XR 環境なので、ちょっとしたことで FPS は落ちた。

## gl.getError がすごい遅い

debub でしかけた gl.DrawArray 直後の gl.getError が残っていて実機でだけ猛烈に遅くなっていた。
Error の有無と無関係にこの呼び出しが重い。
cube を 10個増やしただけで FPS90 が維持できないとかそういうレベル。

## quest pro の MR ルーム機能が重いぽい

なんもしなくても 60FPS に落ちた。
一方、 `quest3` は何の問題もなかった。
そんなもん。
ただ、passthrough の遮蔽に空間認識の mesh 使いたいのよね。

## まだコンテンツの重さが問題になっていない

webgl でエラーが出ているとか、
quest の実験機能が重いとか、
CPU も GPU も関係ないところで FPS が落ちている状況を
脱したところ。
これからレンダラーを機能強化して シーンをリッチにしていきたい。
しかし、Skinning とか MorphTarget とか重そうで心配である。

## 最適化の手段は色々ある

multiview による SinglePass レンダリングとか、
インスタンシングでドローコールを減らすとか、
FrustumCulling とかいろいろあるのでまだまだですな。
あと、Quest にも WebGPU が来るの待っている。

