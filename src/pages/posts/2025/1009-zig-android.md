---
title: zig で android apk をビルドする

date: 2025-10-09
tags: [zig, anroid]
---

## 先人

- `zig-0.14` https://github.com/vkensou/zig-android-sdk

## sokol-zig を android と合体する

https://github.com/floooh/sokol-zig/blob/master/src/sokol/app.zig

> NOTE: SOKOL_NO_ENTRY and sapp_run() is currently not supported on Android.

どうなんだろう。

動きそうなプロジェクトを捜索・・・

- https://gustavolsson.com/projects/sokol-android/
- `zig-0.14` https://github.com/geooot/zig-sokol-crossplatform-starter

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

以下のように addSystemIncludePath x 2 と addLibraryPath 、さらに setLibCFile することで
zig に libc が含まれるない target (aarch64-linux-android とか) もビルドできる。

```zig
    const libc_file = try ndk.LibCFile.make(b, ndk_path, target, API_LEVEL);
    // for compile
    lib.addSystemIncludePath(.{ .cwd_relative = libc_file.include_dir });
    lib.addSystemIncludePath(.{ .cwd_relative = libc_file.sys_include_dir });
    // for link
    lib.setLibCFile(libc_file.path);
    lib.addLibraryPath(.{ .cwd_relative = libc_file.crt_dir });

    lib.linkSystemLibrary("android");
    lib.linkSystemLibrary("log");
```

NDK による so の build と、SDK による apk 構成を把握した。

## 作った

- `zig-0.15.1` https://github.com/ousttrue/zbk
    - https://github.com/ousttrue/zbk/tree/master/examples/sokol_cube
