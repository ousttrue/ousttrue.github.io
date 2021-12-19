+++
title = "lua による imgui 計画"
date = 2021-07-17
tags = ["lua", "imgui"]
+++

## rust で D3D11 レンダラを進めてきたが・・・

当初 `rust` で `d3d11` のレンダラーを作ろうとして作業を進めていた。
`imgui` を組み込んで、 `glTF` をロードして `unlit` で描画するところまで作ったが、
`GUI` の作りこみが大変そうな感じだった。
`rust` は関数オーバーロードが無いので　`imgui` のラッパーの使い勝手が `c++` より落ちるなど。
ポインターを渡せるのは素敵なのだが。

## nvim-0.5 はおもしろい

ここで寄り道して、 `nvim` をいじり始めた。
ちょうどバージョン `0.5` がリリースされるタイミングで、`0.5` になると lua サポートが強化されて、設定が lua で書けるとのこと。

* [NeovimとLua](https://zenn.dev/hituzi_no_sippo/articles/871c06cdbc45b53181e3)

ということで Windows 向けのソースからのビルドシステムを作って `nvim` 環境を整備してみた。
lua で記述された plugin をなるべく採用。

<https://github.com/ousttrue/my_nvim>

最近常用していた、 `vscode` の便利さにどこまで追いつけるか。

* Language Server Protocol。nvim-0.5 から nvim-lsp (luaで書いてある) がある。組み込み
* Debug Adapter Protocol。nvim-0.5 から nvim-dap (lulで書いてある) がある。<https://github.com/mfussenegger/nvim-dap>

vscode から `lsp` と `dap` という重要な資産を持ってこれるので慣れればいけそうである。
調べたところ下記のようだった。

* codelldb(native debugger c++ や rust) は nvim-dap を改造すれば使えた <https://github.com/ousttrue/nvim-dap>
* rust-analyzer 動いた
* python: lsp, dap ともに動きそう
* lua: lsp, dap ともに動きそう
* csharp: lsp, dap ともに動きそう(Unityはうまくいかず)

nvim-lsp も nvim-dap も lua で簡単に記述されているので、コードを読めば、たぶんわかる。
あとは、タスクランナーを整備すれば開発環境に使えそう。

## luarocks の Windows 運用

lua で記述された nvim のパッケージマネージャー <https://github.com/wbthomason/packer.nvim> を採用したのだが、
Windows で luarocks 機能が動かなかった。<https://luarocks.org/> は `lua` のパッケージマネージャー。
ちょっと、古め(vc2017より前)の vc でないとだめぽい。
改造した。

* https://github.com/ousttrue/packer.nvim
* https://github.com/ousttrue/hererocks

hererocks は、luarocks のインストーラー。
`LUA_PATH` `package.path` を理解した。

## スタンドアロンの lua インタプリタによるプロジェクト

luarocks が無事に Windows で運用できるようになったので、プロジェクトローカルに必要なライブラリをインストールして、
スタンドアロンの lua インタープリターを起点にしたアプリ開発ができないか探ってみた。
lua インタプリタがアプリ組み込みだと dap の運用がしづらい(port 開けて attach とかになる)のでスタンドアロンの lua インタープリターを推す。

```
# フォルダ構成
project_root
  + lua(.gitignore) # hererocks でローカルビルドする
  + main.lua
```

これで、 `lsp` と `dap` が利用できれば快適になるのではないか。

### lua の LanguageServer

* <https://marketplace.visualstudio.com/items?itemName=sumneko.lua>
  * <https://github.com/sumneko/lua-language-server>

がしっかり動き、`EmmyLua` の型ヒントを活用できることが分かった。

<https://github.com/neovim/nvim-lspconfig/blob/a21a509417aa530fb7b54020f590fa5ccc67de77/CONFIG.md#sumneko_lua> に例があって、

```lua
require'lspconfig'.sumneko_lua.setup {
  settings = {
    Lua = {
      workspace = {
        -- Make the server aware of Neovim runtime files
        library = {
          [vim.fn.expand('$VIMRUNTIME/lua')] = true, -- lua標準の型定義がある
          [vim.fn.expand('$VIMRUNTIME/lua/vim/lsp')] = true, -- Vimの型定義がある
        },
      },
    },
  },
}
```

インテリセンスが効くし、組み込み関数の型ヒントも追加できる。

### lua の DebugAdapter

DebugAdapter も問題なく動いた。
luajit の場合は対応しているものを使うべし。

#### Lua Debug

* <https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug>
    * <https://github.com/actboy168/lua-debug>

<https://github.com/actboy168/bee.lua> の

* Add error hook (for debugger)
* Add resume/yield hook (for debugger)

謎の機能で実装されているぽい。

#### Local Lua Debugger

* <https://marketplace.visualstudio.com/items?itemName=tomblind.local-lua-debugger-vscode>
  * <https://github.com/tomblind/local-lua-debugger-vscode>

* luajit でも動く
* TypeScriptToLua で書かれている

## lua で 3D

ちょっと試したところ、 luajit の [FFI](https://luajit.org/ext_ffi.html) を使うのが有望そうという感触を得た。
d3d は lua でやっている人があまりいなかった。

* <https://github.com/sonoro1234/LuaJIT-GLFW>
* <https://github.com/sonoro1234/LuaJIT-ImGui>

最新の luajit-2.1.0-beta3(lua-5.1仕様) でいく。

## imgui の ffi

`cimgui` ではなく 素の `imgui` の luajit ffi できるか実験した。

<https://stackoverflow.com/questions/6691651/is-it-possible-to-use-functions-from-c-namespaces-with-luajit-ffi>

```lua
ffi.cdef[[
void Test1_Method1(void) asm("_ZN5Test17Method1Ev");
]]
```

のように mangling に対応すればできそう。

## libclang による コード生成

ということで、 `luajit` + `FFI` を中心に `imgui` ラッパーを作ってレンダラーというか 3D ツールのインフラとなる、
簡単なレンダラーと `Gizmo` に対応したツールキットを作るという方向になってきた。

`imgui` の `luajit` `FFI` の使い勝手が重要。

<https://github.com/ousttrue/limgui>

* [ ] libclang で `imgui.h` をパースして、luajit FFI 生成と `lsp` への EmmyLua アノテーション生成を同時にやるツール。
