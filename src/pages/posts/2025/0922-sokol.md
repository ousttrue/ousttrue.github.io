---
title: zig で desktop - android - wasm 横断

date: 2025-09-22
tags: [sokol, zig, wasm]
---

3D プログラミングで desktop(glfw), android(OpenXR) で共用にできないか模索しておったのだが、
vulkan を採用することでいけそうと目途がついていた。
engine 部分を vulkan で GPU との接続を Windows11 上の glfw 、Android の NativeActivity さらに、
Windows11 上の OpenXR と Android 上の OpenXR 、Linux の OpenXR (WiVRn) でビルドと実行ができた。

WASM にも同じシーンを展開できるようにしたいと思って、 vulkan は無いので WebGpu できるか試していたのだけど、
glfw, android と統合するのは困難とわかった。

ここで [sokol](https://floooh.github.io/sokol-html5/) を思い出し、
sokol なら WASM が確実にできるので、 sokol と OpenXR を合体する路線を検討。
OpenXR の backend に vulkan を使うことを諦めて OpenGLES とか使えば行けるじゃんと思った。

次は、 sokol on android を試そう。

https://gustavolsson.com/projects/sokol-android/

然る後に、 sokol on Quest3 を試す。
うまくいけば、

| platform  | window system         | GPU   | note                                 |
| --------- | --------------------- | ----- | ------------------------------------ |
| Windows11 | sapp (sokol-app)      | d3d   | 既(default)                          |
| Windows11 | glfw                  | d3d   | 既                                   |
| android   | NativeActivity        | gles  | TODO:                                |
| Quest     | NativeActivity OpenXR | gles  | WIP: zig + android + gles までできた |
| WASM      | sapp(sokol-app)       | webgl | 既                                   |

言語は zig を使うことは決定していて、先日 [0.15.0](https://ziglang.org/download/0.15.1/release-notes.html) が Release された。
これで シーン管理 を作る。

## sokol-zig

[sokol-zig の練習](https://ousttrue.github.io/zig-sokol-sample/)

zig-0.15 に続いて sokol にも breaking change が来ていたのである。

https://floooh.github.io/2025/08/17/sokol-gfx-view-update.html

## hello_xr を zig に移植する

Desktop と Android で動いた。
これを sokol と合体するのが次のステップ。

## sokol-zig を android と合体する

https://github.com/floooh/sokol-zig/blob/master/src/sokol/app.zig

> NOTE: SOKOL_NO_ENTRY and sapp_run() is currently not supported on Android.

どうなんだろう。

- `0.14` https://github.com/geooot/zig-sokol-crossplatform-starter
- `0.14` https://github.com/vkensou/zig-android-sdk

動きそうなプロジェクトを捜索・・・

## ndk utility を整備

https://github.com/silbinarywolf/zig-android-sdk

でだいたい目的は達せられるのだけど、 apk を作るを ndk による so のビルドと、
それと AndroidManifest.xml や resource を構成して apk にまとめる機能の２つに分けたい。

ndk を作るところは emscripten ビルドする場合にも似たことをする。

|            | target                | linker | libc |
| ---------- | --------------------- | ------ | ---- |
| ndk        | aarch64-linux-android | zig    | sdk  |
| emscripten | wasm32-emscripten     | sdk    | sdk  |

共に zig ではなく sdk が所有する libc を使うことが必要で、
そのために sysroot を操作する工程が必要となる。
emscripten は emsdk のリンカーを使うので sysroot への include だけサポートすればよい。
ndk は zig でリンクするので、ndk の build 済みの libc を指定してやる。
`aarch64-linux-android` や `wasm32-emscripten` の libc は zig に含まれていないので、
`#include <string.h>` ですら sysroot を手当しないとビルドすることができないのである。
