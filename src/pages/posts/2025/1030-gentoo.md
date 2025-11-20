---
date: 2025-10-30
title: 久しぶりに GentooLinux
tags: [gentoo]
---

やっぱ Gentoo がしっくりくるのぅ。
Ubuntu は固より、Arch でも物足りない感じがするからのう。

手始めに `surface3 i5` に入れてみた。

# systemd

ついに `systemd` にすることにした。

# bootloader を systemd-boot

設定の方法が分かれば、 `grub` など他の方法に比べてもシンプルでよい。

# portage の git 化

# guru 追加

# kernel ビルドはパス

binary dist を使わせてもらいました。

# llvm ビルド長い

`labwc` をビルドしたらやたら時間がかかったのだけど、
`mesa` => `galium` => `llvm` の依存になってしまったようだ。

# display server

`ly` を採用。
`zig` 製だったので自前ビルドしてみた。

`animation` を有効にすると `cpu` を `15%` 使いっぱなしになっていた w。
不通に時計だけの表示にして地味に。

framebuffer(yaftとか) のセッションを実験してみよう。

あと、普段使いに tmux のセッションとか作るといいかもしれない。
メンテナンス用に bash に降りる方法を確保した上で、
普段は login と同時に tmux 。

# go 系のツール

ghq, fzf, lazygit はマニュアルインストールにした。

# rust 系のツール

rg, fd, bottom, zoxide は emerge (guru) を使った。

# TODO

## plasma

## pipewire

## fcitx5 skk

## WiVRn

OpenXR
