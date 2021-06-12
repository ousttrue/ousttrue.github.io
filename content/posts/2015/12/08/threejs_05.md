---
title: "Three.jsのBuild"
date: 2015-12-08
Tags: []
---

骨入りモデルとかやってみようかと思ったのだけど、その前にThree.jsのソースを見やすい状態で作業したい。
結合前のThree.jsを自前ビルドしながら運用する方法を調べてみる。
build.py, or how to generate a compressed three.js file
と本家に書いてある。python使うんか。gulpでやりてぇな。
全部concatしてuglifyしたらいいんじゃないか。
やってみよう。
とりあえずbowerで導入したthree.js関連を削除。
threejs.srcフォルダを作ってthree.jsソースのsrcディレクトリの中身を展開した。
gulp.task('bowerjs', function () {

    var files = [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/highlightjs/highlight.pack.js',
        './bower_components/stats.js/build/stats.min.js',
        './lib/**/*.js', // <-- 中にthree.jsのsrcをコピーした
    ];
    gulp.src(files)
        .pipe($.plumber({ errorHandler: $.notify.onError('<%= error.message %>') }))
        .pipe($.debug({ title: 'bowerjs files:' }))
        .pipe($.sourcemaps.init())
        //.pipe($.uglify())
        .pipe($.concat('all.min.js'))
        .pipe($.sourcemaps.write('./', {
            sourceMappingURL: function (file) {
                return file.relative + '.map';
            }
        }))
        .pipe(gulp.dest('build/js'))
        .pipe(browser.reload({ stream: true }))
    ;
});

これで作ったall.min.jsではエラーが出てだめですね。
単にsrcをconcatするだけではだめだ。本家のドキュメントを読み始める。
/three.js/utils/build/

でビルドできるよって書いてあります。python関係ないみたいだ。
> npm install
> node build.js --include common --include extras

なるほどbuild.jsを見てみよう。
includeってなんだろうと調べてみると
/three.js/utils/build/includes

にjsonファイルがあり中にjsファイルがリストされている。
なるほど。src下を全部concatするのではなくここに書いてあるものを、書いてある順でconcatすればいいんでないか。
// 
gulp.task('threejs:build', function(){
    var common=JSON.parse(fs.readFileSync('three.js/includes/common.json')).map(function(v, i){ return 'three.js/'+v; });
    gulp.src(common)
        .pipe($.concat('three.js'))
        .pipe(gulp.dest('./lib'))
        ;
});

gulp.task('bowerjs', ['threejs:build'], function () {
    // 前と同じ
}
````

これで実行するとそれっぽいthree.jsが出てくるが、まだエラーが出る。
でエラー行に飛ぶとifdefがある。なんだこれは。

```glsl
#ifdef USE_ALPHAMAP

    diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif

glslだ・・・。
確かに、build.js内で拡張子がglslのファイルだけ別処理になっている。
if( file.indexOf( '.glsl') >= 0 ) {

    contents = 'THREE.ShaderChunk[ \'' +
        path.basename( file, '.glsl' ) + '\' ] =' +
        JSON.stringify( contents ) + ';\n';

}

ちょっとgulpのフィルタを作りますか。
three.shaderchunk.js
var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

module.exports = function () {

    return through.obj(function (file, enc, cb) {

        if (file.isStream()) {
            cb(new gutil.PluginError('three.shadechunk', 'Streaming not supported'));
            return;
        }

        if (path.extname(file.path).toLowerCase() == '.glsl') {
            var contents = 'THREE.ShaderChunk[ \'' +
                path.basename(file.path, '.glsl') + '\' ] =' +
                JSON.stringify(file.contents.toString()) + ';\n';
            file.contents = new Buffer(contents);
            file.path = file.path + ".js";
        }

        this.push(file);

        cb();
    });
}

gulpファイルの呼び出しの方。これでthree.js/srcからthree.jsを作成できた。
あとは、sourcemapが付くようにした。
gulpfile.js
gulp.task('threejs:build', function(){
    var common=JSON.parse(fs.readFileSync('three.js/includes/common.json'))
    .map(function(v, i){ return 'three.js/'+v; });
    var extras=JSON.parse(fs.readFileSync('three.js/includes/extras.json'))
    .map(function(v, i){ return 'three.js/'+v; });
    gulp.src(common.concat(extras))
        .pipe(threeShaderchunk())
        .pipe($.concat('three.js'))
        .pipe(gulp.dest('./lib'))
        ;
});

FireFoxでブレイクポイントを仕掛けてステップ実行できた。
これで、Loaderの自作とかが捗るぞ。
