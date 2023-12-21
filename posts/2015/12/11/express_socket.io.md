---
title: "Socket.IOな実験環境"
date: 2015-12-11
tags: []
---

Socket.IO を実験する環境のメモ。

```
Expressは、serve-staticで静的なファイルのhostingが目的兼後で拡張できるように
coffee-scriptは無しでES6要素をなるべく入れる
Socket.IOを手早く展開するのが目的なのでtypescriptは抜きにしようと思ったが、無い方がつらいので矢張り入れる

https://github.com/ousttrue/sio_sample
Project生成
> mkdir sio_sample
> cd sio_sample
sio_sample> npm init -y
sio_sample> npm install gulp gulp-load-plugins gulp-nodemon browser-sync -D
sio_sample> npm install express socket.io body-parser method-override connect-logger errorhandler serve-static --save

vscodeでes6を使えるように
jsconifg.json
{
    "compilerOptions": {
        "target": "ES6"
    }
}

後で拡張できるように以下のようなディレクトリ構成にする。
build <- srcから(加工して)コピーされる

src <- 加工前のファイル置き場
  + server
    + app.js
  + client
    + index.html
    + index.js

src/server/app.js
"use strict";

const http = require('http');
const express = require('express');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer(app);
const servestatic = require('serve-static');
const serve_dir = __dirname + '/public';
console.log('serve %s', serve_dir);
app
    .use(servestatic(serve_dir))
;

// socket.io
const socketio = require('socket.io');
const io = socketio(server);
io.on('connection', (socket) => {
    console.log('a client connected %s', socket);
    socket.on('disconnect', () => {
        console.log('a client disconnected');
    });
});

// start
server.listen(port);
console.log('start port: %d...', port);

src/client/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="index.js"></script>
</head>
<body>
    <div id="target"></div>
</body>
</html>

src/client/index.js
"use strict";

function setup(target) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('onLoad'));
    target.appendChild(div);
}

window.onload = () => {

    setup(document.getElementById('target'));

};

srcからbuildに展開するgulp
gulpfile.js
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = {
    server_src: './src/server/**/*',
    server_dst: './build',
    client_src: './src/client/**/*',
    client_dst: './build/public'
};

gulp.task('server', () => {
    gulp.src(config.server_src)
        .pipe(gulp.dest(config.server_dst));
});

gulp.task('client', () => {
    gulp.src(config.client_src)
        .pipe(gulp.dest(config.client_dst));
});

gulp.task('default', ['server', 'client']);

build
sio_sample> gulp

ブラウザで動いた。
browserSync導入
gulpfile.js。browserSync
const config = { // 追加分
    app_entry: './build/app.js',
    app_port: 5000,
};

const browserSync = require('browser-sync').create();
gulp.task('serve', ()=>{
    $.nodemon({
        script: config.app_entry,
        exp: 'js',
        ignore: [],
        env: {
            port: config.app_port
        }
    })
    .on('readable', ()=>{
        this.stdout.on('data', (chunk)=>{
            if (/^start /.test(chunk)){
                console.log('reloading...');
                browserSync.reload();
            }
            process.stdout.write(chunk)
        });
    });
});

gulp.task('browser-sync', ['serve'], ()=>{
    browserSync.init({
        proxy: 'localhost:' + config.app_port,
        port: 3000,
        ws: true
    })
});

gulpfile.js。watchタスク追加
gulp.task('server', () => {
    gulp.src(config.server_src)
        .pipe(gulp.dest(config.server_dst))
        .pipe(browserSync.stream())
        ;
});

gulp.task('client', () => {
    gulp.src(config.client_src)
        .pipe(gulp.dest(config.client_dst))
        .pipe(browserSync.stream())
        ;
});

gulp.task('build', ['server', 'client']);

gulp.task('watch', ['build', 'browser-sync'], ()=>{
    gulp.watch(config.server_src, ['server']);
    gulp.watch(config.client_src, ['client']);
});

gulp.task('default', ['watch']);

git
いったんgitに登録しよう。
.gitignore
/node_modules/
/build/

Socket.IOの疎通
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script type="text/javascript" src="/socket.io/socket.io.js"></script>
    <script src="index.js"></script>
</head>
<body>
    <div id="target"></div>
</body>
</html>

"use strict";

function setup(target) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('hello'));
    target.appendChild(div);

    this.socket = io.connect();
}

window.onload = () => {
    setup(document.getElementById('target'));
};

typescript導入
sio_sample> tsc --init

tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": ".",
        "rootDir": ".",
        "sourceMap": false
    },
    "exclude": [
        "node_modules"
    ]
}

sio_sample> npm install gulp-typescript gulp-if gulp-plumber gulp-debug -D
sio_sample> cd src
sio_sample/src> tsd init
sio_sample/src> tsd query node express socket.io -rosa install

gulpfile.js。typescriptのコンパイルを追加
const path = require('path');
const tsconfig = require('./tsconfig.json');
const isTypescript = (file) => {
    const ext = path.extname(file.path).toLowerCase();
    return ext === '.ts';
}

gulp.task('server', () => {
    gulp.src(config.server_src)
        .pipe($.plumber())
        .pipe($.if(isTypescript, $.typescript(tsconfig.compilerOptions)))
        .pipe($.debug('server'))
        .pipe(gulp.dest(config.server_dst))
        .pipe(browserSync.stream())
    ;
});

gulp.task('client', () => {
    gulp.src(config.client_src)
        .pipe($.plumber())
        .pipe($.if(isTypescript, $.typescript(tsconfig.compilerOptions)))
        .pipe($.debug('client'))
        .pipe(gulp.dest(config.client_dst))
        .pipe(browserSync.stream())
    ;
});

src/server/app.jsをapp.tsにリネーム
/// <reference path="../typings/tsd.d.ts" />
"use strict";

import http = require('http');
import express = require('express');
const port = process.env.port || 3000;
const app = express();
const server = http.createServer(app);
const servestatic = require('serve-static');
const serve_dir = __dirname + '/public';
console.log('serve %s', serve_dir);
app
    .use(servestatic(serve_dir))
;

// socket.io
import socketio = require('socket.io');
const io = socketio(server);
io.on('connection', (socket) => {
    var clientAddress=socket.client.conn.remoteAddress;
    console.log('connected: %s', clientAddress);
    socket.on('disconnect', () => {
        console.log('disconnected: %s', clientAddress);
    });
});

// start
server.listen(port);
console.log('start port: %d...', port);

src/client/index.jsをindex.tsにリネーム
/// <reference path="../typings/tsd.d.ts" />
"use strict";

declare module io {
    export function connect(): SocketIO.Socket;
}

function setup(target: Element) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode('hello socket.io'));
    target.appendChild(div);

    this.socket = io.connect();
}

window.onload = () => {

    setup(document.getElementById('target'));

};

メッセージをやり取り
src/server/app.ts サーバーサイド。client-messageを受けてserver-messageを発行
// socket.io
import socketio = require('socket.io');
const io = socketio(server);
io.on('connection', (socket) => {
    var clientAddress = socket.client.conn.remoteAddress;
    console.log('connected: %s', clientAddress);
    socket.on('disconnect', () => {
        console.log('disconnected: %s', clientAddress);
    });

    socket.on('client-message', (data: any) => {
        socket.emit('server-message', 'server clicked message');
    });
});

src/client/index.ts クライアントサイド。buttonを押したらclient-messageを発行。server-messageを受けてテキストを描画
/// <reference path="../typings/tsd.d.ts" />
"use strict";

declare module io {
    export function connect(): SocketIO.Socket;
}

class Client {
    socket: SocketIO.Socket;

    constructor() {
        this.socket = io.connect();
    }

    setup(target: Element) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode('hello socket.io'));
        target.appendChild(div);

        this.socket.on('server-message', (data: any)=>{
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(data.toString()));
            target.appendChild(div);
        });

        const button=document.createElement('button');
        button.appendChild(document.createTextNode('send'));
        button.onclick=(ev: MouseEvent)=>{
            this.socket.emit('client-message', 'clicked');
        };
        target.appendChild(button);
    }
}
var client=new Client();

window.onload = () => {

    client.setup(document.getElementById('target'));

};
```
