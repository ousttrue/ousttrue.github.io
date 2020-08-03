---
Title: "久しぶりにGentooインストール"
date: 2017-09-04
Tags: ['linux']
---

Linux成分が不足してきたので久しぶりにデスクトップを構築してみる。

ISO入手からUEFI bootのUSBメモリ作成

SystemRescueCdがよい
Rufasで起動するUSBメモリを作成する


パーティション構成とターゲットシステムの種類をGPT UEFIコンピュータ用のパーティション構成を選択するべし


起動
USBメモリを差し込んでPCを起動し、delキーでUEFI画面に入る。
UEFIの起動メニューからUSBメモリを選択してSystemRescueCdを起動する。
> efibootmgr # UEFIモードで起動したか確認
> passwd # sshログイン用のパスワードを決める
> startx
> ifconfig # ip確認

Handbook(Preparing the disks)

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Disks

# parted /dev/sda

(parted) print
Model: ATA ST3500418AS (scsi)
Disk /dev/sda: 476940MiB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start    End        Size       File system     Name     Flags
 1      1.00MiB  129MiB     128MiB                     efi      boot, esp
 2      129MiB   641MiB     512MiB     linux-swap(v1)  primary
 3      641MiB   102401MiB  101760MiB                  gentoo

# mkswap /dev/sda2
# swapon /dev/sda2

# mkfs.ext4/dev/sda3
# mount /dev/sda3 /mnt/gentoo

# mkfs.vfat /dev/sda1
# mkdir /mnt/gentoo/boot
# mount /dev/sda1 /mnt/gentoo/boot

Installing the Gentoo installation files
clock設定。
# ntpd -q -g

Stage3のdownloadと解凍
# cd /mnt/gentoo
# wget http://ftp.jaist.ac.jp/pub/Linux/Gentoo/releases/amd64/autobuilds/20170831/stage3-amd64-20170831.tar.bz2
# tar xvjpf stage3-*.tar.bz2 --xattrs --numeric-owner

portage設定
# nano -w /mnt/gentoo/etc/portage/make.conf

CFLAGS="-march=native -O2 -pipe"
# Use the same settings for both variables
CXXFLAGS="${CFLAGS}"

MAKEOPTS="-j5" # 4コアなので

Installing the Gentoo base system

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Base

mirror設定
日本のサーバーを選択
# mirrorselect -i -o >> /mnt/gentoo/etc/portage/make.conf

repository設定
ここよくわからぬ
# mkdir /mnt/gentoo/etc/portage/repos.conf
# cp /mnt/gentoo/usr/share/portage/config/repos.conf /mnt/gentoo/etc/portage/repos.conf/gentoo.conf

chroot準備
# cp -L /etc/resolv.conf /mnt/gentoo/etc/
# mount -t proc /proc /mnt/gentoo/proc
# mount --rbind /sys /mnt/gentoo/sys
# mount --make-rslave /mnt/gentoo/sys
# mount --rbind /dev /mnt/gentoo/dev
# mount --make-rslave /mnt/gentoo/dev

chroot
# chroot /mnt/gentoo /bin/bash
# source /etc/profile
# export PS1="(chroot) $PS1"
(chroot) livecd / #

構築
# emerge-webrsync
# eselect news read
# emerge --ask --update --deep --newuse @world

profile選択は後で起動するようになってからやればいいのでここではやらない。
timezone。
# echo "Asia/Tokyo" > /etc/timezone
# emerge --config sys-libs/timezone-data

nanoでなくてvimを使いたいので入れとく。
# emerge -av vim

locale。日本語を有効にして、システムはen_us.UTF-8に。
# vim /etc/locale.gen
en_US.UTF-8 UTF-8
ja_JP.EUC-JP EUC-JP
ja_JP.UTF-8 UTF-8

# locale-gen

# eselect locale list
Available targets for the LANG variable:
  [1]   C
  [2]   en_US.utf8 *
  [3]   ja_JP
  [4]   ja_JP.eucjp
  [5]   ja_JP.ujis
  [6]   ja_JP.utf8
  [7]   japanese
  [8]   japanese.euc
  [9]   POSIX
  [ ]   (free form)

Configuring the Linux kernel

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Kernel

source
# emerge --ask sys-kernel/gentoo-sources

genkernel
bootパーティションは分けなかった。
# emerge --ask sys-kernel/genkernel
# genkernel all # 長時間かかる
# emerge --ask sys-kernel/linux-firmware

Configuring the system

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/System

/etc/fstab
/dev/sda3               /               ext4            noatime         0 1

# EFI。EFI起動するときに使ったデバイスでないといかん
#/dev/sda1              /boot           vfat            noatime         0 1
/dev/sdb2               /boot           vfat            noatime         0 1

/dev/cdrom              /mnt/cdrom      auto            noauto,ro       0 0
/dev/sda2               none            swap            sw              0 0

network
# vim /etc/conf.d/hostname
# vim /etc/conf.d/net
config_eth0="192.168.0.2 netmask 255.255.255.0 brd 192.168.0.255"
routes_eth0="default via 192.168.0.1"
# emerge --ask --noreplace net-misc/netifrc
# cd /etc/init.d
# ln -s net.lo net.eth0
# rc-update add net.eth0 default

