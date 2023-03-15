"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9418],{4798:function(n,e,t){t.r(e),t.d(e,{default:function(){return d}});var o=t(1151),l=t(7294);function c(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,o.ah)(),n.components);return l.createElement(l.Fragment,null,l.createElement(e.p,null,"mmdbridge のビルドで必要になった Boost.Python 周り。\nどうやら、OpenEXR 界隈では結構使われている様子。\nAlembic とか USD とか。\nしかし Windows 版の Boost.Python はリンク周りにはまり要素が多いので、記録しといた。"),"\n",l.createElement(e.p,null,"Python へのリンク\npython_d.lib にリンクする必要がない場合\nPython 自体のデバッグをするのでなければ python_d にリンクする必要はない。\npython_d へのリンクの必要性は、リンクするライブラリを Debug で統一する必要の有無なのだけど、\npyd を作っているときは必要ない。python.exe ではなく python_d.exe から実行して何もかもが、Debug を参照するようにするのはつらい。そうではなくて自分のアプリが Python を内臓する場合は、python_d にリンクした方がよい。Debug と Release の混在によるエラーが出る可能性があるので。で、mmdbridge は後者なので python_d をリンクすることに妥当性がある。\npython_d.lib へのリンクを防止する"),"\n",l.createElement(e.p,null,"https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work"),"\n",l.createElement(e.pre,null,l.createElement(e.code,{className:"language-cpp"},"#ifdef _DEBUG\n  #undef _DEBUG\n  #include <Python.h>\n  #define _DEBUG\n#else\n  #include <Python.h>\n#endif\n")),"\n",l.createElement(e.p,null,"これが、常套手段になるようで pyd の開発時には入れておくとよい。\nBoost.Python が python_d にリンクする"),"\n",l.createElement(e.p,null,"boost-1.64.0\npython-3.5.3"),"\n",l.createElement(e.p,null,"debug 版の boost をビルドしたのだが、よく見ると Release 版の python35.dll の方がリンクされていた。がんばって、DEBUG マクロの定義等を調べたのだがなかなかわからなかった。どうやらどこかで undef _DEBUG されているらしいと当たりがついた。"),"\n",l.createElement(e.p,null,"boost/python/detail/wrap_python.hpp"),"\n",l.createElement(e.pre,null,l.createElement(e.code,{className:"language-cpp"},"#ifdef _DEBUG\n# ifndef BOOST_DEBUG_PYTHON\n#  ifdef _MSC_VER\n    // VC8.0 will complain if system headers are #included both with\n    // and without _DEBUG defined, so we have to #include all the\n    // system headers used by pyconfig.h right here.\n#   include <stddef.h>\n#   include <stdarg.h>\n#   include <stdio.h>\n#   include <stdlib.h>\n#   include <assert.h>\n#   include <errno.h>\n#   include <ctype.h>\n#   include <wchar.h>\n#   include <basetsd.h>\n#   include <io.h>\n#   include <limits.h>\n#   include <float.h>\n#   include <string.h>\n#   include <math.h>\n#   include <time.h>\n#  endif\n#  undef _DEBUG // Don't let Python force the debug library just because we're debugging.\n#  define DEBUG_UNDEFINED_FROM_WRAP_PYTHON_H\n# endif\n#endif\n")),"\n",l.createElement(e.p,null,"python_d.lib にリンクするには"),"\n",l.createElement(e.pre,null,l.createElement(e.code,null,"b2 --with-python --debug-configuration python-debugging=on\n")),"\n",l.createElement(e.p,null,'として\nlibboost_python3-vc140-mt-gyd-1_64\nを作成する。gyd の y が python debug らしい。\nBoost.Python へのリンク\nboost はどうやってリンクするライブラリの名前を決めているのか\n#pragma comment(lib,"wsock32.lib")'),"\n",l.createElement(e.p,null,"どこかに#pragma が記述されているはずだが。"),"\n",l.createElement(e.p,null,"https://stackoverflow.com/questions/16200997/why-doesnt-include-python-h-work\nhttp://d.hatena.ne.jp/torutk/20121004/p1"),"\n",l.createElement(e.p,null,"autolink らしい。自動的に有効になる。"),"\n",l.createElement(e.p,null,"http://www.boost.org/doc/libs/1_48_0/boost/config/auto_link.hpp"),"\n",l.createElement(e.p,null,"pragma リンクの名前が一致しないんだけど"),"\n",l.createElement(e.p,null,"libboost_python3-vc140-mt-gd-1_64 にリンクしたいのだが libboost_python-vc140-mt-gd-1_64 にリンクしようとする\nboost_python3_vc140-mt-gd-1_64 にリンクしたいのいだが libboost_python-vc140-mt-gd-1_64 にリンクしようとする"),"\n",l.createElement(e.p,null,"BOOST_ALL_NO_LIB"),"\n",l.createElement(e.p,null,"を定義して autolink を阻止して自分でリンクする。\npython3 はどうやって決まるのか\nむしろ boost_python3 が BOOST_LIB_NAME から決まる。\nBOOST_LIB_NAME は、boost/python/detail/config.hpp で下記の記述がある。\nboost-1.61.0\n#define BOOST_LIB_NAME boost_python"),"\n",l.createElement(e.p,null,"boost_python3.dll と boost_python.dll は両方 Python3 にリンクされとった\nなんだってー。つまり、boost は複数の Python に対するビルド結果を共存させることは考慮されていないということだった。なるほど\nRelease ビルドと Debug ビルドは同じ Release の dll にリンクするべき\nDebug 版であっても、boost_python.dll も同じ Release 版にリンクされる。\nAutoLink に逆らわない方がよい。\nCMake の FIND_PACKAGE(BOOST)による Boost_LIBRARIES は使わない方がよいかもしれない。デバッグの方にリンクされてはまりうる。ていうか、はまった。\n結論として、AutoLink 邪魔だーから AutoLink に従えとなった。\npybind を使おう\nヘッダオンリーなので。リンク無いし。"),"\n",l.createElement(e.p,null,"https://github.com/pybind/pybind11"),"\n",l.createElement(e.p,null,"既存の Boost.Python を使ったコードでも、pybind は Boost.Python と似た API になっているので簡単に置き換えられる。"),"\n",l.createElement(e.p,null,"pybind11 で C++の関数を python から使う"))}var u=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?l.createElement(e,n,l.createElement(c,n)):c(n)};t(8678);function i(n){let{data:e,children:t}=n;return l.createElement(l.Fragment,null,l.createElement("h1",null,e.mdx.frontmatter.title),l.createElement(o.Zo,null,t))}function d(n){return l.createElement(i,n,l.createElement(u,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return i},ah:function(){return c}});var o=t(7294);const l=o.createContext({});function c(n){const e=o.useContext(l);return o.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const u={};function i({components:n,children:e,disableParentContext:t}){let i;return i=t?"function"==typeof n?n({}):n||u:c(n),o.createElement(l.Provider,{value:i},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-04-boost-python-md-37318aaa350879909c60.js.map