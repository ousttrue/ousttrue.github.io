---
title: "Node.jsのアップデート"
date: 2015-12-10
tags: []
---

ちょうど組み込まれている v8 エンジンのバージョンが 3 から 4 に上がる直前にインストールしていたようで、
node.js のバージョン

```
> node --version
v0.12.7
> node -p process.versions.v8
3.28.71.19
```

だった。
最新版(node-v4.2.3-x64.msi)をインストールしてみる。
node.js のバージョン

```
> node --version
v4.2.3
> node -p process.versions.v8
4.5.103.35
```

v8 4.5 搭載ということで ES6 の機能がいろいろ使えるぞ。

http://v8project.blogspot.jp/2015/07/v8-45-release.html

exp.js

```javascript
let x=1;
console.log(x);

> node exp.js
> SyntaxError: Block-scoped declarations (let, const, function, class) not yet supported outside strict mode
```

```
最近よく見る”use strict”が要るのか。
exp.js。use strict
"use strict";

let x=1;
console.log(x);

としたらいけた。
class 構文も問題なし。typescript 使った後だとちょっと機能的に物足りない・・・
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

this は元の通り。
arrow function も問題なく動いた。
ついでに browser でも実験してみよう。
result

source
firefox では、
SyntaxError: class is a reserved identifier
```

になった。
Chrome なら動いた。なるほど。
