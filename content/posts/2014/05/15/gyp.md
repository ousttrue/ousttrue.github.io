---
title: "python製のビルドツールgypを使ってみる"
date: 2014-05-15
Tags: ['gyp']
---

python製のビルドツールgypを使ってみる
gyp(Generate Your Projects) は、
pythonで記述されたプロジェクト生成ツールで設定からVC向けプロジェクトや、GCC向けMakefileを生成するツールである。
chromeやnode.jsのビルドツールとして採用されているそうな。
機能的にはpremake4やcmakeと同じ範囲をカバーするがそれぞれ以下のような問題があった。

premake4はわりと気に入っているのだが布教困難。luaで宣言的に記述するのが分かりづらい
cmakeはcmake語が解読不能でちょっとしたプロジェクトのカスタマイズが困難すぎる(OpenCVとかのことだ)

そこで、python製のgypを試してみた。
gyp導入
環境は、Windows7 + python3。
> python setup.py install
:
中略
:
SyntaxError: invalid syntax

  File "c:\python33\lib\site-packages\gyp-0.1-py3.3.egg\gyp\generator\ninja.py",
 line 475
    print "Warning: Actions/rules writing object files don't work with " \
                                                                       ^
SyntaxError: invalid syntax

  File "c:\python33\lib\site-packages\gyp-0.1-py3.3.egg\gyp\generator\xcode.py",
 line 126
    except OSError, e:
                  ^
SyntaxError: invalid syntax

python3非対応だった。まぁpython2で。
とりあえずc++の”hello world”をビルドするところから
hello_gyp
    + main.cpp
    + projects.gyp

main.cpp
projects.gyp
プロジェクト生成。
> gyp projects.gyp --depth .

これで、projects.slnとhello_gyp.vcxprojが生成された。
hello_gyp
    + main.cpp
    + projects.gyp
    + projects.sln(generated)
    + hello_gyp.vcxproj(generated)

vc2010 express editionでprojects.slnを開いてビルドできた。
hello_gyp
    + main.cpp
    + projects.gyp
    + projects.sln
    + hello_gyp.vcxproj
    + Default/hello_gyp.exe(build)

構成がDebug,
ReleaseではなくDefault一本立てなのでカスタマイズの必要あり。
