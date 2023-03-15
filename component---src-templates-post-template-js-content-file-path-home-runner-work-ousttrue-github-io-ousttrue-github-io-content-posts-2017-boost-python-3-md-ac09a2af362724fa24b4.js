"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9566],{3001:function(n,e,t){t.r(e),t.d(e,{default:function(){return o}});var i=t(1151),r=t(7294);function c(n){const e=Object.assign({p:"p",pre:"pre",code:"code",h1:"h1"},(0,i.ah)(),n.components);return r.createElement(r.Fragment,null,r.createElement(e.p,null,"ちょっと気になったので確認。"),"\n",r.createElement(e.p,null,"Windows10(64bit) VisualStudio2017 + Python3.6"),"\n",r.createElement(e.pre,null,r.createElement(e.code,{className:"language-c++"},'#define BOOST_PYTHON_STATIC_LIB  \n#include <boost/python.hpp>\n\nstd::string g_bytes;\nstd::string get_bytes()\n{\n    return g_bytes;\n}\nvoid set_bytes(const std::string &bytes)\n{\n    g_bytes = bytes;\n}\n\nstd::wstring g_unicode;\nstd::wstring get_unicode()\n{\n    return g_unicode;\n}\nvoid set_unicode(const std::wstring &unicode)\n{\n    g_unicode = unicode;\n}\n\n\nBOOST_PYTHON_MODULE(StringSample)\n{\n    using namespace boost::python;\n\n    def("add", &add);\n    def("get_bytes", &get_bytes);\n    def("set_bytes", &set_bytes);\n    def("get_unicode", &get_unicode);\n    def("set_unicode", &set_unicode);\n}\n')),"\n",r.createElement(e.h1,null,"coding: utf-8"),"\n",r.createElement(e.pre,null,r.createElement(e.code,{className:"language-python"},'import StringSample\n\nStringSample.set_bytes("ascii")\nprint(StringSample.get_bytes())\n\nStringSample.set_bytes(b"ascii")\nprint(StringSample.get_bytes())\n\nStringSample.set_unicode("ascii")\nprint(StringSample.get_unicode())\n\nStringSample.set_unicode(b"ascii")\nprint(StringSample.get_unicode())\n\n#\nStringSample.set_bytes("日本語")\nprint(StringSample.get_bytes())\n\nStringSample.set_bytes("日本語".encode(\'utf-8\'))\nprint(StringSample.get_bytes())\n\nStringSample.set_unicode("日本語")\nprint(StringSample.get_unicode())\n\nStringSample.set_unicode("日本語".encode(\'utf-8\'))\nprint(StringSample.get_unicode())\n')),"\n",r.createElement(e.pre,null,r.createElement(e.code,null,"ascii\nascii\nascii\nascii\n日本語\n日本語\n日本語\n日本語\n続行するには何かキーを押してください . . .\n")),"\n",r.createElement(e.p,null,"bytesはutf-8のバイト列と見なされるようだ。"))}var s=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?r.createElement(e,n,r.createElement(c,n)):c(n)};t(8678);function a(n){let{data:e,children:t}=n;return r.createElement(r.Fragment,null,r.createElement("h1",null,e.mdx.frontmatter.title),r.createElement(i.Zo,null,t))}function o(n){return r.createElement(a,n,r.createElement(s,n))}},8678:function(n,e,t){t(7294)},1151:function(n,e,t){t.d(e,{Zo:function(){return a},ah:function(){return c}});var i=t(7294);const r=i.createContext({});function c(n){const e=i.useContext(r);return i.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}const s={};function a({components:n,children:e,disableParentContext:t}){let a;return a=t?"function"==typeof n?n({}):n||s:c(n),i.createElement(r.Provider,{value:a},e)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-boost-python-3-md-ac09a2af362724fa24b4.js.map