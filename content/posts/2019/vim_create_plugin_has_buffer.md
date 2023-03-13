---
date: 2019-04-23 00:13:09+09:00
draft: true
tags:
- vim
title: buffer を持つ vim plugin を作る
---

独自のバッファを持つpluginを作りたい

## BufferList読んでみる
* https://github.com/vim-scripts/bufferlist.vim/blob/master/plugin/bufferlist.vim

273行

この量なら読める。

### インクルードガード

```vim
if exists('g:BufferListLoaded')
  finish
endif
let g:BufferListLoaded = 1
```

### 初期値決め

```vim
" vimrcで先に値を決められるようにしている？
" vimrc より plugin の方が後に実行されるからか？
if !exists('g:BufferListWidth')
  let g:BufferListWidth = 20
endif

if !exists('g:BufferListMaxWidth')
  let g:BufferListMaxWidth = 40
endif
```

### BufferList関数

`__BUFFERLIST__` という Buffer を専用のバッファとして扱う。

```vim
" toggled the buffer list on/off
function! BufferList()
  " if we get called and the list is open --> close it
  if bufexists(bufnr("__BUFFERLIST__"))
    " 既に開いていたら閉じる
    exec ':' . bufnr("__BUFFERLIST__") . 'bwipeout'
    return
  endif
```

`bufnr` でバッファ名からバッファ番号を得て、`bufexists` で存在を確認する。
`bufnr` には特別な名前を指定出来て以下のような効果があるようだ。

```vim
  let l:bufcount = bufnr('$')
  let l:activebuf = bufnr('')
```

#### バッファを作る

作ったバッファがアクティブになり、以降の操作対象になる。

``` vim
  " now, create the buffer & set it up
  exec 'silent! ' . l:width . 'vne __BUFFERLIST__'
```

#### 色決め

```vim
  " set up syntax highlighting
  if has("syntax")
    syn clear
    syn match BufferNormal /  .*/
    syn match BufferSelected /> .*/hs=s+1
    hi def BufferNormal ctermfg=black ctermbg=white
    hi def BufferSelected ctermfg=white ctermbg=black
  endif
```

#### Buffer構築

`setlocal nomodifiable` で編集不可に

```vim
  setlocal modifiable
  if l:displayedbufs > 0
    " input the buffer list, delete the trailing newline, & fill with blank lines
    put! =l:buflist
    " is there any way to NOT delete into a register? bummer...
    "norm Gdd$
    norm GkJ
    while winheight(0) > line(".")
      put =l:fill
    endwhile
  else
    let l:i = 0 | while l:i < winheight(0) | let l:i = l:i + 1
      put! =l:fill
    endwhile
    norm 0
  endif
  setlocal nomodifiable
```

#### 操作を設定

バッファローカルに `map` を設定する。
`map` がキーボード・マウス入力へのコールバック設定になっているのか。なるほど。

```vim
  " set up the keymap
  noremap <silent> <buffer> <CR> :call LoadBuffer()<CR>
  map <silent> <buffer> q :bwipeout<CR> 
  map <silent> <buffer> j :call BufferListMove("down")<CR>
  map <silent> <buffer> k :call BufferListMove("up")<CR>
  map <silent> <buffer> d :call BufferListDeleteBuffer()<CR>
  map <silent> <buffer> <MouseDown> :call BufferListMove("up")<CR>
  map <silent> <buffer> <MouseUp> :call BufferListMove("down")<CR>
  map <silent> <buffer> <LeftDrag> <Nop>
  map <silent> <buffer> <LeftRelease> :call BufferListMove("mouse")<CR>
  map <silent> <buffer> <2-LeftMouse> :call BufferListMove("mouse")<CR>
    \:call LoadBuffer()<CR>
  map <silent> <buffer> <Down> j
  map <silent> <buffer> <Up> k
```

左右への動きを封じてある

```vim
  map <buffer> h <Nop>
  map <buffer> l <Nop>
  map <buffer> <Left> <Nop>
  map <buffer> <Right> <Nop>
```

その他編集系の機能を封じる

```vim
  map <buffer> i <Nop>
  map <buffer> a <Nop>
  map <buffer> I <Nop>
  map <buffer> A <Nop>
  map <buffer> o <Nop>
  map <buffer> O <Nop>
```

移動

```
  map <silent> <buffer> <Home> :call BufferListMove(1)<CR>
  map <silent> <buffer> <End> :call BufferListMove(line("$"))<CR>
```

## 情報収集

`:set nomodifiable` で調べてみた

* http://tyru.hatenablog.com/entry/20101107/modifiable_and_readonly
* https://vimconf.org/2018/slides/Effective_Modern_Vim_scripting_at_vimconf2018_for_PDF.pdf
* https://vi.stackexchange.com/questions/17140/how-to-create-a-buffer-like-a-fugitive-temporary-buffer

`:set buftype=nofile` が出てきた

* ['nobuflisted' なバッファの作り方](http://leafcage.hateblo.jp/entry/2013/11/21/083830)
* https://vi.stackexchange.com/questions/14832/how-to-create-a-buffer-with-customized-behavior-how-to-create-a-buffer-that-a
* http://learnvimscriptthehardway.stevelosh.com/

## NERDTree解読

### 左側にどうやって `split` して開くのか
### ファイルを選択して開くとき開き先をどうやって決めるのか

## pythonに移植できんやろか

つまり、Pythonでvimから見える関数を定義できれば勝つるのでは。

* http://candidtim.github.io/vim/2017/08/11/write-vim-plugin-in-python.html

`vim.eval` とかあるな・・・。いけるのでは？

慣れたら全部 `vim script` で書くようになりそうだけど、練習に移植してみよか。

nvimで、

`:py3 import sys; print(sys.version)`

としたら

`3.6.8 (tags/v3.6.8:3c6b436a57, Dec 23 2018, 23:31:17) [MSC v.1916 32 bit (Intel)]`

と返ってきた。なるほど。

* [Pythonでvim pluginを書く https://qiita.com/zakuro9715/items/98449dd4c6b9e1d61ef5]

