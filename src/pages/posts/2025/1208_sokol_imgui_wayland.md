---
date: 2025-12-08
title: sokol-zig-imgui-wayland
tags: [sokol, zig, wayland, imgui]
---

3D の開発環境を刷新するべく、
使用する API や ライブラリを選定した。

- sokol
- zig
- imgui
- wayland

こんな感じである。

SteamOS 上の OpenXR をこれでできるといいなぁという選び方。

sokol の backend は当面 OpenGl で行くが、
sokol の vulkan backend は始まっていた。

https://floooh.github.io/2025/12/01/sokol-vulkan-backend-1.html

将来的には sokol(vulkan) にできそう。

とりあえず今バージョンで動くものとして sokol(opengl )-zig + wayland
動作確認しているのだが、難航。
wayland は sokol, glfw, wayland などの格ライブラリともに最新版でぎりぎり動くという感じで問題が起きやすい。
例えば、 sokol の sapp は wayland 対応中ぽいので、sokol + glfw に退避することにした
(xwayland にすればいいのだが、純正waylandを試みていて DPI 回りのエラー)。
すると、 sokol-zig-imgui が sapp 前提になっていて、これを sokol-zig-glfw 化する作業が発生するのだった。
sokol-imgui-metal というのがあって、これは sapp 無しなので多分動く。

vulkan, wayland がささりがち。
あと imgui もタイミングによってはささる。
なんか、multiviewport とかの API 刷新が進行中ぽい。

## imgui 最新版 bitfield

translate-C がエラーになる。

```
e cannot be directly embedded in structs
    BoxSelectState: ImGuiBoxSelectState = @import("std").mem.zeroes(ImGuiBoxSelectState),
                    ^~~~~~~~~~~~~~~~~~~
.zig-cache/o/ab613bdb691877a4597dc53906184e28/cimgui_all.zig:1470:42: note: opaque declared here
pub const struct_ImGuiBoxSelectState_t = opaque {};
```

imgui-internal.h `from v1.92.0-docking`

```c
//-----------------------------------------------------------------------------
// [SECTION] Box-select support
//-----------------------------------------------------------------------------

struct ImGuiBoxSelectState
{
    // Active box-selection data (persistent, 1 active at a time)
    ImGuiID                 ID;
    bool                    IsActive;
    bool                    IsStarting;
    bool                    IsStartedFromVoid;  // Starting click was not from an item.
    bool                    IsStartedSetNavIdOnce;
    bool                    RequestClear;
    //                           これ👇
    ImGuiKeyChord           KeyMods : 16;       // Latched key-mods for box-select logic.
    ImVec2                  StartPosRel;        // Start position in window-contents relative space (to support scrolling)
    ImVec2                  EndPosRel;          // End position in window-contents relative space
    ImVec2                  ScrollAccum;        // Scrolling accumulator (to behave at high-frame spaces)
    ImGuiWindow*            Window;

    // Temporary/Transient data
    bool                    UnclipMode;         // (Temp/Transient, here in hot area). Set/cleared by the BeginMultiSelect()/EndMultiSelect() owning active box-select.
    ImRect                  UnclipRect;         // Rectangle where ItemAdd() clipping may be temporarily disabled. Need support by multi-select supporting widgets.
    ImRect                  BoxSelectRectPrev;  // Selection rectangle in absolute coordinates (derived every frame from BoxSelectStartPosRel and MousePos)
    ImRect                  BoxSelectRectCurr;

    ImGuiBoxSelectState()   { memset(this, 0, sizeof(*this)); }

};
```

dcimgui の imgui のバージョンは以下のコミットで `v1.92` に切りかわる.

https://github.com/floooh/dcimgui/commit/581c2e909c899c21923c779d4c41ea56ab93bbb4

その直前の版に切り替える。

```zig
        .cimgui = .{
            .url = "git+https://github.com/floooh/dcimgui.git#de39f1d7106d448909d9776eb0049fbfed24d056",
            .hash = "cimgui-0.1.0-44ClkQ_ekgDNAf1N4Fl1mJnVDyO83xbcqQElNUtURXcA",
        },
```

別のエラーが出る。

```
error: undefined symbol: _ZN15ImGuiPlatformIO21ClearPlatformHandlersEv
```

sokol-zig も古くする必要がある。
他のところにも影響が出そう。
むしろ、最新の imgui に patch を当てる方が楽かもしれない。

### error の境界

これはエラー

```zig
    const opt_docking = true;
```

これは通る

```zig
    const opt_docking = false;
```

奇妙なのが次で、`zig build -Ddocking=true` `zig build -Ddocking=false` の両方が通ってしまう。

```zig
    const opt_docking = b.option(bool, "docking", "Build with docking support") orelse false;
```

うーん。
ここまで, zig-0.15.2 の挙動。
zig の bug でたまたまビルドできている状態の気がする。

こうなったら、libclang で自前 translate するか。
python で実験していたコードがあったはずだ。

[Zigに自動変換できないC言語の例](https://zenn.dev/tetsu_koba/articles/214644ef10fc52)

> ビットフィールドを含むstruct
> そのstructは opaque {} になる。
> C言語のビットフィールドはメモリ配置がコンパイラ依存でバイナリ互換性がないためだと思われる。
> opaque {} をメンバに含むstruct

https://github.com/ziglang/translate-c/issues/179

imgui の bitfield が増える趨勢にあるようなので、
ちゃんとした対策を持っている方が良さそうなのだ。

https://github.com/ousttrue/ManglingImgui

こいつをベースにやってみるか。
