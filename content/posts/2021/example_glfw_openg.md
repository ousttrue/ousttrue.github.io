+++
title = "imgui の luajit FFI が動くところまで作った"
date = 2021-07-25
taxonomies.tags = ["luajit", "ffi", "imgui"]
[extra]
image = "./imgui_from_luajit.jpg"
+++

<https://github.com/ousttrue/limgui/blob/master/imgui_ffi/cdef/imgui.lua>

Window System は `GLFW`、3D API は `OpenGL3` を選択。

* SDL2 は、 `HWND` を取得周りが FFI では面倒なことが分かっていたのと、`SDL-Image` などの関連ライブラリ無しで行くつもりだった
* D3D11 のバインディングを作っているとまた時間がかかる。`COM` は C の範囲で実装できるので後でやりたい

ということから、楽そうなものを選択したらそうなった。

## ImFont のメンバー関数呼び出し

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

## C++ デフォルト引数

`ImGui` の `API` は基本的にほぼ C になうように配慮されていて、C++ の昨日は限定的にしか使っていない。

* 関数オーバーロード
* デフォルト引数

である。
で、このデフォルト引数がないと `imgui` の使い勝手が著しく下がる。
リファレンスを確認して、デフォルト値を当ててやる必要が出るので。
`NULL` は `nil` だし、 `0` はそのまま `0` なので、簡単なところだけでも対応する。

```c++
IMGUI_API bool Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
```

最悪、インテリセンスに出るようにすることで調べる手間は回避できるのだけど
`const &ImVec2 v = ImVec2(0, 0)` とかはめんどくさいです。

`rust` はここができなくて、故にラッパー側で API を builder パターンに変更していたりするのだけど、
`rust` の `imgui` ラッパーの API を使いたいのではなくて、生の `imgui` が使いたいのだ。
`lua` は関数がゆるゆる(緩すぎ)なので簡単である(遅くなるかもしれないが)。

FFI 境界の `struct の value 渡し`, `デフォルト引数` は解決できない場合が多いが、
コード生成側で努力する価値はある。

## ImGui 練習

これで、 `glTF` アプリを作る準備が整ってきたのだが、次に `ImGui` 自体の練習をやる。

* Tree
* Table
* Docking System

この3つをマスターする。
これが、軌道に乗れば C# の `WindowsForms` で雑アプリを量産していた時の生産性に匹敵するパワーが得られる目論見。
