"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2919],{2128:function(n,t,e){e.r(t),e.d(t,{default:function(){return m}});var a=e(1151),s=e(7294);function l(n){const t=Object.assign({h1:"h1",ul:"ul",li:"li",p:"p",code:"code",span:"span",h2:"h2"},(0,a.ah)(),n.components);return s.createElement(s.Fragment,null,s.createElement(t.h1,null,"pyside6 の pyi"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython/quickstart.html"),"\n"),"\n",s.createElement(t.p,null,s.createElement(t.code,null,"pip install pyside6")),"\n",s.createElement(t.p,null,"地味に ",s.createElement(t.code,null,"pyi")," ファイルが同梱されていて、 ",s.createElement(t.code,null,"pyright")," の補助が良く効く。\n",s.createElement(t.code,null,"vscode")," では、 ",s.createElement(t.code,null,"pylance")," 拡張をイストールする。"),"\n",s.createElement(t.p,null,s.createElement(t.code,null,"settings.json")),"\n",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">"python.languageServer": "Pylance",\n"python.analysis.typeCheckingMode": "basic",</code></pre></div>'}}),"\n",s.createElement(t.p,null,"一部解決不能なエラーが出るので、"),"\n",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">open_action<span class="token punctuation">.</span>triggered<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>open_dialog<span class="token punctuation">)</span>  <span class="token comment"># type: ignore</span></code></pre></div>'}}),"\n",s.createElement(t.p,null,"のように明示的に型チェックを無効にする。"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://github.com/microsoft/pylance-release/issues/196"),"\n",s.createElement(t.li,null,"https://github.com/microsoft/pylance-release/issues/333"),"\n"),"\n",s.createElement(t.h1,null,"Tutorials"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython/tutorials/index.html"),"\n"),"\n",s.createElement(t.h1,null,"Widgets"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython/PySide6/QtWidgets/index.html"),"\n"),"\n",s.createElement(t.h1,null,"QMainWindow"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QMainWindow.html"),"\n",s.createElement(t.li,null,"https://www.pythonguis.com/tutorials/pyside6-creating-your-first-window/"),"\n"),"\n",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python"><span class="token keyword">class</span> <span class="token class-name">MyWidget</span><span class="token punctuation">(</span>QtWidgets<span class="token punctuation">.</span>QMainWindow<span class="token punctuation">)</span><span class="token punctuation">:</span>\n    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>\n        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>\n        self<span class="token punctuation">.</span>text <span class="token operator">=</span> QtWidgets<span class="token punctuation">.</span>QLabel<span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">,</span>\n                                     alignment<span class="token operator">=</span>QtCore<span class="token punctuation">.</span>Qt<span class="token punctuation">.</span>AlignCenter<span class="token punctuation">)</span>\n        self<span class="token punctuation">.</span>setCentralWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>text<span class="token punctuation">)</span>\n\n\n<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>\n    <span class="token keyword">import</span> sys\n    app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">)</span>\n    widget <span class="token operator">=</span> MyWidget<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    widget<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>\n    widget<span class="token punctuation">.</span>resize<span class="token punctuation">(</span><span class="token number">800</span><span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span>\n    sys<span class="token punctuation">.</span>exit<span class="token punctuation">(</span>app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",s.createElement(t.h2,null,"QDockWidget"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://pythonpyqt.com/qdockwidget/"),"\n"),"\n",s.createElement(t.h2,null,"menu"),"\n",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="python"><pre class="language-python"><code class="language-python">        menu <span class="token operator">=</span> self<span class="token punctuation">.</span>menuBar<span class="token punctuation">(</span><span class="token punctuation">)</span>\n        file_menu <span class="token operator">=</span> menu<span class="token punctuation">.</span>addMenu<span class="token punctuation">(</span><span class="token string">"&amp;File"</span><span class="token punctuation">)</span>\n        <span class="token comment"># file_menu.addAction(button_action)</span></code></pre></div>'}}),"\n",s.createElement(t.h2,null,"toolbar"),"\n",s.createElement(t.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">        toolbar = QtWidgets.QToolBar("My main toolbar")\n        self.addToolBar(toolbar)\n        button_action = QtGui.QAction("Click me!", self)\n        button_action.setStatusTip("rundom text")\n        button_action.triggered.connect(self.magic)\n        toolbar.addAction(button_action)</code></pre></div>'}}),"\n",s.createElement(t.h2,null,"file dialog"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython/PySide6/QtWidgets/QFileDialog.html"),"\n"),"\n",s.createElement(t.h1,null,"OpenGL"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://ousttrue.github.io/glglue/samples/pyside6.html"),"\n"),"\n",s.createElement(t.h1,null,"Signal"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://www.pythoncentral.io/pysidepyqt-tutorial-creating-your-own-signals-and-slots/"),"\n"),"\n",s.createElement(t.h1,null,"Timeline"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://doc.qt.io/qtforpython/PySide6/QtCore/QTimeLine.html"),"\n"),"\n",s.createElement(t.h1,null,"Tree"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://fereria.github.io/reincarnation_tech/11_PySide/02_Tips/ViewModelDelegate/custom_model/"),"\n"),"\n",s.createElement(t.h1,null,"メモ"),"\n",s.createElement(t.ul,null,"\n",s.createElement(t.li,null,"https://pyqt-node-editor.readthedocs.io/en/latest/introduction.html#installation"),"\n"))}var o=function(n){void 0===n&&(n={});const{wrapper:t}=Object.assign({},(0,a.ah)(),n.components);return t?s.createElement(t,n,s.createElement(l,n)):l(n)},p=e(8678),c=e(4160),u=e(8736);const i={code:n=>{let{children:t,className:e}=n;return e?s.createElement(u.Z,{className:e},t):s.createElement("code",null,t)}};function r(n){let{data:t,children:e}=n;const l=t.mdx.frontmatter;return s.createElement(p.Z,null,s.createElement("h1",null,l.title),s.createElement("div",{className:"tags-index"},l.tags&&l.tags.length>0&&l.tags.map((n=>s.createElement(c.rU,{to:"/tags/"+n+"/",itemProp:"url"},s.createElement("button",null,n))))),s.createElement(a.Zo,{components:i},e))}function m(n){return s.createElement(r,n,s.createElement(o,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2021-fall-pyside-6-md-3e0e506aa36fcdeebfe5.js.map