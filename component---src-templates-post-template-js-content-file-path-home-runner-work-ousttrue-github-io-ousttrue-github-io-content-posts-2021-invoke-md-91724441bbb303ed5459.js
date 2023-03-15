"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[734],{6962:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var l=t(1151),o=t(7294);function r(e){const n=Object.assign({p:"p",code:"code",h2:"h2",pre:"pre"},(0,l.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(n.p,null,"python でちょっとしたツールを書くときに便利。\n",o.createElement(n.code,null,"make")," みたいにタスクを定義して、コマンドラインから実行する。\ntask として定義した関数の引数に応じてコマンドライン引数をさばけるので ",o.createElement(n.code,null,"argparse")," せずにすませることができる。"),"\n",o.createElement(n.h2,null,"install"),"\n",o.createElement(n.pre,null,o.createElement(n.code,null,"$ pip install invoke\n")),"\n",o.createElement(n.h2,null,"tasks.py"),"\n",o.createElement(n.pre,null,o.createElement(n.code,{className:"language-python"},"from invoke import task\n\n@task\ndef hello(c, who=\"hoge\"):\n    '''\n    hello task\n    '''\n    print(f'hello {hoge}')\n\n\n@task(hello)\ndef ver(c):\n    '''\n    version\n    '''\n    print(sys.version)\n")),"\n",o.createElement(n.p,null,"使う"),"\n",o.createElement(n.pre,null,o.createElement(n.code,null,"$ invoke -l           \nAvailable tasks:\n\n  hello   hello task\n  ver     version\n\n$ invoke hello --help\nUsage: inv[oke] [--core-opts] hello [--options] [other tasks here ...]\n\nDocstring:\n  hello task\n\nOptions:\n  -w STRING, --who=STRING\n\n$ invoke hello fuga  \nNo idea what 'fuga' is!\n$ invoke hello -w fuga\nhello fuga\n$ invoke ver\nhello hoge\n3.8.6 (tags/v3.8.6:db45529, Sep 23 2020, 15:52:53) [MSC v.1927 64 bit (AMD64)]\n")),"\n",o.createElement(n.h2,null,"vscode でデバッグ"),"\n",o.createElement(n.p,null,"module に ",o.createElement(n.code,null,"invoke")," を設定してやる"),"\n",o.createElement(n.pre,null,o.createElement(n.code,{className:"language-json"},'        {\n            "name": "task",\n            "type": "python",\n            "request": "launch",\n            "module": "invoke",\n            "args": [\n                "hello"\n            ],\n            "console": "integratedTerminal"\n        }\n')))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?o.createElement(n,e,o.createElement(r,e)):r(e)};t(8678);function c(e){let{data:n,children:t}=e;return o.createElement(o.Fragment,null,o.createElement("h1",null,n.mdx.frontmatter.title),o.createElement(l.Zo,null,t))}function u(e){return o.createElement(c,e,o.createElement(a,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return c},ah:function(){return r}});var l=t(7294);const o=l.createContext({});function r(e){const n=l.useContext(o);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function c({components:e,children:n,disableParentContext:t}){let c;return c=t?"function"==typeof e?e({}):e||a:r(e),l.createElement(o.Provider,{value:c},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2021-invoke-md-91724441bbb303ed5459.js.map