---
date: 2022-01-01
tags:
- python
title: rawtypes 作ってみる
---

# rawtypes 作ってみる

`cython` から `pybind11` に乗り換えを試みたのだが、
一歩目で躓いた。

不完全型のポインタをそのまま返す方法がわからん。

```c++
ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
```

`ImGuiContext` は前方宣言なのです。

自分でやろうと思った。
`ctypes` と併用することを前提にした省機能のバインダー、名付けて `rawtypes` を作ってみよう。
`c++` の関数呼び出しのちょっとしたコード生成をする。
基本的に `ctypes.c_void_p` で済ます。
型の宣言が必要なところは、 `ctypes.Structure` により `python` 側で宣言。
`c++` から返す時には、キャストする。

```python
return ctypes.cast(p, ctypes.POINTER(CTYPES_TYPE))[0]
```

object の所有権 はまじめに探求しない。

* python で作って、python で開放する(cypte.Struct object)
* c++ で作ったのを cast して python に渡すが参照のみ(cast された ctypes.Struct)。無効なものにアクセスしないようにプログラマがー注意する
* それ以外は値渡し

これで十分。
主要な狙いは、 

* static library のリンク
* `c++` 関数の呼び出し
* 構造体の値渡しを `c++` でラップする

で、 `ctypes` の苦手なところだけをやる。
`luajit ffi` に倣ったスタイルでまいる。

## 動いた

https://github.com/ousttrue/pydear

ImGui ひととおりできた。
もうちっとパッケージング(sdist, wheel)を整理したら形が整う。
`github action` で `wheel` をビルドする技もできた(`windows-64bit + python-3.10` のみ実験)。

`str` と `bytes` の切りわけも `C-API` で書けたし、慣れれば直接 `C-API` を使った方が便利そう。
`Py_INCREF` `Py_DECREF` による参照管理と、`PyErr_Clear` 等のエラーハンドリングなど
を抑えればよさそう。

## pypi

https://pypi.org/project/pydear/

github actions で wheel をビルドして、 pypi にアップロードするところまでできた。
あと、 `sdist` も作る。

`pip install pydear` して使えるようになった。
使いながら整備していこう。

`pyi` が含まれているので、ある程度のインテリセンスが効くところがよい。

* [ ] rawtypes をライブラリとして分離する
* [ ] clang.cindex でコード生成した結果を `sdist` に含める

