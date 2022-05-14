+++
title = "nvim frontend nvy"
date = 2021-08-07
updated = 2021-08-29
tags = ["nvim", "msgpack"]
previewimage = "nvy.jpg"
+++

よさげなレポジトリを発見した。

<https://github.com/RMichelsen/Nvy>

だいぶ前に作ろうとして頓挫した

<https://github.com/ousttrue/nvim-dx>

の完成形。
どこがうまくいかなかったのか忘れてしまったが。

## 改造

<https://github.com/ousttrue/Nvy>

* [ ] RenderTarget に対して Nvim をレンダリングする
* [x] nvim の IO を <https://think-async.com/Asio/#> にのせる
* [ ] imgui と合体する

# 20210815

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

# 20210829

* [x] MsgPack-RPC のバックエンドを置きかえた
* [x] logger に RPC の内容を JSON 化して表示

だいたいリファクタリングが終わって改造しやすい状態になった。

* [x] `<C-/>` できるようにする。

を実装できた。
特定の VK が来たときに nvim のキーに変換するテーブルがあるので追加した。

```cpp
  case VK_OEM_2:
    return "";
```

`[2,"nvim_input",["<C-/>"]]` が送信される。

## 修正が必要

非control時に

`[2,"nvim_input",["</>"]]` が送信される。

```cpp
  case VK_OEM_2:
    if (GetKeyState(VK_CONTROL) < 0) {
      // C-/
      return "/";
    }
```

なるほど。

[NvimTexture](@/posts/2021/summer/nvimtexture.md) へ続く

# 20210829  太字がずれる？

