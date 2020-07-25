---
Title: "Three.jsのトランスフォームコントロールでメッシュをマウスで移動"
date: 2015-12-12
Tags: []
---


"W" translate | "E" rotate | "R" scale | "+" increase size | "-" decrease size
Press "Q" to toggle world/local space, keep "Ctrl" down to snap to grid





source
今回は、本家サイトのサンプル
http://threejs.org/examples/#misc_controls_transform
をやってみよう。
まず、TransformControlsのtypescriptインターフェースを用意する。
というか書きながら作った。
TransformControls.d.ts。モジュールの細かいところがよくわからん・・・
declare module THREE {
    export class TransformControls extends THREE.Mesh {
        constructor(camera: THREE.Camera, element: Element);
        update():void;
        addEventListener(event: string, callback: Function): void;
        attach(mesh: THREE.Mesh): void;

        setSpace(space: string): void;
        setTranslationSnap(snap: number): void;
        setRotationSnap(radians: number): void;
        setMode(mode: string): void;
        setSize(size: number): void;
        
        space: string;
        size: number;
    }
}

TransformControlsを初期化する。カメラとhtmlノードを渡して初期化する
CreateTransformControl(mesh: THREE.Mesh) {
    this.transform = new THREE.TransformControls(this.camera, this.renderer.domElement);
    this.transform.addEventListener('change', () => this.Render());
    this.transform.attach(mesh);
    this.scene.add(this.transform);

    window.addEventListener('keydown', (event: KeyboardEvent) => {

        switch (event.keyCode) {

            case 81: // Q
                this.transform.setSpace(this.transform.space === "local" ? "world" : "local");
                break;

            case 17: // Ctrl
                this.transform.setTranslationSnap(100);
                this.transform.setRotationSnap(THREE.Math.degToRad(15));
                break;

            case 87: // W
                this.transform.setMode("translate");
                break;

            case 69: // E
                this.transform.setMode("rotate");
                break;

            case 82: // R
                this.transform.setMode("scale");
                break;

            case 187:
            case 107: // +, =, num+
                this.transform.setSize(this.transform.size + 0.1);
                break;

            case 189:
            case 109: // -, _, num-
                this.transform.setSize(Math.max(this.transform.size - 0.1, 0.1));
                break;

        }
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {

        switch (event.keyCode) {

            case 17: // Ctrl
                this.transform.setTranslationSnap(null);
                this.transform.setRotationSnap(null);
                break;

        }

    });
}

マウスイベントを監視するHtmlノードと、マウスの動きをどのように解釈するかを知るためにカメラが必要ということですね。
