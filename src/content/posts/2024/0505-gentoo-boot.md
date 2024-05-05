---
title: gentoo, Full manual approach 難航
date: 2024-05-05
tags: [gentoo]
---

久しぶりに gentoo やってみたら、
boot のところでおおいにはまる。

`gentoo-sources-6.6.21 & Full manual approach

```
Loading Linux newlinux ...
Loading initial ramdisk ...
_


            EFI stub: Loaded initrd from LINUX_EFI_INITRD_MEDIA_GUID device path

```

で固まって何も出力されない。
エラーメッセージ出てくれー。難易度が高すぎる。

# env

- Ubuntu-22.04 の母艦で空きパーティションに gentoo を入れる
- EFIパーティションは共有

# frame buffer ?

video output が無くて出力が消えていると推測。
vesa とか efi framebuffer などの kernel 機能を組み込んでみるが
変わらず。

# vanilla-6.8.9

カーネルのバージョンを変えてみる。
変わらず。

# efi stub ?

EFI stub と 非EFI stub 両方とも出力が無い。

# version 問題？

- https://bugzilla.kernel.org/show_bug.cgi?id=218173

`nokaslr` はどうかと書いてあるのでやってみた。

ちょっと前進？

```
No suitable video mode found. Booting in blind mode
```

と出た。
やはり frame buffer 出力できていないぽい？

# `gentoo-sources-6.1.90`

6.6 から問題があるような気がするので、それより古いソースを選ぶ。

```sh
make defconfig
LOCALVERSION=-custom make -j8
make modules_install
make install
```

変わらず。

# no output と initrd で検索

- [Gentoo Forums :: View topic - No output visible from initramd using EFI boot](https://forums.gentoo.org/viewtopic-t-1008506-start-0.html)

```sh
CONFIG_EARLY_PRINTK_EFI=y # 見つからず
CONFIG_FB_EFI=y
CONFIG_FRAMEBUFFER_CONSOLE=y
```

できたー。

たぶん、

`CONFIG_FRAMEBUFFER_CONSOLE=y`

だ。

# gentoo-sources-6.6.21 でやりなおし。

```sh
# eselect kernel list
Available kernel symlink targets:
  [1]   linux-6.1.90-gentoo *
  [2]   linux-6.6.21-gentoo
  [3]   linux-6.8.9
```

掃除して。。。

```sh
# eselect kernel list
Available kernel symlink targets:
  [1]   linux-6.6.21-gentoo *

# ls /boot
grub
```

build

```
# cd /usr/src/linux
# make defconfig
# make menuconfig

Device Drivers > Graphics support
  Frame buffer Devices
    <*> Support for frame buffer device drivers
      [*] VESA VGA graphics support
      [*] EFI-based Framebuffer Support
  Console display driver support
      [*] Framebuffer Console support

# LOCALVERSION=-fbconsole make -j8 && make modules_install && make install
```

`Framebuffer Console support` に関しては、
チェックボックスがあるときと自動で有効になっているときがあった。
条件はわからない。

`/etc/default/grub` も掃除

```sh
GRUB_DISTRIBUTOR="Gentoo"
GRUB_CMDLINE_LINUX=""

# grub-mkconfig -o /boot/grub/grub.cfg

# lsblk
sda      8:0    0 931.5G  0 disk
├─sda1   8:1    0   512M  0 part /efi
├─sda2   8:2    0 465.7G  0 part
├─sda3   8:3    0  93.1G  0 part
├─sda4   8:4    0  93.1G  0 part /
```

reboot

```
Loading Linux newlinux ...
Loading initial ramdisk ...
_


            EFI stub: Loaded initrd from LINUX_EFI_INITRD_MEDIA_GUID device path

```

あれ？

`nokaslr` もだめ。つまり、`6.1.90` かつ `CONFIG_FRAMEBUFFER_CONSOLE` が必要だ。

# gentoo-sources-6.1.90 でやりなおし。

```sh
# eselect kernel list
Available kernel symlink targets:
  [1]   linux-6.1.90-gentoo *
```

`gentoo-sources-6.6.21` と同じ手順。

動いた。
やっとスタート地点に来た。
疲れたぞ。
