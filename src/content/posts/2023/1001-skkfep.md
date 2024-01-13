---
date: 2023-10-01
tags:
  - tui
  - skk
title: skkfep改造メモ
---

なんとなくtuiでskkを使いたくなった。
できればソースを見て改造したりできるような小さい実装を探索。

## uim-fep

uim のソースに含まれている `uim-fep`。

[https://github.com/uim/uim/blob/master/fep/README.ja](https://github.com/uim/uim/blob/master/fep/README.ja)

[sigscheme](https://github.com/uim/sigscheme) という scheme 実装に依存して、
更にこれが [libgcroots](https://github.com/uim/libgcroots) というガーベッジコレクターに依存している。
ビルド面で取りまわしが悪かった。
すなおに `configure` してもうまくいかなくて、`make-wc.sh` 経由ならばビルドできる。
(どこかに書いてある。)

scheme できないのもあって uim-fep の採用は見送ったのだけど、
tui frontend のソースは勉強になった。

上流の term に対しては、 escape sequence でスクロール領域を設定し、
下流の pty に対しては1行小さく `struct winsize` を指定するという技で
一番下をステータスラインとして使用していた。


TERMINFO で以下のような感じ。
```c
const char *tmp = tparm(change_scroll_region, start, end, 0, 0, 0, 0, 0, 0, 0);
```

これは、 `DECSTBM` というエスケープシーケンスになるようだ。
```
ESC[<t>;<b>r
```

ただ、pty の出力のあいまにステータスライン描画とPreEdito描画を挿入する必要があるのだけど、
変なタイミングで出力すると描画が乱れる。
特にスクリーンエディタタイプのアプリでは不規則に画面全体が更新される可能性があるので、
共存できないものがありそう。
uim-fep はptyの出力内容をパースして状態を判定していそうだった。

## skkfep 発掘

検索すると Windows 版の別の skk がヒットするのだけど、 古の `skkfep` がある。
ソースコードを探索していたのだが、 gentoo の ebuild から発見することができた。

[http://ftp.nara.wide.ad.jp/pub/Linux/gentoo-portage/app-i18n/skkfep/skkfep-0.87-r1.ebuild](http://ftp.nara.wide.ad.jp/pub/Linux/gentoo-portage/app-i18n/skkfep/skkfep-0.87-r1.ebuild)

skkfep のホームページは無くなっているのだけど、ソースコードは元の url にひっそりと生きている。
ただ、ビルドしても `segmentation fault` で動かなかった。
これは、拡張子を `c` から `cpp` に変えて、 `c` がなんでも `int` に解釈するのを
やめることで、なんとなく動くようになった。
どこかでメモリー破壊が起きていたのだろうけど、どこかはわからない。

ソース規模的に手に負えそうだったのでやってみることにした。

### skkfep のステータスラインの実装など

ステータスラインに関しては、 uim-fep と同じ手法ぽい(こっちの方が古い？)。
TERMCAP で実装されていて、 `AIX`, `SOLARIS` 等のUNIXで動くようになっている。
あと、ハードウェア的にステータスラインを持った機種向けと思われる分岐があった。

特徴的なのは `euc-jp|sjis|iso-2022-jp` を前提としていて、
入出力で文字コードの変換をしているところ。
term と pty で違う文字コードが使われることも想定しているぽい。

## yaskk

[https://github.com/uobikiemukot/yaskk](https://github.com/uobikiemukot/yaskk)

もっと小さい実装としてこちらも参考になる。
READMEの状態遷移図も参考になる。

skkfep のキーマップがいっぱい(9つ？)あって変だなぁと思っていたのだが、
入力モード(4つ)と変換モード(3つ)の2つがあることを途中で理解した。

## 理想的には仮想画面

pty の出力を libvterm で受けて仮想画面に反映。
ステータスラインとPreEditの描画も仮想画面に合成。
合成済みの仮想画面を term に描画というのがよさそう。
この方法なら変換候補のメニュー表示など、元画面の上書きができる。
仮想画面を escape sequence 出力する機能については ftxui を使う構想。
全体の実装量が増えるのだが、pty 出力の自前解析は不要になる。
いちおう Windows でも動くを念頭に追いている。

しかし、良く考えると preedito の描画位置を決める情報が無さそうである。
カーソル位置に暗黙的に出力するしか無い。
cli ではうまくいく可能性が高いが、tui ではアプリによるんではないか。

## まだちゃんと動かず

[https://github.com/ousttrue/skkfep](https://github.com/ousttrue/skkfep)

改造しすぎて動かなくなってしまった。
(もともと utf-8 では一度もちゃんと動いていないので気にしていない w)
再構成するべく改造を継続中。

なおこの記事は、nvim + skkeleton で書いております。
tui で editor 以外で日本語を入力したいことはあまり無いので、全部 skkeleton でいいのでは？
と思わなくもないが、 強いて言えばw3mを使うとき？

## 参考

- [http://quruli.ivory.ne.jp/document/ddskk_14.2/skk_3.html](http://quruli.ivory.ne.jp/document/ddskk_14.2/skk_3.html)

