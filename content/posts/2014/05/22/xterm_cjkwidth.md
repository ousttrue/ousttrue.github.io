---
Title: "cygwin上のxorg上のtermで日本語を表示する"
date: 2014-05-22
Tags: []
---

cygwin上のxorg上のtermで日本語を表示する
cygwin版のxorg上のxtermで全角文字が微妙にずれる件との戦い。
.Xresourceで関連すると思われる項目。
XTerm*cjkWidth : true
XTerm*forcePackedFont: false

スクロールが発生した時に全角文字の間にスペースが入る問題
ls等でスクロールが発生した時に表示が乱れる。
XTerm*jumpScroll: false

で解決したっぽい？
screenの中でも同様の問題がw
$ screen --version
Screen version 4.02.01 (GNU) 28-Apr-14

どうも根深いらしくxtermを断念。
urxvtで頑張る
.Xresource
#define INCONSOLATA xft:Inconsolata:style=Medium:pixelsize=16,xft:メイリオ:pixelsize=18
urxvt*font: INCONSOLATA
urxvt*boldFont: INCONSOLATA

こういう感じで半角用の次に続けて全角用のフォントを指定することでうまくいった。
urxvtの中からscreenやtmuxしてもスクロール時に文字間隔が開く現象は出なくなった。
