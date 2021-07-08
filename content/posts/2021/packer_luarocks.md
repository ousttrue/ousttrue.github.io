+++
title = "packer から luarocks を使う"
date = 2021-07-08
taxonomies.tags = ["nvim", "lua"]
+++

nvim のパッケージマネージャー packer に、 luarocks のモジュール機能があるのだが Windows hererocks が失敗する。
Linux は、 hererocks はできるがモジュールがロードできぬ。
問題の少ない Linux から調べていく。

## Linux

packer 設定で lua モジュール設定を記述すると、 `hererocks` を用いて luarocks が `~/.config/nvim/hererocks` にセットアップされることは分かった。

```lua
-- packer で lua の penlight モジュールをインストール
use_rocks "penlight" 
```

しかし、

```lua
require "penlight"
```

がエラーになる。
`package.path` に luarocks が無くてうまくいかないぽい？

