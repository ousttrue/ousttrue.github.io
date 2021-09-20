+++
title = "gizmo のライブラリを整備したい"
date = 2021-09-10
taxonomies.tags = ["3D", "c++"]
+++

去年手を付けたのだが、放棄されていたのを発掘した。

<https://github.com/ousttrue/gizmesh>

tiny gizmo を改造しようとしてて、動かなくなっている。

# 既存の gizmo libraries

## tinygizmo

<https://github.com/ddiakopoulos/tinygizmo>

## im3d

<https://github.com/john-chapman/im3d>

# memo
## 20210921

tinygizmo の改造を最初からやりなおし

<https://github.com/ousttrue/tinygizmo/tree/custom>

example を整理する。
* glfw 依存を最小化して、 include が伝わらないように隔離
* gizmo と OpenGL を分離
