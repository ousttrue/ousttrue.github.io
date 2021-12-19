---
title: "gvimのためにcygwinでxorg導入"
date: 2014-05-21
taxonomies: {tags: []}
---

gvimのためにcygwinでxorg導入
環境をcygwinに変えたらシンボリックリンクを使えるようになった。MSYSの時より綺麗にdotfilesの共有ができるようになったのだが、引きかえにWindows版のvimの設定が読みこめなくなってしまったw。
ということでcygwin版のgvimをインストールすることにしたのだが、こいつはxorgに依存していたのであった。
xtermの環境設定からだ
xorgを使うことにしたので勢い余ってtermもxtermにしますかということで設定してみる。
まずはfont設定から。
cygwin版のxtermはトゥルータイプフォントを表示できる。使えるようにするには、
~/.fontsディレクトリにttcファイル等を配置するだけだ。
MSゴシックの場合こうだ。
$ cd
$ mkdir .fonts
$ cd .fonts
$ ln -s /cygdrive/C/WINDOWS/Fonts/msgothic.ttc

半角用にInconsolataも用意した。http://levien.com/type/myfonts/inconsolata.html
$ ls .fonts
Inconsolata.otf msgothic.ttc
$ fc-match.exe Inconsolata
Inconsolata.otf: "Inconsolata" "Medium"
$ fc-match.exe gothic
msgothic.ttc: "ＭＳ ゴシック" "Regular"

フォントを指定してxtermを起動してみる。
$ DISPLAY=:0 xterm -fa "ＭＳ ゴシック"

文字の隙間が広すぎでよろしくない。
半角フォントと全角フォントを別々に指定するべし。
$ DISPLAY=:0 xterm -fa "ＭＳ ゴシック" -fd Inconsolata

いい感じだ。 これを設定にするには、
~/.Xresources
XTerm*renderFont: true
XTerm*faceName: Inconsolata
XTerm*faceNameDoublesize: MS Gothic
XTerm*faceSize: 12

xorg起動時に自動的に読みこまれるようにするには、
~/.startxwinrc
xrdb -merge ~/.Xresources

とりあえずフォント設定としては以上。
日本語入力としてskk.vimを導入
日本語の表示はできるようになったが依然として入力はできない。kinput2とかを入れるのは辛そうだったのでvim専用になるがskk.vimを使うことにした。
とりあえずこれをvimで編集できる程度にはなった。
