---
title: "大きさ基準が必要だ"
date: 2013-06-28
tags: []
---

大きさ基準が必要だ
pmdの読み込み時スケーリングを実装した。
とりあえずドワーフと同じくらいの大きさになるように2.5倍という適当な数値を選択したが、
mmdモデルを一切スケーリングしない(Mikuが20高さ)か実世界のメートル/cm等の単位系になっているかのどちらかにしたい。
現状だと立った状態のカメラの高さが50くらいという謎の単位系であり、
Irrlichtのmediaディレクトリ内のファイル群と大きさがだいたい合うこと以外にメリットが無い。
Oculus使っているので実単位に合わせた方がよいな。cm単位系がよさげな気がする。
しかし、bullet的には9.8Gの方が98Gよりわかりやすような気がする。
bullet界はメートル系でレンダリングはcm系にするという手もあるがはまりそうではある。

シェーダーに梃入れしてもっとMMD風味のトゥーンレンダリングにしよう。
