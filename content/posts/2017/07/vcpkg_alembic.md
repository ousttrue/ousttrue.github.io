---
title: "vcpkgのAlembicパッケージ(USE_HDF5)を作ってみる"
date: 2017-07-18
Tags: ['vcpkg', 'cg']
---

mmdbridgeのvcpkgを使ったビルド手順を作ったついでにAlembicのvcpkg向けパッケージを作ってみる。

情報収集

* https://github.com/Microsoft/vcpkg/blob/master/docs/examples/packaging-zlib.md

読んだ。

`vcpkg create url` で雛形が作れる。

実験

```shell
.\vcpkg.exe create alembic https://github.com/alembic/alembic/archive/1.7.1.tar.gz
CMake Error at scripts/ports.cmake:101 (message):
  Portfile already exists: 'D:\vcpkg\ports\alembic\portfile.cmake'
```

すでにあるだと！？
最近できたらしい。

* https://github.com/Microsoft/vcpkg/tree/master/ports/alembic

しかし、hdf非対応みたいなので作ってみる。

```shell
.\vcpkg.exe create alembic-hdf https://github.com/alembic/alembic/archive/1.7.1.tar.gz

VCPKG_DIR
    ports
        alembic-hdf
            CONTROL
            portfile.cmake
```

ができた。
簡単なCONTROLから。
こっちはパッケージ情報を決めるだけなのでさくっと。

```shell
Source: alembic-hdf
Version: 1.7.1
Description: alembic with hdf5
Build-Depends: hdf5
```

本題のportfile.cmake。
そのままだとエラーになるの。最低限以下が必要なようだ。
アーカイブを展開パスの指定。

```cmake
set(SOURCE_PATH ${CURRENT_BUILDTREES_DIR}/src/1.7.1)

# ↓ 修正する

set(SOURCE_PATH ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1)
```

実行してみる。

