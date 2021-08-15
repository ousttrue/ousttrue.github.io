+++
title = "nvim frontend nvy"
date = 2021-08-07
updated = 2021-08-15
taxonomies.tags = ["nvim"]
[extra]
image = "nvy.jpg"
+++

よさげなレポジトリを発見した。

<https://github.com/RMichelsen/Nvy>

だいぶ前に作ろうとして頓挫した

<https://github.com/ousttrue/nvim-dx>

の完成形。
どこがうまくいかなかったのか忘れてしまったが。

## 改造

<https://github.com/ousttrue/Nvy>

* [ ] `<C-/>` できるようにする
* [x] logger
* [ ] RenderTarget に対して Nvim をレンダリングする
* [ ] nvim の IO を <https://think-async.com/Asio/#> にのせる
* [ ] imgui と合体する

## 20210815

MsgPack-RPC のバックエンドに昔作った

<https://github.com/ousttrue/msgpack-rpc-asio>

におきかえる。

さらに、これのシリアライザーを自前の <https://github.com/ousttrue/msgpackpp> におきかえる。

* CMake 化
* RPC を `c++20` 化 (co_await)

で、最初の nvim 初期化を

```c++
auto api_info = co_await rpc.request("nvim_get_api_info");
rpc.notity("nvim_set_var", "nvy", 1);
auto path = co_await rpc.request("nvim_eval","stdpath('config')");

// initialize

rpc.notify("nvim_ui_attach");

rpc.on_message(&dispatcher);
```

のように書けるようにして整理する。
