+++
title = "lua情報"
date = 2021-07-27
taxonomies.tags = ["lua"]
+++

# Interpreter

とりあえず `luajit-2.1.0-beta3` 推し。

```
+---+    +---+    +---+    +---+
|5.1| -> |5.2| -> |5.3| -> |5.4|
+---+    +---+    +---+    +---+
  |
  +- luajit(5.1 base)
  |   +- moonjit
  +- luau(5.1 base)
```

`lua-5.1` をベースに分岐したものが多い？

<https://www.lua.org/versions.html>

|        | url                                                                 | memo                                                                                    |
|--------|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Lua5.1 |                                                                     | 2012。これより古いものを使う理由は無さそう。                                            |
| Lu15.2 | [since Lua 5.1](https://www.lua.org/manual/5.2/readme.html#changes) | 2015。finalizer                                                                         |
| Lua5.3 | [since Lua 5.2](https://www.lua.org/manual/5.3/readme.html#changes) | 2020。integers                                                                          |
| Lua5.4 | [since Lua 5.3](https://www.lua.org/manual/5.4/readme.html#changes) | 2021。const, to-be-closed                                                               |
| LuaJIT | <https://luajit.org/>                                               | 最終版は `2.1.0-beta3`。`FFI` が強力。拡張書式の `LL` に対応している formatter を探索中 |
| Luau   | <https://luau-lang.org/>                                            | lua-5.1 の superset。型ヒントなどを拡張                                                 |

# Translator

* <https://typescripttolua.github.io/>
* <https://ifritjp.github.io/documents/lunescript/>
* <https://github.com/teal-language/tl>

# Language server

# Debug adapter

# Formatter
