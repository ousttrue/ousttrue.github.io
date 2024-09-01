---
title: tree-sitter の heredoc_end エラーにはまる
date: 2024-01-19
tags: [nvim, treesitter]
---

Linux で neovim をソースビルドしたところ、
tree-sitter のエラーになって悩む。

```txt
Query error. Invalid node type "heredoc_end.
```

発生するとキー入力のたびにエラーメッセージが表示されて、
何もできなくなる。

原因は、`~/local/lib/nvim/parser` にインストールされる treesitter の parser 群がバージョン不整合？を起こしていることぽい。`TSInstall` する前から`cmake build` で prebuilt されるものが、どうも良くないらしい。

https://github.com/nvim-treesitter/nvim-treesitter/issues/3092

```vim
:echo nvim_get_runtime_file('*/bash.so', v:true)
# これは windows 版なので状況が違う
[
'%LOCALAPPDATA%\nvim-data\lazy\nvim-treesitter\parser\bash.so', 
'%LOCALAPPDATA%\Temp\nvim\treesitter\parser\bash.so'
]
```

ぜんぶ消してから `:TSInstall! bash` すればいいと思う。

## 再度はまる

どうも3箇所チェックするところがあるぽい。

- %NVIM_INSTALL%/lib/nvim/parer 👈 cmake install
- %HOME%/.local/share/nvim/lazy/nvim-treesitter/parser 👈 lazy treesitter install
- %HOME%/.cache/nvim/treesitter/parser 👈 local TSInstall

ぜんぶ消して TSInstall から出直すと直るかもしれない。
