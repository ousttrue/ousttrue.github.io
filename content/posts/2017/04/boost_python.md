---
Title: "Boost.Pythonのリンク周り"
Published: 2017-4-22
Tags: []
---

mmdbridgeのビルドで必要になったBoost.Python周り。
どうやら、OpenEXR界隈では結構使われている様子。
AlembicとかUSDとか。
しかしWindows版のBoost.Pythonはリンク周りにはまり要素が多いので、記録しといた。

Pythonへのリンク
python_d.libにリンクする必要がない場合
Python自体のデバッグをするのでなければpython_dにリンクする必要はない。
python_dへのリンクの必要性は、リンクするライブラリをDebugで統一する必要の有無なのだけど、
pydを作っているときは必要ない。python.exeではなくpython_d.exeから実行して何もかもが、Debugを参照するようにするのはつらい。そうではなくて自分のアプリがPythonを内臓する場合は、python_dにリンクした方がよい。DebugとReleaseの混在によるエラーが出る可能性があるので。で、mmdbridgeは後者なのでpython_dをリンクすることに妥当性がある。
python_d.libへのリンクを防止する

https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work

#ifdef _DEBUG
  #undef _DEBUG
  #include <Python.h>
  #define _DEBUG
#else
  #include <Python.h>
#endif

これが、常套手段になるようでpydの開発時には入れておくとよい。
Boost.Pythonがpython_dにリンクする

boost-1.64.0
python-3.5.3

debug版のboostをビルドしたのだが、よく見るとRelease版のpython35.dllの方がリンクされていた。がんばって、DEBUGマクロの定義等を調べたのだがなかなかわからなかった。どうやらどこかでundef _DEBUGされているらしいと当たりがついた。

boost/python/detail/wrap_python.hpp

#ifdef _DEBUG
# ifndef BOOST_DEBUG_PYTHON
#  ifdef _MSC_VER  
    // VC8.0 will complain if system headers are #included both with
    // and without _DEBUG defined, so we have to #include all the
    // system headers used by pyconfig.h right here.
#   include <stddef.h>
#   include <stdarg.h>
#   include <stdio.h>
#   include <stdlib.h>
#   include <assert.h>
#   include <errno.h>
#   include <ctype.h>
#   include <wchar.h>
#   include <basetsd.h>
#   include <io.h>
#   include <limits.h>
#   include <float.h>
#   include <string.h>
#   include <math.h>
#   include <time.h>
#  endif
#  undef _DEBUG // Don't let Python force the debug library just because we're debugging.
#  define DEBUG_UNDEFINED_FROM_WRAP_PYTHON_H
# endif
#endif

python_d.libにリンクするには
b2 --with-python --debug-configuration python-debugging=on

として
libboost_python3-vc140-mt-gyd-1_64
を作成する。gydのyがpython debugらしい。
Boost.Pythonへのリンク
boostはどうやってリンクするライブラリの名前を決めているのか
#pragma comment(lib,"wsock32.lib")

どこかに#pragmaが記述されているはずだが。

https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work
http://d.hatena.ne.jp/torutk/20121004/p1

autolinkらしい。自動的に有効になる。

http://www.boost.org/doc/libs/1_48_0/boost/config/auto_link.hpp

pragmaリンクの名前が一致しないんだけど

libboost_python3-vc140-mt-gd-1_64にリンクしたいのだがlibboost_python-vc140-mt-gd-1_64にリンクしようとする
boost_python3_vc140-mt-gd-1_64にリンクしたいのいだがlibboost_python-vc140-mt-gd-1_64にリンクしようとする

BOOST_ALL_NO_LIB

を定義してautolinkを阻止して自分でリンクする。
python3はどうやって決まるのか
むしろboost_python3がBOOST_LIB_NAMEから決まる。
BOOST_LIB_NAMEは、boost/python/detail/config.hppで下記の記述がある。
boost-1.61.0
#define BOOST_LIB_NAME boost_python

boost_python3.dllとboost_python.dllは両方Python3にリンクされとった
なんだってー。つまり、boostは複数のPythonに対するビルド結果を共存させることは考慮されていないということだった。なるほど
ReleaseビルドとDebugビルドは同じReleaseのdllにリンクするべき
Debug版であっても、boost_python.dllも同じRelease版にリンクされる。
AutoLinkに逆らわない方がよい。
CMakeのFIND_PACKAGE(BOOST)によるBoost_LIBRARIESは使わない方がよいかもしれない。デバッグの方にリンクされてはまりうる。ていうか、はまった。
結論として、AutoLink邪魔だーからAutoLinkに従えとなった。
pybindを使おう
ヘッダオンリーなので。リンク無いし。

https://github.com/pybind/pybind11

既存のBoost.Pythonを使ったコードでも、pybindはBoost.Pythonと似たAPIになっているので簡単に置き換えられる。

pybind11でC++の関数をpythonから使う