```shell
> ./vcpkg install alembic-hdf:x64-windows
The following packages will be built and installed:
    alembic-hdf:x64-windows
Building package alembic-hdf:x64-windows...
-- CURRENT_INSTALLED_DIR=D:/vcpkg/installed/x64-windows
-- DOWNLOADS=D:/vcpkg/downloads
-- CURRENT_PACKAGES_DIR=D:/vcpkg/packages/alembic-hdf_x64-windows
-- CURRENT_BUILDTREES_DIR=D:/vcpkg/buildtrees/alembic-hdf
-- CURRENT_PORT_DIR=D:/vcpkg/ports/alembic-hdf/.
-- Using cached D:/vcpkg/downloads/1.7.1.tar.gz
-- Testing integrity of cached file...
-- Testing integrity of cached file... OK
-- Extracting done
-- Configuring x64-windows-rel
-- Configuring x64-windows-rel done
-- Configuring x64-windows-dbg
PS D:\vcpkg> .\vcpkg.exe install alembic-hdf:x64-windows
The following packages will be built and installed:
    alembic-hdf:x64-windows
Building package alembic-hdf:x64-windows...
-- CURRENT_INSTALLED_DIR=D:/vcpkg/installed/x64-windows
-- DOWNLOADS=D:/vcpkg/downloads
-- CURRENT_PACKAGES_DIR=D:/vcpkg/packages/alembic-hdf_x64-windows
-- CURRENT_BUILDTREES_DIR=D:/vcpkg/buildtrees/alembic-hdf
-- CURRENT_PORT_DIR=D:/vcpkg/ports/alembic-hdf/.
-- Using cached D:/vcpkg/downloads/1.7.1.tar.gz
-- Testing integrity of cached file...
-- Testing integrity of cached file... OK
-- Extracting done
-- Configuring x64-windows-rel
-- Configuring x64-windows-rel done
-- Configuring x64-windows-dbg
-- Configuring x64-windows-dbg done
-- Package x64-windows-rel
-- Package x64-windows-rel done
-- Package x64-windows-dbg
-- Package x64-windows-dbg done
-- Performing post-build validation
Include files should not be duplicated into the /debug/include directory. If this cannot be disabled in the project cmake, use
    file(REMOVE_RECURSE ${CURRENT_PACKAGES_DIR}/debug/include)
The /lib/cmake folder should be merged with /debug/lib/cmake and moved to /share/alembic-hdf/cmake.
The following cmake files were found outside /share/alembic-hdf. Please place cmake files in /share/alembic-hdf.

    D:/vcpkg/packages/alembic-hdf_x64-windows/lib/cmake/Alembic/AlembicConfig.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/lib/cmake/Alembic/AlembicConfigVersion.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/lib/cmake/Alembic/AlembicTargets-release.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/lib/cmake/Alembic/AlembicTargets.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/lib/cmake/Alembic/AlembicConfig.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/lib/cmake/Alembic/AlembicConfigVersion.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/lib/cmake/Alembic/AlembicTargets-debug.cmake
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/lib/cmake/Alembic/AlembicTargets.cmake

The /debug/lib/cmake folder should be merged with /lib/cmake into /share/alembic-hdf

The following dlls were found in /lib or /debug/lib. Please move them to /bin or /debug/bin, respectively.

    D:/vcpkg/packages/alembic-hdf_x64-windows/lib/Alembic.dll


The following dlls were found in /lib or /debug/lib. Please move them to /bin or /debug/bin, respectively.

    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/lib/Alembic.dll

The software license must be available at ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/copyright

    file(COPY ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1/LICENSE.txt DESTINATION ${CURRENT_PACKAGES_DIR}/share/alembic-hdf)
    file(RENAME ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/LICENSE.txt ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/copyright)
The following EXEs were found in /bin or /debug/bin. EXEs are not valid distribution targets.

    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abcdiff.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abcecho.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abcechobounds.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abcls.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abcstitcher.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/bin/abctree.exe

The following EXEs were found in /bin or /debug/bin. EXEs are not valid distribution targets.

    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abcdiff.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abcecho.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abcechobounds.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abcls.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abcstitcher.exe
    D:/vcpkg/packages/alembic-hdf_x64-windows/debug/bin/abctree.exe

Found 9 error(s). Please correct the portfile:
    D:\vcpkg\ports\alembic-hdf\portfile.cmake
-- Performing post-build validation done
Error: Building package alembic-hdf:x64-windows failed with: POST_BUILD_CHECKS_FAILED
Please ensure you're using the latest portfiles with `.\vcpkg update`, then
submit an issue at https://github.com/Microsoft/vcpkg/issues including:
  Package: alembic-hdf:x64-windows
  Vcpkg version: 0.0.81-144d3718c4197b101c7d61ee6a258200371fb1ab

Additionally, attach any relevant sections from the log files above.
```

という感じになった。
エラーメッセージがすごく親切。
あと、NINJAビルド速い。
エラーにはなるがビルド結果は以下のように出力された。

```shell
VCPKG_DIR/packages/alembic-hdf_x64-windows
│  BUILD_INFO
│
├─bin
│      abcdiff.exe
│      abcecho.exe
│      abcechobounds.exe
│      abcls.exe
│      abcstitcher.exe
│      abctree.exe
│
├─debug
│  ├─bin
│  │      abcdiff.exe
│  │      abcecho.exe
│  │      abcechobounds.exe
│  │      abcls.exe
│  │      abcstitcher.exe
│  │      abctree.exe
│  │
│  ├─include
│  │  └─Alembic
│  │      ├─Abc
│  │      │      *.h
│  │      │
│  │      ├─AbcCollection
│  │      │      *.h
│  │      │
│  │      ├─AbcCoreAbstract
│  │      │      *.h
│  │      │
│  │      ├─AbcCoreFactory
│  │      │      *.h
│  │      │
│  │      ├─AbcCoreLayer
│  │      │      *.h
│  │      │
│  │      ├─AbcCoreOgawa
│  │      │      *.h
│  │      │
│  │      ├─AbcGeom
│  │      │      *.h
│  │      │
│  │      ├─AbcMaterial
│  │      │      *.h
│  │      │
│  │      └─Util
│  │              *.h
│  │
│  └─lib
│      │  Alembic.dll
│      │  Alembic.lib
│      │
│      └─cmake
│          └─Alembic
│                  AlembicConfig.cmake
│                  AlembicConfigVersion.cmake
│                  AlembicTargets-debug.cmake
│                  AlembicTargets.cmake
│
├─include
│  └─Alembic
│      ├─Abc
│      │      *.h
│      │
│      ├─AbcCollection
│      │      *.h
│      │
│      ├─AbcCoreAbstract
│      │      *.h
│      │
│      ├─AbcCoreFactory
│      │      *.h
│      │
│      ├─AbcCoreLayer
│      │      *.h
│      │
│      ├─AbcCoreOgawa
│      │      *.h
│      │
│      ├─AbcGeom
│      │      *.h
│      │
│      ├─AbcMaterial
│      │      *.h
│      │
│      └─Util
│              *.h
│
└─lib
    │  Alembic.dll
    │  Alembic.lib
    │
    └─cmake
        └─Alembic
                AlembicConfig.cmake
                AlembicConfigVersion.cmake
                AlembicTargets-release.cmake
                AlembicTargets.cmake
```

