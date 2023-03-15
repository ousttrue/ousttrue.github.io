"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1607],{3938:function(n,t,e){e.r(t),e.d(t,{default:function(){return _}});var o=e(1151),s=e(7294);function a(n){const t=Object.assign({span:"span"},(0,o.ah)(),n.components);return s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Windows上のCMakeでFIND_PACKAGE(Boost)する件について。\n\nBoost.Pythonのビルド\nC:/boost_1_61_0に解凍して、b2 --with-pythonしたとする。\nのようなディレクトリ構成。\nC:/boost_1_61_0\n    stage\n        lib\n            boost_python.lib\n\nFIND_PACKAGE\nBOOST.Pythonを使う場合は下記の記述をして、-DBOOST_ROOT=C:/boost_1_61_0を指定してやるとcmakeはBoost.Pythonを見つけることができる。\nただし、検索パスが${BOOST_ROOT}/stage/lib決め打ち。\nFIND_PACKAGE (Boost COMPONENTS PYTHON REQUIRED)\nMESSAGE(STATUS ${Boost_LIBRARIES})\n\n見つかった\noptimizedD:/lib/boost_1_61_0/stage/lib/boost_python-vc140-mt-1_61.libdebugD:/lib/boost_1_61_0/stage/lib/boost_python-vc140-mt-gd-1_61.lib\n\nPython3は？\nFIND_PACKAGE (Boost COMPONENTS python3 REQUIRED)\nMESSAGE(STATUS ${Boost_LIBRARIES})\n\nでいける。\nしかし、警告が出た。\nCMake Warning at D:/Program Files/CMake/share/cmake-3.9/Modules/FindBoost.cmake:1564 (message):\n  No header defined for python3; skipping header check\nCall Stack (most recent call first):\n  CMakeLists.txt:42 (FIND_PACKAGE)\n\n3がついてなくても同じだった\nstage/libに出力されているboost_python3.dllとboost_python.dllは同じバイナリぽい。\nstatic, sharedの呼び分けは？\n後で。\nFindBoost\n\nhttps://cmake.org/cmake/help/latest/module/FindBoost.html\n\nしかし\nFIND_PACKAGEした結果のBoost_LIBRARIESを使うのには注意が必要。\nネイティブモジュール開発で、デバッグ版にRelease版のPythonをリンクする場合(通常そうする)に、Boost.PytnonもRelease版にリンクするべきなのでここではまりうる(コンパイルは通るが実行時に謎エラーが出る)。LINK_DIRECTORIESを使って、リンク対象はBOOSTのautolink頼りの方が確実かもしれない。\n\nBOOST_ALL_NO_LIB を定義して Boost_LIBRARIESにリンクする\nBoost_LIBRARIESを使わずに、BoostのAutoLinkに従う\n\nのいずれかになるが、ネイティブモジュール開発では後者がおすすめか。</code></pre></div>'}})}var l=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,o.ah)(),n.components);return t?s.createElement(t,n,s.createElement(a,n)):a(n)},c=(e(8678),e(8838));const r={code:n=>{let{children:t,className:e}=n;return e?s.createElement(c.Z,{className:e},t):s.createElement("code",null,t)}};function i(n){let{data:t,children:e}=n;return s.createElement(s.Fragment,null,s.createElement("h1",null,t.mdx.frontmatter.title),s.createElement(o.Zo,{components:r},e))}function _(n){return s.createElement(i,n,s.createElement(l,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-08-cmake-find-boost-python-md-fca8066e34f8992ad946.js.map