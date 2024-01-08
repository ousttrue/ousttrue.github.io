---
title: "BMesh と Subdiv"
date: 2024-01-08
tags: ["blender", "opensubdiv"]
---

久しぶりにモデリングでもしてみるかーということで、
今回はいつも使わない `subdiv` やってみようかと思いました。
そういえば `catmull-clark` って apply しないで import / export できるのかしらと思って調べてみたところ、 `fbx` はできるらしいとわかりました。

実際に blender で export / import してみたところ、 `fbx` は`crease` 付きでexport / import できるではありませんか(blender 以外とのやりとりでできるかはわからない)。
`fbx` 以外だと、 `obj` の独自拡張ができるぽいがよくわからなかった。
`usd` はフォーマットとしてはできるが `blender の usd` はできなさそう、という感想。

suvdiv で import / export するということは四角形が必要なので三角形化されていない 様式が必要よねということで、blender の mesh の様式も調べてみた。 `BMesh` という `interface` で必要な情報を取得したり構築したりできそう。

ということで `BMesh` を直接 export / import できるかつ `subdiv` modifier 対応の入った、 blender addon を作ってみよう。終わったらモデリングしよw。

- [ ] BMesh import / export: 問題ない
- [ ] Armature import / export: 問題ない
- [ ] Subdiv modifier: たぶん問題ない
- [ ] Mirror modifier: たぶん問題ない
- [ ] ShapeKey import / export: ? Modifier の上から ShapeKey 作った場合？
- [ ] WebGL で rendering したい。opensubdiv 移植？wasm とかでできないかのぅ。
- [ ] Unity とか。python bpy で apply すればよかろう

三角形化する前のデータにポータビリティを持たせられるか。
fbx も usd もオーバースペックであり、もっとミニマムなやつ。
subdiv + 四角形 は昔のメタセコではとっくにできていたのだが、 スキニングは無かった。
旧mqoに、スキニングとモーフを足したみたいな使い勝手になればよいでしょ。

# opensubdiv の meson build

https://github.com/ousttrue/OpenSubdiv

