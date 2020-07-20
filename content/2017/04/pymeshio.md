---
Title: "pymeshio再構築計画"
Published: 2017-4-18
Tags: []
---

はじめてのBlenderアドオン開発を読んでいる。pymeshioを更新してBlenderの作法にちゃんと適合させようというわけである。

最近、BlenderのAddOn管理ツールBlender-Add-on-Managerというのを見つけて、どういう動作をしているのか気になった。自作のpymeshioは出てくるのか見てみると出てこなかった。bl_infoの中のコメントの書き方が悪かったらしい。出てくるように直してインストールしてみた。今度はBlenderが発見してくれない。これは、Blenderの検索パスのくせのせいで.がパスに含まれていると出てこないということだった。そもそも、%USERPROFILE%/AppData/Roaming/Blender Foundation/Blender/2.78/scripts/addonsというようなパスにインストールする仕組みになっていることを知らなかったという。
で、ツール経由でインストールしてみたのはいいのだがpymeshioは動かないな。
Blender非依存のpythonライブラリ部分をコピーしなおす必要がある。
むしろ、そっちの方が本体でBlenderはおまけだったという経緯があるのであるが、前からpymeshioのblenderプラグインのメンテナンス性の悪さはこのフォルダ構成が一因であった。この際addonsに直接cloneして動くような構成にする方がいいなぁ。新しいAddOnを再構築するか。
pymeshioはblenderから切り離して開発を継続する。pymeshioと新しいAddOnの共通部分の同期は手動コピペにするｗ
計画

https://github.com/ousttrue/MmdUtility

[x] 0.1
Blender-Add-on-Managerからインストールして動作するように構成する
[x] 0.2
bl.pyを除去する。確かbl.pyはblender2.4と2.6のギャップを埋めて、2.6初期のAPIの不安さを隠蔽するために作った。もはや無用の長物なので取り除く
[x] 0.3
物理の扱いを変える。

http://mrsoramame.jpn.org/archives/138
https://github.com/12funkeys/rigid_bodys_gen

pymeshioを作ったときはBlenderの物理がよくわかっていなかった。
[ ] 1.0
VMD対応
