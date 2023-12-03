---
title: "vcpkgのOpenSubdivパッケージを作ってみる"
date: 2017-08-31
tags: ['vcpkg', 'usd']
---

CEDEC2017のセッションを聞いてUSDビルドする気が戻ってきた。部品のひとつ、OpenSubdivのvcpkg版ビルドに取り組んでみる。

packageを作る
POWERSHELLを開いてvcpkgディレクトリに移動。

```shell
PS> .\vcpkg.exe create opensubdiv https://github.com/PixarAnimationStudios/OpenSubdiv/archive/v3_3_0.tar.gz
-- Generated portfile: vcpkg\ports\opensubdiv\portfile.cmake
-- Generated CONTROL: vcpkg\ports\opensubdiv\CONTROL
-- To launch an editor for these new files, run
--     .\vcpkg edit opensubdiv

ports/opensubdiv/CONTROL
Source: opensubdiv
Version: 3.3.0
Description: An Open-Source subdivision surface library.
Build-Depends: tbb, glew, ptex
```

`ports/opensubdiv/portfile.cmake`

最低限、展開するアーカイブのパスを指定。

`set(SOURCE_PATH ${CURRENT_BUILDTREES_DIR}/src/OpenSubdiv-3_3_0)`

ビルドしてみる
さすがにエラーになる。vcpkg の `buildtree/opensubdiv` に潜ってビルド手順を調べてみる。
手動ビルド
OpenSubdivのビルドシステムはCMakeだった。
早速、CmakeGUIでやってみる。
`CMAKE_INSTALL_PREFIX=VCPKG_DIR/installed/x64-windows` だけ設定して様子を見る。

CUDAとかOpenCLとかそっち方面の依存がある様子。
NO_CUDAとNO_OPENCLにチェックを入れてみる。
あとNO_DOCも。
SolutionをGenerateしてビルドしてみる。
Debug版だけtbb_debug.libが見つからないエラーが出た。
DEBUG版のFIND_PACKAGEの修正

```cmake
OpenSubdiv-3_3_0/cmake/FindTBB.cmake
    find_library(TBB_${TBB_LIB}_LIBRARY
        NAMES
            ${TBB_LIB}
        HINTS
            "${TBB_LOCATION}/lib"
            "${TBB_LOCATION}/bin"
            "$ENV{TBB_LOCATION}/lib"
            "$ENV{TBB_LOCATION}/bin"
            "$ENV{PROGRAMFILES}/TBB/lib"
            /usr/lib
            /usr/lib/w32api
            /usr/local/lib
            /usr/X11R6/lib
        PATH_SUFFIXES
            "${TBB_LIB_ARCH}"
            "${TBB_LIB_ARCH}/${TBB_COMPILER}"
            "${TBB_LIB_ARCH}/gcc4.4"
            "${TBB_LIB_ARCH}/gcc4.1"
        DOC "Intel's Threading Building Blocks library")
```

vcpkgでは、`VCPKG_DIR/installed/x64-windows/debug/lib/tbb_debug.lib` にあるので見つかりませんね。
`TBB_LOCATION=VCPKG_DIR/installed/x64-windows/debug` を指定したらうまくいった。

portfile.cmakeに反映
ports/opensubdiv/portfile.cmake
こうなった。

```cmake
vcpkg_configure_cmake(
    SOURCE_PATH ${SOURCE_PATH}
    #PREFER_NINJA # Disable this option if project cannot be built with Ninja
    OPTIONS
        #-DNO_LIB=1
        -DNO_CUDA=1
        -DNO_DOC=1
        -DNO_OPENCL=1
        -DNO_OPENGL=1
        -DNO_METAL=1
        -DNO_DX=1
        #-DNO_OMP=1
        -DNO_TESTS=1
        -DNO_EXAMPLES=1
        -DNO_TUTORIALS=1
        -DNO_REGRESSION=1
        -DNO_GLTESTS=1
        # for tbb_debug.lib
        -DTBB_LOCATION=${CURRENT_INSTALLED_DIR}/debug
    # OPTIONS_RELEASE -DOPTIMIZE=1
    # OPTIONS_DEBUG -DDEBUGGABLE=1
)
```

package
VCPKG_DIR/packages/opensubdiv_x86-windows
packageの調整
エラーメッセージの指示に従って。

```ports/opensubdiv/portfile.cmake
vcpkg_install_cmake()
vcpkg_copy_pdbs()

file(REMOVE_RECURSE ${CURRENT_PACKAGES_DIR}/debug/include)

# Handle copyright
file(COPY ${CURRENT_BUILDTREES_DIR}/src/OpenSubdiv-3_3_0/LICENSE.txt DESTINATION ${CURRENT_PACKAGES_DIR}/share/opensubdiv)
file(RENAME ${CURRENT_PACKAGES_DIR}/share/opensubdiv/LICENSE.txt ${CURRENT_PACKAGES_DIR}/share/opensubdiv/copyright)
```

以下のようになった。

```shell
+---debug
|   \---lib
|           osdCPU.lib
|
+---include
|   \---opensubdiv
|       |   version.h
|       |
|       +---far
|       |       error.h
|       |       patchDescriptor.h
|       |       patchMap.h
|       |       patchParam.h
|       |       patchTable.h
|       |       patchTableFactory.h
|       |       primvarRefiner.h
|       |       ptexIndices.h
|       |       stencilTable.h
|       |       stencilTableFactory.h
|       |       topologyDescriptor.h
|       |       topologyLevel.h
|       |       topologyRefiner.h
|       |       topologyRefinerFactory.h
|       |       types.h
|       |
|       +---hbr
|       |       allocator.h
|       |       bilinear.h
|       |       catmark.h
|       |       cornerEdit.h
|       |       creaseEdit.h
|       |       face.h
|       |       faceEdit.h
|       |       fvarData.h
|       |       fvarEdit.h
|       |       halfedge.h
|       |       hierarchicalEdit.h
|       |       holeEdit.h
|       |       loop.h
|       |       mesh.h
|       |       subdivision.h
|       |       vertex.h
|       |       vertexEdit.h
|       |
|       +---osd
|       |       bufferDescriptor.h
|       |       cpuEvaluator.h
|       |       cpuPatchTable.h
|       |       cpuVertexBuffer.h
|       |       mesh.h
|       |       nonCopyable.h
|       |       ompEvaluator.h
|       |       ompKernel.h
|       |       opengl.h
|       |       tbbEvaluator.h
|       |       tbbKernel.h
|       |       types.h
|       |
|       +---sdc
|       |       bilinearScheme.h
|       |       catmarkScheme.h
|       |       crease.h
|       |       loopScheme.h
|       |       options.h
|       |       scheme.h
|       |       types.h
|       |
|       \---vtr
|               array.h
|               componentInterfaces.h
|               fvarLevel.h
|               fvarRefinement.h
|               level.h
|               refinement.h
|               sparseSelector.h
|               stackBuffer.h
|               types.h
|
+---lib
|       osdCPU.lib
|
\---share
    \---opensubdiv
            copyright
```

OpenSubdivにはdllのビルドは無いみたい。ライブラリ構成もtemplate classを主体とするもののようだ。
