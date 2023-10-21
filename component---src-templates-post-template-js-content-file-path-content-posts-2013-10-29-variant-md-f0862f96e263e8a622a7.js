"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4329],{9169:function(e,n,l){l.r(n),l.d(n,{default:function(){return m}});var t=l(1151),a=l(7294);function c(e){const n=Object.assign({p:"p",h1:"h1",blockquote:"blockquote",code:"code",strong:"strong",em:"em"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"wafでdebugとreleaseの設定を記述する(variant)\nwafでdebug版とrelease版の出力を分けるにはvariantなる機能を使う。\n+hello\n+hello.cpp\n+waf\n+wscript"),"\n",a.createElement(n.p,null,"と前回と同様のプロジェクト。 wscriptを以下のように記述する。"),"\n",a.createElement(n.h1,null,"coding: utf-8"),"\n",a.createElement(n.p,null,"APPNAME='hello'\nVERSION='1.0.0'"),"\n",a.createElement(n.p,null,"def configure(conf):"),"\n",a.createElement(n.h1,null,"config 'debug'を作る"),"\n",a.createElement(n.p,null,"conf.setenv('debug')"),"\n",a.createElement(n.h1,null,"debugの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_TARGETS'] = ['x86']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"PDBやNDEBUG等の設定をきっちり書く必要がある"),"\n",a.createElement(n.h1,null,"config 'release'を作る。debugの設定は引き継がない"),"\n",a.createElement(n.p,null,"conf.setenv('release')"),"\n",a.createElement(n.h1,null,"releaseの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_TARGETS'] = ['x86']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"BuildContextの設定"),"\n",a.createElement(n.p,null,"def build(bld):\nbld.program(\nsource='hello.cpp',\ntarget=APPNAME\n)"),"\n",a.createElement(n.p,null,"from waflib.Build import BuildContext"),"\n",a.createElement(n.h1,null,"BuildContextを使うコマンド"),"\n",a.createElement(n.p,null,"class BuildDebug(BuildContext):"),"\n",a.createElement(n.h1,null,"config 'debug' を使うvariant"),"\n",a.createElement(n.h1,null,"出力ディレクトリがbuild/debugに変わる"),"\n",a.createElement(n.p,null,'variant = "debug"'),"\n",a.createElement(n.h1,null,"呼び出しコマンドはbuild_debug"),"\n",a.createElement(n.p,null,'cmd = "build_debug"'),"\n",a.createElement(n.h1,null,"BuildContextを使うコマンド"),"\n",a.createElement(n.p,null,"class BuildRelease(BuildContext):"),"\n",a.createElement(n.h1,null,"config 'release' を使うvariant"),"\n",a.createElement(n.h1,null,"出力ディレクトリがbuild/releaseに変わる"),"\n",a.createElement(n.p,null,'variant = "release"'),"\n",a.createElement(n.h1,null,"呼び出しコマンドはbuild_release"),"\n",a.createElement(n.p,null,'cmd = "build_release"'),"\n",a.createElement(n.p,null,"variantという概念を使う。\nhttp://docs.waf.googlecode.com/git/book_17/single.html の 6.2.2.\nChanging the output directory Configuration sets for variants\nに記述がある。\n使う"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"python waf --help\nwaf [commands] [options]"),"\n"),"\n",a.createElement(n.p,null,"Main commands (example: ./waf build -j4)\nbuild        : executes the build\nbuild_debug  :\nbuild_release:\n:\n:\n省略"),"\n",a.createElement(n.p,null,"という感じでbuild_debug, build_releaseが増える。"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"python waf build_debug\nWaf: Entering directory ",a.createElement(n.code,null,"C:\\work\\_waf\\debug_release\\build\\debug' [1/2] cxx: hello.cpp -> build\\debug\\hello.cpp.1.o hello.cpp [2/2] cxxprogram: build\\debug\\hello.cpp.1.o -> build\\debug\\hello.exe build\\debug\\hello.exe.manifest Waf: Leaving directory "),"C:\\work_waf\\debug_release\\build\\debug'\n'build_debug' finished successfully (0.487s)"),"\n"),"\n",a.createElement(n.p,null,"素のビルドはエラーになった。たぶん対象になる名無しのconfigが存在しないため。"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"python waf build\nWaf: Entering directory ",a.createElement(n.code,null,"C:\\work\\_waf\\debug_release\\build' [1/2] cxx: hello.cpp -> build\\hello.cpp.1.o Waf: Leaving directory "),"C:\\work_waf\\debug_release\\build'\nBuild failed\n:\n:\n省略"),"\n"),"\n",a.createElement(n.p,null,"ということで素のビルドの時にメッセージを表示して止めるようにする。\nbuildメソッドの先頭にwaf book通りの記述を入れる。"),"\n",a.createElement(n.h1,null,"BuildContextの設定"),"\n",a.createElement(n.p,null,'def build(bld):\nif not bld.variant:\nbld.fatal(\'call "waf build_debug" or "waf build_release", and try "waf --help"\')\nbld.program(\nsource=\'hello.cpp\',\ntarget=APPNAME\n)'),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,'python waf build\nWaf: Entering directory `C:\\work_waf\\debug_release\\build\'\ncall "waf build_debug" or "waf build_release", and try "waf --help"\npython waf clean\ncall "waf build_debug" or "waf build_release", and try "waf --help"'),"\n"),"\n",a.createElement(n.p,null,"build以外にもbuildメソッド(BuildContext)を使うコマンドがあって、\nhttp://docs.waf.googlecode.com/git/book_17/single.html の 12.1.2.\nContext classes のクラス図によると ListContext, CleanContext,\nStepContext, InstallContext, UninstallContext\nがBuildContextを継承しているのでこれに対応するコマンド\nそれぞれにdebug版、release版を定義してやる必要がある。\nwaf bookに書いてあるようにコマンドclassの記述を変える。\nfrom waflib.Build import BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext"),"\n",a.createElement(n.p,null,"CONTEXTS=[BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext]\nVARIANTS=['debug', 'release']"),"\n",a.createElement(n.p,null,"for context in CONTEXTS:\nfor variant_name in VARIANTS:\nname = context.",a.createElement(n.strong,null,"name"),".replace('Context','').lower()\nclass tmp(context):\ncmd = name + '_' + variant_name\nvariant = variant_name"),"\n",a.createElement(n.p,null,"helpを見ると大量に定義したコマンドが増える。"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"python waf --help\nwaf [commands] [options]"),"\n"),"\n",a.createElement(n.p,null,"Main commands (example: ./waf build -j4)\nbuild            : executes the build\nbuild_debug      :\nbuild_release    :\nclean            : cleans the project\nclean_debug      :\nclean_release    :\nconfigure        : configures the project\ndist             : makes a tarball for redistributing the sources\ndistcheck        : checks if the project compiles (tarball from 'dist')\ndistclean        : removes the build directory\ninstall          : installs the targets on the system\ninstall_debug    :\ninstall_release  :\nlist             : lists the targets to execute\nlist_debug       :\nlist_release     :\nstep             : executes tasks in a step-by-step fashion, for debugging\nstep_debug       :\nstep_release     :\nuninstall        : removes the targets installed\nuninstall_debug  :\nuninstall_release:\nupdate           : updates the plugins from the ",a.createElement(n.em,null,"waflib/extras")," directory\n:\n:\n省略"),"\n",a.createElement(n.blockquote,null,"\n",a.createElement(n.p,null,"python waf clean_debug build_debug\n'clean_debug' finished successfully (0.087s)\nWaf: Entering directory ",a.createElement(n.code,null,"C:\\work\\_waf\\debug_release\\build\\debug' [1/2] cxx: hello.cpp -> build\\debug\\hello.cpp.1.o hello.cpp [2/2] cxxprogram: build\\debug\\hello.cpp.1.o -> build\\debug\\hello.exe build\\debug\\hello.exe.manifest Waf: Leaving directory "),"C:\\work_waf\\debug_release\\build\\debug'\n'build_debug' finished successfully (0.451s)"),"\n"),"\n",a.createElement(n.p,null,"これでdebug, releaseの使い分けはできるようになった。\nvariantを追加する\n64bitビルドや、gccのvariantを追加してみた。"),"\n",a.createElement(n.h1,null,"coding: utf-8"),"\n",a.createElement(n.p,null,"APPNAME='hello'\nVERSION='1.0.0'"),"\n",a.createElement(n.p,null,"VARIANTS=[\n'vc_debug', 'vc_release', 'vc64_debug', 'vc64_release',\n'gcc_debug', 'gcc_release',\n]"),"\n",a.createElement(n.p,null,"def configure(conf):"),"\n",a.createElement(n.h1,null,"config 'debug'を作る"),"\n",a.createElement(n.p,null,"conf.setenv('debug')"),"\n",a.createElement(n.h1,null,"debugの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_VERSIONS'] = ['msvc 10.0']\nconf.env['MSVC_TARGETS'] = ['x86']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"PDBやNDEBUG等の設定をきっちり書く必要がある"),"\n",a.createElement(n.h1,null,"config 'release'を作る。debugの設定は引き継がない"),"\n",a.createElement(n.p,null,"conf.setenv('release')"),"\n",a.createElement(n.h1,null,"releaseの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_VERSIONS'] = ['msvc 10.0']\nconf.env['MSVC_TARGETS'] = ['x86']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"config 'debug'を作る"),"\n",a.createElement(n.p,null,"conf.setenv('vc64_debug')"),"\n",a.createElement(n.h1,null,"debugの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_VERSIONS'] = ['msvc 10.0']\nconf.env['MSVC_TARGETS'] = ['x64']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"PDBやNDEBUG等の設定をきっちり書く必要がある"),"\n",a.createElement(n.h1,null,"config 'release'を作る。debugの設定は引き継がない"),"\n",a.createElement(n.p,null,"conf.setenv('vc64_release')"),"\n",a.createElement(n.h1,null,"releaseの設定"),"\n",a.createElement(n.p,null,"conf.env['MSVC_VERSIONS'] = ['msvc 10.0']\nconf.env['MSVC_TARGETS'] = ['x64']\nconf.load('msvc')\nconf.env.CXXFLAGS = ['/nologo', '/EHsc']"),"\n",a.createElement(n.h1,null,"config 'debug'を作る"),"\n",a.createElement(n.p,null,"conf.setenv('gcc_debug')"),"\n",a.createElement(n.h1,null,"debugの設定"),"\n",a.createElement(n.p,null,"conf.load('gxx')\nconf.env.CXXFLAGS = ['-g']\nconf.env.LINKFLAGS = ['-g']"),"\n",a.createElement(n.h1,null,"config 'release'を作る。debugの設定は引き継がない"),"\n",a.createElement(n.p,null,"conf.setenv('gcc_release')"),"\n",a.createElement(n.h1,null,"releaseの設定"),"\n",a.createElement(n.p,null,"conf.load('gxx')\nconf.env.CXXFLAGS = ['-O2']"),"\n",a.createElement(n.h1,null,"BuildContextの設定"),"\n",a.createElement(n.p,null,'def build(bld):\nif not bld.variant:\nbld.fatal(\'call "waf build_debug" or "waf build_release", and try "waf --help"\')\nbld.program(\nsource=\'hello.cpp\',\ntarget=APPNAME\n)'),"\n",a.createElement(n.p,null,"from waflib.Build import BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext"),"\n",a.createElement(n.p,null,"CONTEXTS=[BuildContext, ListContext, CleanContext, StepContext, InstallContext, UninstallContext]"),"\n",a.createElement(n.p,null,"for context in CONTEXTS:\nfor variant_name in VARIANTS:\nname = context.",a.createElement(n.strong,null,"name"),".replace('Context','').lower()\nclass tmp(context):\ncmd = name + '_' + variant_name\nvariant = variant_name"))}var u=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)},r=l(8678),o=l(4160),d=l(8736);const i={code:e=>{let{children:n,className:l}=e;return l?a.createElement(d.Z,{className:l},n):a.createElement("code",null,n)}};function s(e){let{data:n,children:l}=e;const c=n.mdx.frontmatter;return a.createElement(r.Z,null,a.createElement("h1",null,c.title),a.createElement("div",{className:"tags-index"},c.tags&&c.tags.length>0&&c.tags.map((e=>a.createElement(o.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(t.Zo,{components:i},l))}function m(e){return a.createElement(s,e,a.createElement(u,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2013-10-29-variant-md-f0862f96e263e8a622a7.js.map