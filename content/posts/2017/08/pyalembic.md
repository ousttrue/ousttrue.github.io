---
title: "WindowsでPyAlembicできるのか"
date: 2017-08-07
tags: ["python", "cg", "cmake"]
---

Windows 上で PyAlembic を使いたいのだができるのか。
素直に Linux でやるべきでは・・・
Windows10(64bit) + Python-3.6(64bit)

作業場。

https://github.com/ousttrue/openexr

```
Anaconda3(Windows10 64bit)でモジュール探す
> conda install -c conda-forge alembic
```

    しかし、これは違う Alembic だった。
    Python の alembic は、database migrations tool と名前が被っております。
    なるほど・・・。
    Python2.7 なら

    http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic

    あとから発見。わいは、Python3.6 にしたいので。
    自前でビルドを試みる
    alembic-1.7.1/python/PyAlembic がそれですな。
    問題が２つある。

    Python2(Python3 にしたい)
    Boost.Python(PyBind11 にしてリンク問題とおさらばしたい)

    さすがに PyBind11 差し替えはやるにしても後にするべきなので、 Python3 化だけやる。
    Boost.Python のビルド
    Boost.Python で使う Python を明示するには、user-config.jam に記述する。

    ```
    BOOST_DIR/user-conifg.jam
    using python
        : 3.6                   # Version
        : D:\\Anaconda3\\python.exe      # Python Path
        : D:\\Anaconda3\\include         # include path
        : D:\\Anaconda3\\libs            # lib path(s)
        : <define>BOOST_ALL_NO_LIB=1
        ;
    ```

    ビルド

    ```
    boost> b2.exe -j3 --stagedir=stage\x86_64 link=shared runtime-link=shared threading=multi toolset=msvc-14.0 address-model=64 --with-python
    ```

    link=shared にして dll を生成することが必要。
    これは、iex.pyd と imath.pyd 間で Boost.Python の static 変数を共有するために必須である(pyex の型登録周りか)。
    IlmBase を修正
    ilmbase-2.2.0/IexMath/IexMathFloatExc.h
    の以下の部分を修正する。多分、記述ミスなのだけど誰も Windows ビルドしないので気付かれていないのであろう。

    ```c++
    //#if defined(IEX_EXPORTS)↲
    #if defined(IEXMATH_EXPORTS)↲
    ```

    これで ilmbase をビルドしておく。vcpkg を使った。
    alembic を修正
    alembic-1.7.1/lib/Alembic/AbcCoreLayer/CMakeLists.txt を修正してヘッダを追加する(PyAlembic が使う)

    ```cmake
    INSTALL(FILES Read.h Util.h
        Foundation.h # 追加
        DESTINATION include/Alembic/AbcCoreLayer)
    ```

    これも、vcpkg を使った。
    PyIlmBase のビルド
    OpenEXR のサイトにある pyilmbase-2.2.0tar.gz を使おうとしたのだけど、github の方が新しいようなのでこちらを使う。
    Python3 向けの修正
    Python2 と Pytnon3 間での非互換によるコンパイルエラーを直していく。

    ```
    PySliceObject_XXX -> PyObject_XXX
    PyInt_XXX -> PyLong_XXX
    PyString_AsString -> PyUnicode_AsUTF8
    _PyThreadState_Current -> _PyThreadState_UncheckedGet()
    ```

    参考

    Python3 Advent Calendar - Python で 2/3 両方で動くコードを書く(C/API)
    Fix build for Python 3.5
    http://py3c.readthedocs.io/en/latest/guide.html

    CMake 設定

    ```cmake
    CMAKE_INSTALL_PREFIX
    BOOST_ROOT
    ILMBASE_PACKAGE_PREFIX
    FIND_PACKAGE(numpy)をコメントアウト
    DebugでもPython36.libにリンクするように、#include <Python.h>を除去(boost/python.hpp経由でインクルードさせればそうなる)
    ```

    ビルドが通るようになった。
    PyAlembic のビルド
    当初、Alembic のプロジェクトで Python フラグを有効にして一緒にビルドしようとしていたが、PyIlmBase 傘下に PyAlembic をコピーする方式に変えた。
    alembic-1.7.1/python/PyAlembic を ilmbase-2.2.0/PyIlmBase にコピーして、CMakeLists.txt を調整する。
    CMake 設定

    ```cmake
    Alembic_ROOT
    ```

    参考

    uimac 実装メモ - PyImath

    PyAlembic のビルドが通ったので実行してみよう
    PyAlembic/Tests/testPolyMesh.py を動かしてみようと思う。
    こういう感じに準備する。

    ```
    testPolyMesh.py
    iex.pyd
    PyIex.dll
    imath.pyd
    PyImath.dll
    alembic.lib
    alembic.pyd
    boost_python-vc140-mt-1_61.dll # debug buildもこれ

    > C:/python36/python.exe testPolyMesh.py
    ```

    import alembic でクラッシュする。デバッガで追ってみると、モジュールの初期化でエラーが発生している。一個ずつ直す。
    初期化の修正
    Python3 化による変更？
    AbcView
    今回の作業目標。

    http://alembic.github.io/abcview/

    これを動作させたい。

    ```
    AbcView has the following requirements:

    Python 2.6+ => Python 3.6 で動くように改造する(print 文とか)
    PyAlembic。できた
    PyAbcOpenGL。できた
    PyOpenGL。pip
    argparse。pip
    PyQt4。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic
    numpy-mkl。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic

    PyQt4 をインストール

    https://stackoverflow.com/questions/22640640/how-to-install-pyqt4-on-windows-using-pip
    http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyqt4

    こんな感じで公式の Python3.6(64bit)に対してインストール。
    D:\Python36\Scripts\pip.exe install .\PyQt4-4.11.4-cp36-cp36m-win_amd64.whl

    https://www.tutorialspoint.com/pyqt/pyqt_hello_world.htm
    ```

    ```python
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
    ```

    動いた。
    alembicgl.pyd, alembic.pyd, imath.pyd, iex.pyd と依存 dll 群を wheel 化する
    同じ dll を参照する pyd を同じフォルダに配置したいので、
    共通の親モジュールとして ilm を定義してその中にすべての pyd と dll を収めることにした。
    そのうえでこれを間接的にエクスポートするモジュール’iex’, ‘imath’, ‘alembic’, ‘alembicgl’
    を作る計画。

    ```
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
    ```

    iex/init.py

    ```
    from ilm.iex import \*
    ```

    こういうのを iex, imath, alembic, alembicgl それぞれに作った。
    setup.py

    ```python
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
    ```

    ```
    py_package> D:\Python36\python.exe setup.py bidst_wheel
    py_package> D:\Python36\Scripts\pip.exe install .\dist\alembic-0.1-cp36-cp36m-win_amd64.whl
    ```

    AbcView を実行してみる
    こういう感じに配置して、abcview_main.py を実行してみる。
    abcview_main.py `# bin/abcview から改名(名前がフォルダと被らないように変更)
    abcview

    ```
    **init**.py
    ```

    python2 仕様の部分をまとめて修正。

    https://docs.python.jp/3/library/2to3.html

    AbcView> D:\Python36\python.exe D:\Python36\Tools\scripts\2to3.py -w .

    print 文、except 文などの定型的な文法問題はこれで一網打尽。ディレクトリを指定することでまとめて処理できる。
    file.toAscii() => file
    これも Python2 との非互換か。
    QtCore.QString(str(value)) => str(value)
    QString は、Python の String でよさげ。
    動いた

    https://github.com/ousttrue/openexr/releases/tag/v0.1

    タイムラインを操作したら蛸が動いた。
