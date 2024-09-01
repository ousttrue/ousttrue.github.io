---
title: 端末の住人
date: 2024-02-20
tags: [linux]
---

Windows機のSSDが壊れてしまった。
交換して復旧するついでに、何故か ArchLinux との dual boot になった。

## KMSCON

当初 wayland の desktop を構築するつもりだったのだが、
気が付いたら framebuffer kmscon の設定をしていた。
nvim が普通に使えるところまでできたので、とりあえずこれでよし。

使っているのは以下のとおり。

- kmscon
- HackGenNerd
- tmux

kmscon の導入で font が強化されるとともに、
色が強化されたので tmux や nvim の表示が gui 環境と同等になって、
快適になりました。

nerdfont で後続が space のときに2column描画するやつが、
見切れる以外は特にこれといった問題はありません。

あと、w3m で見れないときに、 chrome とか firefox に逃げることができない。
github が見辛いのが悩ましい。

# 日本語

現状 nvim の skk しか日本語を入力できないので、
w3m でも入力できるようにしたい。

[Arch Linuxのコンソールで日本語環境を作る - プログラミングなんてわからないんですけど〜](https://www.kaias1jp.com/entry/2021/01/11/173542)

uim-fep で skk 入力できた。

## astro で生成される site は w3m でも問題なし

なんとなく、記事を作って w3m で preview してみた。
SPA的なやつとか js 使うやつはどうなのか少し気になる。 
`svelte` とか。

## framebuffer

KMSCON 以外もあとで試してみるべく情報収集。

- [UNIX系 CUI環境のpackage/toolまとめ(X/Wayland無し環境) #Linux - Qiita](https://qiita.com/pona_per/items/4b7a91089d4f384234b8)

