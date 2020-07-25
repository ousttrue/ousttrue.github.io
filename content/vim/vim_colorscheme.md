---
Title: Vimのカラースキーム
date: 2019-08-25
Tags: ["vim"]
---

## カッコのハイライト

カーソル下の反対側のカッコが派手過ぎて気が散る。

* https://vim-jp.org/vimdoc-ja/pi_paren.html
* [Vimで括弧の反対側のハイライトを調節する](https://qiita.com/mochizukikotaro/items/7829ab32e0353d49c185)

```vim
hi MatchParen ctermbg=239
```

両方の色を指定できるとよかったのだけど、反対側のカッコの色を `MatchParen` で指定してカーソルの下をそれの反転色にする様子。
ほどほどにグレーで暗い色にして、カーソルがほぼ白になるようにした。

## 参考

* [https://thinca.hatenablog.com/entry/I_expect_to_colorscheme]()
* [Vim のカラースキームが微妙に気に食わないときの対処法](http://cohama.hateblo.jp/entry/2013/08/11/020849)
