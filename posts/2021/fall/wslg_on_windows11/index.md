+++
title = "Windows11 で wslg する"
date = 2021-10-31 00:18:23 UTC+09:00
tags = ["wsl"]
+++


PCを新調したので `Windows11` にアップグレードして wslg を試してみた。

# WSLg

## WSLg とは

* <https://github.com/microsoft/wslg>
* <https://devblogs.microsoft.com/commandline/a-preview-of-wsl-in-the-microsoft-store-is-now-available/>
* <https://devblogs.microsoft.com/commandline/the-initial-preview-of-gui-app-support-is-now-available-for-the-windows-subsystem-for-linux-2/>

ビジュアルを `Wayland` 、音声を `PulseAudio` を代行する WSLg 仮想マシンに転送することで、
Linux の GUI アプリを使えるようにする仕組み。

## Windows11 で試す

Windows11 では、 `Windows Insider Program` にせずとも、
`Ubuntu-CommPrev` をインストールすると `wslg` できる。

```
> wsl -l
Linux 用 Windows サブシステム ディストリビューション:
Ubuntu-CommPrev (既定)
Ubuntu-20.04
```

# X

特に何も設定しなくても `xterm` とか `gvim` などの X11 のアプリは動作する。
日本語Windows で 101 キーボード使っていると違うのになるとかあったので、その辺は設定ありそう。

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
