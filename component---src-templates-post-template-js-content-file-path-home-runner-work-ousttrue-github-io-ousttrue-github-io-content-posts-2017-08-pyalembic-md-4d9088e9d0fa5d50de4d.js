"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[684],{3697:function(n,a,e){e.r(a),e.d(a,{default:function(){return m}});var t=e(1151),s=e(7294);function l(n){const a=Object.assign({p:"p",a:"a",span:"span"},(0,t.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(a.p,null,"Windows 上で PyAlembic を使いたいのだができるのか。\n素直に Linux でやるべきでは・・・\nWindows10(64bit) + Python-3.6(64bit)"),"\n",s.createElement(a.p,null,"作業場。"),"\n",s.createElement(a.p,null,s.createElement(a.a,{href:"https://github.com/ousttrue/openexr"},"https://github.com/ousttrue/openexr")),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">Anaconda3(Windows10 64bit)でモジュール探す\n> conda install -c conda-forge alembic</code></pre></div>'}}),"\n",s.createElement(a.p,null,"しかし、これは違う Alembic だった。\nPython の alembic は、database migrations tool と名前が被っております。\nなるほど・・・。\nPython2.7 なら"),"\n",s.createElement(a.p,null,s.createElement(a.a,{href:"http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic"},"http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic")),"\n",s.createElement(a.p,null,"あとから発見。わいは、Python3.6 にしたいので。\n自前でビルドを試みる\nalembic-1.7.1/python/PyAlembic がそれですな。\n問題が２つある。"),"\n",s.createElement(a.p,null,"Python2(Python3 にしたい)\nBoost.Python(PyBind11 にしてリンク問題とおさらばしたい)"),"\n",s.createElement(a.p,null,"さすがに PyBind11 差し替えはやるにしても後にするべきなので、 Python3 化だけやる。\nBoost.Python のビルド\nBoost.Python で使う Python を明示するには、user-config.jam に記述する。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">BOOST_DIR/user-conifg.jam\nusing python\n    : 3.6                   # Version\n    : D:\\\\Anaconda3\\\\python.exe      # Python Path\n    : D:\\\\Anaconda3\\\\include         # include path\n    : D:\\\\Anaconda3\\\\libs            # lib path(s)\n    : &lt;define>BOOST_ALL_NO_LIB=1\n    ;</code></pre></div>'}}),"\n",s.createElement(a.p,null,"ビルド"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">boost> b2.exe -j3 --stagedir=stage\\x86_64 link=shared runtime-link=shared threading=multi toolset=msvc-14.0 address-model=64 --with-python</code></pre></div>'}}),"\n",s.createElement(a.p,null,"link=shared にして dll を生成することが必要。\nこれは、iex.pyd と imath.pyd 間で Boost.Python の static 変数を共有するために必須である(pyex の型登録周りか)。\nIlmBase を修正\nilmbase-2.2.0/IexMath/IexMathFloatExc.h\nの以下の部分を修正する。多分、記述ミスなのだけど誰も Windows ビルドしないので気付かれていないのであろう。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">//#if defined(IEX_EXPORTS)↲\n#if defined(IEXMATH_EXPORTS)↲</code></pre></div>'}}),"\n",s.createElement(a.p,null,"これで ilmbase をビルドしておく。vcpkg を使った。\nalembic を修正\nalembic-1.7.1/lib/Alembic/AbcCoreLayer/CMakeLists.txt を修正してヘッダを追加する(PyAlembic が使う)"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">INSTALL</span><span class="token punctuation">(</span>FILES Read.h Util.h\n    Foundation.h <span class="token comment"># 追加</span>\n    DESTINATION include/Alembic/AbcCoreLayer<span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"これも、vcpkg を使った。\nPyIlmBase のビルド\nOpenEXR のサイトにある pyilmbase-2.2.0tar.gz を使おうとしたのだけど、github の方が新しいようなのでこちらを使う。\nPython3 向けの修正\nPython2 と Pytnon3 間での非互換によるコンパイルエラーを直していく。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">PySliceObject_XXX -> PyObject_XXX\nPyInt_XXX -> PyLong_XXX\nPyString_AsString -> PyUnicode_AsUTF8\n_PyThreadState_Current -> _PyThreadState_UncheckedGet()</code></pre></div>'}}),"\n",s.createElement(a.p,null,"参考"),"\n",s.createElement(a.p,null,"Python3 Advent Calendar - Python で 2/3 両方で動くコードを書く(C/API)\nFix build for Python 3.5\n",s.createElement(a.a,{href:"http://py3c.readthedocs.io/en/latest/guide.html"},"http://py3c.readthedocs.io/en/latest/guide.html")),"\n",s.createElement(a.p,null,"CMake 設定"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token variable">CMAKE_INSTALL_PREFIX</span>\n<span class="token variable">BOOST_ROOT</span>\nILMBASE_PACKAGE_PREFIX\n<span class="token function">FIND_PACKAGE</span><span class="token punctuation">(</span>numpy<span class="token punctuation">)</span>をコメントアウト\nDebugでもPython36.libにリンクするように、<span class="token comment">#include &lt;Python.h>を除去(boost/python.hpp経由でインクルードさせればそうなる)</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"ビルドが通るようになった。\nPyAlembic のビルド\n当初、Alembic のプロジェクトで Python フラグを有効にして一緒にビルドしようとしていたが、PyIlmBase 傘下に PyAlembic をコピーする方式に変えた。\nalembic-1.7.1/python/PyAlembic を ilmbase-2.2.0/PyIlmBase にコピーして、CMakeLists.txt を調整する。\nCMake 設定"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token variable">Alembic_ROOT</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"参考"),"\n",s.createElement(a.p,null,"uimac 実装メモ - PyImath"),"\n",s.createElement(a.p,null,"PyAlembic のビルドが通ったので実行してみよう\nPyAlembic/Tests/testPolyMesh.py を動かしてみようと思う。\nこういう感じに準備する。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">testPolyMesh.py\niex.pyd\nPyIex.dll\nimath.pyd\nPyImath.dll\nalembic.lib\nalembic.pyd\nboost_python-vc140-mt-1_61.dll # debug buildもこれ\n\n> C:/python36/python.exe testPolyMesh.py</code></pre></div>'}}),"\n",s.createElement(a.p,null,"import alembic でクラッシュする。デバッガで追ってみると、モジュールの初期化でエラーが発生している。一個ずつ直す。\n初期化の修正\nPython3 化による変更？\nAbcView\n今回の作業目標。"),"\n",s.createElement(a.p,null,s.createElement(a.a,{href:"http://alembic.github.io/abcview/"},"http://alembic.github.io/abcview/")),"\n",s.createElement(a.p,null,"これを動作させたい。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">AbcView has the following requirements:\n\nPython 2.6+ => Python 3.6 で動くように改造する(print 文とか)\nPyAlembic。できた\nPyAbcOpenGL。できた\nPyOpenGL。pip\nargparse。pip\nPyQt4。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic\nnumpy-mkl。http://www.lfd.uci.edu/~gohlke/pythonlibs/#pyalembic\n\nPyQt4 をインストール\n\nhttps://stackoverflow.com/questions/22640640/how-to-install-pyqt4-on-windows-using-pip\nhttp://www.lfd.uci.edu/~gohlke/pythonlibs/#pyqt4\n\nこんな感じで公式の Python3.6(64bit)に対してインストール。\nD:\\Python36\\Scripts\\pip.exe install .\\PyQt4-4.11.4-cp36-cp36m-win_amd64.whl\n\nhttps://www.tutorialspoint.com/pyqt/pyqt_hello_world.htm</code></pre></div>'}}),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> sys\n<span class="token keyword">from</span> PyQt4 <span class="token keyword">import</span> QtGui\n\n<span class="token keyword">def</span> <span class="token function">window</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>\n    app <span class="token operator">=</span> QtGui<span class="token punctuation">.</span>QApplication<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n    w <span class="token operator">=</span> QtGui<span class="token punctuation">.</span>QWidget<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    b <span class="token operator">=</span> QtGui<span class="token punctuation">.</span>QLabel<span class="token punctuation">(</span>w<span class="token punctuation">)</span>\n    b<span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span>\n    w<span class="token punctuation">.</span>setGeometry<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span>\n    b<span class="token punctuation">.</span>move<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>\n    w<span class="token punctuation">.</span>setWindowTitle<span class="token punctuation">(</span><span class="token string">"PyQt"</span><span class="token punctuation">)</span>\n    w<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span>app<span class="token punctuation">.</span>exec_<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">\'__main__\'</span><span class="token punctuation">:</span>\n    window<span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(a.p,null,"動いた。\nalembicgl.pyd, alembic.pyd, imath.pyd, iex.pyd と依存 dll 群を wheel 化する\n同じ dll を参照する pyd を同じフォルダに配置したいので、\n共通の親モジュールとして ilm を定義してその中にすべての pyd と dll を収めることにした。\nそのうえでこれを間接的にエクスポートするモジュール’iex’, ‘imath’, ‘alembic’, ‘alembicgl’\nを作る計画。"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">ilm\n    + __init__.py\n    + iex.pyd\n    + imath.pyd\n    + alembic.pyd\n    + alembicgl.pyd\n    + PyEx.dll\n    + PyImath.dll\n    + boost_python.dll\n    + Alembic.dll # VCPKG BUILD\n    + ilmbase.dll # VCPKG BUILD\n    + iex.dll # VCPKG BUILD\n    + imath.dll # VCPKG BUILD\n    + half.dll # VCPKG BUILD\n    + hdf5.dll # VCPKG BUILD\n    + zip.dll # VCPKG BUILD\n    + szip.dll # VCPKG BUILD\niex\n    + __init__.py # ilm.iexを公開\nimath\n    + __init__.py # ilm.imathを公開\nalembic\n    + __init__.py # ilm.alembicを公開\nalembicgl\n    + __init__.py # ilm.alembicglを公開\nsetup.py</code></pre></div>'}}),"\n",s.createElement(a.p,null,"iex/init.py"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">from ilm.iex import \\*</code></pre></div>'}}),"\n",s.createElement(a.p,null,"こういうのを iex, imath, alembic, alembicgl それぞれに作った。\nsetup.py"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token comment">#!/usr/bin/env python</span>\n\n<span class="token keyword">from</span> setuptools <span class="token keyword">import</span> setup<span class="token punctuation">,</span> Distribution\n\n\nsetup<span class="token punctuation">(</span>\n        name<span class="token operator">=</span><span class="token string">\'alembic\'</span><span class="token punctuation">,</span>\n        version<span class="token operator">=</span><span class="token string">\'0.1\'</span><span class="token punctuation">,</span>\n        description<span class="token operator">=</span><span class="token string">\'Alembic Library\'</span><span class="token punctuation">,</span>\n        packages<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">\'ilm\'</span><span class="token punctuation">,</span> <span class="token string">\'iex\'</span><span class="token punctuation">,</span> <span class="token string">\'imath\'</span><span class="token punctuation">,</span> <span class="token string">\'alembic\'</span><span class="token punctuation">,</span> <span class="token string">\'alembicgl\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        package_data<span class="token operator">=</span><span class="token punctuation">{</span>\n            <span class="token string">\'ilm\'</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token string">\'*.pyd\'</span><span class="token punctuation">,</span> <span class="token string">\'*.dll\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">py_package> D:\\Python36\\python.exe setup.py bidst_wheel\npy_package> D:\\Python36\\Scripts\\pip.exe install .\\dist\\alembic-0.1-cp36-cp36m-win_amd64.whl</code></pre></div>'}}),"\n",s.createElement(a.p,null,"AbcView を実行してみる\nこういう感じに配置して、abcview_main.py を実行してみる。\nabcview_main.py `# bin/abcview から改名(名前がフォルダと被らないように変更)\nabcview"),"\n",s.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">**init**.py</code></pre></div>'}}),"\n",s.createElement(a.p,null,"python2 仕様の部分をまとめて修正。"),"\n",s.createElement(a.p,null,s.createElement(a.a,{href:"https://docs.python.jp/3/library/2to3.html"},"https://docs.python.jp/3/library/2to3.html")),"\n",s.createElement(a.p,null,"AbcView> D:\\Python36\\python.exe D:\\Python36\\Tools\\scripts\\2to3.py -w ."),"\n",s.createElement(a.p,null,"print 文、except 文などの定型的な文法問題はこれで一網打尽。ディレクトリを指定することでまとめて処理できる。\nfile.toAscii() => file\nこれも Python2 との非互換か。\nQtCore.QString(str(value)) => str(value)\nQString は、Python の String でよさげ。\n動いた"),"\n",s.createElement(a.p,null,s.createElement(a.a,{href:"https://github.com/ousttrue/openexr/releases/tag/v0.1"},"https://github.com/ousttrue/openexr/releases/tag/v0.1")),"\n",s.createElement(a.p,null,"タイムラインを操作したら蛸が動いた。"))}var p=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,t.ah)(),n.components);return a?s.createElement(a,n,s.createElement(l,n)):l(n)},c=e(8678),o=e(1883),i=e(8838);const u={code:n=>{let{children:a,className:e}=n;return e?s.createElement(i.Z,{className:e},a):s.createElement("code",null,a)}};function r(n){let{data:a,children:e}=n;const l=a.mdx.frontmatter;return s.createElement(c.Z,null,s.createElement("h1",null,l.title),s.createElement("div",{className:"tags-index"},l.tags&&l.tags.length>0&&l.tags.map((n=>s.createElement(o.rU,{to:"/tags/"+n+"/",itemProp:"url"},s.createElement("button",null,n))))),s.createElement(t.Zo,{components:u},e))}function m(n){return s.createElement(r,n,s.createElement(p,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-08-pyalembic-md-4d9088e9d0fa5d50de4d.js.map