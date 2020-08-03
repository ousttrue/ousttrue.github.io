---
date: 2019-04-18T16:10:34+09:00
Tags: ['clang', 'python', 'cpp', 'dlang', 'com']
Title: pythonモジュール clang で C++ ヘッダーを変換する
---

`d3d11.h` を `d3d11.d` に変換したいのでやる。

以前、少し手を出したときの記事。

* https://qiita.com/ousttrue/items/a4291fc996a063841bd7
* https://qiita.com/ousttrue/items/26b399a691b5610d2678

この時は手作業で `d3d11.h` をD言語向けに編集していたのだけど、
プログラムで自動変換します。

## 環境整備
Windows10(64bit)

* llvmインストール(32bit)
* python36-32
* `pip install clang`

## TranslationUnit

* typedef
* enum
* struct/union
* function

## プリプロセッサー情報を得る

* include
* define

## ComのIIDを得る

* unexposed

## D向けに出力

* extern `Windows`
* public import
* `&` を `*` に置換
* interfaceに対するポインタの `*`をひとつ減らす

あとは愚直に粛々と前に進める

## python clang は強力

こいつがあると、C/C++のヘッダから各言語向けのバインディングを作成するなどの作業を半自動化できて便利。
例えば、

https://github.com/ousttrue/UnityCairo

元々、

http://andrestraks.github.io/BulletSharp/

が clang で bullet のヘッダーを変換しているぽかったので、そこから調べた。

## できたもの

なんとなく動くものができた。

https://github.com/ousttrue/pycpptool
