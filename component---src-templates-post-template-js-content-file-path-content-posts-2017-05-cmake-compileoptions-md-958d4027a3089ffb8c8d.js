"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[284],{3412:function(n,a,e){e.r(a),e.d(a,{default:function(){return i}});var s=e(1151),t=e(7294);function l(n){const a=Object.assign({p:"p",span:"span",h1:"h1"},(0,s.ah)(),n.components);return t.createElement(t.Fragment,null,t.createElement(a.p,null,"すぐ忘れるのでここをチートシート化しよう。"),"\n",t.createElement(a.p,null,"構成\nsolution"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token variable">CMAKE_MINIMUM_REQUIRED</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">2.8</span><span class="token punctuation">)</span>\n<span class="token function">PROJECT</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span> <span class="token comment"># .sln</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"subdirectory"),"\n",t.createElement(a.p,null,"https://cmake.org/cmake/help/latest/command/add_subdirectory.html"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">ADD_SUBDIRECTORY</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.h1,null,"もしくは"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">SUBDIRS</span><span class="token punctuation">(</span>FOO BAR HOGE FUGA<span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"target\nexe"),"\n",t.createElement(a.p,null,"https://cmake.org/cmake/help/latest/command/add_executable.html"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">ADD_EXECUTABLE</span><span class="token punctuation">(</span>hello\n    main.cpp\n    renderer.cpp\n    scene.cpp\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"file を集める例"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">FILE</span><span class="token punctuation">(</span>GLOB SRC\n    *.cpp\n    *.h\n    <span class="token punctuation">)</span>\n<span class="token function">ADD_EXECUTABLE</span><span class="token punctuation">(</span>hello\n    <span class="token punctuation">${</span>SRC<span class="token punctuation">}</span>\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.h1,null,"fo winmain"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">ADD_EXECUTABLE</span><span class="token punctuation">(</span>hello_windows <span class="token variable">WIN32</span>\n    <span class="token punctuation">${</span>SRC<span class="token punctuation">}</span>\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"static lib"),"\n",t.createElement(a.p,null,"https://cmake.org/cmake/help/latest/command/add_library.html"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">ADD_LIBRARY</span><span class="token punctuation">(</span>renderer <span class="token namespace">STATIC</span>\n    renderer.cpp\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"dll"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">ADD_LIBRARY</span><span class="token punctuation">(</span>renderer <span class="token namespace">SHARED</span>\n    renderer.cpp\n    <span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"compile\ncompiler options\n全体"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">SET</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"-Wall"</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"ターゲット指定"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token function">TARGET_COMPILE_OPTIONS</span><span class="token punctuation">(</span>foo <span class="token namespace">PUBLIC</span> <span class="token string">"$&lt;$&lt;CONFIG:DEBUG>:<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">MY_DEBUG_OPTIONS</span><span class="token punctuation">}</span></span>>"</span><span class="token punctuation">)</span>\n<span class="token function">TARGET_COMPILE_OPTIONS</span><span class="token punctuation">(</span>foo <span class="token namespace">PUBLIC</span> <span class="token string">"$&lt;$&lt;CONFIG:RELEASE>:<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">MY_RELEASE_OPTIONS</span><span class="token punctuation">}</span></span>>"</span><span class="token punctuation">)</span></code></pre></div>'}}),"\n",t.createElement(a.p,null,"include path\n全体\n以降の ADD_XXX に対して有効になる"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">INCLUDE_DIRECTORIES(libpath/include)</code></pre></div>'}}),"\n",t.createElement(a.p,null,"ターゲット指定\nPUBLIC の部分はよくわからぬ。"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">TARGET_INCLUDE_DIRECTORIES(HELLO PUBLIC\n\t${BOOST_DIR}\n\t)</code></pre></div>'}}),"\n",t.createElement(a.p,null,"define\n全体\n以降の ADD_XXX に対して有効になる"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">ADD_DEFINITIONS(-DWITH_OPENCV2)</code></pre></div>'}}),"\n",t.createElement(a.p,null,"ターゲット指定\nPUBLIC の部分はよくわからぬ。"),"\n",t.createElement(a.h1,null,"-D なし"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">TARGET_COMPILE_DEFINITIONS(TARGET PUBLIC\n    WITH_OPENCV2=1\n    )</code></pre></div>'}}),"\n",t.createElement(a.p,null,"link\nlink path"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">LINK_DIRECTORIES(libpath/lib)</code></pre></div>'}}),"\n",t.createElement(a.p,null,"x86 と x64 で違うパスにしたい時は？"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">LINK_LIBRARIES\nTARGET_LINK_LIBRARIES\nTARGET_LINK_LIBRARIES(MediaSessionPlaybackExample\n    Mf\n    Mfplat\n    Mfuuid\n    strmiids\n    )</code></pre></div>'}}),"\n",t.createElement(a.p,null,"Debug Release の切り分け"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">TARGET_LINK_LIBRARIES(Fuga\n    DEBUG hoge_d\n    OPTIMIZE hoge\n    )</code></pre></div>'}}),"\n",t.createElement(a.p,null,"変数\nソース"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">cmake -G CMAKE_SOURCE_DIR\nCMAKE_SOURCE_DIR</code></pre></div>'}}),"\n",t.createElement(a.p,null,"ビルドディレクトリ\ncmake -G CMAKE_SOURCE_DIR を実行したディレクトリ"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">CMAKE_BINARY_DIR</code></pre></div>'}}),"\n",t.createElement(a.p,null,"The path to the top level of the build tree"),"\n",t.createElement(a.p,null,"出力ディレクトリ\nexe と dll の出力先。"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">SET(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)</code></pre></div>'}}),"\n",t.createElement(a.p,null,"example\nCMakeLists.txt"),"\n",t.createElement(a.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="cmake"><pre class="language-cmake"><code class="language-cmake"><span class="token variable">CMAKE_MINIMUM_REQUIRED</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">2.8</span><span class="token punctuation">)</span>\n<span class="token function">PROJECT</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span> <span class="token comment"># hello.sln</span>\n<span class="token function">ADD_EXECUTABLE</span><span class="token punctuation">(</span>hello main.cpp<span class="token punctuation">)</span> <span class="token comment"># hello.vcxproj</span>\n\n<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"/WD4096"</span><span class="token punctuation">)</span>\n<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_C_FLAGS</span> <span class="token string">"/WD4096"</span><span class="token punctuation">)</span>\n<span class="token keyword">include_directories</span><span class="token punctuation">(</span>libpath/include<span class="token punctuation">)</span>\n<span class="token keyword">add_definitions</span><span class="token punctuation">(</span>\n    -DUNICODE\n    -D_UNICODE\n    <span class="token punctuation">)</span></code></pre></div>'}}))}var c=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,s.ah)(),n.components);return a?t.createElement(a,n,t.createElement(l,n)):l(n)},p=e(8678),o=e(4160),u=e(8736);const g={code:n=>{let{children:a,className:e}=n;return e?t.createElement(u.Z,{className:e},a):t.createElement("code",null,a)}};function r(n){let{data:a,children:e}=n;const l=a.mdx.frontmatter;return t.createElement(p.Z,null,t.createElement("h1",null,l.title),t.createElement("div",{className:"tags-index"},l.tags&&l.tags.length>0&&l.tags.map((n=>t.createElement(o.rU,{to:"/tags/"+n+"/",itemProp:"url"},t.createElement("button",null,n))))),t.createElement(s.Zo,{components:g},e))}function i(n){return t.createElement(r,n,t.createElement(c,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2017-05-cmake-compileoptions-md-958d4027a3089ffb8c8d.js.map