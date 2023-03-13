---
date: 2021-12-12
tags:
- python
title: python の型ヒント
---

# python typing

* https://docs.python.org/3/library/typing.html

## 生成する

既存のライブラリ、特に拡張ライブラリに型ヒントを付与したいことがある。
これらは、元が `c/c++` なのでその型情報から `pyi` を生成してやる。
型情報は、 `clang.cindex` を使って `c/c++` のヘッダーから得るとよい。

## vscode + pylance(pyright)

プロジェクトローカルでいい場合は、 `${workspaceFolder}/typings` に配置すると処理してくれる。
`clang.cindex` に `enum` の情報を追加してみた。

## ctypes

* clang.cindex

もとのモジュールと構造が同じ `pyi` を用意してやる。
`ctypes` の `Structure` や関数ポインタに直接型ヒントを付与うまい方法は無さそう？

## 拡張モジュール

* bpy
* imgui のバインディング

拡張モジュールに型ヒントを埋め込む方法がまだ無いっぽい。
埋め込む方法ができれば、 `cython` や `pybind` で作った拡張モジュールには自動で型ヒントが付きそうな気がするのだが。

## imgui で作ってみた。

* https://github.com/ousttrue/cydeer

* [PEP 561 に準拠した型ヒントを含むパッケージの作り方](https://blog.ymyzk.com/2018/09/creating-packages-using-pep-561/)

を参考に作ってみた。

