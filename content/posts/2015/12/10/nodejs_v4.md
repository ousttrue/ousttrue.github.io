---
Title: "Node.jsのアップデート"
date: 2015-12-10
Tags: []
---

ちょうど組み込まれているv8エンジンのバージョンが3から4に上がる直前にインストールしていたようで、
node.jsのバージョン
> node --version
v0.12.7
> node -p process.versions.v8
3.28.71.19

だった。
最新版(node-v4.2.3-x64.msi)をインストールしてみる。
node.jsのバージョン
> node --version
v4.2.3
> node -p process.versions.v8
4.5.103.35

v8 4.5搭載ということでES6の機能がいろいろ使えるぞ。

http://v8project.blogspot.jp/2015/07/v8-45-release.html

exp.js
let x=1;
console.log(x);

> node exp.js
SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode

最近よく見る”use strict”が要るのか。
exp.js。use strict
"use strict";

let x=1;
console.log(x);

としたらいけた。
class構文も問題なし。typescript使った後だとちょっと機能的に物足りない・・・
class Hoge
{
    // コンストラクタと
    constructor(name)
    {
        this.name=name;
    }

    // メソッドだけ定義できるらしい
    printName()
    {
        console.log(this.name);
    }
}

let hoge=new Hoge('hoge');
hoge.printName();

let fuga={
    name: 'fuga',
    printName: hoge.printName,
};

fuga.printName();

hoge
fuga

thisは元の通り。
arrow functionも問題なく動いた。
ついでにbrowserでも実験してみよう。
result

source
firefox では、
SyntaxError: class is a reserved identifier

になった。
Chromeなら動いた。なるほど。
