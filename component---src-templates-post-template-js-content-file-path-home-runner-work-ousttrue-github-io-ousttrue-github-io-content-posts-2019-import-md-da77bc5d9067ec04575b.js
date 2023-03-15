"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8572],{201:function(e,n,t){t.r(n),t.d(n,{default:function(){return o}});var l=t(1151),r=t(7294);function a(e){const n=Object.assign({p:"p",code:"code",h2:"h2",ul:"ul",li:"li",a:"a",pre:"pre",h3:"h3",strong:"strong"},(0,l.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,r.createElement(n.code,null,"ImportError: attempted relative import with no known parent package")),"\n",r.createElement(n.h2,null,"相対Importの制限"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,r.createElement(n.a,{href:"https://qiita.com/ysk24ok/items/2711295d83218c699276"},"[Python] importの躓きどころ")),"\n"),"\n",r.createElement(n.p,null,"わいのやりたいことは実現不可能なのだな。\npackageの内部でちょっとしたテストをするコードを、"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"if __name__ == '__main__':\n    sample()\n")),"\n",r.createElement(n.p,null,"という風に書いて実行しようとしていたのだが、\n同階層のファイルを、"),"\n",r.createElement(n.pre,null,r.createElement(n.code,{className:"language-python"},"from . import my_module\n")),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"ImportError: attempted relative import with no known parent package\n")),"\n",r.createElement(n.p,null,"で阻まれてしまう。\nエントリポイントが、"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"__package__ == None\n__name__ == '__main__'\n")),"\n",r.createElement(n.p,null,"となるので、",r.createElement(n.code,null,"ImportError")," となるのである。\nこんちくしょう。"),"\n",r.createElement(n.h3,null,"無理やり誤魔化すなら・・・"),"\n",r.createElement(n.p,null,"もう一つ外のソースから ",r.createElement(n.code,null,"import")," したかのように偽装する。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"python -c 'import my_package; my_package.sample()'\n")),"\n",r.createElement(n.p,null,"💩過ぎる。\nライブラリにユーティリティが付属している場合にめちゃくちゃ作りづらい。\n前からPytnonのもっとも💩なところだと思っていた。\nライブラリの開発時に部分的に実行する時に邪魔でしかない。"),"\n",r.createElement(n.h2,null,"package"),"\n",r.createElement(n.p,null,"複数のモジュールを束ねたもの。\nimport したときに ",r.createElement(n.code,null,"__package__")," が ",r.createElement(n.code,null,"None")," 以外になった ",r.createElement(n.code,null,"module")," は ",r.createElement(n.code,null,"package")," に属している。"),"\n",r.createElement(n.h3,null,"エントリポイントは ",r.createElement(n.code,null,"__package__ = None")),"\n",r.createElement(n.p,null,"以下のファイル構成で実験してみた。"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,'main.py # import mod\nmod.py # import mod2\nmod2.py # import mod3\nmod3\n    + __init__.py # from . import mod4\n    + mod4.py\n\n# それぞれ以下を記述\nprint(f\'"{__name__}" in "{__package__}"\')\n\npython main.py として実行\n')),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"__package__")," が、"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"main.py ",r.createElement(n.strong,null,"packag")," = None"),"\n",r.createElement(n.li,null,"mod.py ",r.createElement(n.strong,null,"packag"),' = ""'),"\n",r.createElement(n.li,null,"mod2.py ",r.createElement(n.strong,null,"packag"),' = ""'),"\n",r.createElement(n.li,null,"mod3/",r.createElement(n.strong,null,"init"),".py ",r.createElement(n.strong,null,"packag"),' = "mod3"'),"\n",r.createElement(n.li,null,"mod3/mod4.py ",r.createElement(n.strong,null,"packag"),' = "mod3"'),"\n"),"\n",r.createElement(n.p,null,"で"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"mod3/",r.createElement(n.strong,null,"init"),".py. ",r.createElement(n.strong,null,"packag"),' = "mod3"'),"\n",r.createElement(n.li,null,"mod3/mod4.py. ",r.createElement(n.strong,null,"packag"),' = "mod3"'),"\n"),"\n",r.createElement(n.p,null,"のみが ",r.createElement(n.code,null,"from . import mod4")," 等の相対インポートが可能だった。\n他は、"),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"ImportError: attempted relative import with no known parent package\n")),"\n",r.createElement(n.p,null,"が出る。\nつまり、",r.createElement(n.code,null,"__packag__"),' が None(エントリポイント) もしくは ""(エントリポイントと同じ階層) であると相対インポートができない。'),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"python mod3/__init__.py")," とすると、"),"\n",r.createElement(n.ul,null,"\n",r.createElement(n.li,null,"mod3/",r.createElement(n.strong,null,"init"),".py. ",r.createElement(n.strong,null,"packag")," = None"),"\n",r.createElement(n.li,null,"mod3/mod4.py. ",r.createElement(n.strong,null,"packag"),' = ""'),"\n"),"\n",r.createElement(n.p,null,"と変化して、相対 import ができない。"),"\n",r.createElement(n.p,null,"💩仕様。"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?r.createElement(n,e,r.createElement(a,e)):a(e)};t(8678);function m(e){let{data:n,children:t}=e;return r.createElement(r.Fragment,null,r.createElement("h1",null,n.mdx.frontmatter.title),r.createElement(l.Zo,null,t))}function o(e){return r.createElement(m,e,r.createElement(c,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return m},ah:function(){return a}});var l=t(7294);const r=l.createContext({});function a(e){const n=l.useContext(r);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const c={};function m({components:e,children:n,disableParentContext:t}){let m;return m=t?"function"==typeof e?e({}):e||c:a(e),l.createElement(r.Provider,{value:m},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-import-md-da77bc5d9067ec04575b.js.map