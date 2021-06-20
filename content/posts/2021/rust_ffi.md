+++
title = "rust の ffi"
date = 2021-06-20
taxonomies.tags = ["rust"]
+++

rust の FFI に取り組んでいた。
結局、 sdl binding と imgui binding を自作した。

両方とも、既存の crate があるのに何故わざわざ自作するのかと言えば、
ラップされて使い方が変わったところを学ぶのが面倒くさかったからじゃ。
[SDL](https://crates.io/crates/sdl2) は　`HWND` を取得する方法がわかりにくくて `SDL_Event` を `imgui` に渡す方法はわからなかった。
[imgui](https://crates.io/crates/imgui) は最新版の `docking` ブランチが使いたかった。

[clang-sys](https://crates.io/crates/clang-sys) を使って rust の FFI コードを生成し、
[cc](https://crates.io/crates/cc) を使って `build.rs` でライブラリをビルドした。
これで、 `c` `c++` のライブラリをソースビルドしてスタティックリンクし、 `FFI` で関数を呼び出し放題。

`imgui` の FFI 生成の方が簡単で、 `SDL` の方は C のマクロに苦しんだ(雑に対応)。
とはいえ、わりと素直に記述できるので快適であった。

おかげで、 rust の FFI 周りに対する習熟度がだいぶ上がった。

## できないこと

POD の struct を return する関数を呼び出すとクラッシュした。

```c++
ImVec2 ImGui::GetContentRegionAvail();
```

D言語だけど

https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org

の件らしく、C++ 側でラップした。

```c++
void pGetContentRegionAvail(ImVec2 *pOut) {
  if (pOut) {
    *pOut = GetContentRegionAvail();
  }
}
```

## 自由に static link できる

build.rs を駆使して自由にリンクできるので、スタティックリンクとダイナミックリンクを制御できるので便利。
特に Windows の場合、システムに共通のライブラリがインストールされていることが期待できないので、
DLLを作ってコピーした入りパスを通すよりは、スタティックリンクする方が気楽。
今回は `cc` でコンパイルしたけど、`c++/c` は CMake でビルドする方が管理しやすいかもしれない。
