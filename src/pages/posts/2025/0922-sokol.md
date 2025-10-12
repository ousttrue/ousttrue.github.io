---
title: sokol-zig で cross platform

date: 2025-09-22
tags: [sokol, zig, wasm, openxr]
---

3D プログラミングで desktop(glfw), android(OpenXR) で描画を共用にできないか模索している。

言語は zig を使うことは決定していて、先日 [0.15.1](https://ziglang.org/download/0.15.1/release-notes.html) が Release された。
なので、 `c` (のABI) は大いに使うのだが `c++` 要素はなるべくさけようとしている( zig cc のクロスビルドでトラブルになりやすい)。

GPU API は vulkan を採用することでいけそうと目途がついていた。
OpenGLと比べてビルドは簡単、ソースコードは大変。
描画を vulkan で GPU との接続を Windows11 上の glfw 、Android の NativeActivity さらに、
Windows11 上の OpenXR と Android 上の OpenXR 、Linux の OpenXR (WiVRn) でビルドと実行ができた。

ついでにWASM にも同じシーンを展開できるようにしたい。 vulkan には web api は無いので WebGpu でできるか試していたのだけど、統合するのは難しそうだった。ラップするのに手間が増えすぎる。

ここで GPU API をラップする [sokol](https://floooh.github.io/sokol-html5/) を思い出し、
sokol なら WASM が確実にできるので、 OpenXR から sokol を使う路線を検討。
OpenXR の backend に sokol を使って、 sokol の backend は d3d11 や OpenGLES にする。
vulkan を使うことは諦める。

## cross platform

どうも platform は OS レベルでは無くて、
`OS + WindowSystem + GPU API` で切り分けるのがよさそうだ。
ソースレベルの依存性などのビルドの都合を考慮すると以下のように組み合わせの問題になる。

| os            | window system            | GPU     | note          |
| ------------- | ------------------------ | ------- | ------------- |
| Windows11     | sokol-app                | d3d11   | sokol default |
| Windows11     | glfw                     | OpenGL4 |               |
| Windows11     | glfw                     | vulkan  |               |
| Windows11     | OpenXR                   | OpenGL4 |               |
| Windows11     | OpenXR                   | d3d11   |               |
| android       | NativeActivity           | gles3   |               |
| android       | NativeActivity           | vulkan  |               |
| android       | NativeActivity sokol-app | gles3   |               |
| Quest3        | NativeActivity OpenXR    | gles3   |               |
| Quest3        | NativeActivity OpenXR    | vulkan  |               |
| WASM          | sokol-app                | webgl   |               |
| Linux wayland | OpenXR                   |         | WiVRn         |

OpenXR は WindowSystem レイヤーなのだ。
これに真面目に対応しようとすると、window-system と gpu の組み合わせに対応する必要が出てくる。
実際に openxr-sdk-source の hello_xr では、Platform(windows, linux, android, osx) `X` Graphics(d3d11, d3d12, opengl, opengles, vulkan, metal) という組み合わせに対応する設計になっている。
ビルド時に Platform を分岐して、Runtime に Graphics を分岐する。

https://github.com/KhronosGroup/OpenXR-SDK-Source/tree/main/src/tests/hello_xr

で、以下のように GPU を sokol 一種類にまとめることで、ほどほどの手間でクロスプラットフォームできようというわけです。

| os        | window system            | GPU API | note |
| --------- | ------------------------ | ------- | ---- |
| Windows11 | sokol-app                | sokol   |      |
| Windows11 | glfw                     | sokol   |      |
| Windows11 | OpenXR                   | sokol   |      |
| android   | NativeActivity           | sokol   |      |
| android   | NativeActivity sokol-app | sokol   |      |
| Quest3    | NativeActivity OpenXR    | sokol   |      |
| WASM      | sokol-app                | sokol   |      |

## sokol-xr

hello_xr をベースに WindowsDesktop(quest link) と Android(apk) で、
同じ sokol レンダラーを動かす実験中。

https://github.com/ousttrue/sokol-xr
