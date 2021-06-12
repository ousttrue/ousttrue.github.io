---
title: "SharpDX事始め"
date: 2013-12-01
taxonomies: {tags: []}
---

SharpDX事始め
WPFとかDirectX11とかKinectあたりのAPIに慣れておきたいということで、
SharpDXの練習を始めた。
SharpDXのサンプルにDirect3D10/WPFHostというのがあるのだが、
Direct3D11版が無かったので練習がてら11で動くように改造してみた。
Direct3D10とDirect3D11の間の違いは少ないので変更箇所は少ないのだが、
ポイントがいくつかあるのでメモ。

Direct3D11でDeviceの一部の機能がDeviceContextに分けられた。DeviceからDeviceContextを取得するには、Device.ImmediateContextを使える。
Direct3D11でAPIからEffectが消滅した。SharpDXはこの機能をsharpdx_direct3d11_effects_x86.dllで提供しているのでこれを実行パスにコピーするべし。あとよくわからないが、CompileFromFileの第２引数には”fx_5_0”を指定するべし。”fx_4_0”だとエラーになる。適当にやってみたら動いたからよいものの謎。

とりあえずこれでWPF+DirectX11な開発を始められるで。
せっかくなので CodePlexにアップ。 https://wpfhost11.codeplex.com/
ちょっと、C#系のクンフーを高めて行こうかと。
追記

http://stackoverflow.com/questions/18912194/sharpdx-2-5-in-directx11-in-wpf

SharpDXElement使えだと？
