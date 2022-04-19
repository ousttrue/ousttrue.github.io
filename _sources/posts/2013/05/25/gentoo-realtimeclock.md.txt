---
title: "hwclockの設定"
date: 2013-05-25
tags: []
---

hwclockの設定
起動時のエラーメッセージ
Failed to sync clocks

に対処する。
ずっと以前からいつも出ていたような気がするが気が向いたので調べる。
発生源はhwclock。
# hwclock
Cannot access the Hardware Clock via any known method.
Use the --debug option to see the details of our search for an access method.

参考:http://www.yamasita.jp/linkstation/2010/06/100620_post_276.html
/dev/rtcが無いことがわかった。
カーネルを再ビルドだ。
によると下記のように設定せよと書いてあるがそれらしきオプションが見つからない。
Character devices --->
  [ ] Enhanced RTC
General setup --->
  [*] Support for /dev/rtc

設定の位置が変わっている。大雑把に以下のような感じ。
DeviceDrivers
  Character Device
    [ ] Enhanced RTC
  RealTimeClock
    [*] Support for /dev/rtc

カーネルをビルドして再起動したらエラーメッセージが出なくなった。
