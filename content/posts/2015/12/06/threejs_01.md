---
title: "TypeScriptでThree.jsことはじめ"
date: 2015-12-06
Tags: []
---



source
TypeScriptを学び始めた目的のひとつであるThree.jsをようやくはじめた。
「Node.jsとSocket.IOで連結してリアルタイムにシーンをアニメーションするっ」とか
遠大な構想だったのだが小さいところから始めよう。
hello world的な
本家のgetting started
htmlにスクリプトを追加。
<script src="threejs_01.js"></script>

threejs_01.js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75
    , window.innerWidth / window.innerHeight
    , 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var render = function() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

render();

typescript化する。
gulpにタスクを仕込んだので拡張子をtsにして待つのみ。
error TS2304: Cannot find name 'THREE'

three.jsの型定義が無いので追加。
> tsd query three -rosa install

tsの先頭にtsdの参照を追加
/// <reference path='../../../../typings/tsd.d.ts' />

無事typescript化に成功。
tsconfig.jsonはこんな感じ。
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": ".",
        "rootDir": ".",
        "sourceMap": false
    },
    "exclude": [
        "node_modules"
    ]
}

canvasの作成先を変える
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

を変えよう。
dom操作等にjqueryを使う意向なのでjquery導入。
> tsd query jquery -rosa install

htmlにdivを追加して
<div id="renderer" style="width:300px;height:200px;"></div>

レンダラのサイズと親を変える。
var $container=$('div#renderer');
renderer.setSize($container.width(), $container.height());
$container.append(renderer.domElement);

カメラのアスペクト比も変える。
var camera = new THREE.PerspectiveCamera(75
    , $container.width()/$container.height()
    , 0.1, 1000);

TypeScript風に書き換えてみる
せっかくTypeScriptにしているのでフリーダムに書き換えてみる。
/// <reference path='../../../../typings/tsd.d.ts' />


class Renderer {
    $container: JQuery;
    renderer: THREE.Renderer;

    scene: THREE.Scene;
    camera: THREE.Camera;
    mesh: THREE.Mesh;

    CreateRenderer($container: JQuery) {
        this.$container = $container;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize($container.width(), $container.height());
        $container.append(this.renderer.domElement);
    }

    CreateScene() {
        this.scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        this.camera = new THREE.PerspectiveCamera(75
            , this.$container.width() / this.$container.height()
            , 0.1, 1000);
        this.camera.position.z = 5;
    }
    
    Render(){
        requestAnimationFrame(this.Render.bind(this));

        // update scene
        this.mesh.rotation.x += 0.1;
        this.mesh.rotation.y += 0.1;

        // render
        this.renderer.render(this.scene, this.camera);
    }
}
var renderer = new Renderer();


$(() => {
    var $container = $('div#renderer');
    renderer.CreateRenderer($container);
    renderer.CreateScene();
    
    renderer.Render();
});

