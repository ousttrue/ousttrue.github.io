---
title: "vcpkgでopencvの開発環境を作る"
date: 2017-07-01
tags: ['vcpkg', 'opencv']
---

Windowsでcmakeを使う場合に外部ライブラリの解決がわりと困難。

cmakeのfind_packageがうまくうごかないのである。Unix系であれば `CMAKE_INSTALL_PREFIX(/usr/local)` にインストールされた依存プロジェクトを発見できるし、足りなければインストールすることもできる。それに、`apt-get` とか `pacman` とかあるので、自分で全部ビルドするということはあまり必要なかったりする今日この頃です。Windowsにはそういうのがなかった(CMAKE_INSTALL_PREFIXはどこなのか)のだけど、最近出てきたvcpkgがそれをやってくれる。

ArUcoをvcpkgとcmakeでビルドする
ということでvcpkgで外部ライブラリを構築し、一部をソースごとプロジェクトにコピーする方法でArUco(OpenCV)のビルドをやってみる。ArUcoのデバッグ版にアタッチしたり改造したりするつもりなので、opencvのモジュール版ArUcoではなく単体の方を使う。環境は、Windows10(64bit)にVisualStudio2017(C++)。
vcpkgを準備

* https://github.com/Microsoft/vcpkg

```shell
> git clone https://github.com/Microsoft/vcpkg.git
> cd vcpkg
vcpkg> .\bootstrap-vcpkg.bat

vcpkgで64bit版のopencvをインストール
vcpkg> .\vcpkg.exe install opencv:x64-windows

vcpkg/installed/x64-windowsにinclude, lib, bin等がインストールされる。
vcpkgで64bit版のfreeglutをインストール
vcpkg> .\vcpkg.exe install freeglut:x64-windows
```

arucoのソースを入手
OpenCVのモジュール

http://docs.opencv.org/trunk/d9/d6d/tutorial_table_of_content_aruco.html

ではなくてこっち。

http://www.uco.es/investiga/grupos/ava/node/26
https://sourceforge.net/projects/aruco/files/

aruco-2.0.19.zipを手に入れた。
とりあえずビルドしてみる
vcpkgはd:/vcpkgにインストールされている。

```shell
aruco-2.0.19> mkdir build
aruco-2.0.19/build> cmake -D CMAKE_INSTALL_PREFIX=d:/vcpkg/installed/x64-windows -D OpenCVDir=d:/vcpkg/installed/x64-windows/share/opencv -D BUILD_GLSAMPLES=1 -G "Visual Studio 15 2017 Win64" ..
```

aruco_test_glとaruco_test_markermap_glのビルドでエラーが出るのでちょっとコードを修正する。
gl.hより先にWindows.hをincludeしてあげる。

```c++
#ifdef __APPLE__
#include <GLUT/glut.h>

#elif defined(_MSC_VER)
#include <Windows.h>
#include <GL/glut.h>

#else
#include <GL/gl.h>
#include <GL/glut.h>
#endif
```

あとfreeglutのリンクををdebug, release振り分けのために、
CMakeLists.txtをちょっと改造。だいたいこういう感じ。

```cmake
IF (GLUT_FOUND)
	STRING(REPLACE lib/freeglut.lib debug/lib/freeglutd.lib GLUT_glut_DEBUG_LIBRARY ${GLUT_glut_LIBRARY})
	MESSAGE(STATUS "GLUT_glut_DEBUG_LIBRARY=${GLUT_glut_DEBUG_LIBRARY}")
	set (OPENGL_LIBS  general
		${OPENGL_gl_LIBRARY}
		${OPENGL_glu_LIBRARY}
		optimized ${GLUT_glut_LIBRARY}
		debug ${GLUT_glut_DEBUG_LIBRARY}
		)
ENDIF()
```

この部分と連携する。
TARGET_LINK_LIBRARIES(aruco_test_gl ${OPENGL_LIBS})

これで、CMAKE_INSTALL_PREFIX/binにパスを通せばプログラムは動作する。
arucoのテストデータを入手してwebcamで動作確認
テストデータを入手する。

https://sourceforge.net/projects/aruco/files/

aruco-test-data-2.0.zipを手に入れた。
この中のintrinsics.ymlを引数にして実行する(本来は、カメラキャリブレーションをしてintrinsics.ymlを自分のカメラ用に作成する必要がある)。
aruco_test_gl.exe "live" "path_to_intrinsics.yml" 0.05
aruco_test_glとarucoの入った小さいプロジェクト
ArUcoを改造する予定。

intrinsics.ymlを省略したり簡略化したい(fovyとaspectratioだけにするなど)
左手系(DirectXやUnity)に対応

ということで、arucoのソースを含めている。

```shell
aruco_test

  + CMakeLists.txt

  + aruco_test_gl
    + CMakeLists.txt
    + aruco_test_gl.cpp(aruco-2.0.19/utils_gl/aruco_test_gl.cppをコピー)

  + src(aruco-2.0.19/srcをコピー)
```

```CMakeLists.txt
CMAKE_MINIMUM_REQUIRED(VERSION 2.8)
PROJECT(aruco)

FIND_PACKAGE(OpenCV REQUIRED )
SET (ARUCO_REQUIRED_LIBRARIES ${OpenCV_LIBS})
INCLUDE_DIRECTORIES(${OpenCV_INCLUDE_DIRS})

FIND_PACKAGE(OpenGL REQUIRED)

FIND_PACKAGE(GLUT)
MESSAGE(STATUS "GLUT_glut_LIBRARY=${GLUT_glut_LIBRARY}")
STRING(REPLACE lib/freeglut.lib debug/lib/freeglutd.lib GLUT_glut_DEBUG_LIBRARY ${GLUT_glut_LIBRARY})
MESSAGE(STATUS "GLUT_glut_DEBUG_LIBRARY=${GLUT_glut_DEBUG_LIBRARY}")
IF (GLUT_FOUND)
    set (OPENGL_LIBS  general
        ${OPENGL_gl_LIBRARY}
        ${OPENGL_glu_LIBRARY}
        optimized ${GLUT_glut_LIBRARY}
        debug ${GLUT_glut_DEBUG_LIBRARY}
        )
ENDIF()

ADD_DEFINITIONS(-D_SCL_SECURE_NO_WARNINGS)
SET(CMAKE_CXX_FLAGS "/wd4819 /EHsc")

ADD_SUBDIRECTORY(src)
ADD_SUBDIRECTORY(utils_gl)

aruco_test_gl/CMakeLists.txt
INCLUDE_DIRECTORIES(${PROJECT_SOURCE_DIR}/src ${GNULIBS_INCLUDE_DIR})
LINK_LIBRARIES(${PROJECT_NAME} ${REQUIRED_LIBRARIES} )

IF(OPENGL_LIBS)
    ADD_EXECUTABLE(aruco_test_gl
        aruco_test_gl.cpp
        )
    TARGET_LINK_LIBRARIES(aruco_test_gl ${OPENGL_LIBS})
```

以上で、arucoを例にvcpkgでopencvとfreeglutdを外部管理してcmakeでプロジェクトを取り廻す例を作った。
作業例。

https://github.com/ousttrue/aruco_test

