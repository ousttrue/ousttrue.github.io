"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4688],{5137:function(n,e,t){t.r(e),t.d(e,{default:function(){return d}});var s=t(1151),r=t(7294);function c(n){const e=Object.assign({p:"p",span:"span"},(0,s.ah)(),n.components);return r.createElement(r.Fragment,null,r.createElement(e.p,null,"Socket.IO サーバーとして Heroku を使ってみよう。\n実験中\nhttps://shielded-caverns-4913.herokuapp.com/\nHeroku 練習\n以前作ったユーザーが生きていたので改めてチュートリアルを実践。"),"\n",r.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Getting Started with Node.js on Heroku\n\ngulpでexpressなサーバを作る\n普通にnpmなプロジェクトを作る。\n> mkdir bvh_sio\n> cd bvh_sio\n> npm init\n> mkdir src\n> mkidr src/server\n> mkdir src/client\n> cd src\n> tsd init\n> tsd query node -rosa install\n> tsd query express -rosa install\n> tsd query serve-static -rosa install\n> tsd query socket.io -rosa install\n\nHerokuにデプロイする場合はでdevDependenciesじゃなくてdependenciesに書くらしいのでそのようにした。\npackage.json\n{\n  "name": "bvh_sio",\n  "version": "1.0.0",\n  "description": "",\n  "main": "build/app.js",\n  "scripts": {\n    "start": "node build/app.js"\n  },\n  "author": "ousttrue",\n  "license": "ISC",\n  "dependencies": {\n    "express": "^4.13.3",\n    "gulp": "^3.9.0",\n    "gulp-if": "^2.0.0",\n    "gulp-load-plugins": "^1.1.0",\n    "gulp-run-sequence": "^0.3.2",\n    "gulp-typescript": "^2.10.0",\n    "serve-static": "^1.10.0",\n    "socket.io": "^1.3.7",\n    "tsd": "^0.6.5"\n  }\n}\n\nserve-staticで静的なファイルをホストするexpress。後でsocket.ioを追加する。\nsrc/server/app.ts\n/// &lt;reference path="../typings/tsd.d.ts" />\n\nimport http = require(\'http\');\nimport express = require(\'express\');\nconst port = process.env.PORT || 3000; // &lt;- Herokuで必要!\nconst app = express();\nconst server = http.createServer(app);\nconst servestatic = require(\'serve-static\');\nconst serve_dir = __dirname + \'/public\';\nconsole.log(\'serve %s\', serve_dir);\napp\n    .use(servestatic(serve_dir))\n;\n\n// start\nserver.listen(port);\nconsole.log(\'start port: %d...\', port);\n\nこいつをtypescriptでコンパイルしてbuildディレクトリに展開したい。\ngulpfile.js\n\'use strict\';\n\nconst path = require(\'path\');\nconst execSync = require(\'child_process\').execSync;\nconst gulp = require(\'gulp\');\nconst $ = require(\'gulp-load-plugins\')();\n\nconst config = {\n    server_src: \'./src/server/**/*.*\',\n    server_dst: \'./build\',\n\n    client_src: \'./src/client/**/*.*\',\n    client_dst: \'./build/public\'\n};\nconst tsconfig = require(\'./tsconfig.json\');\n\nfunction pushd(dst, callback) {\n    const cwd = process.cwd();\n    process.chdir(dst);\n    callback();\n    process.chdir(cwd);\n}\n\ngulp.task(\'tsd:install\', () => {\n    pushd(\'./src\', ()=>execSync(\'tsd install\'));\n});\n\ngulp.task(\'server\', () => {\n    gulp.src(config.server_src)\n        .pipe($.if((file) => path.extname(file.path).toLowerCase() === \'.ts\'\n            , $.typescript(tsconfig.compilerOptions)))\n        .pipe(gulp.dest(config.server_dst))\n    ;\n});\n\ngulp.task(\'client\', () => {\n    gulp.src(config.client_src)\n        .pipe($.if((file) => path.extname(file.path).toLowerCase() === \'.ts\'\n            , $.typescript(tsconfig.compilerOptions)))\n        .pipe(gulp.dest(config.client_dst))\n    ;\n});\n\ngulp.task(\'build\', [\'server\', \'client\']);\n\ngulp.task(\'install\', (cb) => {\n    $.runSequence(\'tsd:install\', \'build\', cb);\n});\n\ngulp.task(\'default\', [\'build\']);\n\ntsconfig.json\n{\n    "compilerOptions": {\n        "module": "commonjs",\n        "target": "es5",\n        "noImplicitAny": true,\n        "outDir": ".",\n        "rootDir": ".",\n        "sourceMap": false,\n        "removeComments": true\n    },\n    "exclude": [\n        "node_modules"\n    ]\n}\n\njsconfig.json\n{\n    "compilerOptions": {\n        "module": "commonjs",\n        "target": "es6"\n    }\n}\n\nsrc/client/index.html\n&lt;!DOCTYPE html>\n&lt;html lang="en">\n&lt;head>\n    &lt;meta charset="UTF-8">\n    &lt;title>Document&lt;/title>\n&lt;/head>\n&lt;body>\n    &lt;h1>Hello&lt;/h1>\n&lt;/body>\n&lt;/html>\n\nプロジェクトをHeroku化してデプロイ\nHerokuでビルドしたりbuild結果だけをpushするなどの方式があるようだが、Heroku上でgulpする方式にしてみた(git苦手w)。\ngit push時に実行するコマンドをpackage.jsonに記述できる。\npackage.json\n  "scripts": {\n    "postinstall": "gulp install", // &lt;- 追加する\n    "start": "node build/app.js"\n  },\n\nサーバー実行コマンド。\nProcfile\nweb: node build/app.js\n\nherokuにデプロイ。\n# 一回だけ実行する\n> heroku create\n\n# herokuを更新\n> git push heroku master\n# エラーが出たら直す。npm installなど\n\n# herokuサイトをブラウザで開く\n> heroku open\n# エラーが出たら直す。npm installなど\n\nheroku側でgulp-typescriptするように作ってみたけどうまくいった。\nsocket.ioを追加\nwebsocketじゃなくてajax pollingらしいけどSocket.IOがよきに計らってくれる。\nsrc/server/app.tsに追加\n// socket.io\nimport socketio = require(\'socket.io\');\nconst io = socketio(server);\nio.on(\'connection\', (socket) => {\n    var clientAddress = socket.client.conn.remoteAddress;\n    console.log(\'connected: %s from %s\', socket.id, clientAddress);\n\n    function recTimer(interval: number, callback: Function)\n    {\n        setTimeout(()=>recTimer(interval, callback), interval);\n        callback();\n    }\n    recTimer(3000, ()=>socket.emit(\'time\', Date.now()));\n});\n\nsrc/client/index.html\n&lt;!DOCTYPE html>\n&lt;html lang="en">\n&lt;head>\n    &lt;meta charset="UTF-8">\n    &lt;title>Document&lt;/title>\n    &lt;script src="/socket.io/socket.io.js">&lt;/script>\n    &lt;script src="index.js">&lt;/script>\n&lt;/head>\n&lt;body>\n    &lt;h1>Hello&lt;/h1>\n\n    &lt;div id=\'content\'>&lt;/div>\n&lt;/body>\n&lt;/html>\n\nsrc/client/index.ts\n/// &lt;reference path="../typings/tsd.d.ts" />\n\ndeclare module io {\n    export function connect(): SocketIO.Socket;\n}\n\nwindow.onload = () => {\n    const socket = io.connect();\n\n    const content=document.getElementById(\'content\');\n\n    socket.on(\'connect\', ()=>{\n        content.innerHTML=\'connected!\';\n    });\n\n    socket.on(\'time\', (message: any)=>{\n        content.innerHTML+=\'&lt;br>\'+message;\n    });\n}\n\nbvh\n準備が整ったので、node.js側でパースしたbvhを適当にjson化してsocket.ioにemitするサーバーを作る。</code></pre></div>'}}))}var l=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?r.createElement(e,n,r.createElement(c,n)):c(n)},o=t(8678),i=t(4160),a=t(8736);const p={code:n=>{let{children:e,className:t}=n;return t?r.createElement(a.Z,{className:t},e):r.createElement("code",null,e)}};function u(n){let{data:e,children:t}=n;const c=e.mdx.frontmatter;return r.createElement(o.Z,null,r.createElement("h1",null,c.title),r.createElement("div",{className:"tags-index"},c.tags&&c.tags.length>0&&c.tags.map((n=>r.createElement(i.rU,{to:"/tags/"+n+"/",itemProp:"url"},r.createElement("button",null,n))))),r.createElement(s.Zo,{components:p},t))}function d(n){return r.createElement(u,n,r.createElement(l,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2015-12-24-heroku-sokcetio-md-3fd01dbf0e707c638059.js.map