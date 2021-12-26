+++
title = "gizmo のライブラリを整備したい"
date = 2021-09-10
tags = ["3D", "c++"]
+++

# gizmo のライブラリを整備したい

去年手を付けたのだが、放棄されていたのを発掘した。

<https://github.com/ousttrue/gizmesh>

tiny gizmo を改造しようとしてて、動かなくなっている。

# 既存の gizmo libraries

## tinygizmo

<https://github.com/ddiakopoulos/tinygizmo>

## im3d

<https://github.com/john-chapman/im3d>

## ImGuizmo

ImGui のDrawListに相乗りするぽい。

<https://github.com/CedricGuillemet/ImGuizmo>

# memo
## 2021 0921

tinygizmo の改造を最初からやりなおし

<https://github.com/ousttrue/tinygizmo/tree/custom>

example を整理する。
* glfw 依存を最小化して、 include が伝わらないように隔離
* gizmo と OpenGL を分離

## 2021 1225

続き。
cython から使えるようにインターフェース改修。
`c++` 視点で型が増えないように、`std::array`, `std::tuple` 等を多用する書き方をしていたのだけど、
`cython` 視点では使いにくかった。

### TODO

* [x] `examples/gl3` と `examples/dx11` を共通化する
* [x] rendertarget への描画

## 2021 1226
マウス操作でモデルにポーズを付けられるところを目標に。

* [ ] TRS node hierarchy
* [ ] AABB node selector
* [ ] gizmo hover
* [ ] logger / imgui ですべてのステート(mode etc)を表示する

