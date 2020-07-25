---
Title: "pythonによるビルドスクリプトwafを使い始めた"
date: 2013-10-29
Tags: []
---

pythonによるビルドスクリプトwafを使い始めた
pythonによるビルドシステムwafを使ってみた。
使ってみた感触ではvcとgcc両方でビルドするとかそういうのに向いていそうなので、要するにわしのニーズに合っているように思える。
https://code.google.com/p/waf/
前から気にはなっていたのだけれどどうにも取っ付きが悪くて使えるところまでたどりつけていなかったのだが、やっと最初の一歩を踏み出すことができたのでメモを残す。
早速実践から行く。
+hello/
  +hello.cpp

hello.cpp
#include <iostream>

int main(int argc, char **argv)
{
    std::cout << "hello waf !" << std::endl;
    return 0;
}

というプロジェクトを作ったとする。
https://code.google.com/p/waf/downloads/detail?name=waf-1.7.13
からwaf(python
scriptの圧縮されたもの)をダウンロードしてwscriptを記述する。
+hello/
  +hello.cpp
  +waf
  +wscript

wscriptは以下のようにする。
APPNAME='hello'
VERSION='1.0.0'


def configure(conf):
    conf.env['MSVC_TARGETS'] = ['x86']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']

def build(bld):
    bld.program(
            source='hello.cpp', 
            target=APPNAME
            )

初回とwscriptのconfigureを修正する度にconfigureする。
> python waf configure 
Setting top to                           : C:\work\_waf\hello
Setting out to                           : C:\work\_waf\hello\build
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 9.0\VC\Bin\amd64\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 9.0\VC\Bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 9.0\VC\Bin\x86_IA64\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\Bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 9.0\VC\BIN\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\BIN\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\BIN\CL.exe
Checking for program CL                  : C:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\bin\CL.exe
Checking for program CL                  : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\BIN\CL.exe
Checking for program LINK                : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\BIN\LINK.exe
Checking for program LIB                 : c:\Program Files (x86)\Microsoft Visual Studio 10.0\VC\BIN\LIB.exe
Checking for program MT                  : C:\Program Files (x86)\Microsoft SDKs\Windows\v7.0A\bin\MT.exe
Checking for program RC                  : C:\Program Files (x86)\Microsoft SDKs\Windows\v7.0A\bin\RC.exe
'configure' finished successfully (6.219s)

ビルドする。
> python waf build
Waf: Entering directory `C:\work\_waf\hello\build'
[1/2] cxx: hello.cpp -> build\hello.cpp.1.o
hello.cpp
[2/2] cxxprogram: build\hello.cpp.1.o -> build\hello.exe build\hello.exe.manifest
Waf: Leaving directory `C:\work\_waf\hello\build'
'build' finished successfully (1.138s)

実行してみる。
> .\build\hello.exe
hello waf !

ということでvcでexeをビルドするスクリプトができた。
何もパスの設定をしなくてもvcのコンパイラを勝手に探してビルドできるのは意外だった。
とはいえ、これだけではwafの嬉しさは発揮されないのでこれからwscriptを拡張していく。
次回、debugとrelease, 32bitビルドと64bitビルドの管理について書く予定。
