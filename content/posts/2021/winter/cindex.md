+++
title = "libclang で 言語バインディングを作る"
date = 2021-12-04
tags = ["python", "libclang", "cython"]
+++

# 今まで試作したものたち

* (2019)<https://github.com/ousttrue/pycpptool>
    * `pip install clang`
    * [pythonモジュール clang で C++ ヘッダーを変換する](/posts/2019/python_clang/)
    * 途中でデバッグが困難になった

* (2020)<https://github.com/ousttrue/regenerator>
    * `D` + `lua` (text template によるコード生成部)

* (2020)<https://github.com/ousttrue/ClangCaster>
    * `C#`
    * [libclangでWindowsKitsをDllImportするライブラリを作った(ている)](https://qiita.com/ousttrue/items/d878ec97483cb8834793)

* (2020)<https://github.com/ousttrue/clalua>
    * `C++` + `lua` (text template によるコード生成部)

* (2021)<https://github.com/ousttrue/frame_factory/tree/master/clanggen>
    * `rust`

* (2021)<https://github.com/ousttrue/luajitffi/tree/master/clang/cdef>
    * [libclang で luajit 向けの FFI を生成する](/posts/2019/luajitffi/)
    * imgui による cindex のパース結果のビューワーを作ってみたが動作が遅かった。
        * <https://github.com/ousttrue/luajitffi/tree/master/clangffi>
        * <https://github.com/ousttrue/limgui/blob/master/samples/clang_viewer.lua>

ものによるのだけど、 `d3d11.h` をパースしたりすると
要素が数万とかになる巨大なツリーを構築するので練習に良い。
同じものを作りすぎである。

## imgui.h

限定的にだが `c++` の機能を使っているので、言語によっては気持ちよくラップできない。

* 関数オーバーロードとデフォルト引き数
    * mangling は libclang で対処できる
    * `rust` などオーバーロードが無いものは厳しい。
    * あってもディスパッチするコードを生成するのが厳しい。
    * `const ImVec2 &pos = ImVec2(0, 0)` みたいなのが厳しい。
* フォント設定とかのメンバー関数
    * `C` の呼び出し関数を用意する必要があるかもしれない。

## d3d11.h

COM の仮想関数テーブルを工夫すれば行ける。
GC言語だとデストラクターの呼びだしが制御できないかも。

# cython

最近、 `C` のライブラリーを `cython` でラップするのに着目している。

* <https://github.com/seung-lab/DracoPy>
* <https://github.com/pyimgui/pyimgui>

練習に作ってみた。

* <https://github.com/ousttrue/pymikktspace>

# 予定

`cindex` で `cython` 部分の自動生成をやってみる。
更に、 `.pyi` を同時に生成すればコード補完の効くネイティブモジュールが作れるのでは。
あと、 `cindex` の使いかたについてのメモをまとめたい。

* <https://github.com/ousttrue/cywrap>

## imgui

* <https://github.com/ousttrue/cydeer>

## サブモジュールだけ cython にする

* <https://github.com/AshleySetter/HowToPackageCythonAndCppFuncs>
* <https://www.py4u.net/discuss/175142>

