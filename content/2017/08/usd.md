---
Title: "PixarのUniversal Scene Descriptionをビルドしてみる"
Published: 2017-8-14
Tags: []
---

20170902。実はビルドスクリプトがあって、簡単になっていた。

動画でCEDEC2017のセッションを聞いてよさげな気がしたので再度やってみた(ちょっと前に途中までやって放置していた)。
usdviewが使えるようにするとよいらしい。

Pixar USD の Windows ビルド方法（2017/9 版）

自動ビルドスクリプトがついているので放っておくだけなのだけど、うまくいかなかったところを補足する。
環境は、Windows10(64bit) + VisualStudio2017 + VisualStudio2015のコンパイラ追加インストール(VisualStudio2017のインストールメニューにある)
visualstudio補足
VisualStudioは、最近のバージョンに限ってもいろいろある。

VisualStudio2017(MSVC14.1)のみ
VisualStudio2017(MSVC14.1)にVS2015(MSVC14.0)のコンパイラが追加インストールされている(うちはこれ)
VisualStudio2015(MSVC14.0)のみ
Visual C++ 2015 Build Tools(MSVC14.0)Python3ビルド向けにIDEの無いバージョン)

ものによってvcvars.batの場所が違って、bjamとかdistutilsがコンパイラの発見に失敗したりする場合があるようだ。
cl.exeが見つからないような場合、visualstudioの提供する設定済みのdosプロンプトから始めるのが手堅いかもしれない。
一応、
VisualStudio2017 - x64 native tools command promptからはじめる。
CMakeはVisualStudioの検出にあまり失敗しないので、おもにBoostのビルド対策。
効果があったかは不明。
D:\work> cl
Microsoft(R) C/C++ Optimizing Compiler Version 19.10.25019 for x64
Copyright (C) Microsoft Corporation.  All rights reserved.

使い方: cl [ オプション... ] ファイル名... [ /link リンク オプション... ]

VS2017しか入っていないとき
build_usd.py内Boost.Pythonに関してmsvc=14.0指定(VS2015)があるので、これをコメントアウトすればたぶんVS2017しかなくてもビルドできる。Windows版のPython2.7のビルドコンパイラはVS2008(MSVC9.0)らしい。

https://www.microsoft.com/en-us/download/details.aspx?id=44266

python補足
Python27以外のPythonが入っているとはまる率が上がる。
D:\work> python -V
Python 3.6.0 :: Anaconda 4.3.0 (64-bit)

違うPythonだー。
D:\work> set PATH=D:\Python27;D:\Python27\Scripts;%PATH%
D:\work> python -V
Python 2.7.14rc1
D:\work> pip install pyside
Collecting pyside
  Downloading PySide-1.2.4-cp27-none-win_amd64.whl (45.0MB)
    100% |################################| 45.0MB 36kB/s
Installing collected packages: pyside
Successfully installed pyside-1.2.4

python使いたるもの２系、３系両方入っていたりするものである。
cloneしてビルドスクリプトを実行
D:\work> git clone https://github.com/PixarAnimationStudios/USD

D:\work> mkdir USD_build
D:\work> cd USD_build
D:\work\USD_build>

D:\work\USD_build> python ..\USD\build_scripts\build_usd.py
usage: build_usd.py [-h] [-n] [-v | -q] [--build BUILD]
                    [--generator GENERATOR]
                    [--build-shared | --build-monolithic] [--src SRC]
                    [--inst INST] [--force FORCE_BUILD] [--force-all]
                    [--tests | --no-tests] [--docs | --no-docs]
                    [--imaging | --usd-imaging | --no-imaging]
                    [--ptex | --no-ptex] [--embree | --no-embree]
                    [--embree-location EMBREE_LOCATION]
                    [--alembic | --no-alembic] [--hdf5 | --no-hdf5]
                    [--maya | --no-maya] [--maya-location MAYA_LOCATION]
                    [--katana | --no-katana]
                    [--katana-api-location KATANA_API_LOCATION]
                    [--houdini | --no-houdini]
                    [--houdini-location HOUDINI_LOCATION]
                    install_dir
build_usd.py: error: too few arguments

D:\work\USD_build> python ..\USD\build_scripts\build_usd.py .
ERROR: CMake not found -- please install it and adjust your PATH

こんな風に足りないツールのメッセージが出るのでせっせとインストールしてパスを設定する。
> set PATH=D:\Program Files\CMake\bin;%PATH%
> set PATH=D:\Program Files\NASM;%PATH%

build…
Alembicとか無しの最小ビルド。
D:\work\USD_build> python ..\USD\build_scripts\build_usd.py .

Building with settings:
  USD source directory          D:\work\USD
  USD install directory         D:\work\USD_build
  3rd-party source directory    D:\work\USD_build\src
  3rd-party install directory   D:\work\USD_build
  Build directory               D:\work\USD_build\build

  Building                      Shared libraries
    Imaging                     On
      Ptex support:             Off
    UsdImaging                  On
    Documentation               Off
    Tests                       Off
    Alembic Plugin              Off
      HDF5 support:             Off
    Maya Plugin                 Off
    Katana Plugin               Off
    Houdini Plugin              Off

    Dependencies                zlib, boost, TBB, JPEG, TIFF, PNG, OpenEXR, GLEW, OpenImageIO, OpenSubdiv, PyOpenGL

