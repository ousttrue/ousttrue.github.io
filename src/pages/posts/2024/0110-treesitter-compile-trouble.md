---
title: "TreeSitter の svelte がビルド失敗(CP932)"
date: 2024-01-10
tags: ["nvim", "treesitter", "msvc"]
---

日本語Windowsのロケール問題だったー。
たぶん `utf-8` モードにすれば起きない。

```
AppData\Local\nvim-data\tree-sitter-svelte\src\allocator.h(1): warning C4819: The file contains a character that cannot be represented in the current code page (932). Save the file in Unicode format to prevent data loss
```
msvc に `/utf-8` 引数を追加すればなおる。
どうやるか。

https://learn.microsoft.com/ja-jp/cpp/build/reference/cl-environment-variables?view=msvc-170

環境変数 `_CL_=/utf-8` とすることでできた。
`CFLAGS` とか `CXXFLAGS` じゃないのね。知らなかった。

