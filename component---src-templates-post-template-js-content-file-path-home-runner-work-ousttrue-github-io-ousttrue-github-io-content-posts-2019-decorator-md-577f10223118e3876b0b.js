"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2358],{4900:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var r=t(1151),a=t(7294);function c(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"引数付きのdecorator"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"def decorator(func):\n    def wrapper(name):\n        return func(name + 'さん')\n    return wrapper\n\n@decorator\ndef hello(name):\n    print(f'hello {name}')\n")),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"def witharg(suffix):\n    def decorator(func):\n        def wrapper(name):\n            return func(name + suffix)\n        return wrapper\n    return decorator\n\n@witharg('殿')\ndef hello(name):\n    print(f'hello {name}')\n")),"\n",a.createElement(n.p,null,"みたいなことができる。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"# デフォルト引数で兼用したいのだが・・・\ndef witharg(suffix = None):\n    def decorator(func):\n        def wrapper(name):\n            return func(name + suffix)\n        return wrapper\n    return decorator\n\n@witharg() # カッコが要るのに注意\ndef hello(name):\n    print(f'hello {name}')\n")),"\n",a.createElement(n.p,null,"デフォルト引数で省略すると嵌るので注意。\n外側を ",a.createElement(n.code,null,"func")," 引数で呼び出してしまう。\ndecorator に引数が定義されていると挙動が変わるのではなく、\n使う時 ",a.createElement(n.code,null,"@")," にカッコがあるときに挙動が変わる。"))}var l=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?a.createElement(n,e,a.createElement(c,e)):c(e)};t(8678);function o(e){let{data:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(r.Zo,null,t))}function u(e){return a.createElement(o,e,a.createElement(l,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return o},ah:function(){return c}});var r=t(7294);const a=r.createContext({});function c(e){const n=r.useContext(a);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const l={};function o({components:e,children:n,disableParentContext:t}){let o;return o=t?"function"==typeof e?e({}):e||l:c(e),r.createElement(a.Provider,{value:o},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-decorator-md-577f10223118e3876b0b.js.map