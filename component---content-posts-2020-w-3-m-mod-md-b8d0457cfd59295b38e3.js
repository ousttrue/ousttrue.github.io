"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2403],{9039:function(e,n,l){l.r(n);var t=l(1151),c=l(7294);function a(e){const n=Object.assign({p:"p",a:"a",code:"code",ul:"ul",li:"li",h1:"h1",h2:"h2",pre:"pre"},(0,t.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.p,null,"以前にも何度かやったことがあるのだけど立ち消えになっていた、 ",c.createElement(n.a,{href:"http://w3m.sourceforge.net/index.ja.html"},"w3m")," の改造を試みている。\nw3m はわりと好きなテキストブラウザなのだが、 2011 年くらいの 0.5.3 で開発が終了している様子。"),"\n",c.createElement(n.p,null,"https://github.com/ousttrue/w3m"),"\n",c.createElement(n.p,null,"まずは ",c.createElement(n.code,null,"C++")," 化してから、HTML処理などを再入可能にしてタブごとにスレッド独立する方向を目指す。\n同時に、 ",c.createElement(n.code,null,"boehm-GC")," を少しずつ ",c.createElement(n.code,null,"STL")," のコンテナや ",c.createElement(n.code,null,"std::string")," に置き換える。\nどうも、",c.createElement(n.code,null,"c++")," と ",c.createElement(n.code,null,"boehm-GC")," の共存するのに技がいるらしく、適当に置き換えていくとメモリ破壊で死ぬ。",c.createElement(n.code,null,"boehm-GC")," をすべて置き換える必要がありそう。",c.createElement(n.code,null,"C++")," クラスのメンバーに ",c.createElement(n.code,null,"GC")," が要る、",c.createElement(n.code,null,"GC struct")," のメンバーに ",c.createElement(n.code,null,"C++")," クラスが居るの両方に問題があるっぽい。一応、 ",c.createElement(n.code,null,"gc_cleanup")," を継承したりしているのだけど、やり方がまずいぽい。"),"\n",c.createElement(n.p,null,"改造にあたってなるべく機能を維持しようとしていたのだけど、ある程度わりきって機能を落とさないと手に負えないところがある。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"http + https 以外の通信プロトコルは落とす。NNTP とか Gopher 使ったことないしなー、FTPもいったん落とす"),"\n",c.createElement(n.li,null,"backend, dump, halfload 等の出力に介入する機能は落とす。コードを読むのが大変"),"\n",c.createElement(n.li,null,"M17N, COLOR, IMAGE, MENU は残す"),"\n",c.createElement(n.li,null,"Mouse は微妙。削ってもよいかも"),"\n",c.createElement(n.li,null,"GetText も削る"),"\n"),"\n",c.createElement(n.p,null,"量を減らす。思ったよりコードが多かったのだ。"),"\n",c.createElement(n.h1,null,"下準備"),"\n",c.createElement(n.h2,null,"msys2 でとりあえずビルド"),"\n",c.createElement(n.p,null,"WSL Ubuntu だとビルドできなかった。\nしかし、msys2 ならわりと簡単にビルドできることを発見。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ pacman -S make gcc libgc-devel openssl-devel ncurses-devel\n$ x86_64-pc-msys-gcc --version\nx86_64-pc-msys-gcc (GCC) 9.3.0\nCopyright (C) 2019 Free Software Foundation, Inc.\nThis is free software; see the source for copying conditions.  There is NO\nwarranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.\n$ ./configure\n")),"\n",c.createElement(n.p,null,"コンパイル環境の方が昔と変わってしまってビルドでエラーになる。"),"\n",c.createElement(n.p,null,"修正方法👇"),"\n",c.createElement(n.p,null,c.createElement(n.a,{href:"https://qiita.com/imkitchen/items/02a9df7baaaf434fee66"},"[CentOS7] emacs24にemacs-w3mインストール")),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"#ifdef")," の調整"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"// config.h\n//#define USE_BINMODE_STREAM 1\n//#define USE_EGD\n")),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ make\n$ ./w3m www.google.com // 動いた\n")),"\n",c.createElement(n.h2,null,"WSL で GC がクラッシュする問題"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"boehm-GC")," がランタイムにエラーになることで、 ",c.createElement(n.code,null,"make")," 中のコード生成 ",c.createElement(n.code,null,"mktable")," がクラッシュするのが原因でビルドステップが途中で止まるのが原因だった。なので、たとえビルド済みの ",c.createElement(n.code,null,"w3m")," を ",c.createElement(n.code,null,"apt get")," しても、ランタイムも同じ原因でクラッシュする。"),"\n",c.createElement(n.p,null,"エラー。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"Wrong __data_start/_end pair\nfish: './build/w3m' terminated by signal SIGABRT (Abort)\n")),"\n",c.createElement(n.p,null,"https://hitkey.nekokan.dyndns.info/diary2004.php#D200424"),"\n",c.createElement(n.p,null,"によると、stack size の制限が原因らしい。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ ulimit -s\n8192\n")),"\n",c.createElement(n.p,null,"WSL でこれを変えるには・・・。"),"\n",c.createElement(n.p,null,"https://github.com/microsoft/WSL/issues/633"),"\n",c.createElement(n.p,null,"無理。"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"WSL2")," ならできる？"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"> wsl -l -v\n  NAME            STATE           VERSION\n* Ubuntu-20.04    Running         2\n")),"\n",c.createElement(n.p,null,"やってみる。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ ulimit -s unlimited\n> ulimit -s\nunlimited\n")),"\n",c.createElement(n.p,null,"できた。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ w3m\nWrong __data_start/_end pair\n")),"\n",c.createElement(n.p,null,"うーむ。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"$ ulimit -s 81920\n> ulimit -s\n81920\n")),"\n",c.createElement(n.p,null,"動いた。\n8192KB では足りなく、 unlimited では多すぎるらしい。これは、難しいな。"),"\n",c.createElement(n.p,null,"ちなみに、 ",c.createElement(n.code,null,"gdb")," 上ならスタック問題を解決しなくても動いた。\n",c.createElement(n.code,null,"gdb")," がスタックを覆い隠すのかな？\n開発だけならできなくもない。"),"\n",c.createElement(n.h2,null,"ビルドシステム"),"\n",c.createElement(n.p,null,"とりあえず慣れたツールに変更。\nWSL 上の vscode で作業しているのもあり、autotools から CMake に変更。\nクロスプラットフォームは後退させて、新しめの gcc(c++20) でビルドできればいいや。\nconfig.h や funcname 系のコード生成結果はコミットしちゃう。\nlibwc が static ライブラリにわかれているのも、ひとまとめにしてしまった。\nあと、適当にソースをフォルダに移動する。"),"\n",c.createElement(n.p,null,"生成コード一覧"),"\n",c.createElement(n.p,null,"| ファイル     | 生成方法          | 入力           | 備考                                                   |\n|--------------|-------------------|----------------|--------------------------------------------------------|\n| config.h     | configure         |                | 各種 #define など                                      |\n| entity.h     | Makefile(mktable) | entity.tab     | ./mktable 100 entity.tab > entity.h                    |\n| funcname.tab | Makefile(awk)     | main.c, menu.c |                                                        |\n| funcname.c   | Makefile(awk)     | funcname.tab   | sort funcname.tab ｜ awk -f funcname0.awk > funcname.c |\n| funcname1.h  | Makefile(awk)     | funcname.tab   |                                                        |\n| funcname2.h  | Makefile(awk)     | funcname.tab   |                                                        |\n| functable.c  | Makefile(mktable) | funcname.tab   |                                                        |\n| tagtable.c   | Makefile(mktable) | funcname.tab   |                                                        |"),"\n",c.createElement(n.h2,null,"警告からエラーに引き上げ"),"\n",c.createElement(n.p,null,"改造していくのに ",c.createElement(n.code,null,"C")," の緩い型制限が危険(コンパイルが通るのに型が不一致になりやすい)なので、\n以下のオプションを追加。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"-Werror=implicit-function-declaration\n-Werror=int-conversion\n-Werror=conversion-null\n")),"\n",c.createElement(n.p,null,"これで、型宣言を補強しながら進める。"),"\n",c.createElement(n.h1,null,"第1段階"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,'extern "C" を追加してソースの拡張子を ',c.createElement(n.code,null,".cpp")," に変更"),"\n",c.createElement(n.li,null,'extern "C" をまとめて取り除く'),"\n",c.createElement(n.li,null,"typedef struct tag を取り除く"),"\n"),"\n",c.createElement(n.p,null,"ここまでやると、自由に ",c.createElement(n.code,null,"c++")," のコードを混ぜることができる。\n",c.createElement(n.code,null,"std::string"),"、",c.createElement(n.code,null,"std::vector"),", ",c.createElement(n.code,null,"std::shared_ptr"),", ",c.createElement(n.code,null,"std::function"),", ",c.createElement(n.code,null,"std::string_view"),", ",c.createElement(n.code,null,"template"),", ",c.createElement(n.code,null,"class"),", 前方宣言, ",c.createElement(n.code,null,"auto"),", ",c.createElement(n.code,null,"inline")," 等使い放題 👍"),"\n",c.createElement(n.p,null,"特に ",c.createElement(n.code,null,"std::string_view")," の使い勝手を試したい。\n所有しない文字列はすべて、 ",c.createElement(n.code,null,"std::string_view")," でいけると思うのだが。\n",c.createElement(n.code,null,"split")," の ",c.createElement(n.code,null,"std::string_view")," 版は具合がよかった。"),"\n",c.createElement(n.h2,null,'c++ 化 (extern "C")'),"\n",c.createElement(n.p,null,"手法としては、各ソースの拡張子を ",c.createElement(n.code,null,".c")," から ",c.createElement(n.code,null,".cpp")," に変更する。\n",c.createElement(n.code,null,"CMakeLists.txt")," を修正。\n",c.createElement(n.code,null,"#include")," を ",c.createElement(n.code,null,'extern "C"')," で囲む、で ",c.createElement(n.code,null,"c++")," 化することができる。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},'extern "C" {\n#include "xxx.h"\n}\n')),"\n",c.createElement(n.p,null,"ただ、 ",c.createElement(n.code,null,"cpp")," で定義する関数の宣言が ",c.createElement(n.code,null,'extern "C"')," の中に入らないとリンクエラーになるので、\nそうなるようにソースごとにヘッダを分配してやる。\n",c.createElement(n.code,null,"w3m")," は関数宣言が少数のファイル ",c.createElement(n.code,null,"proto.h"),", ",c.createElement(n.code,null,"fm.h")," とかに集中しているのだが、いっぱいあるので雑にやる。\nコンパイルが通ればよい。"),"\n",c.createElement(n.p,null,"分配するときに未定義の型を前方宣言ですませたいのだけど、 ",c.createElement(n.code,null,"c")," の ",c.createElement(n.code,null,"struct")," 定義が、",c.createElement(n.code,null,"struct tag")," と ",c.createElement(n.code,null,"typedef")," に分かれているのがやっかいだった。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c"},"// C\ntypedef struct hogeTag\n{\n\n} Hoge;\n")),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c"},"void DoHoge(Hoge *p);\n\n// に対する前方宣言は、\n\nstruct hogeTag;\ntypedef hogeTag Hoge;\n")),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"C")," の状態で、前方宣言を導入できずヘッダの分割が難航。\n型ごとに別のヘッダに分割することは断念して、\nほとんど全部の ",c.createElement(n.code,null,"struct")," 定義の入ったヘッダを ",c.createElement(n.code,null,"fm.h")," から分離して作るのに留めた。"),"\n",c.createElement(n.h2,null,"DEFUN"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"w3m")," は ",c.createElement(n.code,null,"DEFUN")," でキーアサインできる関数を定義している。"),"\n",c.createElement(n.p,null,c.createElement(n.a,{href:"/w3m/doc-jp/readme.func/"},"readme.func")),"\n",c.createElement(n.p,null,"以下のように、キーボードなどのイベントをトリガーにアクションを実行するというイメージ。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"Key\n    KeyMap\n        DEFUN\n    Menu\n        DEFUN\nMouseAction\n    ActionMap\n        DEFUN\n    Menu\n        DEFUN\nAlarm\n    DEFUN\n")),"\n",c.createElement(n.p,null,"ソースは、",c.createElement(n.code,null,"main.c")," と ",c.createElement(n.code,null,"menu.c")," に ",c.createElement(n.code,null,"DEFUN")," とそれの使う補助関数がまとめて定義されていて、\nヘッダは ",c.createElement(n.code,null,"proto.h")," に全部入れとなっている。"),"\n",c.createElement(n.p,null,"c++ で下記のようなディスパッチャを作った。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},"typedef void (*Command)();\nstd::unordered_map<std::string, Command> g_commandMap;\n")),"\n",c.createElement(n.p,null,"使い捨ての python で関数に登録するコードを生成した。"),"\n",c.createElement(n.h1,null,"第２段階"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"PODじゃない型が動くようにする","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"constructor/destructor"),"\n"),"\n"),"\n",c.createElement(n.li,null,"脱GC","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"コレクションをSTLに置き換える"),"\n",c.createElement(n.li,null,"std::string"),"\n",c.createElement(n.li,null,"std::shared_ptr"),"\n"),"\n"),"\n",c.createElement(n.li,null,"機能ごとにモジュール化"),"\n",c.createElement(n.li,null,"再入可能"),"\n"),"\n",c.createElement(n.h2,null,"GC_MALLOC から gc_cleanup 継承へ"),"\n",c.createElement(n.p,null,"boehm-GC を ",c.createElement(n.code,null,"c++")," のクラスで使う方法を調べた。"),"\n",c.createElement(n.p,null,"http://www.namikilab.tuat.ac.jp/~sasada/prog/boehmgc.html#i-0-5"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"w3m")," では、 ",c.createElement(n.code,null,"GC")," を多用している。"),"\n",c.createElement(n.p,null,"おもに、"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"struct Str"),"\n",c.createElement(n.li,null,"コレクション"),"\n",c.createElement(n.li,null,"struct の field"),"\n"),"\n",c.createElement(n.p,null,"という感じに。\nこのうち、 struct の field で使われるタイプの単発の ",c.createElement(n.code,null,"GC_MALLOC")," している型を ",c.createElement(n.code,null,"gc_cleanup")," 継承にして、 ",c.createElement(n.code,null,"new")," で初期化するようにする。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"bzero, bcopy, memcpy, sizeof"),"\n"),"\n",c.createElement(n.p,null,"等でメモリクリアしているところに注意する。\nこれで、その型は ",c.createElement(n.code,null,"constructor/destructor")," が動くようになり、\nメンバーに ",c.createElement(n.code,null,"std::string")," 等を配置できるようになる。\nあとで、 ",c.createElement(n.code,null,"gc_cleanup")," から ",c.createElement(n.code,null,"std::shared_ptr")," に変更することも視野に入れている。"),"\n",c.createElement(n.h2,null,"GC文字列 Str"),"\n",c.createElement(n.p,null,"アプリ全体で使われていて一挙になくすことはできないのだけど、構造体の末端のメンバーから ",c.createElement(n.code,null,"std::string")," に変える。\nあと、がんばって ",c.createElement(n.code,null,"const char *")," の範囲を増やす。\n",c.createElement(n.code,null,"libwc")," から ",c.createElement(n.code,null,"Str")," を剥そうと思っていたのだが、逆に ",c.createElement(n.code,null,"libwc")," に ",c.createElement(n.code,null,"Str")," を封じ込める方向に軌道修正。\n",c.createElement(n.code,null,"indep.c")," の便利文字列関数も少しずつ変えてく。"),"\n",c.createElement(n.h2,null,"グローバル変数を減らす"),"\n",c.createElement(n.p,null,"関数の中でグローバル変数にアクセスしている場合(CurrentBufferなど)、これを関数の引数経由とか、クラスのメンバー経由でもらう。面倒でも Getter と Setter を区別して、どこで変更されうるかわかりやすくする。\nクラスのメンバーは、 ",c.createElement(n.code,null,"private")," 化を試みる。"),"\n",c.createElement(n.h2,null,"Stream処理"),"\n",c.createElement(n.p,null,"多分、最難関の ",c.createElement(n.code,null,"loadGeneralFile")," 関数。700行くらいだったか。\ngoto とか longjmp があってよくわからなかったのだが、慣れてきた。\n",c.createElement(n.code,null,"http"),", ",c.createElement(n.code,null,"https"),", ",c.createElement(n.code,null,"NNTP ?"),", ",c.createElement(n.code,null,"gopher"),", ",c.createElement(n.code,null,"ftp"),", ",c.createElement(n.code,null,"pipe")," 等、",c.createElement(n.code,null,"http")," のプロキシーやリダイレクト、 ",c.createElement(n.code,null,"www-auth")," などを一手に処理していて容易に手を付けられない。\n何度か整理しようとして悉く撃退されたので、雑にやることにした。\n機能を ",c.createElement(n.code,null,"http(https)")," に絞ってそれ以外をコメントアウトしてとにかく量を減らす。\nプロキシーとか、 ",c.createElement(n.code,null,"dump"),", ",c.createElement(n.code,null,"halfload")," などのよく知らない機能もどんどん削る。\nとしてなんとか改造できるようになってきた。"),"\n",c.createElement(n.p,null,"ここを ",c.createElement(n.code,null,"HttpClient"),", ",c.createElement(n.code,null,"LocalFile"),", ",c.createElement(n.code,null,"PipeReader")," あたりに整理したい。"),"\n",c.createElement(n.h1,null,"第３段階"),"\n",c.createElement(n.p,null,"Tab, Buffer, Line のリンクリストを STL のコレクションに置き換えた。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-c++"},"auto buf = load(url);\ntab->push(buf);\n")),"\n",c.createElement(n.p,null,"という形を目指す。"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"loadGeneralFile")," を解きほぐして、 ",c.createElement(n.code,null,"HTTP")," 機能を抽出、リダイレクトまで動くようにできた。\n",c.createElement(n.code,null,"loadGeneralFile")," は、"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"OpenStream/Send HTTP Request"),"\n",c.createElement(n.li,null,"HTTP Response","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"3xx => Redirect"),"\n"),"\n"),"\n",c.createElement(n.li,null,"content-type で分岐","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"BufferLoader => Buffer"),"\n"),"\n"),"\n"),"\n",c.createElement(n.p,null,"という感じに整理できそう。\nHttpとBufferローダーを副作用の無い関数に整理できれば再入可能が見えてくる。\n早めに分岐させて、分岐したら合流しない。同じ処理は関数で共有するという方向性で整理。"),"\n",c.createElement(n.p,null,"Buffer が多機能なので、Document, HttpResponse, FileInfo とかに分割したい。"),"\n",c.createElement(n.h1,null,"第４段階"),"\n",c.createElement(n.p,null,"mainloop の再実装。libuv, libevent 等を検討していたのだけど、 c++ との親和性の高い asio を使うことにした。\n",c.createElement(n.code,null,"tty read (keyboard input)"),", ",c.createElement(n.code,null,"signal callback (sigint, winresize)"),", ",c.createElement(n.code,null,"alarm")," の割り込みを asio 経由にする。\nアプリの終了をloop の終了にして、自然に destructor がコールされるようになる。"),"\n",c.createElement(n.h1,null,"第５段階"),"\n",c.createElement(n.p,null,"html parse から term へのレンダリング部分の分解。\nやっと解読できて１パス目"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"内部文字コード(wtf-8)に変換"),"\n",c.createElement(n.li,null,"tokenize"),"\n",c.createElement(n.li,null,"tag をパースして属性取得 => パースに成功したら行バッファに書き戻す。フォームの情報を蓄積する。テーブルのレイアウト"),"\n"),"\n",c.createElement(n.p,null,"結果として、行のリストと、フォーム情報を得る。"),"\n",c.createElement(n.p,null,"２パス目"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"行のリストを再度パース"),"\n",c.createElement(n.li,null,"非タグ部分をBufferに出力"),"\n",c.createElement(n.li,null,"Aタグやフォームを Anchor などに出力"),"\n"),"\n",c.createElement(n.p,null,"という感じだった。\n１パス目で html 化するときに知らない属性を捨てたり、内部属性を追加したりしている様子。\nこの、内部属性がよくわからなくて難しい。"),"\n",c.createElement(n.h1,null,"文字コード"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"content-charset")," => ",c.createElement(n.code,null,"wtf")," => ",c.createElement(n.code,null,"DisplayCharset")," と文字コードを変換して動作していることがわかった。\n試しに、",c.createElement(n.code,null,"utf-8")," であることが分かっている ",c.createElement(n.code,null,"html")," で ",c.createElement(n.code,null,"wtf")," 変換を飛ばしてみたところ表示が壊れた。\n",c.createElement(n.code,null,"wtf")," は ",c.createElement(n.code,null,"utf-8")," と互換性がないらしい。\nhttp://simonsapin.github.io/wtf-8/\nなのかと思ったのだが、違う独自形式かもしれない。"),"\n",c.createElement(n.p,null,"w3m は、この ",c.createElement(n.code,null,"wtf")," エンコーディングで、html タグのパース、文字のバイト幅の判定、文字のカラム幅の判定をしているのだが、\n",c.createElement(n.code,null,"utf-8")," では、文字のバイト幅、カラム幅の判定が狂う。\nということで、 ",c.createElement(n.code,null,"utf-8")," でのバイト幅判定を自作して ",c.createElement(n.code,null,"wcwidth")," を組み合わせてみた。\n",c.createElement(n.code,null,"*#12345;")," 形式の ",c.createElement(n.code,null,"unicode")," 埋め込みに対応するために、追加で ",c.createElement(n.code,null,"unicode")," => ",c.createElement(n.code,null,"utf-8")," 変換も作った。\n正しく表示することができた。"),"\n",c.createElement(n.p,null,"ということで、",c.createElement(n.code,null,"euc-jp")," と ",c.createElement(n.code,null,"shift-jis")," と ",c.createElement(n.code,null,"iso-2022-jp")," から ",c.createElement(n.code,null,"utf-8")," への変換を作れば日本語は対応できそう。\n",c.createElement(n.code,null,"std::string_view"),", ",c.createElement(n.code,null,"char32_t"),", ",c.createElement(n.code,null,"char8_t")," あたりの新しい型を使った ",c.createElement(n.code,null,"\\0")," 終端に頼らないライブラリを作ってみる。"),"\n",c.createElement(n.h1,null,"メモ"),"\n",c.createElement(n.h2,null,"モジュールに分割"),"\n",c.createElement(n.p,null,"機能ごとにモジュールに分割する。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"UI(frontend)"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"Term","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"低レベル描画","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"termcap の関数を直接呼ぶ。curses の自前実装的な"),"\n",c.createElement(n.li,null,"マルチバイト、マルチカラムの文字列と密接に関連していて libwc と不可分"),"\n"),"\n"),"\n",c.createElement(n.li,null,"キーボード入力"),"\n",c.createElement(n.li,null,"マウス入力"),"\n",c.createElement(n.li,null,"リサイズイベント"),"\n",c.createElement(n.li,null,"SIGNALハンドリング","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"SIGINT => longjmp でキャンセル処理を実現している。c++ のデストラクタとかまずそう"),"\n"),"\n"),"\n"),"\n"),"\n",c.createElement(n.li,null,"高レベル描画","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"Lineの構築(byte ごとに char と Lineprop がペアになる)"),"\n"),"\n"),"\n",c.createElement(n.li,null,"Tab"),"\n",c.createElement(n.li,null,"Buffer"),"\n",c.createElement(n.li,null,"Message"),"\n",c.createElement(n.li,null,"Menu"),"\n",c.createElement(n.li,null,"Keymap"),"\n",c.createElement(n.li,null,"LineInput","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"SearchKey"),"\n",c.createElement(n.li,null,"History"),"\n"),"\n"),"\n"),"\n"),"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"IO(transport)"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"IStream","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"union => class polymorphism化"),"\n",c.createElement(n.li,null,"file descriptor"),"\n",c.createElement(n.li,null,"FILE*"),"\n",c.createElement(n.li,null,"ssl"),"\n",c.createElement(n.li,null,"memory"),"\n",c.createElement(n.li,null,"Compression"),"\n"),"\n"),"\n",c.createElement(n.li,null,"LocalCGI"),"\n"),"\n"),"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"http"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"HttpSession","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"HttpRequest"),"\n",c.createElement(n.li,null,"HttpResponse"),"\n"),"\n"),"\n",c.createElement(n.li,null,"cookie"),"\n",c.createElement(n.li,null,"redirect"),"\n",c.createElement(n.li,null,"referer"),"\n",c.createElement(n.li,null,"https"),"\n",c.createElement(n.li,null,"ftp"),"\n",c.createElement(n.li,null,"URL"),"\n"),"\n"),"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"HTML"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"HTMLtagproc1"),"\n",c.createElement(n.li,null,"HTMLlineproc2body","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"process_form"),"\n",c.createElement(n.li,null,"process_form_int"),"\n"),"\n"),"\n",c.createElement(n.li,null,"form"),"\n",c.createElement(n.li,null,"table"),"\n",c.createElement(n.li,null,"frame"),"\n",c.createElement(n.li,null,"term rendering"),"\n"),"\n"),"\n",c.createElement(n.li,null,"\n",c.createElement(n.p,null,"String"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"文字コード"),"\n",c.createElement(n.li,null,"quote"),"\n",c.createElement(n.li,null,"url escape"),"\n",c.createElement(n.li,null,"html escape"),"\n",c.createElement(n.li,null,"html entity"),"\n",c.createElement(n.li,null,"char_util","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"myctype"),"\n"),"\n"),"\n",c.createElement(n.li,null,"string_view_util","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"strip"),"\n"),"\n"),"\n",c.createElement(n.li,null,"string_util","\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"malloc"),"\n"),"\n"),"\n"),"\n"),"\n"),"\n",c.createElement(n.h2,null,"リンクをたどる(followLink)"),"\n",c.createElement(n.p,null,"followA();\nloadLink();\nloadGeneralFile();"),"\n",c.createElement(n.p,null,"cmd_loadURL();\nloadGeneralFile();"),"\n",c.createElement(n.p,null,"cmd_loadURL();\nloadGeneralFile();"),"\n",c.createElement(n.h2,null,"描画する"),"\n",c.createElement(n.p,null,"displayBuffer\nredrawBuffer\nredrawNLine"),"\n",c.createElement(n.h2,null,"key入力"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?c.createElement(n,e,c.createElement(a,e)):a(e)}},1151:function(e,n,l){l.d(n,{ah:function(){return a}});var t=l(7294);const c=t.createContext({});function a(e){const n=t.useContext(c);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2020-w-3-m-mod-md-b8d0457cfd59295b38e3.js.map