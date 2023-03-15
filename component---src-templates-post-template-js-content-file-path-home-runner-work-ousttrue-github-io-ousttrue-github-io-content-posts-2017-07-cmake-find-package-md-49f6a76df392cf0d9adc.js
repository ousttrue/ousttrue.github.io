"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5153],{6695:function(n,e,t){t.r(e),t.d(e,{default:function(){return r}});var l=t(1151),i=t(7294);function L(n){const e=Object.assign({pre:"pre",code:"code"},(0,l.ah)(),n.components);return i.createElement(e.pre,null,i.createElement(e.code,null,"cmake の FIND_PACKAGE わかりずらいよ。もやもやするものがある。\n\nGLUT の例\n検証用に小さい例を作ってみた。\n\nhttps://stackoverflow.com/questions/9460242/how-to-compile-glut-opengl-project-with-cmake-and-kdevelop-in-linux\n\nこれを参考にしたのだけどちょっと手直しした。\n\nADD_EXECUTABLE の前に INCLUDE_DIRECTORIES する必要がある\nOPENGL_INCLUDE_DIRS じゃなくて OPENGL_INCLUDE_DIR\nGLUT_INCLUDE_DIRS じゃなくて GLUT_INCLUDE_DIR\n\nLinux とかだと distribution が cmake ファイルを管理してたりするかもしれん。\nmain.cpp\n\ncpp\n#include <GL/glut.h>\n\nvoid display(void)\n{\n}\n\nint main(int argc, char *argv[])\n{\n    glutInit(&argc, argv);\n    glutCreateWindow(argv[0]);\n    glutDisplayFunc(display);\n    glutMainLoop();\n    return 0;\n}\n\n\ncmake\nCMakeLists.txt\nCMAKE_MINIMUM_REQUIRED(VERSION 2.8)\nPROJECT(hello)\n\nFIND_PACKAGE(OpenGL REQUIRED)\nMESSAGE(STATUS ${OPENGL_LIBRARIES})\nMESSAGE(STATUS ${OPENGL_INCLUDE_DIR})\n\nFIND_PACKAGE(GLUT REQUIRED)\nMESSAGE(STATUS ${GLUT_LIBRARY})\nMESSAGE(STATUS ${GLUT_INCLUDE_DIR})\n\nINCLUDE_DIRECTORIES(\n    ${OPENGL_INCLUDE_DIR}\n    ${GLUT_INCLUDE_DIR}\n    )\nADD_DEFINITIONS(\n    -DFREEGLUT_LIB_PRAGMAS=0 # avoid pragma\n    )\nADD_EXECUTABLE(hello\n    main.cpp\n    )\nTARGET_LINK_LIBRARIES(hello\n    ${OPENGL_LIBRARIES}\n    ${GLUT_LIBRARY}\n    )\n\n\n実行時のメッセージ\n\n\n-- glu32opengl32\n--\n-- D:/vcpkg/installed/x64-windows/lib/freeglut.lib\n-- D:/vcpkg/installed/x64-windows/include\n-- Configuring done\n-- Generating done\n\n\nなぜか vcpkg の freeglut を発見してくれた。\nvcpkg が cmake の探索パスを追加しているぽい。レジストリとかか？\nまず、第 1 に\nFIND_PACKAGE の結果として如何なる変数が増えるのかが分からん。\n\nhttps://cmake.org/Wiki/CMake:How_To_Find_Libraries#How_package_finding_works\n\n慣例では、下記のようになっている。\n\n\n_FOUND\n_INCLUDE_DIRS or _INCLUDES\n_LIBRARIES or _LIBRARIES or _LIBS\n_DEFINITIONS\n\n\n強制じゃなくて規約なので各種表記ブレの余地が危険を醸し出している。\n大文字小文字(find_package(glut)に対して${GLUT_FOUND})、複数単数(DIR, DIRS)、短縮(LIBRARIES, LIBS)とか一貫性が。はまりそうだー。\nとりあえあず、標準のパッケージに関してはコマンドから問い合わせることができる。\n\n\n> cmake --help-module OpenGL\n\n\n\nFindOpenGL\n----------\n\nFindModule for OpenGL and GLU.\n\nIMPORTED Targets\n^^^^^^^^^^^^^^^^\n\nThis module defines the ``IMPORTED`` targets:\n\n``OpenGL::GL``\n Defined if the system has OpenGL.\n``OpenGL::GLU``\n Defined if the system has GLU.\n\nResult Variables\n^^^^^^^^^^^^^^^^\n\nThis module sets the following variables:\n\n``OPENGL_FOUND``\n True, if the system has OpenGL.\n``OPENGL_XMESA_FOUND``\n True, if the system has XMESA.\n``OPENGL_GLU_FOUND``\n True, if the system has GLU.\n``OPENGL_INCLUDE_DIR``\n Path to the OpenGL include directory.\n``OPENGL_LIBRARIES``\n Paths to the OpenGL and GLU libraries.\n\nIf you want to use just GL you can use these values:\n\n``OPENGL_gl_LIBRARY``\n Path to the OpenGL library.\n``OPENGL_glu_LIBRARY``\n Path to the GLU library.\n\nOSX Specific\n^^^^^^^^^^^^\n\nOn OSX default to using the framework version of OpenGL. People will\nhave to change the cache values of OPENGL_glu_LIBRARY and\nOPENGL_gl_LIBRARY to use OpenGL with X11 on OSX.\n\n> cmake --help-module GLUT\nFindGLUT\n--------\n\ntry to find glut library and include files.\n\nIMPORTED Targets\n^^^^^^^^^^^^^^^^\n\nThis module defines the ``IMPORTED`` targets:\n\n``GLUT::GLUT``\n Defined if the system has GLUT.\n\nResult Variables\n^^^^^^^^^^^^^^^^\n\nThis module sets the following variables:\n\n::\n\n GLUT_INCLUDE_DIR, where to find GL/glut.h, etc.\n GLUT_LIBRARIES, the libraries to link against\n GLUT_FOUND, If false, do not try to use GLUT.\n\nAlso defined, but not for general use are:\n\n::\n\n GLUT_glut_LIBRARY = the full path to the glut library.\n GLUT_Xmu_LIBRARY  = the full path to the Xmu library.\n GLUT_Xi_LIBRARY   = the full path to the Xi Library.\n\nという感じでcmakeに最初から入っているタイプのモジュールはわかる。\nちなみにFIND_PACKAGEの引数は大文字小文字を区別しないが、結果はただの変数なので区別することに注意。\n${OPENGL_GL_LIBRARY}とかだめですから。\n不安があるときはMESSAGEでプリントデバッグするのが手堅い。\nMESSAGE(STATUS ${OPENGL_gl_LIBRARY})\n\nVisualStudioなのでリンクをDebug, Releaseで振り分けたいんだけど\nlib/freeglut.libとdebug/lib/freeglutd.libとか。\n上の例は問答無用でRelease版にリンクされる(glutの場合は、別にfreeglutのデバッグはしないのでそれはそれでよかったりもするが・・・)。プラグマでリンクすればいいやんとなるのだが、link_directoriesにはDebug, Releaseの振り分けはない。Release決め打ちの方がましである。\nTARGET_LINK_LIBRARIESには振り分け機能が実装されている。\nTARGET_LINK_LIBRARIES(hello\n    debug path_to_freeglutd.lib\n    optimized path_to_freeglut.lib\n    )\n\nという風に記述できる。で、これを如何にしてFIND_PACKAGEと連携させるのか。\n例としてfreeglut.libとfreeglutd.lib。\nFIND_PACKAGE(OpenGL REQUIRED)\nMESSAGE(STATUS ${OPENGL_LIBRARIES})\nFIND_PACKAGE(GLUT)\nMESSAGE(STATUS ${GLUT_LIBRARY})\nSTRING(REPLACE lib/freeglut.lib debug/lib/freeglutd.lib GLUT_LIBRARY_DEBUG ${GLUT_LIBRARY})\nSET(OPENGL_LIBS\n    general ${OPENGL_LIBRARIES}\n    optimized ${GLUT_LIBRARY}\n    debug ${GLUT_LIBRARY_DEBUG}\n    )\nTARGET_LINK_LIBRARIES(hello\n    ${OPENGL_LIBS}\n    )\n\nインストールしたパッケージがFindされないんだけど\nalembicなどvcpkgでインストールしたパッケージをVCPKG_DIR/installed/x64-windowsから探索して欲しいのだが方法がよくわからない。\n\nCMakeを使ってみた (7) find_packageとpkg_check_modulesによるライブラリ探索\n\nあとで\n"))}var a=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,l.ah)(),n.components);return e?i.createElement(e,n,i.createElement(L,n)):L(n)};t(8678);function o(n){let{data:e,children:t}=n;return i.createElement(i.Fragment,null,i.createElement("h1",null,e.mdx.frontmatter.title),i.createElement(l.Zo,null,t))}function r(n){return i.createElement(o,n,i.createElement(a,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return o},ah:function(){return L}});var l=t(7294);const i=l.createContext({});function L(n){const e=l.useContext(i);return l.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const a={};function o({components:n,children:e,disableParentContext:t}){let o;return o=t?"function"==typeof n?n({}):n||a:L(n),l.createElement(i.Provider,{value:o},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-07-cmake-find-package-md-49f6a76df392cf0d9adc.js.map