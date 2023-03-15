"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4368],{2345:function(n,e,t){t.r(e),t.d(e,{default:function(){return i}});var r=t(1151),a=t(7294);function o(n){const e=Object.assign({span:"span",p:"p"},(0,r.ah)(),n.components);return a.createElement(a.Fragment,null,a.createElement(e.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">タイトルが長いが、RenderingスレッドでC#関数を呼び出すと次回play時に固まるの続きです。\n\n前回の記事についてメールで指摘をいただきました。\n意訳\n\nmono_thread_detachすればいいよ\n\nなるほど、やってみよう。\nmono_thread_detachとは\n\nhttp://docs.go-mono.com/index.aspx?link=xhtml%3Adeploy%2Fmono-api-threads.html\n\nそいう関数があることはわかった。名前しか分からん。\n\nhttp://www.mono-project.com/docs/advanced/embedding/\nhttps://github.com/mono/mono/blob/master/docs/threading\n\nMonoをスクリプトエンジンとしてホスティングする場合に使うAPIらしい。\nMonoエンジンでC#のコードを実行する場合実行スレッドでは事前にスレッドの初期化をする必要があり、他所で作られた既存のスレッドを初期化するのがmono_thread_attachらしい。 mono_thread_attachされたスレッドはMonoの終了時に回収対象として登録されるが、これを解除するのがmono_thread_detachのようだ。\nやってみる\ndocumentが見つからなかったので、使われているコードを参考にしてみる。\n\nhttps://github.com/jart/freeswitch/blob/master/src/mod/languages/mod_managed/mod_managed.cpp\n\nusing System;\nusing System.Runtime.InteropServices;\nusing UnityEngine;\n\n\npublic class CallbackOnRenderThread : MonoBehaviour\n{\n    [DllImport("mono")]\n    static extern IntPtr mono_thread_current();\n\n    [DllImport("mono")]\n    static extern IntPtr mono_thread_detach(IntPtr p);\n\n    public int m_count;\n    public IntPtr m_renderThread;\n\n    void OnRender(int eventID)\n    {\n        m_count++;\n        m_renderThread = mono_thread_current();\n    }\n\n    private void OnApplicationQuit()\n    {\n        Debug.Log(m_count);\n\n        if (m_renderThread != IntPtr.Zero)\n        {\n            Debug.LogFormat("detach thread: {0}", m_renderThread);\n            mono_thread_detach(m_renderThread);\n            m_renderThread = IntPtr.Zero;\n        }\n    }\n\n    delegate void OnRenderFunc(int eventID);\n    OnRenderFunc m_callback;\n\n    void Update()\n    {\n        m_callback = new OnRenderFunc(OnRender);\n        var p = Marshal.GetFunctionPointerForDelegate(m_callback);\n        GL.IssuePluginEvent(p, 0);\n    }\n}\n\nCollecting from unknown threadと怒られる・・・\nならば、\npublic class CallbackOnRenderThread : MonoBehaviour\n{\n    [DllImport("mono")]\n    static extern IntPtr mono_thread_current();\n\n    [DllImport("mono")]\n    static extern IntPtr mono_thread_detach(IntPtr p);\n\n    public int m_count;\n    //public IntPtr m_renderThread;\n\n    void OnRender(int eventID)\n    {\n        try\n        {\n            m_count++;\n        }\n        finally\n        {\n            mono_thread_detach(mono_thread_current());\n        }\n    }\n\n    delegate void OnRenderFunc(int eventID);\n    OnRenderFunc m_callback;\n\n    void Update()\n    {\n        m_callback = new OnRenderFunc(OnRender);\n        var p = Marshal.GetFunctionPointerForDelegate(m_callback);\n        GL.IssuePluginEvent(p, 0);\n    }\n}</code></pre></div>'}}),"\n",a.createElement(e.p,null,"できちゃった。\nやったぜ。"))}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?a.createElement(e,n,a.createElement(o,n)):o(n)},d=(t(8678),t(8838));const l={code:n=>{let{children:e,className:t}=n;return t?a.createElement(d.Z,{className:t},e):a.createElement("code",null,e)}};function m(n){let{data:e,children:t}=n;return a.createElement(a.Fragment,null,a.createElement("h1",null,e.mdx.frontmatter.title),a.createElement(r.Zo,{components:l},t))}function i(n){return a.createElement(m,n,a.createElement(c,n))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-unity-mono-thread-md-d76830ad4a047cf3aaee.js.map