ここから不要なものを削除したり、場所の違うものを移動したりすることで完成できそう。
エラーメッセージに沿って修正してみる

`debug/include` 不要

エラーメッセージに含まれるとおりに。

```cmake
file(REMOVE_RECURSE ${CURRENT_PACKAGES_DIR}/debug/include)

lib/cmake/Alembic/*.cmakeをshare/alembic-hdfに移動するべし
debug/lib/cmake/Alembicを統合するべし。
vcpkg_fixup_cmake_targets(CONFIG_PATH "lib/cmake/Alembic")
```

ぽい。 `alembic/portfile.cmake` を参考にした

```cmake
lib/Alembic.dllをbin/Alembic.dllに移動せよ
debug/lib/Alembic.dllも。
file(RENAME ${CURRENT_PACKAGES_DIR}/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/bin/Alembic.dll)
file(RENAME ${CURRENT_PACKAGES_DIR}/debug/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/debug/bin/Alembic.dll)
```

`alembic/portfile.cmake` を参考にした

ライセンスファイルをコピーせよ
エラーメッセージに含まれるとおりに。

```cmake
file(COPY ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1/LICENSE.txt DESTINATION ${CURRENT_PACKAGES_DIR}/share/alembic-hdf)
file(RENAME ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/LICENSE.txt ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/copyright)
```

exeを削除せよ

```cmake
file(GLOB EXE ${CURRENT_PACKAGES_DIR}/bin/*.exe)
file(GLOB DEBUG_EXE ${CURRENT_PACKAGES_DIR}/debug/bin/*.exe)
file(REMOVE ${EXE})
file(REMOVE ${DEBUG_EXE})
```

alembic/portfile.cmakeを参考にした
おまけ: debug用にpdbをコピー
alembic/portfile.cmakeを参考にした
vcpkg_copy_pdbs()

vcpkg_install_cmakeより下を抜粋。

```cmake
vcpkg_install_cmake()

# Remove debug/include
file(REMOVE_RECURSE ${CURRENT_PACKAGES_DIR}/debug/include)
# fix *.cmake
vcpkg_fixup_cmake_targets(CONFIG_PATH "lib/cmake/Alembic")
# Rename dll
file(RENAME ${CURRENT_PACKAGES_DIR}/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/bin/Alembic.dll)
file(RENAME ${CURRENT_PACKAGES_DIR}/debug/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/debug/bin/Alembic.dll)
# Handle copyright
file(COPY ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1/LICENSE.txt DESTINATION ${CURRENT_PACKAGES_DIR}/share/alembic-hdf)
file(RENAME ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/LICENSE.txt ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/copyright)
# Remove exe files
file(GLOB EXE ${CURRENT_PACKAGES_DIR}/bin/*.exe)
file(GLOB DEBUG_EXE ${CURRENT_PACKAGES_DIR}/debug/bin/*.exe)
file(REMOVE ${EXE})
file(REMOVE ${DEBUG_EXE})
# Copy pdb
vcpkg_copy_pdbs()
```

再度ビルド。

`> vcpkg install alembic-hdf:x64-windows`

