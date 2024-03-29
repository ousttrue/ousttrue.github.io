---
title: "w3m改造"
date: 2020-07-25T23:59:50+09:00
tags: ["w3m"]
---

以前にも何度かやったことがあるのだけど立ち消えになっていた、 [w3m](http://w3m.sourceforge.net/index.ja.html) の改造を試みている。
w3m はわりと好きなテキストブラウザなのだが、 2011 年くらいの 0.5.3 で開発が終了している様子。

https://github.com/ousttrue/w3m

まずは `C++` 化してから、HTML処理などを再入可能にしてタブごとにスレッド独立する方向を目指す。
同時に、 `boehm-GC` を少しずつ `STL` のコンテナや `std::string` に置き換える。
どうも、`c++` と `boehm-GC` の共存するのに技がいるらしく、適当に置き換えていくとメモリ破壊で死ぬ。`boehm-GC` をすべて置き換える必要がありそう。`C++` クラスのメンバーに `GC` が要る、`GC struct` のメンバーに `C++` クラスが居るの両方に問題があるっぽい。一応、 `gc_cleanup` を継承したりしているのだけど、やり方がまずいぽい。

改造にあたってなるべく機能を維持しようとしていたのだけど、ある程度わりきって機能を落とさないと手に負えないところがある。

* http + https 以外の通信プロトコルは落とす。NNTP とか Gopher 使ったことないしなー、FTPもいったん落とす
* backend, dump, halfload 等の出力に介入する機能は落とす。コードを読むのが大変
* M17N, COLOR, IMAGE, MENU は残す
* Mouse は微妙。削ってもよいかも
* GetText も削る

量を減らす。思ったよりコードが多かったのだ。

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

* extern "C" を追加してソースの拡張子を `.cpp` に変更
* extern "C" をまとめて取り除く
* typedef struct tag を取り除く

ここまでやると、自由に `c++` のコードを混ぜることができる。
`std::string`、`std::vector`, `std::shared_ptr`, `std::function`, `std::string_view`, `template`, `class`, 前方宣言, `auto`, `inline` 等使い放題 👍

特に `std::string_view` の使い勝手を試したい。
所有しない文字列はすべて、 `std::string_view` でいけると思うのだが。
`split` の `std::string_view` 版は具合がよかった。

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

`C` の状態で、前方宣言を導入できずヘッダの分割が難航。
型ごとに別のヘッダに分割することは断念して、
ほとんど全部の `struct` 定義の入ったヘッダを `fm.h` から分離して作るのに留めた。

## DEFUN

`w3m` は `DEFUN` でキーアサインできる関数を定義している。

<!-- [readme.func](/w3m/doc-jp/readme.func/) -->


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

## GC文字列 Str

アプリ全体で使われていて一挙になくすことはできないのだけど、構造体の末端のメンバーから `std::string` に変える。
あと、がんばって `const char *` の範囲を増やす。
`libwc` から `Str` を剥そうと思っていたのだが、逆に `libwc` に `Str` を封じ込める方向に軌道修正。
`indep.c` の便利文字列関数も少しずつ変えてく。

## グローバル変数を減らす

関数の中でグローバル変数にアクセスしている場合(CurrentBufferなど)、これを関数の引数経由とか、クラスのメンバー経由でもらう。面倒でも Getter と Setter を区別して、どこで変更されうるかわかりやすくする。
クラスのメンバーは、 `private` 化を試みる。

## Stream処理

多分、最難関の `loadGeneralFile` 関数。700行くらいだったか。
goto とか longjmp があってよくわからなかったのだが、慣れてきた。
`http`, `https`, `NNTP ?`, `gopher`, `ftp`, `pipe` 等、`http` のプロキシーやリダイレクト、 `www-auth` などを一手に処理していて容易に手を付けられない。
何度か整理しようとして悉く撃退されたので、雑にやることにした。
機能を `http(https)` に絞ってそれ以外をコメントアウトしてとにかく量を減らす。
プロキシーとか、 `dump`, `halfload` などのよく知らない機能もどんどん削る。
としてなんとか改造できるようになってきた。

ここを `HttpClient`, `LocalFile`, `PipeReader` あたりに整理したい。

# 第３段階

Tab, Buffer, Line のリンクリストを STL のコレクションに置き換えた。

```c++
auto buf = load(url);
tab->push(buf);
```

という形を目指す。

`loadGeneralFile` を解きほぐして、 `HTTP` 機能を抽出、リダイレクトまで動くようにできた。
`loadGeneralFile` は、

    * OpenStream/Send HTTP Request
    * HTTP Response
        * 3xx => Redirect
    * content-type で分岐
        * BufferLoader => Buffer

という感じに整理できそう。
HttpとBufferローダーを副作用の無い関数に整理できれば再入可能が見えてくる。
早めに分岐させて、分岐したら合流しない。同じ処理は関数で共有するという方向性で整理。

Buffer が多機能なので、Document, HttpResponse, FileInfo とかに分割したい。

# 第４段階

mainloop の再実装。libuv, libevent 等を検討していたのだけど、 c++ との親和性の高い asio を使うことにした。
`tty read (keyboard input)`, `signal callback (sigint, winresize)`, `alarm` の割り込みを asio 経由にする。
アプリの終了をloop の終了にして、自然に destructor がコールされるようになる。

# 第５段階

html parse から term へのレンダリング部分の分解。
やっと解読できて１パス目

* 内部文字コード(wtf-8)に変換
* tokenize
* tag をパースして属性取得 => パースに成功したら行バッファに書き戻す。フォームの情報を蓄積する。テーブルのレイアウト

結果として、行のリストと、フォーム情報を得る。

２パス目

* 行のリストを再度パース
* 非タグ部分をBufferに出力
* Aタグやフォームを Anchor などに出力

という感じだった。
１パス目で html 化するときに知らない属性を捨てたり、内部属性を追加したりしている様子。
この、内部属性がよくわからなくて難しい。

# 文字コード

`content-charset` => `wtf` => `DisplayCharset` と文字コードを変換して動作していることがわかった。
試しに、`utf-8` であることが分かっている `html` で `wtf` 変換を飛ばしてみたところ表示が壊れた。
`wtf` は `utf-8` と互換性がないらしい。
http://simonsapin.github.io/wtf-8/
なのかと思ったのだが、違う独自形式かもしれない。

w3m は、この `wtf` エンコーディングで、html タグのパース、文字のバイト幅の判定、文字のカラム幅の判定をしているのだが、
`utf-8` では、文字のバイト幅、カラム幅の判定が狂う。
ということで、 `utf-8` でのバイト幅判定を自作して `wcwidth` を組み合わせてみた。
`*#12345;` 形式の `unicode` 埋め込みに対応するために、追加で `unicode` => `utf-8` 変換も作った。
正しく表示することができた。

ということで、`euc-jp` と `shift-jis` と `iso-2022-jp` から `utf-8` への変換を作れば日本語は対応できそう。
`std::string_view`, `char32_t`, `char8_t` あたりの新しい型を使った `\0` 終端に頼らないライブラリを作ってみる。

# メモ
## モジュールに分割

機能ごとにモジュールに分割する。

* UI(frontend)
    * Term
        * 低レベル描画
            * termcap の関数を直接呼ぶ。curses の自前実装的な
            * マルチバイト、マルチカラムの文字列と密接に関連していて libwc と不可分
        * キーボード入力
        * マウス入力
        * リサイズイベント
        * SIGNALハンドリング
            * SIGINT => longjmp でキャンセル処理を実現している。c++ のデストラクタとかまずそう
    * 高レベル描画
        * Lineの構築(byte ごとに char と Lineprop がペアになる)
    * Tab
    * Buffer
    * Message
    * Menu
    * Keymap
    * LineInput
        * SearchKey
        * History
* IO(transport)
    * IStream
        * union => class polymorphism化
        * file descriptor
        * FILE*
        * ssl
        * memory
        * Compression
    * LocalCGI

* http
    * HttpSession
        * HttpRequest
        * HttpResponse
    * cookie
    * redirect
    * referer
    * https
    * ftp
    * URL

* HTML
    * HTMLtagproc1
    * HTMLlineproc2body
        * process_form
        * process_form_int
    * form
    * table
    * frame
    * term rendering

* String
    * 文字コード
    * quote
    * url escape
    * html escape
    * html entity
    * char_util
        * myctype
    * string_view_util
        * strip
    * string_util
        * malloc


## リンクをたどる(followLink)

followA();
loadLink();
loadGeneralFile();

cmd_loadURL();
loadGeneralFile();

cmd_loadURL();
loadGeneralFile();

## 描画する

displayBuffer
redrawBuffer
redrawNLine

## key入力
