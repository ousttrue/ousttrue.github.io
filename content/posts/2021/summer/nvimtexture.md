+++
title = "NvimTexture開発開始"
date = 2021-08-22
taxonomies.tags = ["nvim", "msgpack"]
+++

`Nvy` の改造をしてだいたい構造を理解した。
[msgpack-rpc-asio](https://github.com/ousttrue/msgpack-rpc-asio) をオーバーホールして使えるようになった。
ということで一から組みなおすで。

<https://github.com/ousttrue/NvimTexture>

# 部品を疎結合にする

* Window(HWND, resize, keyboard, mouse event)
* NvimPipe(stdin, stdout, msgpack-rpc transport)
* EventDispatcher(WindowEvent と MsgPackRPCMessage の処理)
* D3D DeviceManager
* D3D Renderer(RenderTarget)

```
            +--------+
+----+ pipe |Renderer|redraw
|nvim|----->+--------+
|    |<-----+------+
+----+      |Window|resize, keyboard, mouse event
            +------+
```

* MainLoop
* NvimMsgPackRPC Read-Dispatch Loop
* RenderLoop(30FPS)

# Sample

* FullWindow
* imgui と混在させる
