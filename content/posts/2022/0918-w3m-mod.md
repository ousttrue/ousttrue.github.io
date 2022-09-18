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

## fm.h の分解

* `struct` 毎にヘッダを分ける。
* `global` 変数を散らす
* `const char*` との戦い。順次

## メインループを libuv にしてみる

あっさりできてしまった。

`tty input`, `resize signal` で `idle` のときに描画などという方針でよさそう。
raw モード切り替えなども `libuv` 移行できそう。
入力ストリームを `libuv` に乗せられれば、`tab` を並行動作できるはず。

## TODO: vt100 分離

## TODO: logger 導入

## TODO: lua 導入

DEFUN を lua で記述したい。
rc も？

## TODO: libgc やめる

## TODO: zig に移植

`zig cc` でビルドはできた。
じゃなくて、ソースを `zig` にしたい。

## TODO

Windows ネイティブで動くようにしたい。
`libuv` + `conpty` できそうな気がするのだけど、まだまだ。
