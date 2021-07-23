+++
title = "libclang で luajit 向けの FFI を生成する"
date = 2021-07-23
taxonomies.tags = ["lua", "clang"]
+++

lua による imgui 計画の準備として、 `libclang` によるバインディング生成器を `luajit` に移植してみた。

<https://github.com/ousttrue/luajitffi>

`libclang` に対してはだいだい動くようになって、自身で生成した `FFI` で動作するところまでできた。
また、 `EmmyLua Annotation` もある程度付与できた。

<https://github.com/ousttrue/luajitffi/blob/master/clang/mod.lua>

こいつで、 `imgui.h` から luajit FFI を生成する。

## libclang

c(c++)ヘッダーを `clang_visitChildren` により、カーソルのTree としてパースする。
今回は、 `CXChildVisit_Recurse` で全部のカーソルをパースすることにした。

* 同じカーソルが複数個所に現れうる
* 循環しうる(Link List ？)

がありうることを考慮しておく。
`clang-c/Index.h` は 6000 カーソルくらいなので問題ないが、 `Windows.h` とかは 150000 カーソルとか爆発する。

## わりと色んなところで型がネストしていてつらい

* struct の中は namespace なので何でもあり
* anonymous な union や struct のその場定義
* typedef struct などのその場定義
* 関数ポインタのその場定義

要するに、Cのコードの書き方によってどのようなカーソル構造になるかのパターンを知っている必要があって、
パターン毎に分岐して情報を収集する必要がある。
ある型のメンバーの情報を集めていると、ネストした別の型情報が現れる場合があるので切り分ける。

## 基本的なパターン

FFI では、対象となる関数を起点にその関数が使用するすべての型の定義を取り込む。
カーソルはCのTranslationUnitの木構造をあらわしていて、型をあらわしていない。
カーソルから頑張って型を得る。
型を得られるカーソルは決まっていて、`CXCursorType` が宣言Declの系列となる。

TODO

### カーソル FunctionDecl
### カーソル EnumDecl
### カーソル TypedefDecl
### カーソル StructDecl
### Type Pointer
### Type Array
### Type Elaborated
### Type Record
### Type FunctionProto 関数ポインタ pointer => functionproto
### union
### typedef struct
### c++ name mangling
### マクロとの戦い

## luajit ffi

`ffi.cdef` に素直に定義すればいいので、他の言語の FFI に比べて簡単。

はまり。

* `ffi.load` の返り値が GC されると関数ポインタが死ぬ
* pointer は `ffi.new('TYPE[1]')` のようにサイズ１の array で運用する
* tostring と ffi.string は違う
* nullptr は nil ?

だいたいよきに計らってくれるので、 `rust` の FFI に比べて簡単なのであった。

ひとつだけはまりがあって、 `struct` の値渡しができない場合がある。

<http://wiki.luajit.org/FFI-Callbacks-with-pass-by-value-structs>

そういえば、 `rust` でも `struct` の値渡しではまった記憶が。

<https://forum.dlang.org/thread/dkamxcamwttszxwwxttv@forum.dlang.org>

rust の場合は、 `struct` の値返しが動かなかった。
これ、C の方で pointer 経由で値を返すラッパーを定義する必要があって回避方法はなかった。

`ImVec2 ImGui::GetContentRegionAvail()`

luajit ffi でもできるか注意が必要だな。

## lfs への依存を FFI した Windows API で置き換える

現状、ファイル操作 `isExists`, `mkDir` のために lfs を使っているのだけど、
FFI で Windows API にアクセスできるようにしたら lfs 無しにできそう。
となれば luarocks も無しにできるので、 必要なのは luajit.exe だけになる。

