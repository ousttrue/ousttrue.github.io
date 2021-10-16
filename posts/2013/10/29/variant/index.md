---
title: "wafでdebugとreleaseの設定を記述する(variant)"
date: 2013-10-29
taxonomies: {tags: []}
---

wafでdebugとreleaseの設定を記述する(variant)
wafでdebug版とrelease版の出力を分けるにはvariantなる機能を使う。
+hello
  +hello.cpp
  +waf
  +wscript

と前回と同様のプロジェクト。 wscriptを以下のように記述する。
# coding: utf-8

APPNAME='hello'
VERSION='1.0.0'


def configure(conf):
    # config 'debug'を作る
    conf.setenv('debug')
    # debugの設定
    conf.env['MSVC_TARGETS'] = ['x86']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']
    # PDBやNDEBUG等の設定をきっちり書く必要がある

    # config 'release'を作る。debugの設定は引き継がない
    conf.setenv('release')
    # releaseの設定
    conf.env['MSVC_TARGETS'] = ['x86']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']


# BuildContextの設定
def build(bld):
    bld.program(
            source='hello.cpp',
            target=APPNAME
            )


from waflib.Build import BuildContext

# BuildContextを使うコマンド
class BuildDebug(BuildContext):
    # config 'debug' を使うvariant
    # 出力ディレクトリがbuild/debugに変わる
    variant = "debug"
    # 呼び出しコマンドはbuild_debug
    cmd = "build_debug"

# BuildContextを使うコマンド
class BuildRelease(BuildContext):
    # config 'release' を使うvariant
    # 出力ディレクトリがbuild/releaseに変わる
    variant = "release"
    # 呼び出しコマンドはbuild_release
    cmd = "build_release"

variantという概念を使う。
http://docs.waf.googlecode.com/git/book_17/single.html の 6.2.2.
Changing the output directory Configuration sets for variants
に記述がある。
使う
> python waf --help
waf [commands] [options]

Main commands (example: ./waf build -j4)
  build        : executes the build
  build_debug  :
  build_release:
:
:
省略

という感じでbuild_debug, build_releaseが増える。
> python waf build_debug
Waf: Entering directory `C:\work\_waf\debug_release\build\debug'
[1/2] cxx: hello.cpp -> build\debug\hello.cpp.1.o
hello.cpp
[2/2] cxxprogram: build\debug\hello.cpp.1.o -> build\debug\hello.exe build\debug\hello.exe.manifest
Waf: Leaving directory `C:\work\_waf\debug_release\build\debug'
'build_debug' finished successfully (0.487s)

素のビルドはエラーになった。たぶん対象になる名無しのconfigが存在しないため。
> python waf build
Waf: Entering directory `C:\work\_waf\debug_release\build'
[1/2] cxx: hello.cpp -> build\hello.cpp.1.o
Waf: Leaving directory `C:\work\_waf\debug_release\build'
Build failed
:
:
省略

ということで素のビルドの時にメッセージを表示して止めるようにする。
buildメソッドの先頭にwaf book通りの記述を入れる。
# BuildContextの設定
def build(bld):
    if not bld.variant:
         bld.fatal('call "waf build_debug" or "waf build_release", and try "waf --help"')
    bld.program(
            source='hello.cpp',
            target=APPNAME
            )

