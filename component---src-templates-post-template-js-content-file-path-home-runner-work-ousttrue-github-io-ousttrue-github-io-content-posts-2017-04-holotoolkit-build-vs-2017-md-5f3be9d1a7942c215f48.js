"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4294],{7095:function(e,n,t){t.r(n),t.d(n,{default:function(){return i}});var r=t(1151),l=t(7294);function u(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"VS2017 からレジストリの構成が変わっている。"),"\n",l.createElement(n.p,null,"http://stackoverflow.com/questions/328017/path-to-msbuild"),"\n",l.createElement(n.pre,null,l.createElement(n.code,{className:"language-csharp"},'public static string CalcMSBuildPath(string msBuildVersion)\n{\n    if (msBuildVersion == "15.0")\n    {\n        using (var key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(\n            @"SOFTWARE\\WOW6432Node\\Microsoft\\VisualStudio\\SxS\\VS7"))\n        {\n            if (key == null)\n            {\n                return null;\n            }\n            string folder = key.GetValue(msBuildVersion) as string;\n            string msBuildPath = Path.Combine(folder, "MSBuild\\\\15.0\\\\Bin\\\\msbuild.exe");\n            return msBuildPath;\n        }\n    }\n\n    // 既存のコード\n}\n')))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?l.createElement(n,e,l.createElement(u,e)):u(e)};t(8678);function o(e){let{data:n,children:t}=e;return l.createElement(l.Fragment,null,l.createElement("h1",null,n.mdx.frontmatter.title),l.createElement(r.Zo,null,t))}function i(e){return l.createElement(o,e,l.createElement(c,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return o},ah:function(){return u}});var r=t(7294);const l=r.createContext({});function u(e){const n=r.useContext(l);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const c={};function o({components:e,children:n,disableParentContext:t}){let o;return o=t?"function"==typeof e?e({}):e||c:u(e),r.createElement(l.Provider,{value:o},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-04-holotoolkit-build-vs-2017-md-5f3be9d1a7942c215f48.js.map