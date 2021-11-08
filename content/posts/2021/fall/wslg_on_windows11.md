+++
title = "Windows11 で wslg する"
date = 2021-10-31 00:18:23 UTC+09:00
tags = ["wsl"]
+++


PCを新調したので `Windows11` にアップグレードして wslg を試してみた。

# その前に

* [Windows 10と同じコンテキストメニューを使う](https://news.mynavi.jp/article/win11tips-6/)

# WSLg

## WSLg とは

* <https://github.com/microsoft/wslg>
* <https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps>
* (2021.10) <https://devblogs.microsoft.com/commandline/a-preview-of-wsl-in-the-microsoft-store-is-now-available/>
* (2021.04) <https://devblogs.microsoft.com/commandline/the-initial-preview-of-gui-app-support-is-now-available-for-the-windows-subsystem-for-linux-2/>
* (2020) [Microsoft Is Writing Its Own Wayland Compositor As Part Of WSL2 GUI Efforts](https://www.phoronix.com/scan.php?page=news_item&px=Microsoft-Writing-Wayland-Comp)

ビジュアルを `Wayland` 、音声を `PulseAudio` を代行する WSLg 仮想マシンに転送することで、
Linux の GUI アプリを使えるようにする仕組み。

## Windows11 で試す

Windows11 では、 `Windows Insider Program` にせずとも使える。

~~`Ubuntu-CommPrev` をインストールすると `wslg` できる。~~
WSLで `/mnt/wslg` が存在していれば動作する状態になっている。
Distribution による特別な設定は不要？

# X

特に何も設定しなくても `xterm` とか `gvim` などの X11 のアプリは動作する。

## 101キーボード

* [Windows 10 HomeでWSLgをさっそく試してみた](https://www.eisbahn.jp/yoichiro/2021/06/wslg.html)

`setxkbmap -layout us` でなおった。

# PluseAudio

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

### mpd client

* <https://www.microsoft.com/ja-jp/p/mpdctrl/9nv2bbj82brx>

