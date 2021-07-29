+++
title = "imgui の FFI が luajit で動くところまで作った"
date = 2021-07-25
taxonomies.tags = ["luajit", "ffi", "imgui", "libclang"]
[extra]
image = "./imgui_from_luajit.jpg"
+++

<https://github.com/ousttrue/limgui/blob/master/imgui_ffi/cdef/imgui.lua>

Window System は `GLFW`、3D API は `OpenGL3` を選択。

* SDL2 は、 `HWND` を取得周りが FFI では面倒なことが分かっていたのと、`SDL-Image` などの関連ライブラリ無しで行くつもりだった
* D3D11 のバインディングを作っているとまた時間がかかる。`COM` は C の範囲で実装できるので後でやりたい

ということから、楽そうなものを選択したらそうなった。

# メンバー関数呼び出し

`ImFont`, `ImFontAtlas` のみ何故か `c++` 色が強く、メンバ関数呼び出しがあったりするのでなんとかしたい。
cdecl で FFI 記述できるんだっけ？

```c++
//io.Fonts->AddFontDefault();
//io.Fonts->AddFontFromFileTTF("../../misc/fonts/Roboto-Medium.ttf", 16.0f);
//io.Fonts->AddFontFromFileTTF("../../misc/fonts/Cousine-Regular.ttf", 15.0f);
//io.Fonts->AddFontFromFileTTF("../../misc/fonts/DroidSans.ttf", 16.0f);
//io.Fonts->AddFontFromFileTTF("../../misc/fonts/ProggyTiny.ttf", 10.0f);
//ImFont* font = io.Fonts->AddFontFromFileTTF("c:\\Windows\\Fonts\\ArialUni.ttf", 18.0f, NULL, io.Fonts->GetGlyphRangesJapanese());
```

第1引数に this に相当する引数を追加してやればいけた。

```lua
ffi.cdef[[
// 適当に名前を付け替える
struct ImFont* ImFontAtlas_AddFontFromFileTTF(
    struct ImFontAtlas* this,
    const char* filename,
    float size_pixels,
    const struct ImFontConfig* font_cfg,
    ImWchar* glyph_ranges
) asm("?AddFontFromFileTTF@ImFontAtlas@@QEAAPEAUImFont@@PEBDMPEBUImFontConfig@@PEBG@Z");
]]
```

# C++ デフォルト引数

`ImGui` の `API` は基本的にほぼ C になるように配慮されていて、C++ の機能は限定的にしか使っていない。

* 関数オーバーロード
* デフォルト引数

である。
で、このデフォルト引数がないと `imgui` の使い勝手が著しく下がる。
リファレンスを確認して、デフォルト値を当ててやる必要が出るので。

```c++
// 例
IMGUI_API bool Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
```

`NULL` は `nil` だし、 `0` はそのまま `0` なので、簡単なところだけでも対応する。
最悪、インテリセンスに出るようにすることで調べる手間は回避できるのだけど
`const &ImVec2 v = ImVec2(0, 0)` とかはめんどくさいです。
FFI 境界の `struct の value 渡し`, `デフォルト引数` は解決できない場合が多いが、コード生成側で努力する価値はある。

`rust` はここができなくて、故にラッパー側で API を builder パターンに変更していたりするのだけど、
`rust` の `imgui` ラッパーの API を使いたいのではなくて、生の `imgui` が使いたいのだ。
`luajit` の FFI はちょっとラップすることで簡単に解決できる(遅くなるかもしれないが)。

ラッパーを自動で生成するようにできた。

```lua
    -- lua では nil と false のみが 偽 である

    -- wrapper
    Begin = function(name, p_open, flags)
        -- p_open が供給されない場合、デフォルト nil になり、NULL として解釈される
        flags = flags or 0
        -- ffi 呼び出し
        return imgui.Begin(name, p_open, flags)
    end,

    -- wrapper
    Button = function(label, size)
        -- 引数なしの `ffi.new` は zero 詰めする。 `ImVec2(0, 0)` になる。
        size = size or ffi.new('struct ImVec2')
        -- ffi 呼び出し
        return imgui.Button(label, size)
    end,
```

# 可変長引数

```c++
IMGUI_API void Text(const char* fmt, ...)
```

luajit ffi ではそのまま `...` を扱うことができた。

ただし、`%d` のときは、
`LL` をつけて `integer` を渡す。
`number` だとうまくいかない。

```lua
local count = 1LL -- 64bit int. UL もある
imgui.Text("counter = %d", counter)
```

`LL` と `UL` は luajit の拡張らしい。
<https://luajit.org/ext_ffi_api.html>
> Extensions to the Lua Parser
>
> numeric literals with the suffixes LL or ULL as signed or unsigned 64 bit integers

だがしかし、この記法使うと `stylua` がエラーになる。そりゃ、そうだ。

```lua
local count = ffi.new('long long[1]') -- 32bit だとうまくいかない
imgui.Text("counter = %d", counter[0])
```

を使うのがよさそう。

# template class のごまかし

T を pointer としてしか使わない場合は、
`T*` を除去して `void*` にすれば動く。

```c++
template<typename T>
struct ImVector{
    int Size;
    int Capacity;
    T* Data;
};    

```

```lua
ffi.cdef[[
struct ImVector{
    int Size;
    int Capacity;
    void* Data;
};    
]]
```