うまくいった。
USE_HDF5を有効にする
portfileの修正
CONTROLに依存追加。
Build-Depends: ilmbase, hdf5

USE_HDF5を有効に。

```cmake
vcpkg_configure_cmake(
    SOURCE_PATH ${SOURCE_PATH}
    PREFER_NINJA # Disable this option if project cannot be built with Ninja
    OPTIONS -DUSE_HDF5=ON
    # OPTIONS_RELEASE -DOPTIMIZE=1
    # OPTIONS_DEBUG -DDEBUGGABLE=1
)
```

ビルドあんどエラー
ビルドしてみるがエラーになる。

`VCPKG_DIR\buildtrees\alembic-hdf\package-x64-windows-rel-out.log` を見て原因を探る。

hdf5に対するlinkが無くて、hdf5関連のシンボルが見つからん。
パッチ
alembic-1.7.1/lib/Alembic/CMakeLists.txtを修正したいのでやり方を調べる。
パッチの当て方

portfile.cmakeに記述する。

```cmake
vcpkg_extract_source_archiveよりあと、vcpkg_install_cmakeより前。
vcpkg_apply_patches(
    SOURCE_PATH ${SOURCE_PATH}
    PATCHES ${CMAKE_CURRENT_LIST_DIR}/fix-hdf5link.patch
)
```

パッチの作り方

https://github.com/Microsoft/vcpkg/blob/master/docs/examples/patching-libpng.md#patching-the-code-to-improve-compatibility

なるほど。
gitを準備して・・・

```shell
vcpkg> cd ./buildtrees/alembic-hdf/src/alembic-1.7.1/
vcpkg/buildtrees/alembic-hdf/src/alembic-1.7.1> git init
vcpkg/buildtrees/alembic-hdf/src/alembic-1.7.1> git add .
vcpkg/buildtrees/alembic-hdf/src/alembic-1.7.1> git commit -m "temp"
```

修正
alembic-1.7.1/lib/Alembic/CMakeLists.txtを修正。

```diff
> git diff
--git a/lib/Alembic/CMakeLists.txt b/lib/Alembic/CMakeLists.txt
index 5028c91..1f81d50 100644
--- a/lib/Alembic/CMakeLists.txt
+++ b/lib/Alembic/CMakeLists.txt
@@ -49,6 +49,12 @@ ADD_SUBDIRECTORY(AbcMaterial)
 ADD_SUBDIRECTORY(Ogawa)

 ADD_LIBRARY(Alembic ${LIB_TYPE} ${CXX_FILES})
+IF (USE_HDF5)
+    TARGET_LINK_LIBRARIES(Alembic
+        ${HDF5_LIBRARIES}
+        )
+    ADD_DEFINITIONS(-DH5_BUILT_AS_DYNAMIC_LIB)
+ENDIF()

 TARGET_INCLUDE_DIRECTORIES(Alembic
     PUBLIC
```

gitでpatchを作成

`> git diff | out-file -enc ascii ..\..\..\..\ports\alembic-hdf\fix-hdf5link.patch`

ビルド

```shell
> .\vcpkg.exe install alembic-hdf:x64-windows
Installing package alembic-hdf:x64-windows... done
```

VCPKG_DIR/installed/x64-windows/bin/Alembic.dllをdependencywalkerで見てみるとばっちりhdf5.dllへのリンクが含まれている。作業完了。
はじめてで調べながらでもわりとさくさく作業が進んだ。エラーメッセージの出し方とか、フォルダの構成とかvcpkgなかなかレベルが高いな。

```shell
ports
ports/alembic-hdf/CONTROL
Source: alembic-hdf
Version: 1.7.1
Description: alembic with hdf5
Build-Depends: ilmbase, hdf5
```

