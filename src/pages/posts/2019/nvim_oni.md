---
date: 2019-04-21 02:40:00+09:00
draft: true
tags:
- vim
title: nvim frontend Oni
---

Electron製のGUI、`Oni` です。
予想外に普通の `neovim` だったのでWindows環境はこれで行く。

## config

`%APPDATA%/Oni/config.tsx`

に記述する。
前のバージョンが、

`%APPDATA%/Oni/config.js`

だったらしくこれを作って弄ると `config.tsx` の変更を反映しないなど、おかしくなる場合があった。
復旧するには、`%APPDATA%/Oni` を削除してから `Oni` を起動しなおすべし。

* [Oniで作るNeoGvim](https://qiita.com/rkbk60/items/08634e5a3fbca912bcd2)

の通りに設定すると左側の謎のサイドバーなどを無効にできて、 `gvim` ぽくなった😄

フォントには、 `Consolas` などASCIIしかないのを指定して、フォトに含まれない文字をシステムに補わせるのも手かもしれない。システムフォントの絵文字はカラーになる。

* https://github.com/onivim/oni/wiki/How-To:-Minimal-Oni-Configuration
* https://github.com/onivim/oni/wiki/Configuration

`tsx` ってなんじゃろ。後で調べる。

## init.vim

以下で判定できる。

```vim
if exists('g:gui_oni')
    " something
endif
```

