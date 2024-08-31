---
date: 2023-03-18
tags:
  - 3D
  - c++
  - gizmo
title: imguizmo 研究
---

https://github.com/CedricGuillemet/ImGuizmo

Gizmo ライブラリ選定。
今回は、 `ImGuizmo` を選択。

# ImApp => glfw + imgui backend

example は ImGui の backend を使わずに独自のバックエンド ImApp を使用している。

これを `glfw` に置き換ええつつ、 `imgui` を git の docking branch で置き換えてみた `1.89.5 WIP`。

Windows モードは問題ないが、フルスクリーンモードの描画がずれた。

`VIEWPORT_MODE` の ImDrawList の座標系に仕様変更があることが原因ぽい。

Window の描画範囲が `(0, 0, io.DisplaySize.x, io.DisplaySize.y)`

だったのが

`(viewport.Pos.x, viewport.Pos.y, viewport.Size.x, viewport.Size.y)`
に変わった。座標系は WindowLocal から Desktop 全体になった。
・・・マルチモニターだとどうなるんだろうと思ったが、使うときになおせばよいか。
