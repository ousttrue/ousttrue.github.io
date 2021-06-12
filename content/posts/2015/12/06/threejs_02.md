---
title: "Three.jsにマウスによる視点操作を入れる"
date: 2015-12-06
Tags: []
---




source
今回は、TrackballControlsを導入します。
TrackballControlsはThree.jsのライブラリ内に含まれるのではなくexamples扱いなので、
直接コードを入手。
使い方は、TrackballControlsのソースを見ると
以下のようにするらしい。
controls = new THREE.TrackballControls( camera );

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = false;
controls.noPan = false;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

controls.keys = [ 65, 83, 68 ];

controls.addEventListener( 'change', render );

もうひとつ更新用に以下のコードも必要。
function animate() {
    requestAnimationFrame( animate );
    controls.update();
}

やってみよう。
ベースのレンダリングシーン
シーンに適当にキューブを描画するコード。
前回の記事をほぼ流用だけどいくつか変更点がある。

namespaceでかこって名前衝突から防衛
CreateCameraを独立
キューブがアニメーションする部分をオミット

threejs_02.ts
/// <reference path='../../../../typings/tsd.d.ts' />


namespace Renderer02 {

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

        CreateCamera() {
            this.camera = new THREE.PerspectiveCamera(75
                , this.$container.width() / this.$container.height()
                , 0.1, 1000);
            this.camera.position.z = 5;
        }

        CreateScene() {
            this.scene = new THREE.Scene();

            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            this.mesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.mesh);
        }

        Render() {
            // render
            this.renderer.render(this.scene, this.camera);
        }
    }

    var renderer = new Renderer();
    export function initialize($container: JQuery) {

        renderer.CreateRenderer($container);
        renderer.CreateCamera();
        renderer.CreateScene();

        renderer.Render();
    }
}

$(() => {
    var $container = $('div#renderer');
    Renderer02.initialize($container);
});


TypeScript定義を追加する
まず、TrackballControlsの型定義を追加する。
declare module THREE {
    export class TrackballControls
    {
        constructor(camera: THREE.Camera);
        rotateSpeed: number;
        zoomSpeed: number;
        panSpeed: number;
        noZoom: boolean;
        noPan: boolean;
        staticMoving: boolean;
        dynamicDampingFactor: number;
        keys: number[];
        addEventListener(event: string, callback: Function):void;
        update():void;
    }
}

TrackballControlsを初期化
// Rendererのメソッドを修正
    CreateCamera() {
        this.camera = new THREE.PerspectiveCamera(75
            , this.$container.width() / this.$container.height()
            , 0.1, 1000);
        this.camera.position.z = 5;

        // 以下を追加
        this.controls = new THREE.TrackballControls(this.camera);

        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

        this.controls.noZoom = false;
        this.controls.noPan = false;

        this.controls.staticMoving = true;
        this.controls.dynamicDampingFactor = 0.3;

        this.controls.keys = [65, 83, 68];

        // trackballに変化があった時だけ描画を呼ぶ
        this.controls.addEventListener('change', this.Render.bind(this));
    }
    
// Rendererのメソッドを追加
    Animate() {
        requestAnimationFrame(this.Animate.bind(this));
        this.controls.update();
    }

// Animate呼び出しを追加
    export function initialize($container: JQuery) {

        renderer.CreateRenderer($container);
        renderer.CreateCamera();
        renderer.CreateScene();

        renderer.Render();
        renderer.Animate(); // 追加
    }

動いたがWindow全体のマウスイベントが取られていてこれじゃない。
canvasの親になったdivをマウスイベントの対象にしたい。
div#rendererを操作対象にする
TrackballControls.jsを見てたら
THREE.TrackballControls = function ( object, domElement ) {
}

という記述を発見。第２引数にhtmlエレメントを渡せるらしい。
定義を修正。
// 定義
    constructor(camera: THREE.Camera, element?: Element);
    
// 呼び出し
   this.controls = new THREE.TrackballControls(this.camera, this.$container[0]);

想定した動きになった。
マウスカーソルを変えてみる
cssの話だけれど。
<div id="renderer" style="width:300px;height:200px;cursor:pointer;"></div>

    $container
        .mousedown(function(event) {
            switch (event.button) {
                case 0:
                    $(this).css({ cursor: 'pointer' });
                    break;

                case 1:
                    $(this).css({ cursor: 'n-resize' });
                    break;
                    
                case 2:
                    $(this).css({ cursor: 'move' });
                    break;
            }
        })
        .mouseup(function(event){
            $(this).css({cursor: 'pointer'});
        })
    ;


