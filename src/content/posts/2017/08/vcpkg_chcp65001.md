---
title: "vcpkgでchcp 65001が必要な件"
date: 2017-08-31
tags: ['vcpkg']
---

うちの環境では必要。非英語Windowsで散見される。わしも、ロシア？の人の書き込みで分かった。

`buildtrees/XXX/config-x86-windows-rel-err.log` に以下のような `rules.ninja` を含むメッセージが見つかった場合はこれ。

```shell
CMake Error at D:/vcpkg/downloads/cmake-3.9.0-win32-x86/share/cmake-3.9/Modules/CMakeTestCCompiler.cmake:51 (message):
  The C compiler "C:/Program Files (x86)/Microsoft Visual
  Studio/2017/Community/VC/Tools/MSVC/14.10.25017/bin/HostX64/x86/cl.exe" is
  not able to compile a simple test program.

  It fails with the following output:

   Change Dir: D:/vcpkg/buildtrees/opensubdiv/x86-windows-rel/CMakeFiles/CMakeTmp

  

  Run Build Command:"D:/vcpkg/downloads/tools/ninja/ninja-1.7.2/ninja.exe"
  "cmTC_f5b9f"

  ninja: error: build.ninja:30: loading 'rules.ninja':
  指定されたファイルが見つかりません。



  


  include rules.ninja



                     ^ near here


  

  

  CMake will not be able to correctly generate this project.
Call Stack (most recent call first):
  CMakeLists.txt:25 (project)
```

対処法はプロンプトの文字コードをutf-8にすること。

`> chcp 65001`
