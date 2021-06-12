---
title: "Three.jsのJSONモデルフォーマット"
date: 2015-12-07
Tags: ['threejs']
---

source
外部のJSONに記述されたモデルを読み込む機能がある。
External models in Three.js
を見てやってみた。
OnLoad(geometry: THREE.Geometry, materials: THREE.Material[]) {
    // create a mesh with models geometry and material
    var material = new THREE.MeshPhongMaterial(materials[0]);
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.rotation.y = -Math.PI / 5;

    this.scene.add(mesh);
    this.Render();
}

OnProgress(event: any) {
    console.log('OnProgress: ', event);
}

OnError(event: any) {
    console.log('OnError: ', event);
}

AddModelFromJson(path: string) {
    var loader = new THREE.JSONLoader(); // init the loader util

    // init loading
    loader.load(path, this.OnLoad.bind(this)
        , this.OnProgress.bind(this)
        , this.OnError.bind(this));
}

JSONLoaderクラスを初期化してloadをコール、loadは非同期に完了してOnLoadコールバックでMeshを組み立ててシーンに追加するという流れ。
OnLoadにMeshが返ってくればいいと思うのだが・・・
モデルはサンプルファイルを探したのだが見つからなかったので、
Three.js の JSONLoader のメモ
を見てBlenderのThree.js exporterでお猿さんを作ってみました。
一応、茶色いマテリアルをつけたのだけどうまくいかず。
フォーマットはどうなっているのか？
cubeもエクスポートしてみた。
cube.json
{
    "faces": [35,2,0,1,3,0,0,1,2,3,35,3,7,6,2,0,3,4,5,0,35,7,5,4,6,0,4,6,7,5,35,0,4,5,1,0,1,7,6,2,35,0,2,6,4,0,1,0,5,7,35,5,7,3,1,0,6,4,3,2],
    "name": "CubeGeometry.1",
    "metadata": {
        "generator": "io_three",
        "vertices": 8,
        "type": "Geometry",
        "uvs": 0,
        "version": 3,
        "faces": 6,
        "materials": 1,
        "normals": 8
    },
    "vertices": [-1,-1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,-1,1,1,1,1,1,-1,-1,1,1,-1],
    "materials": [{
        "depthWrite": true,
        "colorDiffuse": [0,0.64,0.040691],
        "depthTest": true,
        "specularCoef": 50,
        "blending": "NormalBlending",
        "shading": "phong",
        "colorEmissive": [0,0,0],
        "opacity": 1,
        "transparent": false,
        "DbgIndex": 0,
        "visible": true,
        "wireframe": false,
        "colorSpecular": [0.5,0.5,0.5],
        "colorAmbient": [0,0.64,0.040691],
        "DbgName": "Material",
        "DbgColor": 15658734
    }],
    "uvs": [],
    "normals": [-0.577349,-0.577349,-0.577349,-0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,0.577349,0.577349,-0.577349,0.577349,-0.577349,-0.577349,0.577349,0.577349,0.577349,0.577349,-0.577349,0.577349]
}

JSON Model format 3 (Soon to be deprecated)
これっぽいですな。
なるほど。なるほど。
