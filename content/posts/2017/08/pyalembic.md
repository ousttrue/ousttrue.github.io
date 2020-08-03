---
Title: "WindowsでPyAlembicできるのか"
date: 2017-08-07
Tags: ['python', 'cg', 'cmake']
---

Windows上でPyAlembicを使いたいのだができるのか。
素直にLinuxでやるべきでは・・・
Windows10(64bit) + Python-3.6(64bit)

作業場。

https://github.com/ousttrue/openexr

Anaconda3(Windows10 64bit)でモジュール探す
> conda install -c conda-forge alembic

しかし、これは違うAlembicだった。
Pythonのalembicは、database migrations toolと名前が被っております。
なるほど・・・。
Python2.7なら

http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic

あとから発見。わいは、Python3.6にしたいので。
自前でビルドを試みる
alembic-1.7.1/python/PyAlembicがそれですな。
問題が２つある。

Python2(Python3にしたい)
Boost.Python(PyBind11にしてリンク問題とおさらばしたい)

さすがにPyBind11差し替えはやるにしても後にするべきなので、 Python3化だけやる。
Boost.Pythonのビルド
Boost.Pythonで使うPythonを明示するには、user-config.jamに記述する。
BOOST_DIR/user-conifg.jam
using python 
    : 3.6                   # Version
    : D:\\Anaconda3\\python.exe      # Python Path
    : D:\\Anaconda3\\include         # include path
    : D:\\Anaconda3\\libs            # lib path(s)
    : <define>BOOST_ALL_NO_LIB=1
    ;

ビルド
boost> b2.exe -j3 --stagedir=stage\x86_64 link=shared runtime-link=shared threading=multi toolset=msvc-14.0 address-model=64 --with-python

link=sharedにしてdllを生成することが必要。
これは、iex.pydとimath.pyd間でBoost.Pythonのstatic変数を共有するために必須である(pyexの型登録周りか)。
IlmBaseを修正
ilmbase-2.2.0/IexMath/IexMathFloatExc.h
の以下の部分を修正する。多分、記述ミスなのだけど誰もWindowsビルドしないので気付かれていないのであろう。
//#if defined(IEX_EXPORTS)↲
#if defined(IEXMATH_EXPORTS)↲

これでilmbaseをビルドしておく。vcpkgを使った。
alembicを修正
alembic-1.7.1/lib/Alembic/AbcCoreLayer/CMakeLists.txtを修正してヘッダを追加する(PyAlembicが使う)
INSTALL(FILES Read.h Util.h
    Foundation.h # 追加
    DESTINATION include/Alembic/AbcCoreLayer)

これも、vcpkgを使った。
PyIlmBaseのビルド
OpenEXRのサイトにあるpyilmbase-2.2.0tar.gzを使おうとしたのだけど、githubの方が新しいようなのでこちらを使う。
Python3向けの修正
Python2とPytnon3間での非互換によるコンパイルエラーを直していく。

PySliceObject_XXX -> PyObject_XXX
PyInt_XXX -> PyLong_XXX
PyString_AsString -> PyUnicode_AsUTF8
_PyThreadState_Current -> _PyThreadState_UncheckedGet()

参考

Python3 Advent Calendar - Pythonで2/3両方で動くコードを書く(C/API)
Fix build for Python 3.5
http://py3c.readthedocs.io/en/latest/guide.html

CMake設定

CMAKE_INSTALL_PREFIX
BOOST_ROOT
ILMBASE_PACKAGE_PREFIX
FIND_PACKAGE(numpy)をコメントアウト
DebugでもPython36.libにリンクするように、#include <Python.h>を除去(boost/python.hpp経由でインクルードさせればそうなる)

ビルドが通るようになった。
PyAlembicのビルド
当初、AlembicのプロジェクトでPythonフラグを有効にして一緒にビルドしようとしていたが、PyIlmBase傘下にPyAlembicをコピーする方式に変えた。
alembic-1.7.1/python/PyAlembicをilmbase-2.2.0/PyIlmBaseにコピーして、CMakeLists.txtを調整する。
CMake設定

Alembic_ROOT

参考

uimac実装メモ - PyImath

