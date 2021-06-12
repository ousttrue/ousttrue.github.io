---
title: "Gentooでネットワークインターフェースがeth0にならない件"
date: 2013-05-26
Tags: ['linux']
---

Gentooでネットワークインターフェースがeth0にならない件
最近インストールしたAMDのオンボードEtherと、MacBookAirのUsb
Etherが共にeth0にならなかった。
AMD機では、/etc/init.d/net.eth0 startが失敗するのでなんでかと思ったら違う名前になっていた。
# ifconfig -a
enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500

eth0ではないので/etc/init.d/net.eth0ではなく/etc/init.d/net.enp3s0とする必要があった。
/etc/conf.d/netも書き換え。
MacBookAirでも違う名前になっていた。
# ifconfig -a
enp0s29f7u1u1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500

とりあえずシンボリックリンク/etc/init.d/net.enp0s29f7u1u1を作って接続することはできたがちょっと調べてみることにした。
udevinfo
なんかudevinfoが見つからぬ。
http://www.gossamer-threads.com/lists/gentoo/user/174113
によるとudevadmになったらしい。
# udevadm info -a /sys/class/net/enp3s0

で情報をとれた。
参考:http://www.ice.is.kit.ac.jp/~umehara/misc/comp/20060408.html
gentooのudev設定
http://www.gentoo.gr.jp/transdocs/udevrules/udevrules.html#example-iface
/etc/udev/rules.d/myether
SUBSYTEM="net", ATTR{address}=="XX:XX:XX:XX:XX:XX", NAME="eth0"

書いてみた。最近のudevではSYSFSはATTRになったぽい。
test
# udevadm test /sys/class/net/enp3s0

うまくいかぬ・・・
# cd /etc/udev/rules.d
# mv myether 50-ether.rules

有効なファイル名が決まっていた。
test
# udevadm test /sys/class/net/enp3s0
unknown key 'SUBSYTEM' in /etc/udev/rules.d/50-ether.rules:1
invalid rule '/etc/udev/rules.d/50-ether.rules:1'

書き方がよろしくないらしい
SUBSYSTEM=="net", ATTR{address}=="XX:XX:XX:XX:XX:XX", NAME="eth0"

タイポを修正
changing net interface name from 'enp3s0' to 'eth0'

うまくいった。
反映
# cd /etc/int.d
# rc-update delete net.enp3s0
# mv net.enp3s0 net.eth0
# rc-update add net.eth0 defalt
# vim /etc/conf.d/net

# reboot

