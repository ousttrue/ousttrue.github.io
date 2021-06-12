---
title: "vc向けのメタビルドツールvcpkgを発見"
date: 2017-05-04
Tags: ['vcpkg']
---

uwp向けのlibpngのビルドのエラーを修正する過程でvcpkgを見つけた。
vc向けのメタビルドツールの予感。

cloneして
> git clone https://github.com/Microsoft/vcpkg.git

buildする
> cd vcpkg
vcpkg> ./bootstrap.bat

UWP版のpackageインストール
vcpkg> ./vcpkg install libpng:x86-uwp

なるほど。
OpenCVのUWP版はあるかな・・・。
vcpkg> ./vcpkg install opencv:x86-uwp

あった。
最新版のopencv-3.2.0もビルドできるやん。
一瞬にして作り始めていた、
https://github.com/ousttrue/bldproc/tree/master/procs
がオワコンになった。
検索してみたら日本語の紹介記事が一つあった。

【速報】Vcpkg: Windowsの公式C++ライブラリ管理ツール

desktopビルドできた

ffpmeg(msys2をダウンロードして使っていた。わかる)

uwpビルドできた

opencv
openssl

uwpビルドできなかった

cairo。途中でpeclのビルドに失敗する(pixmanはビルドできたのでオプション外せばいけそう)。
bullet3。ちょっと修正が要るか

