"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2809],{8922:function(e,n,r){r.r(n),r.d(n,{default:function(){return h}});var t=r(1151),a=r(7294);function i(e){const n=Object.assign({span:"span"},(0,t.ah)(),e.components);return a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">\nsource\nTypeScriptを学び始めた目的のひとつであるThree.jsをようやくはじめた。\n「Node.jsとSocket.IOで連結してリアルタイムにシーンをアニメーションするっ」とか\n遠大な構想だったのだが小さいところから始めよう。\nhello world的な\n本家のgetting started\nhtmlにスクリプトを追加。\n&lt;script src="threejs_01.js">&lt;/script>\n\nthreejs_01.js\nvar scene = new THREE.Scene();\nvar camera = new THREE.PerspectiveCamera(75\n    , window.innerWidth / window.innerHeight\n    , 0.1, 1000);\n\nvar renderer = new THREE.WebGLRenderer();\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nvar geometry = new THREE.BoxGeometry(1, 1, 1);\nvar material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nvar cube = new THREE.Mesh(geometry, material);\nscene.add(cube);\n\ncamera.position.z = 5;\n\nvar render = function() {\n    requestAnimationFrame(render);\n\n    cube.rotation.x += 0.1;\n    cube.rotation.y += 0.1;\n\n    renderer.render(scene, camera);\n};\n\nrender();\n\ntypescript化する。\ngulpにタスクを仕込んだので拡張子をtsにして待つのみ。\nerror TS2304: Cannot find name \'THREE\'\n\nthree.jsの型定義が無いので追加。\n> tsd query three -rosa install\n\ntsの先頭にtsdの参照を追加\n/// &lt;reference path=\'../../../../typings/tsd.d.ts\' />\n\n無事typescript化に成功。\ntsconfig.jsonはこんな感じ。\n{\n    "compilerOptions": {\n        "module": "commonjs",\n        "target": "es5",\n        "noImplicitAny": true,\n        "outDir": ".",\n        "rootDir": ".",\n        "sourceMap": false\n    },\n    "exclude": [\n        "node_modules"\n    ]\n}\n\ncanvasの作成先を変える\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\nを変えよう。\ndom操作等にjqueryを使う意向なのでjquery導入。\n> tsd query jquery -rosa install\n\nhtmlにdivを追加して\n&lt;div id="renderer" style="width:300px;height:200px;">&lt;/div>\n\nレンダラのサイズと親を変える。\nvar $container=$(\'div#renderer\');\nrenderer.setSize($container.width(), $container.height());\n$container.append(renderer.domElement);\n\nカメラのアスペクト比も変える。\nvar camera = new THREE.PerspectiveCamera(75\n    , $container.width()/$container.height()\n    , 0.1, 1000);\n\nTypeScript風に書き換えてみる\nせっかくTypeScriptにしているのでフリーダムに書き換えてみる。\n/// &lt;reference path=\'../../../../typings/tsd.d.ts\' />\n\n\nclass Renderer {\n    $container: JQuery;\n    renderer: THREE.Renderer;\n\n    scene: THREE.Scene;\n    camera: THREE.Camera;\n    mesh: THREE.Mesh;\n\n    CreateRenderer($container: JQuery) {\n        this.$container = $container;\n\n        this.renderer = new THREE.WebGLRenderer();\n        this.renderer.setSize($container.width(), $container.height());\n        $container.append(this.renderer.domElement);\n    }\n\n    CreateScene() {\n        this.scene = new THREE.Scene();\n\n        var geometry = new THREE.BoxGeometry(1, 1, 1);\n        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\n        this.mesh = new THREE.Mesh(geometry, material);\n        this.scene.add(this.mesh);\n\n        this.camera = new THREE.PerspectiveCamera(75\n            , this.$container.width() / this.$container.height()\n            , 0.1, 1000);\n        this.camera.position.z = 5;\n    }\n\n    Render(){\n        requestAnimationFrame(this.Render.bind(this));\n\n        // update scene\n        this.mesh.rotation.x += 0.1;\n        this.mesh.rotation.y += 0.1;\n\n        // render\n        this.renderer.render(this.scene, this.camera);\n    }\n}\nvar renderer = new Renderer();\n\n\n$(() => {\n    var $container = $(\'div#renderer\');\n    renderer.CreateRenderer($container);\n    renderer.CreateScene();\n\n    renderer.Render();\n});</code></pre></div>'}})}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)},c=(r(8678),r(8838));const d={code:e=>{let{children:n,className:r}=e;return r?a.createElement(c.Z,{className:r},n):a.createElement("code",null,n)}};function o(e){let{data:n,children:r}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(t.Zo,{components:d},r))}function h(e){return a.createElement(o,e,a.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2015-12-06-threejs-01-md-fe331cd94dccd6733c1e.js.map