---
title: source と header をペアにする
date: 2024-01-31
tags: [w3m]
---

巨大なヘッダー proto.h に大量の関数が詰め込んである。
fm.h に主要な型が詰め込んである。

<!-- truncate -->

これらを適当に分割して、source と header のペアのモジュールに分割したい。
この分割作業に前段で実施した、typedef struct の除去が効果がある。
ポインター参照しかない型を安心して前方宣言できる。

## w3m のコア

あと file.cpp(元 file.c)が特に巨大で 7000 行くらいある。
ここに html パースと 2次元レイアウトのコアがある。
この部分をなるべく壊さずに活かしたいのです。
グローバル変数をクラスのメンバー変数に改造するとかして、
多重に動かせるようにはしたい。

## fm.h を分配

主に型を基準に、xxx.cpp と xxx.h のペアになるように分配した。

元が 1200 行くらいで、マクロをカットして 600 行、
そこから型を分配して 300行くらいに削減。
global 変数がここに配置してある。これらも型のソースに分配して fm.h は無にする予定。

### グローバル設定

- rc => lua にしたい

### search, linein 系

- search => 軽量化 USE_MIGEMO を削除
- linein => main loop に手を入れる前にこっち先にモジュール化するとよさそう。
    readline みたいな lineeditor.
- regex

### Command / mainloop / keymap

- main
- mainloop => libuv 化したい。setjmp/lognjmp を回避して goto を回避して単純化したい。
- menu => 軽量化。削除予定
- command => lua にしたい
- keymap => lua にしたい

### Buffer 系

- Buffer
- Line
- Anchor
- AreaMap

### html parse 系

- readbuffer => utf8 対応
- table
- form
- frame => 軽量化。削除予定
- etc
- file

### IO http

- istream
- url
- httprequest
- cookie

### term display

- display
- terms => utf8 対応

