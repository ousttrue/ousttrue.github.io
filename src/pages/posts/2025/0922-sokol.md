---
title: zig で desktop - android - wasm 兼用

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

| platform  | window system         | sokol backend |
| --------- | --------------------- | ------------- |
| Windows11 | glfw                  | d3d           |
| android   | NativeActivity        | gles          |
| Quest     | NativeActivity OpenXR | gles          |
| WASM      | sokol-app             | gles          |

言語は zig を使うことは決定していて、先日 [0.15.0](https://ziglang.org/download/0.15.1/release-notes.html) が Release された。
これで シーン管理 を作る。

## sokol-zig 

[sokol-zig の練習](https://ousttrue.github.io/zig-sokol-sample/)

zig-0.15 に続いて sokol にも breaking change が来ていたのである。

https://floooh.github.io/2025/08/17/sokol-gfx-view-update.html
