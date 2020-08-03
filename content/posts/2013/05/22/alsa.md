---
Title: "alsaとかpulseaudio設定"
date: 2013-05-22
Tags: ['linux']
---

alsaとかpulseaudio設定
gentooの音周り
http://www.gentoo.org/doc/ja/alsa-guide.xml
alsa
# lspci | grep -i audio
00:01.1 Audio device: Advanced Micro Devices [AMD] nee ATI Trinity HDMI Audio Controller

デジタル出力から鳴らす。 カーネル的には’Intel HD
Audio’になるがgenkernelで組み込み済みの様子。
# emerge -av alsa-utils
# rc-update add alsasaound default

userをaudio gorupに入れて再ログイン。
$ alsamixer
[F6]
HD-AUDIO genericを選択して[m]でミュートを解除

音の出るアプリで動作確認
pulseaudio
一度に音の出るアプリがひとつだと不便なのでpulseaudioを導入してみる。

http://wiki.gentoo.org/wiki/PulseAudio


USEにpulseaudio追加
# emerge --ask --changed-use --deep @world
# emerge -av pavuconrol pavumeter

userをpulse gorupに入れて再ログイン。


pavuconrolで出力のミュート解除

リモートのpulseaudioで音を鳴らす
USEにavahi追加
# emerge --ask --changed-use --deep @world
# rc-update add avahi default
# emerge -av paman paprefs padevchooser

