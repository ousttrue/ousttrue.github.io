---
date: 2013-05-20
tags:
- linux
title: Gentoo再構築
---

# Gentoo再構築

gentooのルートファイルシステムに10Gを割り当てていたのだがいつのまにかディスクフルになってしまった。
portageとhomeをmountしていたので大丈夫かと思っていたのだが意外と容量を使ってしまっていた様子。
いろいろインストールしすぎなのかもしれぬ。
とりあえず/var/logの大きいファイルをxzして急場を凌いだが、
パーティションの割り方の都合で拡大できないので新しく作り直すことにした。

## 作業記録。

### ファイルシステム準備

```
# lvcreate -L 100G -n gentoo_root mygroup
# mkfs.ext4 /dev/mygroup/gentoo_root
# cd /mnt
# mkdir gentoo
# mount /dev/mygroup/gentoo_root
```

### Installing the Gentoo Installation Files

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=5

stage3ファイルの取得と展開

```
# cd /mnt/gentoo
# wget http://ftp.jaist.ac.jp/pub/Linux/Gentoo/releases/amd64/current-stage3/stage3-amd64-20130516.tar.bz2
# tar xvjpf stage3-*.tar.bz2
```

portageは旧パーティションを流用

```
# mkdir usr/portage
# mount /dev/mygroup/portage usr/portage

/etc/portage/make.conf
# These settings were set by the catalyst build script that automatically
# built this stage.
# Please consult /usr/share/portage/config/make.conf.example for a more
# detailed example.
CFLAGS="-march=native -O2 -pipe"
#CFLAGS="-march=bdver2 -O2 -pipe"
CXXFLAGS="${CFLAGS}"
# WARNING: Changing your CHOST is not something that should be done lightly.
# Please consult http://www.gentoo.org/doc/en/change-chost.xml before changing.
CHOST="x86_64-pc-linux-gnu"
# These are the USE flags that were used in addition to what is provided by the
# profile used for building.
USE=""
USE="$USE -ldap"
USE="$USE mmx sse sse2 sse3 ssse3"
USE="$USE openal alsa gstreamer phonon pulseaudio xft xnest"
USE="$USE gtk gnome xfce imlib gconf"
USE="$USE qt4 kde"
USE="$USE gd imlib eigen"
USE="$USE sqlite apache2"
USE="$USE ffmpeg theora lame mms"
USE="$USE samba fuse udisks"
USE="$USE icu"
USE="$USE consolekit dbus pam policykit udev"
USE="$USE c++0x"

INPUT_DEVICES="evdev"
#VIDEO_CARDS="radeon"
VIDEO_CARDS="fglrx"
LINGUAS="ja"

MAKEOPTS="-j5"
GENTOO_MIRRORS="http://ftp.iij.ad.jp/pub/linux/gentoo/ ftp://ftp.iij.ad.jp/pub/linux/gentoo/ http://ftp.jaist.ac.jp/pub/Linux/Gentoo/"
```

CFLAGSに-march=nativeを使えるようになった

### Installing the Gentoo Base System

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=6

```
# cp -L /etc/resolv.conf /mnt/gentoo/etc/
# mount -t proc none /mnt/gentoo/proc
# mount --rbind /sys /mnt/gentoo/sys
# mount --rbind /dev /mnt/gentoo/dev

# chroot /mnt/gentoo /bin/bash
# source /etc/profile
# export PS1="(chroot) $PS1"

# emerge --sync
# cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
# echo "Asia/Tokyo" > /etc/timezone
```

### Configuring the Kernel

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=7

```
# emerge gentoo-sources
```

LVMからブートするのでgenkernelを使う

```
# emerge genkernel
# genkernel --lvm --install all
```

### Configuring your System

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=8

### Installing Necessary System Tools

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=9

### Configuring the Bootloader

http://www.gentoo.org/doc/en/handbook/handbook-amd64.xml?part=1&chap=10

/boot/grub/menu.lst
```
title genkernel 3.8.13
root (hd0,0)
kernel /boot/kernel-genkernel-x86_64-3.8.13-gentoo real_root=/dev/mygroup/gentoo_root rootfstype=ext4 dolvm
initrd /boot/initramfs-genkernel-x86_64-3.8.13-gentoo
```

