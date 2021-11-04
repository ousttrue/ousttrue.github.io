+++
title = "wsl で HDD を mount する"
date = 2021-10-30 00:18:23 UTC+09:00
tags = ["wsl"]
+++


# raw device の mount

予備の HDD を raw device としてマウントして mpd の sotrage として使ってみる。
(OSが吹き飛ぶなどそれなりに危険な作業なので注意)

* <https://docs.microsoft.com/en-us/windows/wsl/wsl2-mount-disk>

## on windows

未使用のディスクだったので、管理から volume 削除してディスクをオフラインに変更した。

`> wsl --mount <DiskPath> --bare`

でディスクを丸ごと `wsl` に送る。

## on wsl

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

## auto mount したい

* <https://github.com/microsoft/WSL/issues/6073>
