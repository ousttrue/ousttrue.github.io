---
title: "MmdBridgeのビルドスクリプトを作った"
date: 2017-04-24
tags: []
---

MmdBridgeのビルド手順をまとめたpythonスクリプトを作った。

https://github.com/ousttrue/mmdbridge


さくっとVisualStudio2015 64bit版をビルドできる。
WITH_VMD, WITH_PMXまで対応。
WITH_ALEMBICはいずれ。
Boost.Pythonをビルドするスクリプトも作ったのだけど、作業中に遭遇したpybuildがヘッダオンリーをと言っておりよさげだったので置き換えてみた。
Boost.Pythonの弱点のBoostを解凍するめんどくささ(Boostのファイル数は多すぎ)と、種類ごとにビルドしないといけない煩雑さから解放されるのでとてもよい。
