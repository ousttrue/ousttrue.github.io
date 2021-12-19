---
title: "cmakeを使ってみる(Windowsかつコマンドラインで)"
date: 2013-12-08
taxonomies: {tags: ['cmake']}
---

cmakeを使ってみる(Windowsかつコマンドラインで)
ArUcoを使おうとしたら、msvcpdのvc10版を要求されてvc12でデバッグビルドが動かなかった。
最新版のOpenCV-2.4.7をゲットしてきたところvc10とvc11は含まれて居るのだが、vc12ビルドは含まれていなかった(vc2013は早すぎたかw)。
仕方ないので自前ビルドすることにした。
ということでcmakeの使い方を調べてみる。
ついでに、cmakeでビルドしたライブラリを特定のディレクトリを基準にインストールする方法を調べてみる。
練習にzlibをビルドしてインストールしてみる
以下のようなディレクトリ構成で運用してみることを目標に作業開始。
local_vc12
 + bin # dll置き場
 + include # dllを使うのに必要なheader置き場
 + lib # dllのimportライブラリ置き場

外部依存の無い適当なライブラリで練習してみようということでzlibを選定。
さっそくcmakeを使ってみようと思ったら、zlib-1.2.8にはCmakeLists.txtが含まれとるで。
C:\src> cd zlib-1.2.8
C:\src\zlib-1.2.8> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
C:\src\zlib-1.2.8> msbuild INSTALL.vcxproj
C:\src\zlib-1.2.8> msbuild INSTALL.vcxproj /p:Configuration=Release

以上で下記のようになった。
C:/local_vc12
C:/local_vc12/bin
C:/local_vc12/bin/zlib.dll
C:/local_vc12/bin/zlibd.dll
C:/local_vc12/include
C:/local_vc12/include/zconf.h
C:/local_vc12/include/zlib.h
C:/local_vc12/lib
C:/local_vc12/lib/zlib.lib
C:/local_vc12/lib/zlibd.lib
C:/local_vc12/lib/zlibstatic.lib
C:/local_vc12/lib/zlibstaticd.lib
C:/local_vc12/share
C:/local_vc12/share/man
C:/local_vc12/share/man/man3
C:/local_vc12/share/man/man3/zlib.3
C:/local_vc12/share/pkgconfig
C:/local_vc12/share/pkgconfig/zlib.pc

素晴らしい。
OpenCV-2.4.7でやってみる
C:\src> cd opencv-2.4.7
C:\src\opencv-2.4.7> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
C:\src\opencv-2.4.7> msbuild ALL_BUILD.vcxproj

失敗する。

https://github.com/SpecLad/opencv/commit/7973594a01228107dcb9d2d1f10eb64498b91aac
http://stackoverflow.com/questions/17409956/cannot-compile-opencv-2-4-5-with-vs-2013-rtm

あとIlmxxxでmin, maxのエラーが出るので”#include
<algorithm>“する。std::min,
maxはalgorithmに入っとる。ALL_BUILDが成功したらINSTALLする。
C:\src\opencv-2.4.7> msbuild INSTALL.vcxproj

これで”local_vc12”にopencvも入った。
cmakeはいままで敬遠していたのだがライブラリのinstallまで面倒見てくれるのはいいですな。
同じく敬遠していた自前dllを使う開発が捗りそうな感じだ。
ArUcoをビルド
cmakeを使ったアプリ(ライブラリを使う方)のビルド。
C:\src> cd aruco-1.2.4
C:\src\aruco-1.2.4> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .

ここでエラーが出る。
OpenCVが正式ビルドと違うディレクトリにインストールされたために検知に失敗する。
“C:/local_vc12/OpenCVConfig.cmake”を直接修正した。
get_filename_component(OpenCV_CONFIG_PATH "${CMAKE_CURRENT_LIST_FILE}" PATH CACHE)
#if(OpenCV_RUNTIME AND OpenCV_ARCH)
#  if(OpenCV_STATIC AND EXISTS "${OpenCV_CONFIG_PATH}/${OpenCV_ARCH}/${OpenCV_RUNTIME}/staticlib/OpenCVConfig.cmake")
#    if(OpenCV_CUDA AND EXISTS "${OpenCV_CONFIG_PATH}/gpu/${OpenCV_ARCH}/${OpenCV_RUNTIME}/staticlib/OpenCVConfig.cmake")
#      set(OpenCV_LIB_PATH "${OpenCV_CONFIG_PATH}/gpu/${OpenCV_ARCH}/${OpenCV_RUNTIME}/staticlib")
#    else()
#      set(OpenCV_LIB_PATH "${OpenCV_CONFIG_PATH}/${OpenCV_ARCH}/${OpenCV_RUNTIME}/staticlib")
#    endif()
#  elseif(EXISTS "${OpenCV_CONFIG_PATH}/${OpenCV_ARCH}/${OpenCV_RUNTIME}/lib/OpenCVConfig.cmake")
#    if(OpenCV_CUDA AND EXISTS "${OpenCV_CONFIG_PATH}/gpu/${OpenCV_ARCH}/${OpenCV_RUNTIME}/lib/OpenCVConfig.cmake")
#      set(OpenCV_LIB_PATH "${OpenCV_CONFIG_PATH}/gpu/${OpenCV_ARCH}/${OpenCV_RUNTIME}/lib")
#    else()
#      set(OpenCV_LIB_PATH "${OpenCV_CONFIG_PATH}/${OpenCV_ARCH}/${OpenCV_RUNTIME}/lib")
#    endif()
#  endif()
#endif()
set(OpenCV_LIB_PATH "${OpenCV_CONFIG_PATH}/lib")

