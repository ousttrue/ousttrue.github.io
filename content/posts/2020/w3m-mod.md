---
title: "w3m改造"
date: 2020-07-25T23:59:50+09:00
tags: ["w3m"]
draft: true
---

以前にも何度かやったことがあるのだけど立ち消えになっていた、 [w3m](http://w3m.sourceforge.net/index.ja.html) の改造を試みている。
w3m はわりと好きなテキストブラウザなのだが、 2011 年くらいの 0.5.3 で開発が終了している様子。

まずは `C++` 化してから、HTML処理などを再入可能にしてタブごとにスレッド独立する方向を目指す。
同時に、 `boehm-GC` を少しずつ `STL` のコンテナや `std::string` に置き換えて慣れた形式に変えてゆく。

https://github.com/ousttrue/w3m


# 下準備

## msys2 でとりあえずビルド

WSL Ubuntu だとビルドできなかった。
しかし、msys2 ならわりと簡単にビルドできることを発見。

```
$ pacman -S make gcc libgc-devel openssl-devel ncurses-devel
$ x86_64-pc-msys-gcc --version
x86_64-pc-msys-gcc (GCC) 9.3.0
Copyright (C) 2019 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
$ ./configure
```

コンパイル環境の方が昔と変わってしまってビルドでエラーになる。

修正方法👇

[[CentOS7] emacs24にemacs-w3mインストール](https://qiita.com/imkitchen/items/02a9df7baaaf434fee66)


`#ifdef` の調整

```
// config.h
//#define USE_BINMODE_STREAM 1
//#define USE_EGD
```

```
$ make
$ ./w3m www.google.com // 動いた
```

## WSL で GC がクラッシュする問題

`boehm-GC` がランタイムにエラーになることで、 `make` 中のコード生成 `mktable` がクラッシュするのが原因でビルドステップが途中で止まるのが原因だった。なので、たとえビルド済みの `w3m` を `apt get` しても、ランタイムも同じ原因でクラッシュする。

エラー。

```
Wrong __data_start/_end pair
fish: './build/w3m' terminated by signal SIGABRT (Abort)
```

https://hitkey.nekokan.dyndns.info/diary2004.php#D200424

によると、stack size の制限が原因らしい。

```
$ ulimit -s
8192
```

WSL でこれを変えるには・・・。

https://github.com/microsoft/WSL/issues/633

無理。

`WSL2` ならできる？

```
> wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-20.04    Running         2
```

やってみる。

```
$ ulimit -s unlimited
> ulimit -s
unlimited
```

できた。

```
$ w3m
Wrong __data_start/_end pair
```

うーむ。

```
$ ulimit -s 81920
> ulimit -s
81920
```

動いた。
8192KB では足りなく、 unlimited では多すぎるらしい。これは、難しいな。

ちなみに、 `gdb` 上ならスタック問題を解決しなくても動いた。
`gdb` がスタックを覆い隠すのかな？
開発だけならできなくもない。

## ビルドシステム

とりあえず慣れたツールに変更。
WSL 上の vscode で作業しているのもあり、autotools から CMake に変更。
クロスプラットフォームは後退させて、新しめの gcc(c++20) でビルドできればいいや。
config.h や funcname 系のコード生成結果はコミットしちゃう。
libwc が static ライブラリにわかれているのも、ひとまとめにしてしまった。
あと、適当にソースをフォルダに移動する。

生成コード一覧

| ファイル     | 生成方法          | 入力           | 備考                                                   |
|--------------|-------------------|----------------|--------------------------------------------------------|
| config.h     | configure         |                | 各種 #define など                                      |
| entity.h     | Makefile(mktable) | entity.tab     | ./mktable 100 entity.tab > entity.h                    |
| funcname.tab | Makefile(awk)     | main.c, menu.c |                                                        |
| funcname.c   | Makefile(awk)     | funcname.tab   | sort funcname.tab ｜ awk -f funcname0.awk > funcname.c |
| funcname1.h  | Makefile(awk)     | funcname.tab   |                                                        |
| funcname2.h  | Makefile(awk)     | funcname.tab   |                                                        |
| functable.c  | Makefile(mktable) | funcname.tab   |                                                        |
| tagtable.c   | Makefile(mktable) | funcname.tab   |                                                        |

## 警告からエラーに引き上げ

改造していくのに `C` の緩い型制限が危険(コンパイルが通るのに型が不一致になりやすい)なので、
以下のオプションを追加。

```
-Werror=implicit-function-declaration
-Werror=int-conversion
-Werror=conversion-null
```

これで、型宣言を補強しながら進める。

# 第1段階

* extern "C" を追加して C++ 化
* extern "C" を取り除く
* typedef struct tag を取り除く

ここまでやると、自由に `c++` のコードを混ぜることができる。
`std::string`、`std::vector`, `std::memory`, `std::function`, `std::string_view`, `template`, `class`, 前方宣言, `auto`, `inline` 使い放題 👍

## c++ 化 (extern "C")

手法としては、各ソースの拡張子を `.c` から `.cpp` に変更する。
`CMakeLists.txt` を修正。
`#include` を `extern "C"` で囲む、で `c++` 化することができる。

```c++
extern "C" {
#include "xxx.h"
}
```

ただ、 `cpp` で定義する関数の宣言が `extern "C"` の中に入らないとリンクエラーになるので、
そうなるようにソースごとにヘッダを分配してやる。
`w3m` は関数宣言が少数のファイル `proto.h`, `fm.h` とかに集中しているのだが、いっぱいあるので雑にやる。
コンパイルが通ればよい。

分配するときに未定義の型を前方宣言ですませたいのだけど、 `c` の `struct` 定義が、`struct tag` と `typedef` に分かれているのがやっかいだった。

```c
// C
typedef struct hogeTag
{

} Hoge;
```

```c
void DoHoge(Hoge *p);

// に対する前方宣言は、

struct hogeTag;
typedef hogeTag Hoge;
```

とりあえず、ほとんど全部の `struct` 定義の入ったヘッダを、 `fm.h` から分離して作った。

## DEFUN

`w3m` は `DEFUN` でキーアサインできる関数を定義している。

[readme.func](/w3m/doc-jp/readme.func/)


以下のように、キーボードなどのイベントをトリガーにアクションを実行するというイメージ。

```
Key
    KeyMap
        DEFUN
    Menu
        DEFUN
MouseAction
    ActionMap
        DEFUN
    Menu
        DEFUN
Alarm
    DEFUN
```

ソースは、`main.c` と `menu.c` に `DEFUN` とそれの使う補助関数がまとめて定義されていて、
ヘッダは `proto.h` に全部入れとなっている。

c++ で下記のようなディスパッチャを作った。

```c++
typedef void (*Command)();
std::unordered_map<std::string, Command> g_commandMap;
```

使い捨ての python で関数に登録するコードを生成した。

# 第２段階

* PODじゃない型が動くようにする
    * constructor/destructor
* 脱GC
    * コレクションをSTLに置き換える
    * std::string
    * std::shared_ptr
* 機能ごとにモジュール化
* 再入可能

## GC_MALLOC から gc_cleanup 継承へ

boehm-GC を `c++` のクラスで使う方法を調べた。

http://www.namikilab.tuat.ac.jp/~sasada/prog/boehmgc.html#i-0-5

`w3m` では、 `GC` を多用している。

おもに、

* struct Str
* コレクション
* struct の field

という感じに。
このうち、 struct の field で使われるタイプの単発の `GC_MALLOC` している型を `gc_cleanup` 継承にして、 `new` で初期化するようにする。

* bzero, bcopy, memcpy, sizeof

等でメモリクリアしているところに注意する。
これで、その型は `constructor/destructor` が動くようになり、
メンバーに `std::string` 等を配置できるようになる。
あとで、 `gc_cleanup` から `std::shared_ptr` に変更することも視野に入れている。

## モジュールに分割

機能ごとにモジュールに分割する。

* Term
    * 低レベル描画
        * tputs termio/terminfo
    * キーボード入力
    * マウス入力
    * リサイズイベント
    * SIGNALハンドリング
* UI(frontend)
    * 高レベル描画
    * Tab
    * Buffer
    * Line
    * Message
    * Menu
    * Keymap
    * LineInput
        * SearchKey
        * History
* IO(transport)
    * IStream
        * polymorphism化
        * http
            * HttpSession
                * HttpRequest
                * HttpResponse
            * cookie
            * redirect
            * referer
        * https
        * ftp
    * Compression
    * LocalCGI
* Document/String
    * 文字コード
    * URL
    * html parse
        * HTMLtagproc1
        * HTMLlineproc2body
            * process_form
            * process_form_int
        * form
        * table
        * frame
    * term rendering