root password
# root passwd

Installing system tools

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Tools

logger
# emerge --ask app-admin/sysklogd
# rc-update add sysklogd default

cron
# emerge --ask sys-process/cronie
# rc-update add cronie default

sshd
# rc-update add sshd default

Configuring the bootloader

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Bootloader

efibootmgrではまる

https://wiki.gentoo.org/wiki/EFI_stub_kernel
https://wiki.gentoo.org/wiki/Efibootmgr

# emerge --ask sys-boot/efibootmgr
# mkdir -p /boot/efi/boot
# cp /boot/kernel-genkernel-x86_64-4.12.5-gentoo /boot/efi/boot/bootx64.efi
# efibootmgr -c -d /dev/sda -p 1 -L "Gentoo" -l "\efi\boot\bootx64.efi" initrd='\initramfs-genkernel-x86_64-4.12.5-gentoo'
EFI variables are not supported on this system.

ぐぬぬ。
# mount | grep efivars
# mount -t efivarfs efivarfs /sys/firmware/efi/efivars
mount: mount point /sys/firmware/efi/efivars does not exist

EFIモードになっていないぽい？
UEFI軌道のusbメモリの作成ができていない？
minimal.isoじゃなくてlivedvd.isoで起動して続きからやってみる。

SystemRescueCd

efiがリードオンリー
# efibootmgr -c -d /dev/sdb -p 2 -L "Gentoo" -l "\efi\gentoo\kernel-genkernel-x86_64-4.12.5-gentoo" initrd='\efi\gentoo\initramfs-genkernel-x86_64-4.12.5-gentoo'
Could not prepare Boot variable: Read-only file system
# mount -o remount /sys/firmware/efi/efivars -o rw,nosuid,nodev,noexec,noatime


https://wiki.archlinuxjp.org/index.php/EFISTUB

# efibootmgr -c -d /dev/sdb -p 2 -L "Gentoo" -l "/EFI/gentoo/kernel-genkernel-x86_64-4.12.5-gentoo" -u "root=/dev/sda3 rw initrd=/EFI/gentoo/initramfs-genkernel-x86_64-4.12.5-gentoo"
BootCurrent: 000C
Timeout: 0 seconds
BootOrder: 0001,0000,000C,000D,0008,0009
Boot0000* Windows Boot Manager
Boot0008* CD/DVD Drive
Boot0009* Hard Drive
Boot000C* UEFI: Sony Storage Media PMAP
Boot000D* ubuntu
Boot0001* Gentoo

しかし、起動するとカーネルパニック。うまくいかぬ。
GRUB2のシェルから起動

https://jp.linux.com/news/linuxcom-exclusive/418274-lco20140625

SystemRescueCdの起動時のgrubメニューでcを押してgrubのシェルに入る。
grub> ls (hd2,gpt2)/
efi
grub> set root=(hd2,gpt2)
grub> linux /efi/gentoo/kernel-genkernel-x86_64-4.12.5-gentoo root=/dev/sda3
grub> initrd /efi/gentoo/initramfs-genkernel-x86_64-4.12.5-gentoo

起動できた。カーネルパニックになるのはブートパラメーターの与え方が間違っているぽい。
efibootmgr
うまくいった手順。
-uでカーネルパラメーターを指定する？
# mount -o remount /sys/firmware/efi/efivars -o rw,nosuid,nodev,noexec,noatime
# efibootmgr -c -d /dev/sdb -p 2 -L "Gentoo" -l "/EFI/gentoo/kernel-genkernel-x86_64-4.12.5-gentoo1" -u "root=/dev/sda3 rw initrd=/EFI/gentoo/initramfs-genkernel-x86_64-4.12.5-gentoo"

なんとか起動。
Finalizing

https://wiki.gentoo.org/wiki/Handbook:AMD64/Installation/Finalizing

eth0の修正
net.eth0で起動するようにenp3s0を修正する。
/etc/udev/rules.d/50-ether.rules
SUBSYSTEM=="net", ATTR{address}=="XX:XX:XX:XX:XX:XX", NAME="eth0"

# udevadm test /sys/class/net/enp3s0
changing net interface name from 'enp3s0' to 'eth0'
# /etc/init.d/net.eth0 start
# ping www.google.com
...

user追加
# useradd -m -G users,wheel,audio -s /bin/bash larry
# passwd larry

sshで外部から新しく作ったユーザーでアクセスできることを確認。
shell設定
/etc/inputrc
set bell-style none

"\C-n":history-search-forward
"\C-p":history-search-backward

完成
リモートからsshログインできるところまでできた。
efibootmgr周りがなんかドキュメントが間違っている気がするが誰も使っていないのであろうか。
その他
追加インストールメモ。
eix
USE=sqlite

# emerge -av eix

/etc/cron.daily

eix-sync

cpuflag
# emerge -av app-portage/cpuid2cpuflags
$ cpuinfo2cpuflags-x86
CPU_FLAGS_X86="aes avx fma3 fma4 mmx mmxext pclmul popcnt sse sse2 sse3 sse4_1 sse4_2 sse4a ssse3 xop"

ntp
# emerge -av ntp
# rc-update add ntpd default

