---
Title: "グリッドと軸と光源とFPS表示を入れる"
Published: 2015-12-6
Tags: []
---




source
シーンを強化してみる。
軸
先人が記事を残してくれていたので楽ちん。
Three.js　AxisHelper
//軸の長さ１０００
var axis = new THREE.AxisHelper(1000);   
//sceneに追加
this.scene.add(axis);

グリッド
Three.js GridHelper
//GridHelper(大きさ, １マスの大きさ)
var grid = new THREE.GridHelper(100, 10);
//シーンオブジェクトに追加
this.scene.add(grid);

光源
ライトを追加して、マテリアルを光に反応するタイプに付け替える。
// lights
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(0, 0.7, 0.7);
this.scene.add(directionalLight);

// materialを交換
//var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

FPS状態表示
WebGLのデモでよく見かけるFPS表示を入れてみる。
https://github.com/mrdoob/stats.js
ライブラリと定義をインストール。
> bower install stats.js --save
> tsd query stats -rosa install

２箇所更新になる。
// add stats
$container.css({ position: 'relative' });
this.stats = new Stats();
this.stats.domElement.style.position = 'absolute';
this.stats.domElement.style.top = '0px';
this.stats.domElement.style.zIndex = '100';
$container.append(this.stats.domElement);

// update stats
Animate() {
    requestAnimationFrame(this.Animate.bind(this));
    this.controls.update();
    this.stats.update();
}

