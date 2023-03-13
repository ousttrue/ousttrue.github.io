---
date: 2021-07-29
extra: {}
tags:
- lua
title: luv
---

main loop がブロックするので luv を取り入れてみる。

https://github.com/luvit/luv

# cmake で build

luv に CMake が付属しており簡単。

```
$ cmake -S {LUV_DIR} -B {BUILD_DIR}
$ cmake --build {BUILD_DIR} --config Release
```

# main loop を idle へ

```lua
-- Main loop
while app:new_frame() do
    gui:update()
    app:render(gui.clear_color)
end
```

```lua
local uv = require("luv")

-- Main loop
local idle = uv.new_idle()
idle:start(function()
    if not app:new_frame() then
        idle:stop()
    end
    gui:update()
    app:render(gui.clear_color)
end)

uv.run("default")
```

# 重い処理を thread へ

```lua
    local ctx = uv.new_work(
        on_thread, --work,in threadpool
        on_end --after work, in loop thread
    )
    uv.queue_work(ctx, mp.pack({ ... }))
```

```
Error: thread arg not support type 'table' at 2Error: thread arg not support type table at 1Uncaught Error: attempt to call a nil value
```

あ

# thread 間で受け渡しのできる型

* https://github.com/luvit/luv/blob/master/docs.md#pseudo-types

> threadargs: variable arguments (...) of type nil, boolean, number, string, or userdata

nvim ではそこで messagepack なわけか。

[Kyoto Tycoon+Lua-JIT拡張+MessagePack=無敵](https://tullio.hatenablog.com/entry/20121112/1352732239) 経由で [The state of MessagePack in Lua](https://gist.github.com/catwell/2971290) をたどり着く。

> If you want pure LuaJIT -> luajit-msgpack-pure

たしかに、これだ。

https://github.com/catwell/luajit-msgpack-pure

* Windows なので `malloc`, `free`, `realloc` が cdef できなかったのを修正
* `function` と `cdata` を nil にしてスキップする処理を追加してみた

結果、巨大なテーブルの pack/unpack でブロックしてしまう。
あとスレッド側のエラーハンドリングをしてないので、デバッガはアタッチできないし、何もわからない。
`pcall` などでエラーメッセージを取得して、失敗した場合はエラーメッセージを投げるようにしてあげる必要がある。

なんとなく、使い方はわかった。
後で、アニメーションシステムを実装するときのインフラにも使えるかもしれない。
OpenGL のレンダースレッドと、シーン更新を分離する。

# 関連

* [node.jsを支えるlibuvのチュートリアル"uvbook" :スレッド](https://kimitok.hateblo.jp/entry/2014/04/16/223643)
* https://nikhilm.github.io/uvbook/threads.html
