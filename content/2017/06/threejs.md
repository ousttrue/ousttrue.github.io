---
Title: "threejs再始動"
Published: 2017-6-6
Tags: []
---

前のサイトはgulpを使ってtypescriptでthreejs.jsしていたのだけど、hugoで生成している今サイトでは素のjavascriptかなぁ。
es6の練習を兼ねて。


hugoのmdファイルの中に直書きしてみた
<div id="threejs"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
<script type="text/javascript" src="https://threejs.org/examples/js/controls/OrbitControls.js"></script>
<script>
function createScene()
{
    var scene=new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    var box = new THREE.Mesh(geometry, material);
    box.position.y = 0.5;
    scene.add(box);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0x533E25, wireframe:true} );
    var planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    var toRad=Math.PI / 180;
    planeMesh.rotation.x = 90 * toRad;
    scene.add( planeMesh );

    var axis = new THREE.AxisHelper(1000);
    axis.position.set(0,0,0);
    scene.add(axis);

    return scene;
}

window.addEventListener('DOMContentLoaded', function() {

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.getElementById("threejs").appendChild(renderer.domElement);

    var scene = createScene();

    var camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 1000);
    camera.position.set(2, 3, 5);
    camera.lookAt({x:0, y:0, z:0 });

    var controls = new THREE.OrbitControls(camera);

    var render = function () {
        requestAnimationFrame(render);
        //cube.rotation.x += 1 * Math.PI / 180;
        //cube.rotation.y += 1 * Math.PI / 180;
        //cube.rotation.z += 1 * Math.PI / 180;
        controls.update();
        renderer.render(scene, camera);
    };
    render();
});
</script>

動いた。
なるほど。
ToDo
ちょっとOrbitControlsをカスタマイズしたいね。
メタセコ的なマウスボタンのアサインにしたい

左ドラッグはカメラ操作以外に開けておく
右ドラッグがカメラ回転
中ドラッグがカメラ移動
ホイールがカメラドリー

マウスイベントの取得はWebGLエレメントの上にマウスカーソルがあるときだけ

OrbitControls.jsが原因でテキストボックスに入力できなくなった問題の解決

    stage.addEventListener('mouseover', function() {
            controls.enabled = true;
            document.body.style.cursor = "pointer";
            });

    stage.addEventListener('mouseout', function() {
            controls.enabled = false;
            document.body.style.cursor = "default";
            });




function createScene()
{
    var scene=new THREE.Scene();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    var box = new THREE.Mesh(geometry, material);
    box.position.y = 0.5;
    scene.add(box);

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    var planeGeometry = new THREE.PlaneGeometry( 10, 10, 10, 10 );
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0x533E25, wireframe:true} );
    var planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    var toRad=Math.PI / 180;
    planeMesh.rotation.x = 90 * toRad;
    scene.add( planeMesh );

    var axis = new THREE.AxisHelper(1000);
    axis.position.set(0,0,0);
    scene.add(axis);

    scene.update=function()
    {
        box.rotation.x += 1 * toRad;
        box.rotation.y += 1 * toRad;
        box.rotation.z += 1 * toRad;
    };

    return scene;
}

function onLoaded()
{
    var stage=document.getElementById("threejs");

    var width=stage.clientWidth;
    var height=stage.clientHeight;
    console.log(width, height);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    stage.appendChild(renderer.domElement);

    var scene = createScene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(2, 3, 5);
    camera.lookAt({x:0, y:0, z:0 });

    var controls = new THREE.OrbitControls(camera);
    controls.enabled = false;

    stage.addEventListener('mouseover', function() {
            controls.enabled = true;
            document.body.style.cursor = "pointer";
            });

    stage.addEventListener('mouseout', function() {
            controls.enabled = false;
            document.body.style.cursor = "default";
            });

    var render = function () {
        requestAnimationFrame(render);
        scene.update();
        controls.update();
        renderer.render(scene, camera);
    };
    render();
}

window.addEventListener('DOMContentLoaded', onLoaded);

