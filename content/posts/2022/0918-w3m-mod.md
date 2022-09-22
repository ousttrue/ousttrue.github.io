+++
date = 2022-09-18
tags = ["w3m"]
title = "w3m改造に再突入"
+++

# w3m改造に再突入

なんとなく最初からやり直し。

## マクロカッター

今回は、 `python` でマクロカッターを作って前処理してみた。

```
#ifdef USE_UNICODE
// hogehoge
#endif
```

みたいな `#ifdef` 事前に解決しえカットしていくツールである。
めんどくさいので `if defined(HOGE)` などは実装していない。
`true`, `false`, `none` の3値で判断して true であれば `#if` を false であれば `#if` ブロックをコードごと削除し、`none` であれば保持するというロジック。
わりとうまくいって、コードがかなり簡単になった。

## いつも通り C++ 化

C++ 化しないとCの暗黙の型変換が緩すぎてコンパイルエラー追うのが難しくなるので、
次の一手はこれ。

`typdef struct Some {} Some;` を `struct Some;` に書き換える。
これでストレスをかなり低減できる。

## fm.h, proto.h の分配

* `.c` と `.h` をペアにして関数を一致させる
* `struct` 毎にヘッダを分ける。
* `global` 変数を散らす
* `const char*` との戦い。順次

## libuv

### mainloop

あっさりできてしまった。

`tty input`, `resize signal` で `idle` のときに描画などという方針でよさそう。
raw モード切り替えなども `libuv` 移行できそう。

### 入力ストリーム

### linein / readline

### 出力


## 使わない機能を削る

* backend, dump など
* pager 系の機能
* news, gopher など使わないプロトコル
* mouse 系の機能

## wtf-8 とは？

謎の文字コード `wtf-8` について、再調査。

<https://badsector.pullup.net/?p=70>

👇

<https://simonsapin.github.io/wtf-8/

## vt100 分離

`Buffer => Screen => tty_out` という流れに統一する。
各所からローレベルの描画機能を呼ばない。

## TODO: logger 導入


## UIとデータ構造の分離

```
+----+
|DATA| TabBuffer, Buffer, Anchor, Form, Image...
+----+
  A
  |
+----+
| UI | mainloop... tty, key dispatch
+----+
```

`TabBuffer, Buffer, Anchor, FormList` と `mainloop keydispatch` あたりを分離する。
片方向の参照。

### TODO: lua 導入

DEFUN を lua で記述したい。
rc も？

## TODO: libgc 減らす。止める

## TODO: zig に移植

`zig cc` でビルドはできた。
じゃなくて、ソースを `zig` にしたい。

## TODO

Windows ネイティブで動くようにしたい。
`libuv` + `conpty` できそうな気がするのだけど、まだまだ。
