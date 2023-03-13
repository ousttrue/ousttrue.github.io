---
title: "MongoDBでCRUD"
date: 2015-11-21
tags: []
---

```
“シングルページWebアプリケーション”に説明されている
mongodbをバックエンドに、node.js + expressをフロントエンドにする構成のおさらい。
MongoDB <-> node.js Express <-> Browser

グローバルなnpmパッケージ
> npm install -g gulp typescript tsd bower

Windowsの場合、
%USERPROFILE%\AppData\Roaming\npm

にインストールされるのでパスを通しておく。
Expressの準備
app.js
> mkdir mongocrud
> cd mongocrud
mongocrud> npm init -y
mongocrud> npm install express --save

// app.js
var http=require('http');
var express=require('express');

var port=process.env.port || 3000;
var app=express();
var server=http.createServer(app);

app.get('/', function(request, response){
    response.send('Hello Express');
});

server.listen(port);

起動
> node app.js

http://localhost:3000
で動作を確認する。
loggerや静的ファイル提供などのミドルウェアを追加
mongocrud> npm install body-parser method-override connect-logger errorhandler serve-static --save

// app.js
// app.getの前
var bodyparser=require('body-parser');
var methodoverride = require('method-override');
var logger = require('connect-logger');
var errorhandler = require('errorhandler');
var servestatic = require('serve-static');
var serve_dir=__dirname + "/client";
console.log("serve %s", serve_dir);
app
.use(bodyparser())
.use(methodoverride())
.use(logger())
.use(errorhandler({
    dumpExceptioons: true,
    showStack: true
}));
.use(servestatic(serve_dir))

gulpで静的なファイルを’./build/client’下にコピーするタスクを定義する
# gulpfile.coffeeにタスクを追加

#
# client
#
gulp.task 'client', ->
    gulp.src config.src_client
        .pipe gulp.dest config.dst_client
        .pipe browserSync.stream()

# tasks
gulp.task 'watch', ->
    gulp.watch config.src_ts, ['ts']
    gulp.watch config.src_client, ['client']

gulpでサーバー起動とブラウザの自動オープンタスクを定義する
いろいろ入用になるのでgulpを準備する。
まずは、nodemonとbrowser-syncを導入して
app.js起動と起動したアプリをブラウザで自動で開くタスクを定義する。
mongocrud> npm install gulp gulp-load-plugins gulp-nodemon browser-sync -D

// gulpfile.js
var gulp = require('gulp');
var $ = require("gulp-load-plugins")();
var browserSync = require("browser-sync").create();
var port = 5000;

gulp.task('serve', function () {
    $.nodemon({
        script: 'app.js',
        exp: 'js',
        ignore: [],
        env: {
            port: port
        }
    })
    .on('restart', function () { browserSync.reload(); });
});

gulp.task('browser-sync', ['serve'], function () {
    browserSync.init({
        proxy: "localhost:" + port
    });
});

gulp.task('default', ['browser-sync']);


BrowserSyncのReloadが動くには出力がhtmlである必要がある(bodyタグの中に細工をするため)。
// app.jsの修正
app.get('/', function(request, response){
    response.setHeader('content-type', 'text/html');
    response.send('<html><head></head><body>Hello html</body></html>');
});

mongocrud> gulp

でnodemonが起動してブラウザが自動で開始される。
app.jsの内容を変えるとブラウザがリロードされる。
が、リロードが速すぎて内容が更新されないことが判明。
リロードを遅延させる策を講じる。
// app.jsの最後尾に追加
console.log('start %d', port);

app.jsからのコンソール出力を監視する。
// gulpfile.jsの修正

    $.nodemon({
        script: config.app_entry,
        exp: 'js',
        ignore: [],
        env: {
            port: config.app_port
        },
        stdout: false // <- 必要
    })
    //.on('restart', function () { browserSync.reload(); });
    .on('readable', function(){
        this.stdout.on('data', function(chunk){
            if (/^start /.test(chunk)){
                console.log('reloading...');
                browserSync.reload();
            }
            process.stdout.write(chunk);
        });
    });

gulpfile.jsをgulpfile.coffeeにする
gulpcrud> npm install coffee-script -D

gulpfile.jsを書き換える。gulp-3.9.0では既にcoffee script対応が成されているようで、
gulpfile.jsの拡張子を変えてgulpfile.coffeeとリネームして中身を書き換えてから
mongocrud> gulp

としたら特にオプション等を指定することなくgulpはgulpfile.coffeeを見つけてくれて動いた。
# gulpfile.coffee
gulp = require('gulp');
$ = require("gulp-load-plugins")();
browserSync = require("browser-sync").create();
port = 5000;

gulp.task 'serve', ->
    $.nodemon({
        script: 'app.js',
        exp: 'js',
        ignore: [],
        env: {
            port: port
        }
    })
    .on 'readable', ->
        this.stdout.on 'data', (chunk) ->
            if (/^start /.test(chunk))
                console.log('reloading...')
                browserSync.reload()
            process.stdout.write(chunk);

gulp.task 'browser-sync', ['serve'], ->
    browserSync.init({
        proxy: "localhost:" + port
    })

gulp.task('default', ['browser-sync']);

TypeScriptにする
app.jsをsrc/app.tsに移動する。
// src/app.ts
declare function require(name: string):any;
declare var process;

var http=require('http');
var express=require('express');

var port=process.env.port || 3000;
var app=express();
var server=http.createServer(app);

app.get('/', function(request, response){
    response.setHeader('content-type', 'text/html');
    response.send('<html><head></head><body>Hello</body></html>');
});

server.listen(port);
console.log('start %d', port);

コンパイルが通るようにアンビエント宣言を追加した。
gulpにコンパイルタスクを定義する。
serveタスクの前にtsタスクを実行し、
tsファイルの更新をwatchしてtsタスクを起動するように調整した。
# gulpfile.coffee
gulp = require('gulp');
$ = require("gulp-load-plugins")();
browserSync = require("browser-sync").create();

config = {
    src_ts: './src/**/*.ts',
    dst_js_dir: './build/js',
    dst_watch: './build/**/*.js',
    app_entry: './build/js/app.js',
    app_port: 5000
}


#
# compile typescript
#
gulp.task 'ts', ->
  gulp.src config.src_ts
    .pipe $.typescript({
      target: 'ES6'
      removeComments: true
    }).js
    .pipe gulp.dest config.dst_js_dir


#
# start js app
#
gulp.task 'serve', ['ts'], ->
    $.nodemon({
        script: config.app_entry,
        exp: 'js',
        ignore: [],
        env: {
            port: config.app_port
        },
        stdout: false
    })
    #.on 'restart', ->
    #    browserSync.reload();
    .on 'readable', ->
        this.stdout.on 'data', (chunk) ->
            if (/^start /.test(chunk))
                console.log('reloading...')
                browserSync.reload()
            process.stdout.write(chunk);

#
# start browser-sync
#
gulp.task 'browser-sync', ['serve'], ->
    browserSync.init({
        proxy: "http://localhost:" + config.app_port
    })

# tasks
gulp.task 'watch', ->
    gulp.watch config.src_ts, ['ts']

gulp.task('default', ['watch', 'browser-sync']);

typescriptを型安全にする
コンパイラオプションを定義するtsconfig.jsonを生成する(要tsc-1.6以上)。
mongocrud> tsc --init

手で作ってもよし
tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": "build",
        "rootDir": ".",
        "sourceMap": false
    },
    "filesGlob": [
        "./typings/**/*.d.ts",
        "./src/**/*.ts"
    ]
}

VSCodeの場合、tsconfig.jsonを変えたらVSCodeを再起動するべし。
filesGlobは必要で、無いとインテリセンスが遅くなる(Loading…)。
tsタスクがtsconfig.jsonを使うようにする。
# gulpfile.coffee
gulp.task 'ts', ->
  tsconfig = require('tsconfig.json')
  gulp.src config.src_ts
    .pipe $.typescript(tsconfig.compilerOptions).js
    .pipe gulp.dest config.dst_js_dir

tsdを初期化して、node.jsとexpressのtypescript定義を取得する。
mongocrud> tsd init
mongocrud> tsd query node express -rosa install

src/app.ts
/// <reference path="../typings/tsd.d.ts" />
import http = require('http');
import express=require('express');

var port=process.env.port || 3000;
var app=express();
var server=http.createServer(app);

app.get('/', (request, response) => {
    response.setHeader('content-type', 'text/html');
    response.send('<html><head></head><body>Hello ts</body></html>');
});

server.listen(port);
console.log('start %d', port);

MongoDBのCRUDを定義する
mongodbをインストールする。
Windowsの場合、MongoDBがデフォルトの”Program Files”にインストールされるとパスにスペースが入って
gulpからの起動時にエスケープと戦う必要が生じるので、
C:\MongoDB

にインストールした。
gulpでmongodbを起動する
mongocrud> npm i sprintf-js -D

# gulpfile.coffee
MONGO_EXE = 'C:/MongoDB/bin/mongod.exe';

#
# Running mongo
#
# http://stackoverflow.com/a/28048696/46810
sprintf = require('sprintf-js').sprintf;
fs = require('fs');
exec = require('child_process').exec;
gulp.task 'mongodb:start', (cb)->
    command=sprintf('%s --dbpath %s'
        , MONGO_EXE, config.mongo_data);
    if(!fs.existsSync(config.mongo_data))
        fs.mkdirSync(config.mongo_data);
    exec command, (err, stdout, stderr) ->
        console.log(stdout);
        console.log(stderr);
    cb();

app.tsからmongodbにアクセスする
mongocrud> npm install mongodb --save
mongocrud> tsd query mongodb -rosa install

src/app.ts
/// <reference path="../typings/tsd.d.ts" />

// mongodb
import mongodb = require('mongodb');
let mongoServer = new mongodb.Server(
    'localhost', 27017
);
let dbHandle = new mongodb.Db(
    'crud', mongoServer, {w: 1}
);
dbHandle.open(()=>{
   console.log("connected to mongoDB");
});

// http
import http = require('http');
import express = require('express');
let port = process.env.port || 3000;
let app = express();
let server = http.createServer(app);
app.get('/', (request, response) => {
    response.setHeader('content-type', 'text/html');
    response.send('<html><head></head><body>Hello ts</body></html>');
});

server.listen(port);
console.log('start %d', port);

CRUDを定義する
Creating a REST API using Node.js, Express, and MongoDB
を参考に実装。
src/app.tsのデータにアクセスする部分をsrc/mongodb.tsに分離した。
src/app.ts
/// <reference path="../typings/tsd.d.ts" />
import mongocrud = require('./mongocrud');

//
// Express
//
import http = require('http');
import express = require('express');

let port = process.env.port || 3000;
let app = express();
let server = http.createServer(app);

let bodyparser=require('body-parser');
let methodoverride = require('method-override');
let logger = require('connect-logger');
let errorhandler = require('errorhandler');
app
.use(bodyparser())
.use(methodoverride())
.use(logger())
.use(errorhandler({
    dumpExceptioons: true,
    showStack: true
}));

app.get('/', (request, response) => {
    response.setHeader('content-type', 'text/html');
    response.send('<html><head></head><body>Hello ts</body></html>');
});
server.listen(port);

// restful
app.all('/api/:obj_type/*', (req, res, next)=>{
   res.contentType('json');
   next();
});
app.get('/api/:obj_type', mongocrud.findAll);
app.get('/api/:obj_type/:id', mongocrud.findById);
app.post('/api/:obj_type', mongocrud.add);
app.put('/api/:obj_type/:id', mongocrud.update);
app.delete('/api/:obj_type/:id', mongocrud.del);

// launchded
console.log('start %d', port);

src/mongocrud.ts
/// <reference path="../typings/tsd.d.ts" />
//
// MongoDB
//
import mongodb = require('mongodb');
let mongoServer = new mongodb.Server(
    'localhost', 27017
);
let db = new mongodb.Db(
    'crud', mongoServer, { w: 1 }
);
db.open(() => {
    console.log("connected to mongoDB");
    populateDB();
});

//
// CRUD
//
import express = require('express');
export var findById = (req: express.Request, res: express.Response) => {
    let obj_type = req.params.obj_type;
    let id = req.params.id;
    console.log('Retrieving %s: %s', obj_type, id);
    db.collection(obj_type, (err, collection) => {
        collection.findOne({ '_id': new mongodb.ObjectID(id) }, (err, item) => {
            res.send(item);
        });
    });
};

export var findAll = (req: express.Request, res: express.Response) => {
    let obj_type = req.params.obj_type;
    db.collection(obj_type, (err, collection) => {
        collection.find().toArray((err, items) => {
            res.send(items);
        });
    });
};

export var add = (req: express.Request, res: express.Response) => {
    let obj_type = req.params.obj_type;
    let body = req.body;
    console.log('Adding %s: %s', obj_type, JSON.stringify(body));
    db.collection(obj_type, (err, collection) => {
        collection.insert(body, { safe: true }, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

export var update = (req: express.Request, res: express.Response) => {
    let obj_type = req.params.obj_type;
    let id = req.params.id;
    let body = req.body;
    console.log('Updating %s: %s', obj_type, id);
    console.log(JSON.stringify(body));
    db.collection('wines', (err, collection) => {
        collection.update({ '_id': new mongodb.ObjectID(id) },
            body, { safe: true }, (err, result) => {
                if (err) {
                    console.log('Error updating wine: ' + err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log('%s document(s) updated', result);
                    res.send(body);
                }
            });
    });
}

export function del(req: express.Request, res: express.Response){
    let obj_type = req.params.obj_type;
    var id = req.params.id;
    console.log('Deleting %s: %s', obj_type, id);
    db.collection(obj_type, (err, collection) => {
        collection.remove({ '_id': new mongodb.ObjectID(id) },
            { safe: true }, (err, result) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred - ' + err });
                } else {
                    console.log('%s document(s) deleted', result);
                    res.send(req.body);
                }
            });
    });
}

// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
function populateDB() {
    console.log('populateDB...');

    var wines = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice...",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards...",
            picture: "lan_rioja.jpg"
        }];

    db.collection('wines', (err, collection) => {
        collection.find().toArray((err, items) => {
            if(items.length==0){
                // if empty
                console.log('insert wines: ' + JSON.stringify(wines));
                db.collection('wines', function(err, collection) {
                    collection.insert(wines, { safe: true }, function(err, result) { });
                });
            }
        });
    });
};

ブラウザ向けのGUIを作る
ざっくりレイアウト
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/client.js"></script>
</head>
<body>
<div class="header">
    <form action="select">
        <span class="label">collection name</span>
        <input type="text">
        <button>Select</button>
    </form>
</div>
<div class="body">
    <div class="left">
        <div class="list">

        </div>
        <form action="add">
            <button>Add</button>
        </form>
    </div>
    <div class="right">
        <form>
            <textarea name="detail">
            </textarea>
            <button>Load</button>
            <button>Save</button>
        </form>
    </div>
</div>
<div class="footer">
    <ul class="log">
    </ul>
</div>
</body>
</html>

* {
margin: 0;
padding: 0;
}

html{
    font-size: 62.5%;
}

*, *::before, *::after {
    box-sizing: border-box;
}

.header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background-color: #faa;
}
.body{
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 128px;
    background-color: #afa;
}
.body .left {
    position: absolute;
    left: 0;
    width: 200px;
    top: 0;
    bottom: 0;
    background-color: #282;
}
.body .right {
    position: absolute;
    left: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #828;
}
.footer{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 128px;
    background-color: #aaf;
}

alert('hello');

jqueryを追加
mongocrud> cd client
mongocrud/client> bower init
mongocrud/client> bower install jquery --save

まとまりが無くなってきた。
別のページに整理しなおそう。
あとから、coffee-scriptやtypescritpを導入すると手順としては冗長になりすぎるな。
最初から、NoDemon, Express, BrowserSyync, gulpfile.coffee, typescript, scssの構成にしよう。
```
