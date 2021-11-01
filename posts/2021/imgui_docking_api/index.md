+++
title = "ImGui の API"
date = 2021-07-28
tags = ["imgui", "luajit", "ffi"]
previewimage = 'dockbuilder.jpg'
+++

<https://github.com/ousttrue/limgui>

ようやく `FFI` の整備ができたので、ImGui の API 調査に進む

# DockingBuilder

`imgui_internal.h` に一連の `Docking` 向けの API がある。

* <https://github.com/ocornut/imgui/issues/2109>

## [PossiblyAShrub/dock_builder_example.cpp](https://gist.github.com/PossiblyAShrub/0aea9511b84c34e191eaa90dd7225969)

変数を流用していてわかりにくいのだが、おそらく下記のような感じだと思う。

```
+----+----+
|    |    |
|Left|----|
|    |Down|
+----+----+
```

```c++
auto root = ImGui::DockBuilderAddNode(dockspace_id, dockspace_flags | ImGuiDockNodeFlags_DockSpace);
                                                                         // 返り値と同じ Left  // 反対側 Right
ImGuiID right;
auto left = ImGui::DockBuilderSplitNode(root, ImGuiDir_Left, 0.2f, nullptr, &right);
                                                                         // 返り値と同じ Down  // 反対側 Up
ImGuiID up;
auto down = ImGui::DockBuilderSplitNode(right, ImGuiDir_Down, 0.25f, nullptr, &up);
```

```
# .imgui.ini 
[Docking][Data]
DockSpace     ID=0x7CF2A649 Window=0x9A404470 Pos=0,30 Size=1200,870 Split=X
  DockNode    ID=0x00000001 Parent=0x7CF2A649 SizeRef=599,900 Selected=0xDA554856 => Left
  DockNode    ID=0x00000002 Parent=0x7CF2A649 SizeRef=599,900 Split=Y
    DockNode  ID=0x00000003 Parent=0x00000002 SizeRef=599,673 CentralNode=1
    DockNode  ID=0x00000004 Parent=0x00000002 SizeRef=599,225 Selected=0xBCCD3F05 => Down
```

* [ ] central node

# Tree

libclang のパース結果の `CXCursor` のツリー

{{ image(path="tree.jpg") }}

* [ ] selection

# Table

glTF を表示してみた。さくさく書けてよさそう。

{{ image(path="table.jpg") }}

