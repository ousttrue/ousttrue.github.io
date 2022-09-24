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
`true`, `false`, `none` の3値で判断。
true であれば `#if` を削除。
false であれば `#if` ブロックをコードごと削除し。
`none` であれば保持するというロジック。
わりとうまくいって、コードがかなり簡単になった。

## いつも通り C++ 化

C++ 化しないとCの暗黙の型変換が緩すぎてコンパイルエラー追うのが難しくなるので、
次の一手はこれ。

`c++` できたら、 `typdef struct Some {} Some;` を `struct Some;` に書き換える。
これでストレスをかなり低減できる。

局所性の高い関数をメンバー関数にする。
なるべくメンバーを private にして、名前も `_` などの prefix を付ける。
大きい struct は分割する。
コンストラクタ、デストラクタ、コピーコンストラクタは避ける。`GC` や `setmem(0)` で死ぬ。
同様に、 std::vector, std::string は慎重に導入する。

## macro 減らす

macro 関数を`inline 関数` に置き換えたり、
macro 定数を `enum` に置き換える。int, char などを enum に置き換える。
使えれば `bitfield` とかも駆使。

## fm.h, proto.h, file.c の分配

* `.c` と `.h` をペアにして関数を一致させる
* `struct` 毎にヘッダを分ける。
* `global` 変数を散らす
* `const char*` との戦い。順次

膨大な global 変数があるので、使わないもの思い切って削除する。

### file.c
`file.c` が 7000 行とかあってすごい。

* html のロードが 4500 くらい。 `table.c`, `frame.c` も関連？
* http を操作が 500 くらい

http アクセスや、html パース、ローカルCGI とか Buffer 操作が色々入っている。

## libuv

### mainloop

あっさりできてしまった。

`tty input`, `resize signal` で `idle` のときに描画などという方針でよさそう。
raw モード切り替えなども `libuv` 移行できそう。

### 入力ストリーム

tcp, fd, FILE*, Str と圧縮 decoder のランタイム polymorphism.
c++ の継承に置き換えて、 `void*` の cast より、型チェックの聞く状態にできる。

TODO: libuv を使う

### linein / readline

### 出力

### signal

読み込みを `ctrl-c` で中断するなど。

## 使わない機能を削る

* backend, dump など
* pager 系の機能
* news, gopher など使わないプロトコル
* mouse 系の機能
* search_header 系の機能

## wtf-8 とは？

謎の文字コード `wtf-8` について、再調査。

<https://badsector.pullup.net/?p=70>

👇

<https://simonsapin.github.io/wtf-8/

## vt100 分離

`Buffer => Screen => tty_out` という流れに統一する。
各所からローレベルの描画機能を呼ばない。

メッセージ表示も抽象化して、text を push するだけに。

* カーソル移動
* out
* flush
* カーソル復帰

とかしない。

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

バッファーローダーからグローバル変数を除去して、再入可能にする。
tab を平行動作可能にする。

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
