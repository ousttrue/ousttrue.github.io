---
title: "GentooでBluetooth"
date: 2013-05-27
tags: ['linux']
---

GentooでBluetooth
Gentooでbluetoothを使う。

http://wiki.gentoo.org/wiki/Bluetooth

dmesg
[22782.149236] Bluetooth: Core ver 2.16
[22782.149244] NET: Registered protocol family 31
[22782.149245] Bluetooth: HCI device and connection manager initialized
[22782.149252] Bluetooth: HCI socket layer initialized
[22782.149254] Bluetooth: L2CAP socket layer initialized
[22782.149255] Bluetooth: SCO socket layer initialized
[22782.151467] Bluetooth: BNEP (Ethernet Emulation) ver 1.3
[22782.151469] Bluetooth: BNEP filters: protocol multicast
[22782.151475] Bluetooth: BNEP socket layer initialized

kernel
HCI USB driver (btusb) を有効にする。
USE設定とツール
/etc/portage/make.conf
USEにbluetoothを追加

/etc/portage/package.use
net-wireless/bluez test-programs # simple-agentに必要

インストール
# emerge --ask --changed-use --deep @world
# /etc/init.d/bluetooth start
# rc-update add bluetooth default

Pairing
$ hcitools scan
        XX:XX:XX:XX:XX:XX       M-NV1BR Series

$ simple-agent XX:XX:XX:XX:XX:XX
Traceback (most recent call last):
  File "/usr/bin/simple-agent", line 115, in <module>
    path = manager.FindAdapter(args[0])
  File "/usr/lib64/python2.7/site-packages/dbus/proxies.py", line 70, in __call__
    return self._proxy_method(*args, **keywords)
  File "/usr/lib64/python2.7/site-packages/dbus/proxies.py", line 145, in __call__
    **keywords)
  File "/usr/lib64/python2.7/site-packages/dbus/connection.py", line 651, in call_blocking
    message, timeout)
dbus.exceptions.DBusException: org.bluez.Error.NoSuchAdapter: No such adapter

ここで頓挫。どうも埒が明かぬ。
と思ったらsimple-agentの引数が足りなかった。
bluetooth deviceのコネクトボタンを押す

$ simple-agent hci0 XX:XX:XX:XX:XX:XX
$ bluez-test-device trusted XX:XX:XX:XX:XX:XX yes
$ bluez-test-input connect XX:XX:XX:XX:XX:XX

とりあえず接続はできた。
複数接続登録タイプのキーボードとマウスを買ってきたのでそれを有効にしたいのだが、
今のところ切り替え時に毎回コネクトボタンを押さされている。
一瞬だけコネクトボタンなしでの切り替えができた時期があったのでなんか方法があるはずなのだが。
utility
# emerge -av blueman

