---
date: 2013-05-21
tags:
  - linux
title: xorgインストール
---

gentooにxorgをインストールする

[The X Server Configuration HOWTO](http://www.gentoo.org/doc/en/xorg-config.xml)

```title="/etc/portage/make.conf"
INPUT_DEVICES="evdev"
```

```sh
echo "x11-base/xorg-server udev" >> /etc/portage/package.use
emerge -av xorg-server
env-update
source /etc/profile
```

## fglrx

http://wiki.gentoo.org/wiki/Fglrx
AMD A10 向けにfglrxドライバ

```sh
$ cat /proc/cpuinfo | grep model
model name : AMD A10-5700 APU with Radeon(tm) HD Graphics
$ lspci | grep -i vga
00:01.0 VGA compatible controller: Advanced Micro Devices [AMD] nee ATI Trinity [Radeon HD 7660D]
```

kernel作り直し `Direct Rendering Manager` を無効にする。

```sh
genkernel --lvm2 --menuconfig --no-clean all
VIDEO_CARDS="fglrx"
emerge xorg-drivers
aticonfig --initial
eselect opengl set ati
```

## intel

`VIDEO_CARDS="intel"`

## Desktop

gnomeとかをいれずにopenboxを素で使う。lxdeぽい感じ。

```sh
emerge -av xterm xmodmap
```

Window Manager

```sh
emerge -av openbox openbox-menu
```

メニュー設定

`./config/openbox/menu.xml`

Display Manager

```sh
emerge -av lxdm
vim /etc/conf.d/xdm
/etc/init.d/xdm start
rc-update add xdm default
```

IME

```sh
emerge -av scim-anthy
```

Font

```sh
emerge -av ricty
```

Term

```sh
emerge -av xfce4-terminal
```

Taskbar

```sh
emerge -av tint2
```

Filer

```sh
pcmanfm -av pcmanfm
```

Desktop関連のデーモン
USEにconsolekit, dbus追加

```sh
emerge --ask --changed-use --deep @world
rc-update add consolekit default
rc-update add dbus default
```

CapsキーをControlに変更。

```title=".Xmodmap"
!!
!! Caps_Lock to Control
!!
remove Lock = Caps_Lock
add Control = Caps_Lock
keysym Caps_Lock = Control_L
```

セッション

```title="~/.xsession"
xmodmap .Xmodmap

export LANG=ja_JP.UTF-8
# 日本語入力周り
export XMODIFIERS="@im=SCIM"
export GTK_IM_MODULE="scim-bridge"
export QT_IM_MODULE="scim-bridge"
scim -d &

exec ck-launch-session openbox-session
```

TouchPad

http://wiki.gentoo.org/wiki/Synaptics

```title="/etc/portage/make.conf"
INPUT_DEVICES="synaptics"
```

```sh
emerge --ask --changed-use --deep world
```
