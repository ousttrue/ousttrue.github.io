---
date: 2023-10-02
tags:
  - lua
title: luarocks やってみる
---

luaをモジュールをプロジェクト単位で管理したくなったので、方法を調べる。

## luarocks

フォルダを初期化。

```lua
$ luarocks init
```

`.gitignore` と `rockspec` が出てきた。
`.rockspec` にリネームしておいた。

```sh
$ luarocks
```

としてみるとシステムとプロジェクトローカルの両方のモジュールを参照している様子。
プロジェクトローカルオンリーにしたいわね。

https://github.com/luarocks/luarocks/wiki/Project:-LuaRocks-per-project-workflow

TODO...

