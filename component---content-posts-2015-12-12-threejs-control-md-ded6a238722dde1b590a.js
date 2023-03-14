"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2066],{4793:function(n,e,t){t.r(e);var s=t(1151),r=t(7294);function a(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,s.ah)(),n.components);return r.createElement(r.Fragment,null,r.createElement(e.p,null,'"W" translate | "E" rotate | "R" scale | "+" increase size | "-" decrease size\nPress "Q" to toggle world/local space, keep "Ctrl" down to snap to grid'),"\n",r.createElement(e.pre,null,r.createElement(e.code,null,'source\n今回は、本家サイトのサンプル\nhttp://threejs.org/examples/#misc_controls_transform\nをやってみよう。\nまず、TransformControlsのtypescriptインターフェースを用意する。\nというか書きながら作った。\nTransformControls.d.ts。モジュールの細かいところがよくわからん・・・\ndeclare module THREE {\n    export class TransformControls extends THREE.Mesh {\n        constructor(camera: THREE.Camera, element: Element);\n        update():void;\n        addEventListener(event: string, callback: Function): void;\n        attach(mesh: THREE.Mesh): void;\n\n        setSpace(space: string): void;\n        setTranslationSnap(snap: number): void;\n        setRotationSnap(radians: number): void;\n        setMode(mode: string): void;\n        setSize(size: number): void;\n\n        space: string;\n        size: number;\n    }\n}\n\nTransformControlsを初期化する。カメラとhtmlノードを渡して初期化する\nCreateTransformControl(mesh: THREE.Mesh) {\n    this.transform = new THREE.TransformControls(this.camera, this.renderer.domElement);\n    this.transform.addEventListener(\'change\', () => this.Render());\n    this.transform.attach(mesh);\n    this.scene.add(this.transform);\n\n    window.addEventListener(\'keydown\', (event: KeyboardEvent) => {\n\n        switch (event.keyCode) {\n\n            case 81: // Q\n                this.transform.setSpace(this.transform.space === "local" ? "world" : "local");\n                break;\n\n            case 17: // Ctrl\n                this.transform.setTranslationSnap(100);\n                this.transform.setRotationSnap(THREE.Math.degToRad(15));\n                break;\n\n            case 87: // W\n                this.transform.setMode("translate");\n                break;\n\n            case 69: // E\n                this.transform.setMode("rotate");\n                break;\n\n            case 82: // R\n                this.transform.setMode("scale");\n                break;\n\n            case 187:\n            case 107: // +, =, num+\n                this.transform.setSize(this.transform.size + 0.1);\n                break;\n\n            case 189:\n            case 109: // -, _, num-\n                this.transform.setSize(Math.max(this.transform.size - 0.1, 0.1));\n                break;\n\n        }\n    });\n\n    window.addEventListener(\'keyup\', (event: KeyboardEvent) => {\n\n        switch (event.keyCode) {\n\n            case 17: // Ctrl\n                this.transform.setTranslationSnap(null);\n                this.transform.setRotationSnap(null);\n                break;\n\n        }\n\n    });\n}\n')),"\n",r.createElement(e.p,null,"マウスイベントを監視する Html ノードと、マウスの動きをどのように解釈するかを知るためにカメラが必要ということですね。"))}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?r.createElement(e,n,r.createElement(a,n)):a(n)}},1151:function(n,e,t){t.d(e,{ah:function(){return a}});var s=t(7294);const r=s.createContext({});function a(n){const e=s.useContext(r);return s.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}}}]);
//# sourceMappingURL=component---content-posts-2015-12-12-threejs-control-md-ded6a238722dde1b590a.js.map