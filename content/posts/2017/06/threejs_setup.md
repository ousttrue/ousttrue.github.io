---
title: "threejsとwebsocketを使った開発環境"
date: 2017-06-07
taxonomies: {tags: []}
---

threejsのソースを自前で、minimizeする環境を模索する。

なんとなくwebpackをメインに据えてみたい。
npm install -g xxxは適宜やるとして省略。
es2015メモ

const, let
無名関数はアロー形式で()=>{} もしくは()=>expression
文字テンプレート`${expression}`
promise, await

Project作成
$ mkdir app
$ cd app
app$ npm init

とりあえずgitに登録しよう。
.gitignoreは、

https://github.com/github/gitignore/blob/master/Node.gitignore
https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore

をそのまま採用させていただきます。
app$ git init
app$ git add .
app$ git commit -m init 

WebSocketServer
app$ npm install websocket --save

server.js
'use strict';

const http = require('http');
const WSServer = require('websocket').server;
const url = require('url');
const fs = require('fs')

const port=8888;

function onHttpRequest(req, res)
{
    fs.readFile('client.html', 'utf8', (err, text)=>{
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(text);
    });
}
const plainHttpServer = http.createServer(onHttpRequest).listen(port);
const webSocketServer = new WSServer({httpServer: plainHttpServer});

let clients=[];
function broadcast(message) {
    clients.forEach((con, i)=> {
        con.send(message);
    });
}

function onRequest(req)
{
    const websocket = req.accept(null, req.origin || '*');

    clients.push(websocket);

    websocket.send("welcome to this server");
    broadcast(`clients: [${clients.map((v, i)=>v.remoteAddress[0]).join(', ')}]`);

    websocket.on('message', (msg)=>{
        console.log(`"${msg.utf8Data}" is recieved from ${req.origin} !`);
        websocket.send(msg.utf8Data);
    });

    websocket.on('close', (code,desc)=>{
        console.log(`connection released!: ${code} - ${desc}`);

        clients=clients.filter((v, i)=>v!=websocket);
        broadcast(`clients: [${clients.map((v, i)=>v.remoteAddress[0]).join(', ')}]`);
    });
}

webSocketServer.on('request', onRequest);

console.log(`server start: ${port}`);

client.html
<html>
    <head>
    </head>
    <body>
        <input id="message" type="text"><button id="send">send</button>
        <div id="output"></div>

        <script>
'use strict';
let attempts = 1;
let ws=null;

const output = document.getElementById('output');
const sendmessage = document.getElementById('message');
sendmessage.addEventListener('keydown', (e)=>{
    if(e.keyCode==13){
        send(sendmessage.value);
    }
});
document.getElementById('send').addEventListener('click', ()=>send(sendmessage.value));

function logger(msg)
{
    output.innerHTML += `<div>${msg}</div>`;
}
function send(msg)
{
    ws.send(msg);
    logger(`send: ${msg}`);
}

function createWebSocket () {
    logger(`connecting... ${attempts++}`);

    ws = new WebSocket(`ws://${location.host}`);

    ws.onopen = (e)=> {
        logger(`${e.type}: ${e.code || ''}`);

        // reset the tries back to 1 since we have a new ws opened.
        attempts = 1; 

        // ...Your app's logic...
    }

    ws.onclose = (e)=> {
        logger(`${e.type}: ${e.code || ''}`);
        ws=null;

        const time = generateInterval(attempts);

        setTimeout(()=>{
            // Connection has closed so try to reconnect every 10 seconds.
            createWebSocket(); 
        }, time);
    }

    ws.onmessage =(e)=>{
        logger(`${e.type}: ${e.data}`);
    }
}

function generateInterval (k) {
    let maxInterval = (Math.pow(2, k) - 1) * 1000;

    if (maxInterval > 30*1000) {
        maxInterval = 30*1000; // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
    }

    // generate the interval to a random number between 0 and the maxInterval determined from above
    return Math.random() * maxInterval; 
}

window.addEventListener('DOMContentLoaded', ()=> createWebSocket());
        </script>
    </body>
</html>


WebSocketを再接続するアルゴリズムの工夫

webpack

http://webpack.github.io/docs/tutorials/getting-started/

threejs
