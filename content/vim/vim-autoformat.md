+++
date = 2019-04-21T13:00:17+09:00
taxonomies.tags = ['nvim']
draft = true
+++

# vim-autoformat を使う

当初 `python` 向けに `mindriot101/vim-yapf` を使っていたが、
全部まとめて `hiel92/vim-autoformat` で設定してみる。

https://github.com/Chiel92/vim-autoformat

プラグインを設定したら特に個別に設定することなく、
システムにインストール済みの、

`yapf`, `clang-format` が有効になった？

便利。

## Tomlのフォーマットがよろしくなかったり

dein.tomlのindentが悪くなってしまった😑

自動実行は、時期尚早。
大丈夫そうなやつから拡張子指定した方がよさそう。

```vim
autocmd BufWrite *.py :Autoformat
```

## dのフォーマッターとか

```vim
let g:formatdef_my_custom_d = '"dub run -q dfmt -- -i"'
let g:formatters_d = ['my_custom_d']
```

