---
date: 2017-05-06
tags:
- Blender
title: Blenderで揺れ物
---

MmdUtilityでmmdモデルをインポートして物理を取り入れるべく、Blenderの物理で揺れ物をセットアップする方法を調べている。

剛体を入れる
素直にmeshオブジェクトを作って剛体を設定していく。
剛体とボーンを連動させる
ボーンの動きを剛体に反映する(ゆれない。ゆれものの接続先)
Kinematic、BlenderではPassiveかつAnimatedになる設定。
ボーンの動きを剛体に伝えなければならないので剛体オブジェクトにコンストレイントを追加する。copy transformかchild ofが候補になる。どっちも問題がある。copy transformにするとボーンのヘッドのtransformを剛体の中心にコピーするのでずれる。child ofにすると剛体の親とボーンの両方の影響を受けるようになってしまうので原点から移動できなくなる。前者の方が致命的なので後者を選択して、剛体の親オブジェクトが原点に留まるように工夫することにする。
剛体の動きを骨に反映する(ゆれもの)
Dynamic,  BlenderではActive。
剛体の動きをボーンに伝えるべく、ポーズボーンにコンストレイントを追加する。child ofで剛体を指定する。この場合、親ボーンと剛体の両方の影響を受けてしまうので親ボーンの影響を切らねばならない。parentにNoneをセットするか、use_inherit_rotation, use_inherit_scale, use_inherit_locationをFalseにするのだけど、そうすると今度はポーズを変えたときについてこなくなる。一筋縄でいかないな・・・。ポーズ変えたときに追随させるスクリプトを用意すべしということか。
参考

* https://github.com/12funkeys/rigid_bodys_gen
* http://mrsoramame.jpn.org/archives/138

