---
title: "MinGW環境"
date: 2013-06-29
Tags: ['cpp']
---

MinGW環境
Irrlichtで開発を進めるにあたって開発環境をVC2010ExpressEditionからMinGWに乗り換えることにした。
後々Linux上でもコンパイルが通るようにしておきたいのでこちらの方が都合がよい。
基本的にはVCでもビルドできる状態を維持する方針ではある。
toolチェイン入手
MinGW本家ではなくTDM-GCCからgcc一式を入手する。
とりあえず32bit版を手に入れた。
bin/mingw32-make.exeをbin/make.exeにコピーしておいた。
cui整備
cygwinから使うとcygwinのincludeやlibを使われてややこしいのでDos窓ベースで開発する。
環境変数等をきっちり設定すればcygwin上でもできるのだけどやり方を忘れてしまったのでとりあえず。

http://www.nyaos.org/ Dos窓でcontrol-P,
control-Nによる履歴検索やパスのデリミタに”/“を使えるようになって快適になる。

プロジェクト構成やソースの修正
スタティックリンクの順番の調整と、一部templateの仕様が違ってコンパイルが通らないところ、
boostのpragmaで自動リンクになっていたところを明示的に記述するなどを
地道に修正した。あとboostのMinGWビルドの生成。
gccの方がVCより制約が厳しい感触だった。typenameが必要な箇所とか、staticメンバ関数のラムダ内での呼び出しで
thisキャプチャが無いエラーが出るなど。
逆に、何故VCでコンパイルが通っていたのか判らないところもあったがとりあえず作業完了。
ついでに、msgpack-rpc-asioの修正部分を更新。
あとでlibOVRのgcc作業をやる。
参考

http://anengineer.tumblr.com/post/13196592706/nyaos-bash-lua

*nya “’ option histfilesize 3000 option savehistfile
%USERPROFILE%/.history bindkey CTRL*P vzlike-previous-history bindkey
CTRL_N vzlike-next-history “’
