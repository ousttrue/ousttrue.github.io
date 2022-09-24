+++
date = 2022-04-20
tags = ["linux"]
+++

# Gentoo 構築

久しぶりに gentoo の機運が高まったので入れてみた。
先に `Ubuntu-20.04` を入れておいて、後ろのパーティションに gentoo をインストールする作戦。
Ubuntu と同じ `/home` をマウントしてみたら `dotfiles` に互換性が無かったのでやめた。
わりと順調にインストールできた。
ゆくゆくは wsl も gentoo に換装したいところじゃ。

## 2022-05-05

システムを壊してしもた。
作りなおし。ついでに [btffs](https://wiki.gentoo.org/wiki/Btrfs) やってみる。

* <https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Stage#Downloading_the_stage_tarball>

Stage3: `openrc | desktop profile`

## btrfs

`/etc/fstab`
```
/dev/sdb                /srv            btrfs           compress=zstd:9,relatime,rw     0 0
```

## python-3.10

`PYTHON_SINGLE_TARGET`

6月くらいにデフォルトになる予定みたいだ。先にやってみた。

間違い。去年の6月に、 `Python-3.9` がデフォルトになった。
`Python-3.10` は今のところ予定に無い。
いろいろインストールできなくなったので、元に戻した。

## make.conf

ここに貼っておこう。
こいつを育てているようなものだし。

```
# These settings were set by the catalyst build script that automatically
# built this stage.
# Please consult /usr/share/portage/config/make.conf.example for a more
# detailed example.
COMMON_FLAGS="-march=native -O2 -pipe"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"

# NOTE: This stage was built with the bindist Use flag enabled
PORTDIR="/var/db/repos/gentoo"
DISTDIR="/var/cache/distfiles"
PKGDIR="/var/cache/binpkgs"

USE="X sixel truetype vim-syntax jpeg png python fontforge cjk alsa \
     pulseaudio mp3 dbus opengl ffmpeg mad mpd elogind gtk"
INPUT_DEVICES="evdev libinput synaptics"
#VIDEO_CARDS="nouveau"
VIDEO_CARDS="nvidia"
ABI_X86="64"

# This sets the language of build output to English.
# Please keep this setting intact when reporting bugs.
LC_MESSAGES="C"

MAKEOPTS="-j6"
```

## passwd

`/etc/security/passwdqc.conf`

## boot

`refind` を試してみた。
先に、Ubuntu の方でインストールして `gentoo` でエントリーだけ増やした。
`grub2` より設定が簡単だと思った。
情報は少なめ。

`/boot/efi/EFI/refind/refind.conf`
```
# rootの指定が必要 
menuentry Gentoo {
    icon EFI/refind/icons/os_gentoo.png
    loader /EFI/gentoo/vmlinuz-5.15.32-gentoo-r1-x86_64
    initrd /EFI/gentoo/initramfs-5.15.32-gentoo-r1-x86_64.img
    options "root=/dev/sda4"
}
```

起動時に自動検索と設定に記述したエントリが出てくるので、`-` キーで隠すと見ためがすっきりする。
## xorg

なんとなくできた。

```
$ startx -- vt1
```

としないとエラーになる。
`/etc/X11` は作らなくても動いた。

いつもどおりに `openbox`, `tint2`, `PCManFM`, `conky` という感じだが、今回は新型の `wezterm` がある。

## yaft

nerdfonts 入りの bdffont を作りたいのだが未だ。
mlterm-fb や kmscon も試してみたのだがうまく動かなかった。

## wayland

TODO:

