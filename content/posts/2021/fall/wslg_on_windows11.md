<!--
.. title: Windows11 で wslg する
.. slug: wslg_on_windows11
.. date: 2021-10-31 00:18:23 UTC+09:00
.. tags:
.. category: 
.. link: 
.. description: 
.. type: text
-->

PCを新調したので `Windows11` にアップグレードして wslg を試してみた。

## WSLG

`Ubuntu-CommPrev` をインストールすると `wslg` できる。

```
> wsl -l
Linux 用 Windows サブシステム ディストリビューション:
Ubuntu-CommPrev (既定)
Ubuntu-20.04
```

## mpd から pluse audio に出力してみる

* <https://mpcbridge.fourthgate.jp/other/mpd_on_ubuntu>
* <https://github.com/microsoft/wslg/issues/306>

```
echo $PULSE_SERVER
/mnt/wslg/PulseServer
```

環境変数 `$PULSE_SERVER` にファイルパスが入っているときは `unix socket` を使うという意味。

`/etc/mpd.conf`

```
audio_output {
       type     "pulse"
       name     "My PULSE Device"
       server   "/mnt/wslg/PulseServer" # $PULSE_SERVER
}
```

という設定になる。`TCP` 経由ではなく `UNIX SOCKET` 経由なのに注意。

```
load-module module-native-protocol-tcp auth-ip-acl=127.0.0.1
```
は使われない。

## raw device の mount

予備の HDD を raw device としてマウントして mpd の sotrage として使ってみる。
(OSが吹き飛ぶなどそれなりに危険な作業なので注意)

* <https://docs.microsoft.com/en-us/windows/wsl/wsl2-mount-disk>

### on windows

未使用のディスクだったので、管理から volume 削除してディスクをオフラインに変更した。

`> wsl --mount <DiskPath> --bare`

でディスクを丸ごと `wsl` に送る。

### on wsl

```
$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   256G  0 disk
sdb      8:16   0 339.7M  1 disk
sdc      8:32   0   256G  0 disk /
sdd      8:48   0 931.5G  0 disk
```

/dev/sdd となった。

* parted
* mkfs.ext4
* mount

```
$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0   256G  0 disk
sdb      8:16   0 339.7M  1 disk
sdc      8:32   0   256G  0 disk /
sdd      8:48   0 931.5G  0 disk
`-sdd1   8:49   0 465.8G  0 part /mnt/data
```
