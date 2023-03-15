"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2809],{8922:function(e,n,r){r.r(n),r.d(n,{default:function(){return s}});var t=r(1151),i=r(7294);function a(e){const n=Object.assign({pre:"pre",code:"code"},(0,t.ah)(),e.components);return i.createElement(n.pre,null,i.createElement(n.code,null,'\nsource\nTypeScriptを学び始めた目的のひとつであるThree.jsをようやくはじめた。\n「Node.jsとSocket.IOで連結してリアルタイムにシーンをアニメーションするっ」とか\n遠大な構想だったのだが小さいところから始めよう。\nhello world的な\n本家のgetting started\nhtmlにスクリプトを追加。\n<script src="threejs_01.js"><\/script>\n\nthreejs_01.js\nvar scene = new THREE.Scene();\nvar camera = new THREE.PerspectiveCamera(75\n    , window.innerWidth / window.innerHeight\n    , 0.1, 1000);\n\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nvar geometry = new THREE.BoxGeometry(1, 1, 1);\nvar material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nvar cube = new THREE.Mesh(geometry, material);\nscene.add(cube);\n\ncamera.position.z = 5;\n\nvar render = function() {\n    requestAnimationFrame(render);\n\n    cube.rotation.x += 0.1;\n    cube.rotation.y += 0.1;\n\n    renderer.render(scene, camera);\n};\n\nrender();\n\ntypescript化する。\ngulpにタスクを仕込んだので拡張子をtsにして待つのみ。\nerror TS2304: Cannot find name \'THREE\'\n\nthree.jsの型定義が無いので追加。\n> tsd query three -rosa install\n\ntsの先頭にtsdの参照を追加\n/// <reference path=\'../../../../typings/tsd.d.ts\' />\n\n無事typescript化に成功。\ntsconfig.jsonはこんな感じ。\n{\n    "compilerOptions": {\n        "module": "commonjs",\n        "target": "es5",\n        "noImplicitAny": true,\n        "outDir": ".",\n        "rootDir": ".",\n        "sourceMap": false\n    },\n    "exclude": [\n        "node_modules"\n    ]\n}\n\ncanvasの作成先を変える\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nを変えよう。\ndom操作等にjqueryを使う意向なのでjquery導入。\n> tsd query jquery -rosa install\n\nhtmlにdivを追加して\n<div id="renderer" style="width:300px;height:200px;"></div>\n\nレンダラのサイズと親を変える。\nvar $container=$(\'div#renderer\');\nrenderer.setSize($container.width(), $container.height());\n$container.append(renderer.domElement);\n\nカメラのアスペクト比も変える。\nvar camera = new THREE.PerspectiveCamera(75\n    , $container.width()/$container.height()\n    , 0.1, 1000);\n\nTypeScript風に書き換えてみる\nせっかくTypeScriptにしているのでフリーダムに書き換えてみる。\n/// <reference path=\'../../../../typings/tsd.d.ts\' />\n\n\nclass Renderer {\n    $container: JQuery;\n    renderer: THREE.Renderer;\n\n    scene: THREE.Scene;\n    camera: THREE.Camera;\n    mesh: THREE.Mesh;\n\n    CreateRenderer($container: JQuery) {\n        this.$container = $container;\n\n        this.renderer = new THREE.WebGLRenderer();\n        this.renderer.setSize($container.width(), $container.height());\n        $container.append(this.renderer.domElement);\n    }\n\n    CreateScene() {\n        this.scene = new THREE.Scene();\n\n        var geometry = new THREE.BoxGeometry(1, 1, 1);\n        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\n        this.mesh = new THREE.Mesh(geometry, material);\n        this.scene.add(this.mesh);\n\n        this.camera = new THREE.PerspectiveCamera(75\n            , this.$container.width() / this.$container.height()\n            , 0.1, 1000);\n        this.camera.position.z = 5;\n    }\n\n    Render(){\n        requestAnimationFrame(this.Render.bind(this));\n\n        // update scene\n        this.mesh.rotation.x += 0.1;\n        this.mesh.rotation.y += 0.1;\n\n        // render\n        this.renderer.render(this.scene, this.camera);\n    }\n}\nvar renderer = new Renderer();\n\n\n$(() => {\n    var $container = $(\'div#renderer\');\n    renderer.CreateRenderer($container);\n    renderer.CreateScene();\n\n    renderer.Render();\n});\n'))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?i.createElement(n,e,i.createElement(a,e)):a(e)};r(8678);function c(e){let{data:n,children:r}=e;return i.createElement(i.Fragment,null,i.createElement("h1",null,n.mdx.frontmatter.title),i.createElement(t.Zo,null,r))}function s(e){return i.createElement(c,e,i.createElement(o,e))}},8678:function(e,n,r){r(7294)},1151:function(e,n,r){r.d(n,{Zo:function(){return c},ah:function(){return a}});var t=r(7294);const i=t.createContext({});function a(e){const n=t.useContext(i);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const o={};function c({components:e,children:n,disableParentContext:r}){let c;return c=r?"function"==typeof e?e({}):e||o:a(e),t.createElement(i.Provider,{value:c},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2015-12-06-threejs-01-md-23fdd71f02a715e1a750.js.map