---
title: "cmakeのfind_package"
date: 2017-07-20
tags: ["cmake"]
---

cmake の FIND_PACKAGE わかりずらいよ。もやもやするものがある。

GLUT の例
検証用に小さい例を作ってみた。

https://stackoverflow.com/questions/9460242/how-to-compile-glut-opengl-project-with-cmake-and-kdevelop-in-linux

これを参考にしたのだけどちょっと手直しした。

ADD_EXECUTABLE の前に INCLUDE_DIRECTORIES する必要がある
OPENGL_INCLUDE_DIRS じゃなくて OPENGL_INCLUDE_DIR
GLUT_INCLUDE_DIRS じゃなくて GLUT_INCLUDE_DIR

Linux とかだと distribution が cmake ファイルを管理してたりするかもしれん。
main.cpp

```cpp
#include <GL/glut.h>

void display(void)
{
}

int main(int argc, char *argv[])
{
    glutInit(&argc, argv);
    glutCreateWindow(argv[0]);
    glutDisplayFunc(display);
    glutMainLoop();
    return 0;
}
```

```cmake
CMakeLists.txt
CMAKE_MINIMUM_REQUIRED(VERSION 2.8)
PROJECT(hello)

FIND_PACKAGE(OpenGL REQUIRED)
MESSAGE(STATUS ${OPENGL_LIBRARIES})
MESSAGE(STATUS ${OPENGL_INCLUDE_DIR})

FIND_PACKAGE(GLUT REQUIRED)
MESSAGE(STATUS ${GLUT_LIBRARY})
MESSAGE(STATUS ${GLUT_INCLUDE_DIR})

INCLUDE_DIRECTORIES(
    ${OPENGL_INCLUDE_DIR}
    ${GLUT_INCLUDE_DIR}
    )
ADD_DEFINITIONS(
    -DFREEGLUT_LIB_PRAGMAS=0 # avoid pragma
    )
ADD_EXECUTABLE(hello
    main.cpp
    )
TARGET_LINK_LIBRARIES(hello
    ${OPENGL_LIBRARIES}
    ${GLUT_LIBRARY}
    )
```

実行時のメッセージ

```
-- glu32opengl32
--
-- D:/vcpkg/installed/x64-windows/lib/freeglut.lib
-- D:/vcpkg/installed/x64-windows/include
-- Configuring done
-- Generating done
```

なぜか vcpkg の freeglut を発見してくれた。
vcpkg が cmake の探索パスを追加しているぽい。レジストリとかか？
まず、第 1 に
FIND_PACKAGE の結果として如何なる変数が増えるのかが分からん。

https://cmake.org/Wiki/CMake:How_To_Find_Libraries#How_package_finding_works

慣例では、下記のようになっている。

```
_FOUND
_INCLUDE_DIRS or _INCLUDES
_LIBRARIES or _LIBRARIES or _LIBS
_DEFINITIONS
```

強制じゃなくて規約なので各種表記ブレの余地が危険を醸し出している。
大文字小文字(find_package(glut)に対して${GLUT_FOUND})、複数単数(DIR, DIRS)、短縮(LIBRARIES, LIBS)とか一貫性が。はまりそうだー。
とりあえあず、標準のパッケージに関してはコマンドから問い合わせることができる。

```
> cmake --help-module OpenGL
```

```
FindOpenGL
----------

FindModule for OpenGL and GLU.

IMPORTED Targets
^^^^^^^^^^^^^^^^

This module defines the ``IMPORTED`` targets:

``OpenGL::GL``
 Defined if the system has OpenGL.
``OpenGL::GLU``
 Defined if the system has GLU.

Result Variables
^^^^^^^^^^^^^^^^

This module sets the following variables:

``OPENGL_FOUND``
 True, if the system has OpenGL.
``OPENGL_XMESA_FOUND``
 True, if the system has XMESA.
``OPENGL_GLU_FOUND``
 True, if the system has GLU.
``OPENGL_INCLUDE_DIR``
 Path to the OpenGL include directory.
``OPENGL_LIBRARIES``
 Paths to the OpenGL and GLU libraries.

If you want to use just GL you can use these values:

``OPENGL_gl_LIBRARY``
 Path to the OpenGL library.
``OPENGL_glu_LIBRARY``
 Path to the GLU library.

OSX Specific
^^^^^^^^^^^^

On OSX default to using the framework version of OpenGL. People will
have to change the cache values of OPENGL_glu_LIBRARY and
OPENGL_gl_LIBRARY to use OpenGL with X11 on OSX.

> cmake --help-module GLUT
FindGLUT
--------

try to find glut library and include files.

IMPORTED Targets
^^^^^^^^^^^^^^^^

This module defines the ``IMPORTED`` targets:

``GLUT::GLUT``
 Defined if the system has GLUT.

Result Variables
^^^^^^^^^^^^^^^^

This module sets the following variables:

::

 GLUT_INCLUDE_DIR, where to find GL/glut.h, etc.
 GLUT_LIBRARIES, the libraries to link against
 GLUT_FOUND, If false, do not try to use GLUT.

Also defined, but not for general use are:

::

 GLUT_glut_LIBRARY = the full path to the glut library.
 GLUT_Xmu_LIBRARY  = the full path to the Xmu library.
 GLUT_Xi_LIBRARY   = the full path to the Xi Library.

という感じでcmakeに最初から入っているタイプのモジュールはわかる。
ちなみにFIND_PACKAGEの引数は大文字小文字を区別しないが、結果はただの変数なので区別することに注意。
${OPENGL_GL_LIBRARY}とかだめですから。
不安があるときはMESSAGEでプリントデバッグするのが手堅い。
MESSAGE(STATUS ${OPENGL_gl_LIBRARY})

VisualStudioなのでリンクをDebug, Releaseで振り分けたいんだけど
lib/freeglut.libとdebug/lib/freeglutd.libとか。
上の例は問答無用でRelease版にリンクされる(glutの場合は、別にfreeglutのデバッグはしないのでそれはそれでよかったりもするが・・・)。プラグマでリンクすればいいやんとなるのだが、link_directoriesにはDebug, Releaseの振り分けはない。Release決め打ちの方がましである。
TARGET_LINK_LIBRARIESには振り分け機能が実装されている。
TARGET_LINK_LIBRARIES(hello
    debug path_to_freeglutd.lib
    optimized path_to_freeglut.lib
    )

という風に記述できる。で、これを如何にしてFIND_PACKAGEと連携させるのか。
例としてfreeglut.libとfreeglutd.lib。
FIND_PACKAGE(OpenGL REQUIRED)
MESSAGE(STATUS ${OPENGL_LIBRARIES})
FIND_PACKAGE(GLUT)
MESSAGE(STATUS ${GLUT_LIBRARY})
STRING(REPLACE lib/freeglut.lib debug/lib/freeglutd.lib GLUT_LIBRARY_DEBUG ${GLUT_LIBRARY})
SET(OPENGL_LIBS
    general ${OPENGL_LIBRARIES}
    optimized ${GLUT_LIBRARY}
    debug ${GLUT_LIBRARY_DEBUG}
    )
TARGET_LINK_LIBRARIES(hello
    ${OPENGL_LIBS}
    )

インストールしたパッケージがFindされないんだけど
alembicなどvcpkgでインストールしたパッケージをVCPKG_DIR/installed/x64-windowsから探索して欲しいのだが方法がよくわからない。

CMakeを使ってみた (7) find_packageとpkg_check_modulesによるライブラリ探索

あとで
```
