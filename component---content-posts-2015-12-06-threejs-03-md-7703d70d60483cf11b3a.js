"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[503],{8073:function(n,e,t){t.r(e);var s=t(1151),a=t(7294);function i(n){const e=Object.assign({pre:"pre",code:"code"},(0,s.ah)(),n.components);return a.createElement(e.pre,null,a.createElement(e.code,null,"source\nシーンを強化してみる。\n軸\n先人が記事を残してくれていたので楽ちん。\nThree.js　AxisHelper\n//軸の長さ１０００\nvar axis = new THREE.AxisHelper(1000);\n//sceneに追加\nthis.scene.add(axis);\n\nグリッド\nThree.js GridHelper\n//GridHelper(大きさ, １マスの大きさ)\nvar grid = new THREE.GridHelper(100, 10);\n//シーンオブジェクトに追加\nthis.scene.add(grid);\n\n光源\nライトを追加して、マテリアルを光に反応するタイプに付け替える。\n// lights\nvar directionalLight = new THREE.DirectionalLight(0xffffff);\ndirectionalLight.position.set(0, 0.7, 0.7);\nthis.scene.add(directionalLight);\n\n// materialを交換\n//var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nvar material = new THREE.MeshPhongMaterial({ color: 0xff0000 });\n\nFPS状態表示\nWebGLのデモでよく見かけるFPS表示を入れてみる。\nhttps://github.com/mrdoob/stats.js\nライブラリと定義をインストール。\n> bower install stats.js --save\n> tsd query stats -rosa install\n\n２箇所更新になる。\n// add stats\n$container.css({ position: 'relative' });\nthis.stats = new Stats();\nthis.stats.domElement.style.position = 'absolute';\nthis.stats.domElement.style.top = '0px';\nthis.stats.domElement.style.zIndex = '100';\n$container.append(this.stats.domElement);\n\n// update stats\nAnimate() {\n    requestAnimationFrame(this.Animate.bind(this));\n    this.controls.update();\n    this.stats.update();\n}\n"))}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?a.createElement(e,n,a.createElement(i,n)):i(n)}},1151:function(n,e,t){t.d(e,{ah:function(){return i}});var s=t(7294);const a=s.createContext({});function i(n){const e=s.useContext(a);return s.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}}}]);
//# sourceMappingURL=component---content-posts-2015-12-06-threejs-03-md-7703d70d60483cf11b3a.js.map