"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2082],{6640:function(e,n,l){l.r(n),l.d(n,{default:function(){return o}});var t=l(1151),c=l(7294);function r(e){const n=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",ul:"ul",li:"li",h3:"h3"},(0,t.ah)(),e.components);return c.createElement(c.Fragment,null,c.createElement(n.h1,null,"zig その2"),"\n",c.createElement(n.p,null,"再度使ってみるべく環境整備から。"),"\n",c.createElement(n.h2,null,"zls の master を使う"),"\n",c.createElement(n.p,null,"どうやら @import std 以外がうまく動かないらしく、 最新版を試してみたい。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,'const glfw = @import("glfw");\n')),"\n",c.createElement(n.p,null,"https://ziglang.org/download/ からダウンロードするべし。"),"\n",c.createElement(n.h2,null,"いちおう build を 試みた"),"\n",c.createElement(n.p,null,"zls の最新判を試すには、 zig の最新版(0.9.1じゃなくてmaster)が必要。\nzig のビルドには static build の llvm-13 が必要。\nWindows では頓挫した。\nしかし、最近 gentoo を育成しているのでこっちでやってみる。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"cmake -B build -S .\n")),"\n",c.createElement(n.p,null,"してみたが、最後にリンクエラーが出る。"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"undefined reference to clang::SourceManager::getFilename\n")),"\n",c.createElement(n.p,null,"しかし、 gentoo の emerge に ",c.createElement(n.code,null,"dev-lang/zig-9999")," があった。\nこれを使って zls がビルドできた。\n",c.createElement(n.code,null,"glfw")," のインテリセンスも動作した。"),"\n",c.createElement(n.h2,null,"zig master(0.10) が変わっていて zls と gyro のビルドが通らない。"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/ziglang/zig/commit/a0a2ce92ca129d28e22c63f7bace1672c43776b5"),"\n"),"\n",c.createElement(n.h3,null,"zls"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/zigtools/zls/pull/481"),"\n"),"\n",c.createElement(n.h3,null,"gyro"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"std.ChildProcess.init")," のところ。"),"\n",c.createElement(n.h2,null,"OpenGL やってく"),"\n",c.createElement(n.ul,null,"\n",c.createElement(n.li,null,"https://github.com/hexops/mach-glfw"),"\n"),"\n",c.createElement(n.p,null,"を起点にやってみる。\n前回は ",c.createElement(n.code,null,"@cImport")," を使っているサンプルでインテリセンス効かなくて、続かなかった。\n",c.createElement(n.code,null,"@import")," + ",c.createElement(n.code,null,"最新版zls")," で進めていけば慣れるかな。"),"\n",c.createElement(n.h2,null,"gyro の使いかた"),"\n",c.createElement(n.p,null,c.createElement(n.code,null,"202204")," 現在だと、 gyro で import すると zls が解決できないような気がする。"),"\n",c.createElement(n.h3,null,"add package"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"gyro add --src github hexops/mach-glfw --root src/main.zig --alias glfw\n")),"\n",c.createElement(n.h3,null,"dep package"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"gyro add --build-dep --src github hexops/mach-glfw --root build.zig --alias build-glfw\n")),"\n",c.createElement(n.h3,null,"use package"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-zig"},'const glfw = @import("glfw");\n')),"\n",c.createElement(n.h3,null,"build.zig"),"\n",c.createElement(n.pre,null,c.createElement(n.code,{className:"language-zig"},'const pkgs = @import("deps.zig").pkgs;\nconst glfw = @import("build-glfw");\n\npub fn build(b: *Builder) void {\n    ...\n\n    exe.addPackage(pkgs.glfw);\n    glfw.link(b, exe, .{});\n}\n')),"\n",c.createElement(n.h3,null,"zgl"),"\n",c.createElement(n.p,null,"libepoxy"),"\n",c.createElement(n.pre,null,c.createElement(n.code,null,"gyro add --src github ziglibs/zgl --root zgl.zig --alias gl\n")))}var a=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?c.createElement(n,e,c.createElement(r,e)):r(e)};l(8678);function u(e){let{data:n,children:l}=e;return c.createElement(c.Fragment,null,c.createElement("h1",null,n.mdx.frontmatter.title),c.createElement(t.Zo,null,l))}function o(e){return c.createElement(u,e,c.createElement(a,e))}},8678:function(e,n,l){l(7294)},1151:function(e,n,l){l.d(n,{Zo:function(){return u},ah:function(){return r}});var t=l(7294);const c=t.createContext({});function r(e){const n=t.useContext(c);return t.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const a={};function u({components:e,children:n,disableParentContext:l}){let u;return u=l?"function"==typeof e?e({}):e||a:r(e),t.createElement(c.Provider,{value:u},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2022-0428-zig-2-md-7ecb5fcde36d828ff17f.js.map