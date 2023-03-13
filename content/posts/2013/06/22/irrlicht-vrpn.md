---
title: "IrrlichtにVRPNを合体する"
date: 2013-06-22
tags: []
---

Irrlicht に VRPN を合体する
遂に Oculus が発送されたらしく HongKong
Post から国内に入ったらしい。今日明日には来るで。
vrpn を仕込む
Oculus が来たら遊ぶべく Irrlich にさらに vrpn を仕込むことにした。
外部入力はこれで一括して捌こうと構想している。
さしあたっては Oculus の傾き情報(Quaternion)、マウス、コントローラの入力を vrpn 経由にしようかと。
さらには、
Oculus は位置情報が無いので Kinect からスケルトン情報を受けて移動できるようにしたり Wii コン入力をとったりしたい。
WiiMote
plus の内臓ジャイロの値を取れるソースも発見したのでキネクトで手の位置を取って Wii コンの傾きと合体すればいい感じになるのではないかと妄想(hydra みたいに手が出てくるとこまでいけるのではないか)。
ゆくゆくは ARToolKit や OpenCV のマーカー式やつも vrpn 経由で合体しやすくなる。

```
         oculus  kinect wiimote
          A |        |     |
rendering | | sensor |     |
          | V        |     |
      irrlicht <-----+-----+

```

ということで vrpn 作業開始。
