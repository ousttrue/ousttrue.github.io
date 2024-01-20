---
title: nvim の syntax highlight
date: 2024-01-20
tags: [nvim, treesitter]
---

colorscheme の自作に手を出したのだけど、
設定項目が多すぎて正攻法は断念した。

既存の colorscheme を改造する方向にしたのだけど、
syntax の highlight group を全消ししてから、
再構築するという手法を考えた。
下記のように文法に関するものだけ treesitter を基準に着色しようというわけです。

```lua
local function hl_clear(name)
  vim.api.nvim_set_hl(0, name, {})
end

function clear_syntax_link()
  hl_clear "Statement"
  hl_clear "Special"
  hl_clear "Identifier"
  hl_clear "String"
  hl_clear "Function"
  hl_clear "PreProc"
  hl_clear "Conditional"
  hl_clear "Keyword"
  hl_clear "Type"
  hl_clear "Constant"
  hl_clear "Operator"
end
```

これで `habamax` はbufferの中身は真っ白になります。
一方で、 filer や statusline, tabbar, winbar や search の highlight など
ユーザーインタフェース系の色は残ります。

文法に基づいて、`keyword`, `literal`, `identifier` くらいに分類して、
シンプルに色付けするとわりと具合がいい。

追加して `hlargs` が入るといい感じに。

あとは、 json/yaml, markdown, css, html/xml/jsx というふうに
treesitter に直接色付けしていく方向でいいのではないか。

`:Inspect` でカーソル下の treesitter 判定を見ながら決めてゆく。
必要に応じて lsp の semantic token 対応もピンポイントでやると見易いかもしれない。

## treesitter で着色する plugin

- https://github.com/m-demare/hlargs.nvim
- https://github.com/lukas-reineke/headlines.nvim

