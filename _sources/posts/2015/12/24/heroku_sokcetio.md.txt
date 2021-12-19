---
title: "Node.jsでSocket.IOなアプリをHerokuにデプロイ"
date: 2015-12-24
taxonomies: {tags: []}
---

Socket.IOサーバーとしてHerokuを使ってみよう。
実験中
https://shielded-caverns-4913.herokuapp.com/
Heroku練習
以前作ったユーザーが生きていたので改めてチュートリアルを実践。

Getting Started with Node.js on Heroku

gulpでexpressなサーバを作る
普通にnpmなプロジェクトを作る。
> mkdir bvh_sio
> cd bvh_sio
> npm init
> mkdir src
> mkidr src/server
> mkdir src/client
> cd src
> tsd init
> tsd query node -rosa install
> tsd query express -rosa install
> tsd query serve-static -rosa install
> tsd query socket.io -rosa install

Herokuにデプロイする場合はでdevDependenciesじゃなくてdependenciesに書くらしいのでそのようにした。
package.json
{
  "name": "bvh_sio",
  "version": "1.0.0",
  "description": "",
  "main": "build/app.js",
  "scripts": {
    "start": "node build/app.js"
  },
  "author": "ousttrue",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3",
    "gulp": "^3.9.0",
    "gulp-if": "^2.0.0",
    "gulp-load-plugins": "^1.1.0",
    "gulp-run-sequence": "^0.3.2",
    "gulp-typescript": "^2.10.0",
    "serve-static": "^1.10.0",
    "socket.io": "^1.3.7",
    "tsd": "^0.6.5"
  }
}

serve-staticで静的なファイルをホストするexpress。後でsocket.ioを追加する。
src/server/app.ts
/// <reference path="../typings/tsd.d.ts" />

import http = require('http');
import express = require('express');
const port = process.env.PORT || 3000; // <- Herokuで必要!
const app = express();
const server = http.createServer(app);
const servestatic = require('serve-static');
const serve_dir = __dirname + '/public';
console.log('serve %s', serve_dir);
app
    .use(servestatic(serve_dir))
;

// start
server.listen(port);
console.log('start port: %d...', port);

こいつをtypescriptでコンパイルしてbuildディレクトリに展開したい。
gulpfile.js
'use strict';

const path = require('path');
const execSync = require('child_process').execSync;
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = {
    server_src: './src/server/**/*.*',
    server_dst: './build',

    client_src: './src/client/**/*.*',
    client_dst: './build/public'
};
const tsconfig = require('./tsconfig.json');

function pushd(dst, callback) {
    const cwd = process.cwd();
    process.chdir(dst);
    callback();
    process.chdir(cwd);
}

gulp.task('tsd:install', () => {
    pushd('./src', ()=>execSync('tsd install'));
});

gulp.task('server', () => {
    gulp.src(config.server_src)
        .pipe($.if((file) => path.extname(file.path).toLowerCase() === '.ts'
            , $.typescript(tsconfig.compilerOptions)))
        .pipe(gulp.dest(config.server_dst))
    ;
});

gulp.task('client', () => {
    gulp.src(config.client_src)
        .pipe($.if((file) => path.extname(file.path).toLowerCase() === '.ts'
            , $.typescript(tsconfig.compilerOptions)))
        .pipe(gulp.dest(config.client_dst))
    ;
});

gulp.task('build', ['server', 'client']);

gulp.task('install', (cb) => {
    $.runSequence('tsd:install', 'build', cb);
});

gulp.task('default', ['build']);

tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": ".",
        "rootDir": ".",
        "sourceMap": false,
        "removeComments": true
    },
    "exclude": [
        "node_modules"
    ]
}

jsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6"
    }
}

src/client/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>

プロジェクトをHeroku化してデプロイ
Herokuでビルドしたりbuild結果だけをpushするなどの方式があるようだが、Heroku上でgulpする方式にしてみた(git苦手w)。
git push時に実行するコマンドをpackage.jsonに記述できる。
package.json
  "scripts": {
    "postinstall": "gulp install", // <- 追加する
    "start": "node build/app.js"
  },

サーバー実行コマンド。
Procfile
web: node build/app.js

herokuにデプロイ。
# 一回だけ実行する
> heroku create

# herokuを更新
> git push heroku master
# エラーが出たら直す。npm installなど

# herokuサイトをブラウザで開く 
> heroku open
# エラーが出たら直す。npm installなど

heroku側でgulp-typescriptするように作ってみたけどうまくいった。
socket.ioを追加
websocketじゃなくてajax pollingらしいけどSocket.IOがよきに計らってくれる。
src/server/app.tsに追加
// socket.io
import socketio = require('socket.io');
const io = socketio(server);
io.on('connection', (socket) => {
    var clientAddress = socket.client.conn.remoteAddress;
    console.log('connected: %s from %s', socket.id, clientAddress);
    
    function recTimer(interval: number, callback: Function)
    {
        setTimeout(()=>recTimer(interval, callback), interval);
        callback();
    }
    recTimer(3000, ()=>socket.emit('time', Date.now()));
});

src/client/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="index.js"></script>
</head>
<body>
    <h1>Hello</h1>
    
    <div id='content'></div>
</body>
</html>

src/client/index.ts
/// <reference path="../typings/tsd.d.ts" />

declare module io {
    export function connect(): SocketIO.Socket;
}

window.onload = () => {
    const socket = io.connect();
    
    const content=document.getElementById('content');
    
    socket.on('connect', ()=>{
        content.innerHTML='connected!';
    });
    
    socket.on('time', (message: any)=>{
        content.innerHTML+='<br>'+message;
    });
}

bvh
準備が整ったので、node.js側でパースしたbvhを適当にjson化してsocket.ioにemitするサーバーを作る。
