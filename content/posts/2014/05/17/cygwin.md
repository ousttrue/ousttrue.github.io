---
title: "cygwinの導入とgit最新版のビルドまで"
date: 2014-05-17
Tags: []
---

cygwinの導入とgit最新版のビルドまで
しばらくWindows上のメインのshellをmsysgitのbashにしていたのだが、
久しぶりにcygwinに回帰した。
知らない間に環境が良くなっているじゃないの、ということで初期導入手順メモ。
既存のcygwinを掃除
“C:/cygwin”にインストール済みだが、
download済みのパッケージくらいは置いておこうということで以下のファイル/ディレクトリ
以外を削除した。
c:/cygwin
    + setup-x86.exe
    + http%3a%2f%2f... (パッケージのダウンロードディレクトリ)
    + etc/

あとetc/setupも削除。 これでクリーンな状態になるっぽい。
以降、 http://tar.blogru.me/entry/2014/03/20/004156
の通りにgitのビルドまで遂行。
cygwinセットアップ
setup-x86.exeを実行。wgetとgitを追加インストール。
apt-cyg導入
$ mkdir -p /usr/local/src
$ cd /usr/local/src
$ git clone https://github.com/transcode-open/apt-cyg.git
$ cp apt-cyg/apt-cyg /usr/local/bin/

最新版gitのビルド
ビルドに必要なもの
install.sh
set -x
apt-cyg install gcc-core
apt-cyg install make patch vim
apt-cyg install libncurses-devel openssl-devel readline libsqlite3-devel libxml2-devel libxslt-devel
apt-cyg install autoconf zlib zlib-devel libiconv python openssh tcl
apt-cyg install gettext-devel
apt-cyg install curl libcurl-devel

ビルド
$ cd /usr/local/src
$ git clone git://github.com/git/git.git
$ cd git
$ make configure
$ ./configure --prefix=/usr/local --with-curl --with-expat
$ make all & make install

トラブルシューティング
“make install”で
make: execvp: install: Permission denied cygwin

というエラーが出てはまる。どうやらgitに含まれるINSTALLがmake
installのターゲットに 誤認されるという現象っぽい。
INSTALLを撤去したらうまく動いた。
$ rm INSTALL gitweb/INSTALL

別のマシンでは起きなかったのだがなんだこれは。
トラブルシューティング2
Windows8固有の問題のようだがmake中のforkに失敗する件について。
対策は、”rebaseall”ではなく
$ export LANG=C

とすることだった。
windows8-上で-cygwin-版の-git-で-pullpushfetch-に失敗するhttp://kamiyn.wordpress.com/2012/10/18/windows8-%E4%B8%8A%E3%81%A7-cygwin-%E7%89%88%E3%81%AE-git-%E3%81%A7-pullpushfetch-%E3%81%AB%E5%A4%B1%E6%95%97%E3%81%99%E3%82%8B/
のコメントに書いてあった。
かくして、gitが最新版になった。
$ git --version
git version 2.0.0.rc3.4.g6308767.dirty

思えば、cygwinをやめたのはgitがうまく動かなかったのを解決できなかったのが原因だった
ような気がするので、最新版がさくっとビルドできるのはありがたい。
