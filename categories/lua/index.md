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

https://www.lua.org/versions.html

|        | url                                                                | memo                                                                    |
|--------|--------------------------------------------------------------------|-------------------------------------------------------------------------|
| Lua5.1 |                                                                    | 2012。これより古いものを使う理由は無さそう。                            |
| Lu15.2 | [since Lua5.1](https://www.lua.org/manual/5.2/readme.html#changes) | 2015。finalizer. 関数の `_ENV` 仕様変更                                 |
| Lua5.3 | [since Lua5.2](https://www.lua.org/manual/5.3/readme.html#changes) | 2020。integers                                                          |
| Lua5.4 | [since Lua5.3](https://www.lua.org/manual/5.4/readme.html#changes) | 2021。const, to-be-closed                                               |
| LuaJIT | https://luajit.org/                                              | Lua5.1base。最終版は `2.1.0-beta3`。neovimもこれ。`FFI` も強力。        |
| Luau   | https://luau-lang.org/                                           | Lua5.1 の superset。Roblox。オープンソース。                |
| Ravi   | http://ravilang.github.io/                                       | Lua5.3base？。limited optional static typing and MIR based JIT compiler |

