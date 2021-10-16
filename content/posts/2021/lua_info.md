+++
title = "luaメモ"
date = 2021-07-27
updated = 2021-08-15
tags = ["lua", "luajit", "lsp", "dap"]
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

`headeronly`. include するだけで使える。

* <https://github.com/edubart/minilua>

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

stylua.toml
```toml
column_width = 120
line_endings = "Unix"
indent_type = "Spaces"
indent_width = 4
quote_style = "AutoPreferDouble"
no_call_parentheses = true
```

# ソース読み

<https://ousttrue.github.io/lua/>

