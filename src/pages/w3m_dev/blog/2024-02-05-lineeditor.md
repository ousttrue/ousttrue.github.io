---
title: line editor を分離したい
date: 2024-02-05
tags: [w3m, lineeditor]
---

main loop を libuv にする前に、
line editor を整理したい。

<!-- truncate -->

line editor は自ら getch して while loop を回します。
また term に直接出力します。
入出力両方にレイヤーをひとつ挟みたい。
libuv に乗るように event driven 型に改造を試みます。

## inputLineHistSearch

この関数がブロックして結果を返す。
await に置きかえるような改造をしたい。

```c title="linein.c"
char *inputLineHistSearch(
  const char *prompt, 
  char *def_str, 
  int flag, 
  Hist *hist,
  int (*incfunc)(int ch, Str *buf, Lineprop *prop)
);
```

これを返り値じゃなくて返り値を使うコールバック引数に変えればよいのだけど、
分岐の中で使っている場合に書き換えが難しい。
あと、普通に使っているところが多い。
どうやって書き変えるか…

## c++20 の coroutine 案

やろうかと思ったのだけど、
compiler によって挙動が違ってはまるので中止。
最初に gcc で開発して、あとで msvc でコンパイルできるようにする
予定なので両方で動くようにするのに苦労するような気がした。

## callback で地道にやる案

分岐の無い一本道のプログラムなら問題ないのだけど、
分岐と多段が組み合わさるとつらいことがわかった。
例えば、user 名と password で2回入力が発生するような例。

## lua の coroutine でやる案

w3m のすべてのアクションはキーボード入力のコールバック起点なので、
コールバックが lua のスクリプトになっていて、
mainloop が隠蔽されていれば素直に実装できる。
ぜんぶ置きかえるのは量的につらいのですよね。

## 実際には

callback で地道にやる案で、
form の text 入力など動作に必要な最小限だけやる。
そのあとで、lua 案を推進する予定。
入力をコメントアウトして停止させていく作業中。
少くしてから、callback 方式に API を変更してみる。

```cpp
using OnInput = std::function<void(const char*input)>;
void inputLineHistSearch(
  const char *prompt, 
  char *def_str, 
  int flag, 
  Hist *hist,
  int (*incfunc)(int ch, Str *buf, Lineprop *prop), 
  const OnInput &onInput // 👈
);
// 続きの処理をコールバックで渡す。
// 返り値は無くなる。
// 継続渡しなのでは(よくわかっていない)
```

手作業で継続に変換するときに、
簡単なときと難しいときがある。

## 書き換えて text input 動いた

動いた。次は getch loop の dispather を stack に積み上げる改造。
default では素の main loop の keymap が動作して、
linein が有効になったタイミングで LineInput dispatcher を stack に push して、
入力をオーバーライドする。
context menu や ダイアログの入力がオーバーライドすることが可能な設計。
menu は削除して消えていますが。

## LineInput のオーバーライド動いた

libuv の pty 入力を、 stack に積んだ dispatcher で処理できた。
