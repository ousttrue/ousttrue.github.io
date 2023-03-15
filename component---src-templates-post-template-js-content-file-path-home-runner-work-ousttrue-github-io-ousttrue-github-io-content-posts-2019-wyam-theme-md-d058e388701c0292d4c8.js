"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6104],{2122:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var l=n(1151),c=n(7294);function a(e){const t=Object.assign({p:"p",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",a:"a",blockquote:"blockquote",strong:"strong",h3:"h3"},(0,l.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(t.p,null,"cssとかの調整。"),"\n",c.createElement(t.h2,null,"調べる"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"https://wyam.io/docs/","\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"https://wyam.io/recipes/blog/themes/"),"\n",c.createElement(t.li,null,"https://wyam.io/docs/extensibility/creating-a-theme"),"\n",c.createElement(t.li,null,"https://wyam.io/docs/extensibility/customizing-themes"),"\n"),"\n"),"\n"),"\n",c.createElement(t.p,null,"ローカルにファイルを配置することでテーマをオーバーライドできると書いてあるのだが、\nどのように配置するか正確なところがわからん。"),"\n",c.createElement(t.p,null,"試行錯誤したところ、"),"\n",c.createElement(t.p,null,c.createElement(t.code,null,"input")," にテーマのファイルを直接コピーしたら反映された。"),"\n",c.createElement(t.p,null,c.createElement(t.code,null,"theme")," フォルダでもよさそうなのだけど、 ",c.createElement(t.code,null,"input")," しか ",c.createElement(t.code,null,"--watch")," の対象にならないので、\n",c.createElement(t.code,null,"input")," に入れてしまうのがよさそう。"),"\n",c.createElement(t.pre,null,c.createElement(t.code,null,"input\n  + assets\n  + _Layout.cshtml\n")),"\n",c.createElement(t.h2,null,"レイアウトの構成"),"\n",c.createElement(t.p,null,"ASP.Net のtemplateエンジン、 ",c.createElement(t.a,{href:"https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-2.2"},"Razor")," で構成されていて拡張子は、 ",c.createElement(t.code,null,"cshtml")," 。"),"\n",c.createElement(t.p,null,"ファイル名は、",c.createElement(t.a,{href:"https://wyam.io/recipes/blog/overview"},"Blog Recipe"),"が規定している。"),"\n",c.createElement(t.p,null,"サイトのルート(index), 各記事(post), 記事一覧(archive, tag), タグ一覧(tags)などがある。単純な例はこれ。"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"https://github.com/Wyamio/Wyam/tree/develop/themes/Blog/BlogTemplate"),"\n"),"\n",c.createElement(t.h2,null,"テーマを作ってみる"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"https://github.com/Wyamio/Wyam.git"),"\n"),"\n",c.createElement(t.p,null,"をクローンして、",c.createElement(t.code,null,"themes/Blog/BlogTemplate/*")," を ",c.createElement(t.code,null,"input")," にコピーする。\nconfig.yml も ",c.createElement(t.code,null,"#theme BlogTemplate")," とする。"),"\n",c.createElement(t.p,null,"共通のレイアウトが ",c.createElement(t.code,null,"_Layout.cshtml")," 。 その中の、 ",c.createElement(t.code,null,"@RenderBody()")," にルート(_Index.cshtml), 記事(_PostLayout.cshtml), 記事一覧(_Archive.cshtml, _Tag.cshtml), タグ一覧(_Tags.cshtml)がはめ込まれる様子。"),"\n",c.createElement(t.p,null,c.createElement(t.code,null,"_PostIndex.cshtml")," は廃止されたので使われない。"),"\n",c.createElement(t.blockquote,null,"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,c.createElement(t.strong,null,"[Breaking Change]"),"[Refactoring] Moved Blog recipe theme file ",c.createElement(t.code,null,"/_PostIndex.cshtml")," to ",c.createElement(t.code,null,"/_Archive.cshtml"),", no other changes should be needed to this file in themes other than to move it - sorry for the rename (again), the first name was kind of dumb, this one is better"),"\n"),"\n"),"\n",c.createElement(t.p,null,"日本語が文字化けするので、 ",c.createElement(t.code,null,"_Layout.cshtml")," に ",c.createElement(t.code,null,'<meta charset="UTF-8">')," だけ足す。\nあとは適当にやってみる。"),"\n",c.createElement(t.h2,null,"cshtml からアクセスできる変数"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"Model"),"\n",c.createElement(t.li,null,"Context"),"\n"),"\n",c.createElement(t.pre,null,c.createElement(t.code,{className:"language-cshtml"},'<a href="@Context.GetLink(Context.String(BlogKeys.PostsPath))">Back To posts</a>\n')),"\n",c.createElement(t.h2,null,"作業メモ"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"scss(wyamが対応している)"),"\n",c.createElement(t.li,null,"highlight.js (phantom themeからコピー)"),"\n",c.createElement(t.li,null,"旧記事を雑に復旧"),"\n",c.createElement(t.li,null,"locale https://wyam.io/docs/advanced/setting-the-culture"),"\n"),"\n",c.createElement(t.h3,null,"ToDo"),"\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"404頁"),"\n",c.createElement(t.li,null,"一覧をpageで分割"),"\n",c.createElement(t.li,null,"記事内のTOC","\n",c.createElement(t.ul,null,"\n",c.createElement(t.li,null,"https://github.com/Wyamio/Wyam/issues/29"),"\n",c.createElement(t.li,null,"https://blog.kabrt.cz/posts/2018-11-wyam-blog"),"\n"),"\n"),"\n",c.createElement(t.li,null,"https://konpa.github.io/devicon/"),"\n",c.createElement(t.li,null,"http://fizzed.com/oss/font-mfizz"),"\n",c.createElement(t.li,null,"https://www.digitaltapestry.net/posts/poshwyam"),"\n"),"\n",c.createElement(t.h2,null,"動作"),"\n",c.createElement(t.p,null,"複数のパイプラインが登録してあって(Recipe)、ひとつずつ実行する"),"\n",c.createElement(t.pre,null,c.createElement(t.code,null,"public IReadOnlyList<IDocument> Execute(ExecutionContext context, IEnumerable<IModule> modules, ImmutableArray<IDocument> inputDocuments\n\nforeach(var pipeline in pipelines)\n{\n  ExecutionPipeline.Execute\n}\n")))}var r=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,l.ah)(),e.components);return t?c.createElement(t,e,c.createElement(a,e)):a(e)};n(8678);function m(e){let{data:t,children:n}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,t.mdx.frontmatter.title),c.createElement(l.Zo,null,n))}function o(e){return c.createElement(m,e,c.createElement(r,e))}},8678:function(e,t,n){n(7294)},1151:function(e,t,n){n.d(t,{Zo:function(){return m},ah:function(){return a}});var l=n(7294);const c=l.createContext({});function a(e){const t=l.useContext(c);return l.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const r={};function m({components:e,children:t,disableParentContext:n}){let m;return m=n?"function"==typeof e?e({}):e||r:a(e),l.createElement(c.Provider,{value:m},t)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2019-wyam-theme-md-d058e388701c0292d4c8.js.map