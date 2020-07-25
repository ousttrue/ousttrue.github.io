---
Title: "dat-guiを試してみる"
date: 2015-12-12
Tags: []
---






view typescript
view javascript

たまにthree.jsのデモと連動して使われているGUIライブラリdat-guiを試してみる。

https://code.google.com/p/dat-gui/
http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
https://stemkoski.github.io/Three.js/#gui

ライブラリを導入
> bower install dat.gui
> tsd query dat-gui -rosa install

dat.GuiControllerのnameプロパティがtypings/dat-gui/dat-gui.d.tsで未定義だった。
bower_components/dat.gui/dat.gui.jsでは定義されていた。
    /**
    * The name of <code>GUI</code>. Used for folders. i.e
    * a folder's name
    * @type String
    */
    name: {
    get: function() {
        return params.name;
    },
    set: function(v) {
        // TODO Check for collisions among sibling folders
        params.name = v;
        if (title_row_name) {
        title_row_name.innerHTML = params.name;
        }
    }
    },

既存のd.tsにプロパティを追加する(C# partial class的な)方法があるかどうかわからないので、
dat-gui.d.tsを改造することにした。
dat-gui.d.tsにnameプロパティを追加
declare module dat {

    // 省略

    export class Controller { // <- dat.gui.jsに合わせて名前変えてみた
        destroy(): void;
        fire(): Controller;
        getValue(): any;
        isModified(): boolean;
        listen(): Controller;
        min(n: number): Controller;
        remove(target: Controller): void;
        setValue(value: any): Controller;
        step(n: number): Controller;
        updateDisplay(): void;
        name(newName?: string): string; // <- これ追加した
        onChange: (value?: any) => void;
        onFinishChange: (value?: any) => void;
    }
}

サンプルコードを元にtypescript化してみる
https://stemkoski.github.io/Three.js/GUI-Controller.html
をベースにした。
javscriptのコードをまるっとtsファイルにコピーして淡々と型を指定していく。
dat.guiの場所調整の件

http://stackoverflow.com/questions/25653639/how-do-i-change-the-location-of-the-dat-gui-dropdown

autoPlace: falseがポインツ。そのうえでdomにposition:abusolute
var  gui = new dat.GUI( { autoPlace: false } );

