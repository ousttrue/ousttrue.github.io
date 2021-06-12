---
title: "Jadeを入れてみる"
date: 2015-11-20
Tags: []
---

練習用に入手してきた”HTML5/CSS3 モダンコーディング”を写経しながらjadeを取り入れてみる。
extendでlayoutを共有したかったのでejsからjadeに取り換えてみた。
sassも取り入れようかと思ったが思いとどまった。
どんどん拡大・拡散していくgulp環境なので控えめにしないと手に負えなくなりそうな感じだ。
gulp向けにjade適用plugin(ejs版の改造)を作ってみた。
既にそういうプラグインも存在していそうであるが、
このくらいなら自作した方が早かったり。
jade-applyer.js
var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var jade = require('jade');

module.exports = function (options, map) {

    options = options || {};
    if (!options.filename) {
        throw new gutil.PluginError('jade-applyer', '`filename` required');
    }
    options.pretty = true;

    map = map || {};

    return through.obj(function (file, enc, cb) {

        if (file.isStream()) {
            cb(new gutil.PluginError('jade-applyer', 'Streaming not supported'));
            return;
        }

        try {
            //console.log(file.frontMatter);
            var template = fs.readFileSync(options.filename, 'utf-8');
            var data = JSON.parse(JSON.stringify(file.frontMatter || {}));
            if (!file.isNull()) {
                data.page = file.contents.toString();
            }
            for (var key in map) {
                data[key] = map[key];
            }
            file.contents = new Buffer(jade.compile(template, options)(data));
            file.path = gutil.replaceExtension(file.path, ".html");
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('jade-applyer', err));
        }

        cb();
    });
}

シンタックスハイライトも適用してある程度体裁が整ってきた。
