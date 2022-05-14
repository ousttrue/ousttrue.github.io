---
title: "gulpで静的サイト生成その２"
date: 2015-11-14
tags: []
---

gulpで静的サイト生成その２
引き続き、サイト生成作業を続行中。見た目は置いておいて(bootstrap入れたけど)機能を優先して作ろう。
「次へ」と「前へ」のリンクを作れば内部リンクは揃う。
gulpは自由度が高いのでなんとでもなるな。
強まったmakeのようで非常にポテンシャルを感じる。
中期的なも目標としてはローカルもしくはLAN内のnode.jsがホストとなるGUIをさくっと作れるようになるというものがあるのだが、
関連項目が多すぎてひたすら拡がっていくのが危険だ。
特に、インターネットで調べながらだと収束せずにひたすら拡散する傾向がある。
anglar, backboneは避けようと思ったのだがmithrilは気になっているし、electronも気になっている。
あと、typescriptもはやめに使いこなしたい。
だいぶgulpがわかってきた
「前へ」と「次へ」は全部のファイルをリストに投入してソートして隣通しのパスを得る必要がある。
一度リストに投入してから前へと次へを処理した後で、再度リストの中身を一個ずつ後ろに渡せばいいじゃない。
ということでやってみたらあっさりできた。
野良プラグインの作り方が分かるとgulp面白いな。
make-toc.js
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function (outputFileName, options) {

    options = options || {};
    var dest = options.dest;
    var filelist = [];

    function transform(file, encoding, callback) {

        // ファイルを集める
        filelist.push(file);

        // callback()は必ず実行
        callback();
    }

    function flush(callback) {

        if (filelist.length > 0) {

            // sortすることで日付順に並ぶ
            filelist.sort(function compareNumbers(a, b) {
                if (a.path < b.path) {
                    return 1;
                } else {
                    return -1;
                }
            });
            var file = filelist[0];

            // 目次
            var output_map = {
                cwd: file.cwd,
                base: file.base,
                path: file.base + outputFileName,
            };
           // console.log(output_map);
            var output = new gutil.File(output_map);

            var html = '<ul>\n';
            //console.log(filelist.length);
            for (var i = 0; i < filelist.length; ++i) {
                var f = filelist[i];
                var rel = dest + "/" + f.path.substr(f.base.length).replace(/\\/g, '/');
                //console.log(rel);              
                html += '<li><a href="' + rel + '">' + f.frontMatter.title + '</a></li>\n';
                
                // 各アイテムのfrontMatterにnextとprevを付ける
                // 降順に並んでいる
                if (i === 0) {
                    // 先頭
                    f.frontMatter.next = "";
                    f.frontMatter.prev = path.relative(path.dirname(f.path), filelist[i + 1].path).replace(/\\/g, '/');
                }
                else if (i === filelist.length-1) {
                    // 終端
                    f.frontMatter.next = path.relative(path.dirname(f.path), filelist[i - 1].path).replace(/\\/g, '/');
                    f.frontMatter.prev = "";
                }
                else {
                    f.frontMatter.next = path.relative(path.dirname(f.path), filelist[i - 1].path).replace(/\\/g, '/');
                    f.frontMatter.prev = path.relative(path.dirname(f.path), filelist[i + 1].path).replace(/\\/g, '/');
                }
            }
            html += '</ul>\n';
            output.contents = new Buffer(html);

            // filelistをoutputにくっつける
            output.filelist = filelist;

            this.push(output);
        }

        // callback()は必ず実行
        callback();
    }

    return through.obj(transform, flush);
};


resplit.js
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');

module.exports = function () {

    function transform(file, encoding, callback) {

        // ファイルがnullの場合
        if (file.isNull()) {
            // 次のプラグインに処理を渡すためにthis.push(file)しておく
            this.push(file);
            // callback()は必ず実行
            return callback();
        }

        // ファイルがstreamの場合（このサンプルプラグインはstreamに対応しない）
        if (file.isStream()) {
            // emit('error')を使って、プラグイン呼び出し側に'error'イベントを発生させる
            this.emit('error', new gutil.PluginError('gulp-diff', 'Streaming not supported'));
            // callback()は必ず実行
            return callback();
        }

        // do something
        for(var key in file.filelist){
            var output=file.filelist[key];
            this.push(output);           
        }

        // callback()は必ず実行
        callback();
    }

    return through.obj(transform);
};


gulfile.js
gulp.task('posts', function () {
    gulp.src(config.posts)
    // frontMatter処理してhtml化する
        .pipe($.frontMatter({ remove: true }))
        .pipe(myFrontmatter())
        .pipe($.markdown())
    // まとめてsortしてメタ情報を付与して目次を出力する
        .pipe(makeToc('index.html', { dest: 'posts' }))
        .pipe(gulp.dest('build'))
    // 再び分解する
        .pipe(resplit())
    // 以降通常
        .pipe($.debug({ title: 'files:' }))
    // テンプレートを適用して
        .pipe(ejsApplyer({ filename: 'templates/page.ejs' }, { root_path: '../../../../' }))
    // 出力
        .pipe(gulp.dest('build/posts'))
    ;
});