これでビルドできた。
C:\src\aruco-1.2.4> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
C:\src\opencv-2.4.7> msbuild ALL_BUILD.vcxproj

しかし、OpenGLを使ったサンプルがビルドされぬ。
どうやらglutが見つからないらいしい。せっかくなのでFreeGlutを入れてみますか。
FreeGlut
http://freeglut.sourceforge.net/
C:\src\freeglut-2.8.1> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
CMake Error: The source directory "C:/src/freeglut-2.8.1" does not appear to contain CMakeLists.txt.
Specify --help for usage, or press the help button on the CMake GUI.

CMakeLists.txtが無い。作ってみる。
project (freeglut)

file(GLOB SOURCES "src/*.c")
ADD_LIBRARY(freeglut SHARED ${SOURCES})

include_directories(include)

ADD_DEFINITIONS(-DFREEGLUT_EXPORTS)
ADD_DEFINITIONS(-D_USRDLL)
ADD_DEFINITIONS(-D_WINDOWS)
ADD_DEFINITIONS(-DWIN32)

C:\src\freeglut-2.8.1> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
C:\src\opencv-2.4.7> msbuild ALL_BUILD.vcxproj

ビルドできた。INSTALL.vcxprojが見当たらないのでCMakeLists.txtに追記する必要がありそう。
インストールに関する追記。
# dll
INSTALL(TARGETS freeglut RUNTIME
    DESTINATION bin)
# lib
INSTALL(TARGETS freeglut ARCHIVE
    DESTINATION lib)
# headers
INSTALL(DIRECTORY include/
    DESTINATION include
    PATTERN "Makefile.*" EXCLUDE
)

インストールしてみる。
C:\src\freeglut-2.8.1> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
C:\src\opencv-2.4.7> msbuild INSTALL.vcxproj

 -- Install configuration: "Debug"
 -- Installing: C:/local_vc12/bin/freeglut.dll
 -- Installing: C:/local_vc12/lib/freeglut.lib
 -- Installing: C:/local_vc12/include
 -- Installing: C:/local_vc12/include/GL
 -- Up-to-date: C:/local_vc12/include/GL/freeglut.h
 -- Up-to-date: C:/local_vc12/include/GL/freeglut_ext.h
 -- Up-to-date: C:/local_vc12/include/GL/freeglut_std.h
 -- Up-to-date: C:/local_vc12/include/GL/glut.h

インストール成功。
再度ArUco
C:\src\freeglut-2.8.1> cmake -D CMAKE_INSTALL_PREFIX=C:/local_vc12 .
 -- FOUND OPENGL=YES    LIBS=opengl32;glu32;C:/local_vc12/lib/freeglut.lib

glutが発見されたようだ。
どうやらcmakeはCMAKE_INSTALL_PREFIXにライブラリを探しに行くようですな。
C:\src\opencv-2.4.7> msbuild ALL_BUILD.vcxproj

gl.hの前に”#include <windows.h>“してやってビルドできた。
Debug版の後ろに”d”をつける
FreeGlutのCmakeLists.txtにzlibの”CmakeLists.txt”から頂いてきた。
set(CMAKE_DEBUG_POSTFIX "d")

記述順の影響があるようで前の方(ADD_LIBRARYより前？)に書く必要があるっぽい。
Debug版の後ろに”d”がついたライブラリを使う

http://stackoverflow.com/questions/2209929/linking-different-libraries-for-debug-and-release-builds-in-cmake-on-windows
http://stackoverflow.com/questions/5497348/debug-and-release-library-linking-with-cmake-visual-studio

こういう書き方でできた。
set (OPENGL_LIBS  general ${OPENGL_gl_LIBRARY} ${OPENGL_glu_LIBRARY} optimized ${GLUT_glut_LIBRARY} debug ${GLUT_glut_DEBUG_LIBRARY})

CMAKE_DEBUG_POSTFIXに関連は使われる方と使う方の双方で合わせる必要があるので変更する場合は自分で両方の面倒を見なければならない。
一応、cmakeのひととおりの使い方が分かってきた。
vcがmsbuildを使うようになってビルドが制御可能になっている感じ。
makeの各ターゲットに対するmsbuildの実行方法は以下の通り。
"target", "make", "msbuild"
"build", "make all", "msbuild ALL_BUILD.vcxproj /t:Build"
"release build", "?", "msbuild ALL_BUILD.vcxproj /t:Build /p:Configuration=Release"
"debug build", "?", "msbuild ALL_BUILD.vcxproj /t:Build /p:Configuration=Debug"
"clean", "make clean", "msbuild ALL_BUILD.vcxproj /t:Clean"
"install", "make install", "msbuild INSTALL.vcxproj"

ちょっといろいろビルドしてみる。
