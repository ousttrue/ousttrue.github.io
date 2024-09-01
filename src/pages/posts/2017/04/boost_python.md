---
title: "Boost.Pythonのリンク周り"
date: 2017-04-22
tags: ["python", "cpp"]
---

mmdbridge のビルドで必要になった Boost.Python 周り。
どうやら、OpenEXR 界隈では結構使われている様子。
Alembic とか USD とか。
しかし Windows 版の Boost.Python はリンク周りにはまり要素が多いので、記録しといた。

Python へのリンク
python_d.lib にリンクする必要がない場合
Python 自体のデバッグをするのでなければ python_d にリンクする必要はない。
python_d へのリンクの必要性は、リンクするライブラリを Debug で統一する必要の有無なのだけど、
pyd を作っているときは必要ない。python.exe ではなく python_d.exe から実行して何もかもが、Debug を参照するようにするのはつらい。そうではなくて自分のアプリが Python を内臓する場合は、python_d にリンクした方がよい。Debug と Release の混在によるエラーが出る可能性があるので。で、mmdbridge は後者なので python_d をリンクすることに妥当性がある。
python_d.lib へのリンクを防止する

https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work

```cpp
#ifdef _DEBUG
  #undef _DEBUG
  #include <Python.h>
  #define _DEBUG
#else
  #include <Python.h>
#endif
```

これが、常套手段になるようで pyd の開発時には入れておくとよい。
Boost.Python が python_d にリンクする

boost-1.64.0
python-3.5.3

debug 版の boost をビルドしたのだが、よく見ると Release 版の python35.dll の方がリンクされていた。がんばって、DEBUG マクロの定義等を調べたのだがなかなかわからなかった。どうやらどこかで undef \_DEBUG されているらしいと当たりがついた。

boost/python/detail/wrap_python.hpp

```cpp
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
```

python_d.lib にリンクするには

```
b2 --with-python --debug-configuration python-debugging=on
```

として
libboost_python3-vc140-mt-gyd-1_64
を作成する。gyd の y が python debug らしい。
Boost.Python へのリンク
boost はどうやってリンクするライブラリの名前を決めているのか
#pragma comment(lib,"wsock32.lib")

どこかに#pragma が記述されているはずだが。

https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work
http://d.hatena.ne.jp/torutk/20121004/p1

autolink らしい。自動的に有効になる。

http://www.boost.org/doc/libs/1_48_0/boost/config/auto_link.hpp

pragma リンクの名前が一致しないんだけど

libboost_python3-vc140-mt-gd-1_64 にリンクしたいのだが libboost_python-vc140-mt-gd-1_64 にリンクしようとする
boost_python3_vc140-mt-gd-1_64 にリンクしたいのいだが libboost_python-vc140-mt-gd-1_64 にリンクしようとする

BOOST_ALL_NO_LIB

を定義して autolink を阻止して自分でリンクする。
python3 はどうやって決まるのか
むしろ boost_python3 が BOOST_LIB_NAME から決まる。
BOOST_LIB_NAME は、boost/python/detail/config.hpp で下記の記述がある。
boost-1.61.0
#define BOOST_LIB_NAME boost_python

boost_python3.dll と boost_python.dll は両方 Python3 にリンクされとった
なんだってー。つまり、boost は複数の Python に対するビルド結果を共存させることは考慮されていないということだった。なるほど
Release ビルドと Debug ビルドは同じ Release の dll にリンクするべき
Debug 版であっても、boost_python.dll も同じ Release 版にリンクされる。
AutoLink に逆らわない方がよい。
CMake の FIND_PACKAGE(BOOST)による Boost_LIBRARIES は使わない方がよいかもしれない。デバッグの方にリンクされてはまりうる。ていうか、はまった。
結論として、AutoLink 邪魔だーから AutoLink に従えとなった。
pybind を使おう
ヘッダオンリーなので。リンク無いし。

https://github.com/pybind/pybind11

既存の Boost.Python を使ったコードでも、pybind は Boost.Python と似た API になっているので簡単に置き換えられる。

pybind11 で C++の関数を python から使う
