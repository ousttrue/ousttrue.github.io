---
Title: "cmakeチートシート"
date: 2017-05-28
Tags: []
---

すぐ忘れるのでここをチートシート化しよう。

構成
solution
CMAKE_MINIMUM_REQUIRED(VERSION 2.8)
PROJECT(hello) # .sln

subdirectory

https://cmake.org/cmake/help/latest/command/add_subdirectory.html

ADD_SUBDIRECTORY(src)

# もしくは

SUBDIRS(FOO BAR HOGE FUGA)

target
exe

https://cmake.org/cmake/help/latest/command/add_executable.html

ADD_EXECUTABLE(hello
    main.cpp
    renderer.cpp
    scene.cpp
    )

fileを集める例
FILE(GLOB SRC
    *.cpp
    *.h
    )
ADD_EXECUTABLE(hello
    ${SRC}
    )

# fo winmain
ADD_EXECUTABLE(hello_windows WIN32
    ${SRC}
    )

static lib

https://cmake.org/cmake/help/latest/command/add_library.html

ADD_LIBRARY(renderer STATIC
    renderer.cpp
    )

dll
ADD_LIBRARY(renderer SHARED
    renderer.cpp
    )

compile
compiler options
全体
SET(CMAKE_CXX_FLAGS "-Wall")

ターゲット指定
TARGET_COMPILE_OPTIONS(foo PUBLIC "$<$<CONFIG:DEBUG>:${MY_DEBUG_OPTIONS}>")
TARGET_COMPILE_OPTIONS(foo PUBLIC "$<$<CONFIG:RELEASE>:${MY_RELEASE_OPTIONS}>")

include path
全体
以降のADD_XXXに対して有効になる
INCLUDE_DIRECTORIES(libpath/include)

ターゲット指定
PUBLICの部分はよくわからぬ。
TARGET_INCLUDE_DIRECTORIES(HELLO PUBLIC
	${BOOST_DIR}
	)

define
全体
以降のADD_XXXに対して有効になる
ADD_DEFINITIONS(-DWITH_OPENCV2)

ターゲット指定
PUBLICの部分はよくわからぬ。
# -Dなし
TARGET_COMPILE_DEFINITIONS(TARGET PUBLIC
    WITH_OPENCV2=1
    )

link
link path
LINK_DIRECTORIES(libpath/lib)

x86とx64で違うパスにしたい時は？
LINK_LIBRARIES
TARGET_LINK_LIBRARIES
TARGET_LINK_LIBRARIES(MediaSessionPlaybackExample
    Mf
    Mfplat
    Mfuuid
    strmiids
    )

Debug Releaseの切り分け
TARGET_LINK_LIBRARIES(Fuga
    DEBUG hoge_d
    OPTIMIZE hoge
    )

変数
ソース
cmake -G CMAKE_SOURCE_DIR
CMAKE_SOURCE_DIR

ビルドディレクトリ
cmake -G CMAKE_SOURCE_DIRを実行したディレクトリ
CMAKE_BINARY_DIR


The path to the top level of the build tree

出力ディレクトリ
exeとdllの出力先。
SET(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

example
CMakeLists.txt
CMAKE_MINIMUM_REQUIRED(VERSION 2.8)
PROJECT(hello) # hello.sln
ADD_EXECUTABLE(hello main.cpp) # hello.vcxproj

set(CMAKE_CXX_FLAGS "/WD4096")
set(CMAKE_C_FLAGS "/WD4096")
include_directories(libpath/include)
add_definitions(
    -DUNICODE
    -D_UNICODE
    )

