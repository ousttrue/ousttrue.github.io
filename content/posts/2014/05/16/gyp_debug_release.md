---
title: "gypでdebugとrelease設定を分ける"
date: 2014-05-16
Tags: ['gyp']
---

gypでdebugとrelease設定を分ける
gypでvc2010向けのプロジェクトが生成できたので、
実用に向けて設定のテンプレート的なものを準備する。

ビルドオートメーションツールGYPを使おう
https://code.google.com/p/gyp/source/browse/trunk/test/win/linker-flags/pdb-output.gyp?spec=svn1832&r=1832

を参考に設定を追加。
Debug, Release設定の追加
main.cpp
projects.gyp
common.gypi
> gyp projects.gyp --depth .

とりあえずDebugでステップ実行できた。
こりゃ、よく使うパターンの雛形を揃えるまでは苦しいですな。 premake4,
cmakeもそうだった。