> python waf build
Waf: Entering directory `C:\work\_waf\debug_release\build'
call "waf build_debug" or "waf build_release", and try "waf --help"
> python waf clean
call "waf build_debug" or "waf build_release", and try "waf --help"

build以外にもbuildメソッド(BuildContext)を使うコマンドがあって、
http://docs.waf.googlecode.com/git/book_17/single.html の 12.1.2.
Context classes のクラス図によると ListContext, CleanContext,
StepContext, InstallContext, UninstallContext
がBuildContextを継承しているのでこれに対応するコマンド
それぞれにdebug版、release版を定義してやる必要がある。
waf bookに書いてあるようにコマンドclassの記述を変える。
from waflib.Build import BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext

CONTEXTS=[BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext]
VARIANTS=['debug', 'release']

for context in CONTEXTS:
    for variant_name in VARIANTS:
        name = context.__name__.replace('Context','').lower()
        class tmp(context):
            cmd = name + '_' + variant_name
            variant = variant_name

helpを見ると大量に定義したコマンドが増える。
> python waf --help
waf [commands] [options]

Main commands (example: ./waf build -j4)
  build            : executes the build
  build_debug      :
  build_release    :
  clean            : cleans the project
  clean_debug      :
  clean_release    :
  configure        : configures the project
  dist             : makes a tarball for redistributing the sources
  distcheck        : checks if the project compiles (tarball from 'dist')
  distclean        : removes the build directory
  install          : installs the targets on the system
  install_debug    :
  install_release  :
  list             : lists the targets to execute
  list_debug       :
  list_release     :
  step             : executes tasks in a step-by-step fashion, for debugging
  step_debug       :
  step_release     :
  uninstall        : removes the targets installed
  uninstall_debug  :
  uninstall_release:
  update           : updates the plugins from the *waflib/extras* directory
:
:
省略

> python waf clean_debug build_debug
'clean_debug' finished successfully (0.087s)
Waf: Entering directory `C:\work\_waf\debug_release\build\debug'
[1/2] cxx: hello.cpp -> build\debug\hello.cpp.1.o
hello.cpp
[2/2] cxxprogram: build\debug\hello.cpp.1.o -> build\debug\hello.exe build\debug\hello.exe.manifest
Waf: Leaving directory `C:\work\_waf\debug_release\build\debug'
'build_debug' finished successfully (0.451s)

これでdebug, releaseの使い分けはできるようになった。
variantを追加する
64bitビルドや、gccのvariantを追加してみた。
# coding: utf-8

APPNAME='hello'
VERSION='1.0.0'

VARIANTS=[
'vc_debug', 'vc_release', 'vc64_debug', 'vc64_release',
'gcc_debug', 'gcc_release',
]

def configure(conf):
    # config 'debug'を作る
    conf.setenv('debug')
    # debugの設定
    conf.env['MSVC_VERSIONS'] = ['msvc 10.0']
    conf.env['MSVC_TARGETS'] = ['x86']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']
    # PDBやNDEBUG等の設定をきっちり書く必要がある

    # config 'release'を作る。debugの設定は引き継がない
    conf.setenv('release')
    # releaseの設定
    conf.env['MSVC_VERSIONS'] = ['msvc 10.0']
    conf.env['MSVC_TARGETS'] = ['x86']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']

    # config 'debug'を作る
    conf.setenv('vc64_debug')
    # debugの設定
    conf.env['MSVC_VERSIONS'] = ['msvc 10.0']
    conf.env['MSVC_TARGETS'] = ['x64']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']
    # PDBやNDEBUG等の設定をきっちり書く必要がある

    # config 'release'を作る。debugの設定は引き継がない
    conf.setenv('vc64_release')
    # releaseの設定
    conf.env['MSVC_VERSIONS'] = ['msvc 10.0']
    conf.env['MSVC_TARGETS'] = ['x64']
    conf.load('msvc')
    conf.env.CXXFLAGS = ['/nologo', '/EHsc']

    # config 'debug'を作る
    conf.setenv('gcc_debug')
    # debugの設定
    conf.load('gxx')
    conf.env.CXXFLAGS = ['-g']
    conf.env.LINKFLAGS = ['-g']

    # config 'release'を作る。debugの設定は引き継がない
    conf.setenv('gcc_release')
    # releaseの設定
    conf.load('gxx')
    conf.env.CXXFLAGS = ['-O2']


# BuildContextの設定
def build(bld):
    if not bld.variant:
         bld.fatal('call "waf build_debug" or "waf build_release", and try "waf --help"')
    bld.program(
            source='hello.cpp',
            target=APPNAME
            )

from waflib.Build import BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext

CONTEXTS=[BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext]

for context in CONTEXTS:
    for variant_name in VARIANTS:
        name = context.__name__.replace('Context','').lower()
        class tmp(context):
            cmd = name + '_' + variant_name
            variant = variant_name

