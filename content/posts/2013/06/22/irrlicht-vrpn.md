---
title: "IrrlichtにVRPNを合体する"
date: 2013-06-22
Tags: []
---

IrrlichtにVRPNを合体する
遂にOculusが発送されたらしくHongKong
Postから国内に入ったらしい。今日明日には来るで。
vrpnを仕込む
Oculusが来たら遊ぶべくIrrlichにさらにvrpnを仕込むことにした。
外部入力はこれで一括して捌こうと構想している。
さしあたってはOculusの傾き情報(Quaternion)、マウス、コントローラの入力をvrpn経由にしようかと。
さらには、
Oculusは位置情報が無いのでKinectからスケルトン情報を受けて移動できるようにしたりWiiコン入力をとったりしたい。
WiiMote
plusの内臓ジャイロの値を取れるソースも発見したのでキネクトで手の位置を取ってWiiコンの傾きと合体すればいい感じになるのではないかと妄想(hydraみたいに手が出てくるとこまでいけるのではないか)。
ゆくゆくはARToolKitやOpenCVのマーカー式やつもvrpn経由で合体しやすくなる。
<pre>
         oculus  kinect wiimote 
          A |        |     |
rendering | | sensor |     |
          | V        |     |
      irrlicht <-----+-----+

</pre>

ということでvrpn作業開始。
