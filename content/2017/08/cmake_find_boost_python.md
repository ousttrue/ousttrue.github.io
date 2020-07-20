---
Title: "CMakeでBoost.Pythonを使う"
Published: 2017-8-9
Tags: []
---

Windows上のCMakeでFIND_PACKAGE(Boost)する件について。

Boost.Pythonのビルド
C:/boost_1_61_0に解凍して、b2 --with-pythonしたとする。
のようなディレクトリ構成。
C:/boost_1_61_0
    stage
        lib
            boost_python.lib

FIND_PACKAGE
BOOST.Pythonを使う場合は下記の記述をして、-DBOOST_ROOT=C:/boost_1_61_0を指定してやるとcmakeはBoost.Pythonを見つけることができる。
ただし、検索パスが${BOOST_ROOT}/stage/lib決め打ち。
FIND_PACKAGE (Boost COMPONENTS PYTHON REQUIRED)
MESSAGE(STATUS ${Boost_LIBRARIES})

見つかった
optimizedD:/lib/boost_1_61_0/stage/lib/boost_python-vc140-mt-1_61.libdebugD:/lib/boost_1_61_0/stage/lib/boost_python-vc140-mt-gd-1_61.lib

Python3は？
FIND_PACKAGE (Boost COMPONENTS python3 REQUIRED)
MESSAGE(STATUS ${Boost_LIBRARIES})

でいける。
しかし、警告が出た。
CMake Warning at D:/Program Files/CMake/share/cmake-3.9/Modules/FindBoost.cmake:1564 (message):
  No header defined for python3; skipping header check
Call Stack (most recent call first):
  CMakeLists.txt:42 (FIND_PACKAGE)

3がついてなくても同じだった
stage/libに出力されているboost_python3.dllとboost_python.dllは同じバイナリぽい。
static, sharedの呼び分けは？
後で。
FindBoost

https://cmake.org/cmake/help/latest/module/FindBoost.html

しかし
FIND_PACKAGEした結果のBoost_LIBRARIESを使うのには注意が必要。
ネイティブモジュール開発で、デバッグ版にRelease版のPythonをリンクする場合(通常そうする)に、Boost.PytnonもRelease版にリンクするべきなのでここではまりうる(コンパイルは通るが実行時に謎エラーが出る)。LINK_DIRECTORIESを使って、リンク対象はBOOSTのautolink頼りの方が確実かもしれない。

BOOST_ALL_NO_LIB を定義して Boost_LIBRARIESにリンクする
Boost_LIBRARIESを使わずに、BoostのAutoLinkに従う

のいずれかになるが、ネイティブモジュール開発では後者がおすすめか。
