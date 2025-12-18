---
date: 2025-12-15
title: ArchLinux を surface3 に構築
tags: [linux]
---

帰省時の暇潰し向けに NotePC を整備。

当初 PomeraDM250 に Debian11 を入れる件を試していたのだが、
prebuilt の zig-0.15.2 が動かなかった。たぶん、libc 等のバージョンの相違が原因。
出発までに解決できなさそうなので、 SurfacePro3 に ArchLinux を入れたものを使うことにした。重量が重くなるが、確実に動きそうなのでこれで。

## sway になった

labwc で途中まで作ったのだけど surface3 だと画面がせまいし、mouse が無い(TrackPadはある)ことも想定されるので tile 型の sway も試してみることにした。

それなりの使い勝手になるところまで設定できた。下のレイヤーから順に作業をメモしてみる。

## udev による keymap

- udev
  - console: /usr/share/kbd/keymaps
  - xkb
  - wayland

のような階層になっているので、根本の udev をカスタマイズすれば一箇所で済むようだ。

| src              | dst      | note |
| ---------------- | -------- | ---- |
| caps             | leftctrl |      |
| ctrl             | leftmeta |      |
| leftmeta         | leftalt  |      |
| 無変換           | leftalt  |      |
| 変換             | rightalt |      |
| カタカナひらがな | rightalt |      |

のように変えて、下の方は全部altというゆるふわなキーマップにしてみた。

## fcitx5-skk

text-input-v3 とは何ぞや。という感じである。
最近、 `labwc` で GTK_IM_MODULE 要らないよというメッセージが出てくるので無しにしてみたところちゃんと動いた(wezterm config.use_ime = true, firefox)。

こんな感じと推測。`app=>text-input-v3=>sway=>text-input-v3=>fcitx5`
appとcompositor 間 compositorとime(fcitx5) 間というような通信をしているのではないか。 sway の設定で `exec fcitx5` しているので、compositor は `text-input-v3` により fcitx5 を知っているのである。

## login manager

ly。 最近はこれがお気に入りじゃ。 `shell` に降りる退路を確保できるのがよい。
fbterm や tmux の session を設定してもよいかもしれない。

ly のバージョンアップで systemd のサービス名が設定が変わっていた。

```
sudo systemctl enable ly@tty2.service
```

## sway

キーボードショートカットを何も知らないと戸惑う。

`super+enter` で `foot` 。
foot から `killall sway` で脱出。

一番最初はここからではないか。
wofi, waybar, mako にしてみた。

## やっぱり labwc に

labwc に Window を横並びにするショートカットを仕込んだ。
あと、ghostty にしてみる。
なんか wezterm がクラッシュしやすい環境になってしまった。

