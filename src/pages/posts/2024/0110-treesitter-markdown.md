---
title: "markdown の codeblock の色を変える"
date: 2024-01-10
tags: ["nvim", "treesitter", "markdown"]
---

# headlines

https://github.com/lukas-reineke/headlines.nvim

でできる。
ちょっとカスタマイズして '```' 行を外すと見やすくなった。

```lua
require("headlines").setup {
  markdown = {
    query = vim.treesitter.parse_query(
      "markdown",
      [[
          (code_fence_content) @codeblock
      ]]
    ),
    headline_highlights = false,
  },
}
```

# inline block も追加

難航した。

inline 要素は別言語扱い。

`:TSEditQueryUserAfter highlights markdown_inline`
`~/.config/nvim/after/queries/markdown_inline/highlights.scm`

に記述する必要があった。
headlines の `@codeblock` と同じにしたかったがわからず。
`@text.underline` でお茶を濁す。

```scheme
;; extends
(inline
  (code_span) @text.underline)
```

# front-matter

https://github.com/nvim-treesitter/nvim-treesitter/blob/master/queries/markdown/injections.scm

treesitter の `yaml` がコンパイルされていなかった。