PyAlembicのビルドが通ったので実行してみよう
PyAlembic/Tests/testPolyMesh.pyを動かしてみようと思う。
こういう感じに準備する。
testPolyMesh.py
iex.pyd
PyIex.dll
imath.pyd
PyImath.dll
alembic.lib
alembic.pyd
boost_python-vc140-mt-1_61.dll # debug buildもこれ

> C:/python36/python.exe testPolyMesh.py

import alembicでクラッシュする。デバッガで追ってみると、モジュールの初期化でエラーが発生している。一個ずつ直す。
初期化の修正
Python3化による変更？
AbcView
今回の作業目標。

http://alembic.github.io/abcview/

これを動作させたい。
AbcView has the following requirements:

Python 2.6+ => Python 3.6 で動くように改造する(print文とか)
PyAlembic。できた
PyAbcOpenGL。できた
PyOpenGL。pip
argparse。pip
PyQt4。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic
numpy-mkl。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic

PyQt4をインストール

https://stackoverflow.com/questions/22640640/how-to-install-pyqt4-on-windows-using-pip
http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyqt4

こんな感じで公式のPython3.6(64bit)に対してインストール。
D:\Python36\Scripts\pip.exe install .\PyQt4-4.11.4-cp36-cp36m-win_amd64.whl


https://www.tutorialspoint.com/pyqt/pyqt_hello_world.htm

import sys
from PyQt4 import QtGui

def window():
    app = QtGui.QApplication(sys.argv)
    w = QtGui.QWidget()
    b = QtGui.QLabel(w)
    b.setText("Hello World!")
    w.setGeometry(100,100,200,50)
    b.move(50,20)
    w.setWindowTitle("PyQt")
    w.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    window()

動いた。
alembicgl.pyd, alembic.pyd, imath.pyd, iex.pydと依存dll群をwheel化する
同じdllを参照するpydを同じフォルダに配置したいので、
共通の親モジュールとしてilmを定義してその中にすべてのpydとdllを収めることにした。
そのうえでこれを間接的にエクスポートするモジュール’iex’, ‘imath’, ‘alembic’, ‘alembicgl’
を作る計画。
ilm
    + __init__.py
    + iex.pyd
    + imath.pyd
    + alembic.pyd
    + alembicgl.pyd
    + PyEx.dll
    + PyImath.dll
    + boost_python.dll
    + Alembic.dll # VCPKG BUILD
    + ilmbase.dll # VCPKG BUILD
    + iex.dll # VCPKG BUILD
    + imath.dll # VCPKG BUILD
    + half.dll # VCPKG BUILD
    + hdf5.dll # VCPKG BUILD
    + zip.dll # VCPKG BUILD
    + szip.dll # VCPKG BUILD
iex
    + __init__.py # ilm.iexを公開
imath
    + __init__.py # ilm.imathを公開
alembic
    + __init__.py # ilm.alembicを公開
alembicgl
    + __init__.py # ilm.alembicglを公開
setup.py

iex/init.py
from ilm.iex import *

こういうのをiex, imath, alembic, alembicglそれぞれに作った。
setup.py
#!/usr/bin/env python

from setuptools import setup, Distribution


setup(
        name='alembic',
        version='0.1',
        description='Alembic Library',
        packages=['ilm', 'iex', 'imath', 'alembic', 'alembicgl'],
        package_data={
            'ilm':['*.pyd', '*.dll'],
            },
        )

py_package> D:\Python36\python.exe setup.py bidst_wheel
py_package> D:\Python36\Scripts\pip.exe install .\dist\alembic-0.1-cp36-cp36m-win_amd64.whl

AbcViewを実行してみる
こういう感じに配置して、abcview_main.pyを実行してみる。
abcview_main.py # bin/abcviewから改名(名前がフォルダと被らないように変更)
abcview
    __init__.py

python2仕様の部分をまとめて修正。

https://docs.python.jp/3/library/2to3.html

AbcView> D:\Python36\python.exe D:\Python36\Tools\scripts\2to3.py -w .

print文、except文などの定型的な文法問題はこれで一網打尽。ディレクトリを指定することでまとめて処理できる。
file.toAscii() => file
これもPython2との非互換か。
QtCore.QString(str(value)) => str(value)
QStringは、PythonのStringでよさげ。
動いた


https://github.com/ousttrue/openexr/releases/tag/v0.1

タイムラインを操作したら蛸が動いた。
