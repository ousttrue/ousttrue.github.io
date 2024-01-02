import * as THREE from 'three';

export class App {
  constructor(canvas: HTMLCanvasElement) {
    // 縦横のサイズをウィンドウから取得
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 1.5;
    // キャンバスを指定
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor('#000'); // 背景黒

    // カメラを作成
    const fov = 45; // カメラの垂直視野角
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
    camera.position.z = 3;

    // メッシュを作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: '#fff' // オブジェクト白
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI * 0.15; // x軸の回転角(ラジアン)
    mesh.rotation.y = Math.PI * 0.25; // y軸の回転角(ラジアン)

    // ライトを作成
    const light = new THREE.PointLight();
    // ライトを手前右上に移動
    light.position.x = 0.5;
    light.position.y = 0.5;
    light.position.z = 3.5;

    // シーンを作成
    const scene = new THREE.Scene();
    // メッシュとライトを追加
    scene.add(mesh);
    scene.add(light);
    // カメラで撮影したシーンをcanvas要素に描画
    renderer.render(scene, camera);
  }
}
