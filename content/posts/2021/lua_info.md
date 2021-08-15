+++
title = "luaメモ"
date = 2021-07-27
updated = 2021-08-15
taxonomies.tags = ["lua", "luajit", "lsp", "dap"]
[extra]
image = "./lua.png"
+++

<https://www.lua.org/docs.html>

# Interpreter

とりあえず `luajit-2.1.0-beta3` 推し。

```
+---+    +---+    +---+    +---+
|5.1| -> |5.2| -> |5.3| -> |5.4|
+---+    +---+    +---+    +---+
  |        |        |
  |        |        +- ravi
  |        |
  |        +- moonsharp
  |
  +- luajit(5.1 base)
  |   +- moonjit
  +- luau(5.1 base)
```

`lua-5.1` をベースに分岐したものが多い？

<https://www.lua.org/versions.html>

|        | url                                                                | memo                                                                    |
|--------|--------------------------------------------------------------------|-------------------------------------------------------------------------|
| Lua5.1 |                                                                    | 2012。これより古いものを使う理由は無さそう。                            |
| Lu15.2 | [since Lua5.1](https://www.lua.org/manual/5.2/readme.html#changes) | 2015。finalizer. 関数の `_ENV` 仕様変更                                 |
| Lua5.3 | [since Lua5.2](https://www.lua.org/manual/5.3/readme.html#changes) | 2020。integers                                                          |
| Lua5.4 | [since Lua5.3](https://www.lua.org/manual/5.4/readme.html#changes) | 2021。const, to-be-closed                                               |
| LuaJIT | <https://luajit.org/>                                              | Lua5.1base。最終版は `2.1.0-beta3`。neovimもこれ。`FFI` も強力。        |
| Luau   | <https://luau-lang.org/>                                           | Lua5.1 の superset。Roblox専用。オープンソースではない。                |
| Ravi   | <http://ravilang.github.io/>                                       | Lua5.3base？。limited optional static typing and MIR based JIT compiler |

## 変わり種

LUA に更に埋め込む

* <https://terralang.org/>

# Translator

## [MoonScript](https://moonscript.org/)
## [TypescriptToLua](https://typescripttolua.github.io/)

* 後で出てくる、`local-lua-debugger` はこれで実装されているぽい。

## [LuneScript/](https://ifritjp.github.io/documents/lunescript/)

## [Teal](https://github.com/teal-language/tl)

# Language server

## [EmmyLua](https://github.com/EmmyLua/EmmyLua-LanguageServer)

* Java製
* [EmmyLua Annotation](https://emmylua.github.io/annotation.html) に対応。これにより、組み込み型のインテリセンスを動作させることができて使い勝手が向上する

## [lua-language-server](https://github.com/sumneko/lua-language-server)

* ⭐ [EmmyLua Annotation](https://emmylua.github.io/annotation.html) に対応。これにより、組み込み型のインテリセンスを動作させることができて使い勝手が向上する

設定例

```json
    "Lua.runtime.version": "LuaJIT",
    "Lua.workspace.preloadFileSize": 10000,
    "Lua.runtime.path": [
        "?.lua",
        "?/init.lua",
        "?/?.lua",
    ],
```

## [lua-lsp](https://github.com/Alloyed/lua-lsp)

# Debug adapter


## [local-lua-debugger-vscode](https://github.com/tomblind/local-lua-debugger-vscode)

* Debugされるスクリプト側に仕込み不要
* ⭐ luajit 対応
* __tostring でエラーが発生すると固まるので、__tostring の実装で例外が起きないように注意
* 起動時の引数に `\\` が含まれているとエラーになる => `0.2.2` で修正

## [lua-debug](https://github.com/actboy168/lua-debug)

* Debugされるスクリプト側に仕込み不要
* hook が拡張してある。途中で止めたりとかできるぽい
* 残念ながら luajit では動作しない

# Formatter

## [stylua](https://github.com/johnnymorganz/stylua)

* ⭐ rust 製でインストールしやすい

# C-API

```c
 // parse
 luaL_loadstring(L, script);
 // run
 lua_pcall(L, 0, LUA_MULTRET, 0);
```

* [lua执行字节码的过程介绍](https://www.cnblogs.com/zxh1210603696/p/4479945.html)
* [Lua源码剖析（一）](http://airtrack.me/posts/2012/07/19/Lua%E6%BA%90%E7%A0%81%E5%89%96%E6%9E%90%EF%BC%88%E4%B8%80%EF%BC%89/)

# ソース読み


* [The Evolution of Lua](https://www.cs.tufts.edu/comp/250RTS/archive/roberto-ierusalimschy/lua-hopl-iii.pdf)
* [The Implementation of Lua 5.0](http://www.lua.org/doc/jucs05.pdf)
* [Luaソース読みメモ1](https://sites.google.com/site/aotokage52/home/lua/luasosu-dumimemo1)
* [Luaソースコード読みはじめる](https://blog.masu-mi.me/post/2013/08/31/practice_lua/)
* [ひとり勉強会 LUA 目次](https://hzkr.hatenablog.com/entries/1900/01/03)
* <https://the-ravi-programming-language.readthedocs.io/en/latest/lua-parser.html>

## LuaVM, OpCode, Operand
* [12 分くらいで知るLuaVM](https://www.slideshare.net/Isoparametric/12-luavm)
* [Luaのコード生成](https://sites.google.com/site/safxdev/lua_codegen)