STATUS: Installing zlib...
STATUS: Installing boost...
STATUS: Installing TBB...
STATUS: Installing JPEG...
STATUS: Installing TIFF...
STATUS: Installing PNG...

こんな感じに順番にビルドが進んでいく。
pngのビルドでこけた
pngrutil.obj : error LNK2019: 未解決の外部シンボル inflateValidate が関数 png_inflate_claim で参照されました。

何故か、zlibへのリンクがうまくいっていない？
CMakeのGUIでsourceをUSD_build/src/libpng-1.6.29、buildをD:/dev/_alembic/USD_build/build/libpng-1.6.29にして確認するとZLIB_LIBRARY_RELEASEがC:/Program Files/Anaconda3/Library/lib/z.libになっていてお察し。
pythonをフルパスで指定したらなんか治った。違うPythonが意図せず使われていたか。
dos窓は、whichコマンドが無いしよくわからん。
work\USD_build> D:\python27\python ..\USD\build_scripts\build_usd.py . --force png

STATUS: Installing PNG...
STATUS: Installing OpenEXR...
STATUS: Installing GLEW...
STATUS: Installing OpenImageIO...
STATUS: Installing OpenSubdiv...
STATUS: Installing PyOpenGL...
STATUS: Installing PyOpenGL...
STATUS: Installing USD...

Success! To use USD, please ensure that you have:
  The following in your PYTHONPATH environment variable:
    D:\dev\_alembic\USD_build\lib\python

  The following in your PATH environment variable:
    D:\dev\_alembic\USD_build\bin
    D:\dev\_alembic\USD_build\lib

ビルドできた。
Boost.Pythonメモ
boost_python-vc140-mt-1_61.dllがpython36.dllとか違うのにリンクしてしまう場合。
最悪PythonをすべてアンインストールしてPython27(64bit)だけをインストールすればいけるのだが、それでは負けた気がするのでBoost.Pythonに使うPythonを強制する方法。
USD_BUILD/user-conifg.jam
using python
    : 2.7                   # Version
    : C:\\Python27\\python.exe      # Python Path
    : C:\\Python27\\include         # include path
    : C:\\Python27\\libs            # lib path(s)
    ;

を作って環境変数BOOST_BUILD_PATHをuser-config.jamのあるディレクトリに指定する。
%USERROFILE%\user-config.jamに作ってBOOST_BUILD_PATH無しでもよいが、消し忘れるとあとではまる可能性が増えると思う。

http://www.boost.org/build/doc/html/bbv2/overview/configuration.html

WindowsのBoost.Pythonは作るときも使うときもリンクではまる。
usdviewを使ってみる
USD_BUILD/bin/usdviewがある。
USD_BUILD\bin> D:\python27\python usdview

sys.path
Traceback (most recent call last):
  File "usdview", line 25, in <module>
    import pxr.Usdviewq as Usdviewq
ImportError: No module named pxr.Usdviewq

environ[‘PATH’]
Traceback (most recent call last):
  File "usdview", line 37, in <module>
    Usdviewq.Launcher().Run()
  File "D:\dev\_alembic\USD_build\lib\python\pxr\Usdviewq\__init__.py", line 54, in Run
    valid = self.ValidateOptions(arg_parse_result)
  File "D:\dev\_alembic\USD_build\lib\python\pxr\Usdviewq\__init__.py", line 167, in ValidateOptions
    from pxr import Sdf
  File "D:\dev\_alembic\USD_build\lib\python\pxr\Sdf\__init__.py", line 24, in <module>
    import _sdf
ImportError: DLL load failed: 指定されたモジュールが見つかりません。

usdviewを改造してしまおう。
環境変数PATHとPYTHONPATHを追加。
usdview.cmd改造でもよいがpythonの方が書きやすいので。
usdviewの冒頭のimport前に下記を追加。
import os
import sys

basepath=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
bin_dir=os.path.join(basepath, 'bin')
lib_dir=os.path.join(basepath, 'lib')
libpython_dir=os.path.join(lib_dir, 'python')

sys.path.append(libpython_dir)
os.environ['PATH']="%s;%s;" % (bin_dir, lib_dir) + os.environ['PATH']


import pxr.Usdviewq as Usdviewq

実行。
USD_BUILD\bin> D:\python27\python usdview
usage: usdview [-h] [--renderer {opt,simple}] [--select PRIMPATH]
               [--camera CAMERA] [--mask PRIMPATH[,PRIMPATH...]]
               [--clearsettings] [--norender] [--unloaded] [--timing]
               [--memstats {none,stage,stageAndImaging}]
               [--numThreads NUMTHREADS] [--ff FIRSTFRAME] [--lf LASTFRAME]
               [--complexity COMPLEXITY] [--quitAfterStartup]
               usdFile
usdview: error: too few arguments

引数が必要と。
cube.usd
#usda 1.0

def Cube "Cube"
{
}

実行。
Warning: in Link at line 180 of D:\dev\_alembic\USD\pxr\imaging\lib\hd\glslProgram.cpp -- Failed to link shader:
Geometry shader(s) failed to link.
Geometry link error: HW_UNSUPPORTED.
ERROR: Internal compile error, error code: E_SC_LITERAL_NOT_DEFINED
Shader not supported by HW

Windowは出た。しかしglslのエラーで3DViewの描画ができぬ。
Rx480がだめなのだろうか。
GTX買わねば・・・
Alembic追加する
ToDo
