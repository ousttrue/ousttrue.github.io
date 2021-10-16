+++
date = 2019-04-23T14:30:07+09:00
tags = ['vim']
draft = true
title = 'vim の Buffer 操作のメモ'
+++

`buffer list` < `buffer` > `window` > `tab` > `vim`

という感じ

`:help window`

> Summary:
>    A buffer is the in-memory text of a file.
>    A window is a viewport on a buffer.
>    A tab page is a collection of windows.

## Tab
### autocmd events

* TabEnter: after entering another tab page
* TabLeave: before leaving a tab page
* TabNew: when creating a new tab page
* TabNewEntered: after entering a new tab page
* TabClosed: after closing a tab page

## Window

* https://vim-jp.org/vimdoc-ja/windows.html

Window番号は、vim によって自動で振られる。
BufferからWindow番号を手繰る。

`bufwinnr('buf_name')`

tabにひとつだけ `previewwindow` を作れる。

### autocmd events
* WinNew: after creating a new window
* WinEnter: after entering another window
* WinLeave: before leaving a window

### winnr
Windowの増減で番号が代わる。

### win_getid
vimセッション中不変のユニークなID

#### id to nr


### win_id2tabwin
vimセッション中不変のユニークなID

### 指定のWindowに移動する

```vim
:exe nr . "wincmd w"
```

```vim
:call win_gotoid(id)
```

### split

### vsplit

### topleft

```
+---+
| 1 |
+-+-+
| |0|
+-+-+
```

### aboveleft

```
+-+-+
| |1|
| +-+
| |0|
+-+-+
```


## Buffer + Window

### 閉じるときの挙動

`:bdelete`

* 最後のWindowでない時

そのバッファを表示しているWindowごと取り除かれる

* 最後のWindowの時

バッファを取り除いて、 `:bnext` される

## BufferList

### bufferlisted

### new name

* split
* enew
* file name

### vne[w] name

vertical new

* vsplit
* enew

### bd[elete]
* カレントバッファを閉じる
* このバッファを開いているWindowをすべて閉じる。
* buffer-listから取り除く
* bufferはまだ消えてない

### bdwipeout
* カレントバッファを閉じる
* このバッファを開いているWindowをすべて閉じる。
* buffer-listから取り除く
* bufferを消す
## Buffer

* "$": last buffer
* 0, "#": alternate buffer
* "%", "": current buffer

### autocmd events(Bufferの変化)
* BufNewFile: starting to edit a file that doesn't exist
* BufReadPre: starting to edit a new buffer, before reading the file
* BufRead: starting to edit a new buffer, after reading the file
* BufReadPost: starting to edit a new buffer, after reading the file
* BufReadCmd: before starting to edit a new buffer |Cmd-event|
* BufWrite: starting to write the whole buffer to a file
* BufWritePre: starting to write the whole buffer to a file
* BufWritePost: after writing the whole buffer to a file
* BufWriteCmd: before writing the whole buffer to a file |Cmd-event: 
* BufAdd: just after adding a buffer to the buffer list
* BufCreate: just after adding a buffer to the buffer list
* BufDelete: before deleting a buffer from the buffer list
* BufWipeout: before completely deleting a buffer

* BufFilePre: before changing the name of the current buffer
* BufFilePost: after changing the name of the current buffer

* BufEnter: after entering a buffer
* BufLeave: before leaving to another buffer
* BufWinEnter: after a buffer is displayed in a window
* BufWinLeave: before a buffer is removed from a window

* BufUnload: before unloading a buffer
* BufHidden: just after a buffer has become hidden
* BufNew: just after creating a new buffer

### autocmd events(Bufferの中身の変化)
* CursorMoved

### :file
バッファ名(ファイル名)

### bufnr
名前から番号を得る

### bufname
番号から名前を得る

### bufexists

### bufloaded
bufexists and not bufloaded はあり得る

### bnext

## Buffer Variables
### getbufvar
### setbufvar

