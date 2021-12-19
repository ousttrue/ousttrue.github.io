+++
title = "Lua で OpenGL"
date = 2021-08-05
tags = ["lua", "luajit", "OpenGL"]
previewimage = "glfw_sample.jpg"
+++

imgui bind がだいたいできて軌道に乗ったので、glTF viewer の作成にとりかかる。

<https://www.glfw.org/docs/latest/quick.html>

の回転アニメーション以外できた。

# luajit の cdef で頂点配列の定義が捗る

```c++
static const struct
{
    float x, y;
    float r, g, b;
} vertices[3] =
{
    { -0.6f, -0.4f, 1.f, 0.f, 0.f },
    {  0.6f, -0.4f, 0.f, 1.f, 0.f },
    {   0.f,  0.6f, 0.f, 0.f, 1.f }
};
```

が、

```lua
ffi.cdef([[
struct Vertex2DRGB
{
    float x, y;
    float r, g, b;
};
]])

local vertices = ffi.new(
    "struct Vertex2DRGB[3]",
    { -0.6, -0.4, 1., 0., 0. },
    { 0.6, -0.4, 0., 1., 0. },
    { 0., 0.6, 0., 0., 1. }
)
```

などという書き方ができてしまう。luajit ffi 強い。

# ffi.metatype

luajit を活かした線形代数ライブラリを探索していて、

<https://github.com/bjornbytes/maf>

を見つけた。

luajit ffi には便利関数

```
ffi.metatype(ct, metatable)
```

があって、これを使うと ffi.cdef した C の struct に lua の metatable を合体できる。

線形代数ライブラリは、 `ffi.metatype` を使って自作してみよう(mafにはvec3 と quaternion しかないのもあり)。
ついでに、lua の unittest を取り入れましょう。

# 20210830

`mat4` を実装してみた。

<https://github.com/ousttrue/limgui/blob/master/lua/mafex.lua>

```C
    typedef union {
        struct {
            float _11, _12, _13, _14;
            float _21, _22, _23, _24;
            float _31, _32, _33, _34;
            float _41, _42, _43, _44;
        };
        float array[16];
    } mat4;
```

という定義で OpenGL の uniform 変数に直接渡せるので使いやすい。

