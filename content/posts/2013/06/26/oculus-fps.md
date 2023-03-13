---
title: "FPSカメラにOculus回転を仕込んだ"
date: 2013-06-26
tags: []
---

FPS カメラに Oculus 回転を仕込んだ
Irrlicht の CSceneNodeAnimatorCameraFPS に Oculus を合体した。
Irrlicht のカメラが思ったよりいろいろやっていたのと
ビュー行列を直接扱っていないのに手間取ったがとりあえず当初の目的を達成。
どうにも都合が悪かったので本体をちょっと拡張した。

```cpp
class CSCameraSceneNode
{
    core::marix4 LeftAffector;
};
```

レンダリング直前にビュー行列に乗算する行列をセットできるのだが
これが右からの乗算なので、
左からの乗算を追加してこれに Oculus の回転を表す行列をセットできるようにした。
これを踏まえて CSceneNodeAnimatorCameraFPS をコピーして CSceneNodeAnimatorCameraOculusOnFPS を作った。
こいつは FPS カメラのマウスの上下移動を無視するのと libOVR からの回転値取得と左行列を追加する機能をもつ。
コードはこれなのだけど
https://github.com/ousttrue/onibi/blob/master/irrlicht/examples/HMDIrrlicht/CSceneNodeAnimatorCameraOculusOnFPS.cpp
日記に全部書くには長いし、サンプルが改造版の Irrlicht に依存するので紹介し辛い感じだなぁ。
オフスクリーンレンダリングとシェーダーをサポートした今風の glut みたいなフレームワークがあるとよいのだけど。
今度は mmd 表示周りに着手して表示途中までできた。
しかし Irrlicht 界のスケーリングの基準がよくわからず。cm のような気もするがなんかもっと適当な値のような気もする。
画像右側の身切れているのは Irrlicht サイズの Dwarf である。
mmd 界はミクさんの身長 20 を基準とする統一単位なのだが何かしら基準を決めねばならぬ。
物理の挙動の都合上スケーリングしたくないなーという事情がありどうしたものか。

スカイボックスも Oculus で見ると見違えるものがあるなー。
テクスチャとライティングを解決する。 あと pmx。