```ports/alembic-hdf/portfile.cmake
# Common Ambient Variables:
#   CURRENT_BUILDTREES_DIR    = ${VCPKG_ROOT_DIR}\buildtrees\${PORT}
#   CURRENT_PACKAGES_DIR      = ${VCPKG_ROOT_DIR}\packages\${PORT}_${TARGET_TRIPLET}
#   CURRENT_PORT_DIR          = ${VCPKG_ROOT_DIR}\ports\${PORT}
#   PORT                      = current port name (zlib, etc)
#   TARGET_TRIPLET            = current triplet (x86-windows, x64-windows-static, etc)
#   VCPKG_CRT_LINKAGE         = C runtime linkage type (static, dynamic)
#   VCPKG_LIBRARY_LINKAGE     = target library linkage type (static, dynamic)
#   VCPKG_ROOT_DIR            = <C:\path\to\current\vcpkg>
#   VCPKG_TARGET_ARCHITECTURE = target architecture (x64, x86, arm)
#

include(vcpkg_common_functions)
set(SOURCE_PATH ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1)
vcpkg_download_distfile(ARCHIVE
    URLS "https://github.com/alembic/alembic/archive/1.7.1.tar.gz"
    FILENAME "1.7.1.tar.gz"
    SHA512 89e30b681a76eaf79b20ebeff62c495971b0eb64b28f249a14bbcf3bdb40df7eda93b0ede299dd5511bd4587a2cc2d4ebd851fb89bf999fdccc31fee3cffbba2
)
vcpkg_extract_source_archive(${ARCHIVE})

vcpkg_apply_patches(
    SOURCE_PATH ${SOURCE_PATH}
    PATCHES ${CMAKE_CURRENT_LIST_DIR}/fix-hdf5link.patch
)

vcpkg_configure_cmake(
    SOURCE_PATH ${SOURCE_PATH}
    PREFER_NINJA # Disable this option if project cannot be built with Ninja
    OPTIONS -DUSE_HDF5=ON
    # OPTIONS_RELEASE -DOPTIMIZE=1
    # OPTIONS_DEBUG -DDEBUGGABLE=1
)

vcpkg_install_cmake()

# Remove debug/include
file(REMOVE_RECURSE ${CURRENT_PACKAGES_DIR}/debug/include)
# fix *.cmake
vcpkg_fixup_cmake_targets(CONFIG_PATH "lib/cmake/Alembic")
# Rename dll
file(RENAME ${CURRENT_PACKAGES_DIR}/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/bin/Alembic.dll)
file(RENAME ${CURRENT_PACKAGES_DIR}/debug/lib/Alembic.dll ${CURRENT_PACKAGES_DIR}/debug/bin/Alembic.dll)
# Handle copyright
file(COPY ${CURRENT_BUILDTREES_DIR}/src/alembic-1.7.1/LICENSE.txt DESTINATION ${CURRENT_PACKAGES_DIR}/share/alembic-hdf)
file(RENAME ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/LICENSE.txt ${CURRENT_PACKAGES_DIR}/share/alembic-hdf/copyright)
# Remove exe files
file(GLOB EXE ${CURRENT_PACKAGES_DIR}/bin/*.exe)
file(GLOB DEBUG_EXE ${CURRENT_PACKAGES_DIR}/debug/bin/*.exe)
file(REMOVE ${EXE})
file(REMOVE ${DEBUG_EXE})
# Copy pdb
vcpkg_copy_pdbs()
```

```ports/alembic-hdf/fix-hdf5link.patch
diff --git a/lib/Alembic/CMakeLists.txt b/lib/Alembic/CMakeLists.txt
index 5028c91..1f81d50 100644
--- a/lib/Alembic/CMakeLists.txt
+++ b/lib/Alembic/CMakeLists.txt
@@ -49,6 +49,12 @@ ADD_SUBDIRECTORY(AbcMaterial)
 ADD_SUBDIRECTORY(Ogawa)
 
 ADD_LIBRARY(Alembic ${LIB_TYPE} ${CXX_FILES})
+IF (USE_HDF5)
+    TARGET_LINK_LIBRARIES(Alembic 
+        ${HDF5_LIBRARIES}
+        )
+    ADD_DEFINITIONS(-DH5_BUILT_AS_DYNAMIC_LIB)
+ENDIF()
 
 TARGET_INCLUDE_DIRECTORIES(Alembic
     PUBLIC
```

vcpkgにPR送った
採用されたので上記の作業は必要なくなったのが、cmake-3.9.0の更新でFindHDF5が壊れるという事態が発生したので対応中…。
