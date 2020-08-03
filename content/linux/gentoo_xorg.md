---
Title: "GentooでX11を設定する"
date: 2017-09-05
Tags: ['linux']
---

デスクトップの構築メモ。

xorg-server

https://wiki.gentoo.org/wiki/Xorg/Guide

/etc/portage/make.conf
INPUT_DEVICE="libinput"
VIDEO_CARDS="radeon"

# emerge -av xorg-server
````

# xのアプリを入れる

```shell
$ startx

とすると何もないのですぐに終わってしまう。
古のアプリを入れてみる。
# emerge -av twm xclock xterm 

動作を確認できた。
Plasma5

https://wiki.gentoo.org/wiki/KDE/Plasma_5_upgrade
https://wiki.gentoo.org/wiki/KDE#Plasma

# eselect profile list
Available profile symlink targets:
  [1]   default/linux/amd64/13.0 *
  [2]   default/linux/amd64/13.0/selinux
  [3]   default/linux/amd64/13.0/desktop
  [4]   default/linux/amd64/13.0/desktop/gnome
  [5]   default/linux/amd64/13.0/desktop/gnome/systemd
  [6]   default/linux/amd64/13.0/desktop/plasma
  [7]   default/linux/amd64/13.0/desktop/plasma/systemd
  [8]   default/linux/amd64/13.0/developer
  [9]   default/linux/amd64/13.0/no-multilib
  [10]  default/linux/amd64/13.0/systemd
  [11]  default/linux/amd64/13.0/x32
  [12]  hardened/linux/amd64
  [13]  hardened/linux/amd64/selinux
  [14]  hardened/linux/amd64/no-multilib
  [15]  hardened/linux/amd64/no-multilib/selinux
  [16]  hardened/linux/amd64/x32
  [17]  hardened/linux/musl/amd64
  [18]  hardened/linux/musl/amd64/x32
  [19]  default/linux/uclibc/amd64
  [20]  hardened/linux/uclibc/amd64

[6]   default/linux/amd64/13.0/desktop/plasmaを採用する。
# eselect profile set 6
# emerge --ask --changed-use --newrepo --deep world
# emerge --ask kde-plasma/plasma-meta

Widgets
# emerge --ask kde-plasma/kdeplasma-addons

Apps
# # 時間かかる
# emerge -av kde-apps/kdecore-meta

# emerge -av kde-apps/kdemultimedia-meta

xdm設定
起動時に自動でXのログイン画面が起動するようにする
# rc-update add xdm default
# vim /etc/conf.d/xdm
sddm

# /etc/init.d/xdm restart

s
Windows上にX-Server

https://sourceforge.net/projects/vcxsrv/
https://wiki.archlinuxjp.org/index.php/SDDM

SDDMはXDMCPサポートは無い？

https://wiki.gentoo.org/wiki/Display_manager

LightDMに乗り換え
VNC

https://wiki.gentoo.org/wiki/TigerVNC

日本語フォント
# emerge --ask noto
# emerge --ask Ricty

日本語入力
# emerge -av fcitx-anthy
# emerge -av kcm-fcitx

.bash_profile
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx

alsa
$ aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: HDMI [HDA ATI HDMI], device 3: HDMI 0 [HDMI 0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Generic [HD-Audio Generic], device 0: ALC887-VD Analog [ALC887-VD Analog]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 1: Generic [HD-Audio Generic], device 1: ALC887-VD Digital [ALC887-VD Digital]
  Subdevices: 1/1
  Subdevice #0: subdevice #0

3番目のALC887-VD Digitalに出力するように設定
/etc/asound.conf
defaluts.pcm.card 1
defaults.pcm.device 1
defaults.ctl.card 1

pcm.!default {
    type plug
    slave.pcm "hw:1,1"
}


# rc-update add alsasound boot

browser
ビルド時間長いのでバイナリを入れとく
# emerge -av google-chrome
# emerge -av firefox-bin

