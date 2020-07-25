---
Title: "MmdBridgeをビルドしてみる"
date: 2017-04-21
Tags: []
---

MmdBridgeがよさげなのでビルドしてみる。

最初はプロジェクトと同じPython-3.4 + VS2010でがんばったのだが、 Windows10(64bit)でVS2010(64bit)環境を作るのが困難であることがわかった。ちょっと違うがPython-3.5 + VS2015でやってみる。
Python3.5のビルド(不要)
Debug版でもBoost.PythonがRelease版のPython.dllにリンクするとわかった。
普通のインストーラーでインストールするとデバッグ版が手に入らぬ。せっかくなので自前ビルド。

Windows上でPython3.5をビルドする
Boost.PythonのデバッグビルドがリンクするPython.dll

Boost.Python
手元のboost-1.61.0を使う。
$HOME/user-config.jam
using python
     : 3.5.3
     : D:\\usr\\src\\Python-3.5.3\\PCBuild\\python # cmd-or-prefix
     : D:\\usr\\src\\Python-3.5.3\\include
     : D:\\usr\\src\\Python-3.5.3\\PCBuild\\amd64
     ;

memo: Jamroot.jam
boost_1_61_0> bootstrap.bat
boost_1_61_0> b2 -j2 --with-python3 address-model=64 toolset=msvc-14.0 threading=multi variant=debug,release link=static runtime-link=static,shared --stagedir=stage/x86_64 include=D:\usr\src\Python-3.5.3\PC 

include=D:\usr\src\Python-3.5.3\PCはpyconfig.hの場所。user-config.jamに2個目のincludeパスを記述する方法がわからなかったのでコマンドライン投入。
DXSDK_Jun10のインストール
d3dx9のあるDirectXはダウンロードしてインストールする必要がある。 April 2006を使っているそうなのだけどネット上に見つからなかったので手に入ったバージョンを使った。ビルド時にエラーが出るので下記の記事に沿ってd3dx9core.hを修正する。

https://gist.github.com/t-mat/1540248

VS2015
premake5でVS2015向けにプロジェクトを作ってビルドしたところkンパイルエラーになった。VS2015固有の問題のようなのでコードを修正。

VS 2015 で std::codecvt_utf8 がリンクできない場合の対処法
src/umbase/UMStringUtil.h

動作確認する

Mmdを展開する
mmdBridgeのd3d9.dllとd3dx9_43.dllをMmdディレクトリにコピーする(ビルド結果)
mmdBridgeのpythonスクリプトをMmdディレクトリにコピーする(mmdbridge/Release/Win32フォルダにある)
python.dllをMmdディレクトリにコピーする。もしくはパスを通す(普通にインストールしたPython3でよい)
Mmdディレクトリにoutディレクトリを作成する

以上で、mmdbridge_vmd.pyの動作を確認できた。
