"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[126],{4984:function(e,n,r){r.r(n),r.d(n,{default:function(){return d}});var t=r(1151),a=r(7294);function l(e){const n=Object.assign({p:"p",span:"span",code:"code"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"MediaSink で DXVA を使うには。"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer"),"\n",a.createElement(n.p,null,"解読の後半。\nDXVA が何かということについてはぼんやりとしているのだけれど、VideoSample のバッファーに D3D のテクスチャを使うということぽい。"),"\n",a.createElement(n.p,null,"DirectX Surface Buffer"),"\n",a.createElement(n.p,null,"ということは Pipeline のどこかのタイミングで CPU 上の bitmap を CreateTexture して GPU に移動するのだけど、Decoder なり Renderer なりのなるべく上流で GPU に上げた方がうれしいという話。\nID3D11Device を MediaSession に供給する\nPipeline でテクスチャをやりとりするのだからデバイスを共有しましょうと。MediaSession の場合は、レンダラがデバイスを作成して IMFDXGIDeviceManager を公開する。\n公開するのは IMFGetService を通してぽい。\nこの辺。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">HRESULT DX11VideoRenderer::CMediaSink::GetService(__RPC__in REFGUID guidService, __RPC__in REFIID riid, __RPC__deref_out_opt LPVOID* ppvObject)\n{\n    HRESULT hr = S_OK;\n\n    if (guidService == MF_RATE_CONTROL_SERVICE)\n    {\n        hr = QueryInterface(riid, ppvObject);\n    }\n    else if (guidService == MR_VIDEO_RENDER_SERVICE)\n    {\n        hr = m_pPresenter-&gt;QueryInterface(riid, ppvObject);\n    }\n    else if (guidService == MR_VIDEO_ACCELERATION_SERVICE)\n    {\n        // ここからIMFDXGIDeviceManagerを得る\n        hr = m_pPresenter-&gt;GetService(guidService, riid, ppvObject);\n    }\n    else\n    {\n        hr = MF_E_UNSUPPORTED_SERVICE;\n    }\n\n    return hr;\n}</code></pre></div>'}}),"\n",a.createElement(n.p,null,"実験\nまだ IMFGetService を実装していない VideoRenderer で、\nProcessSample に入ってくる IMFSample から IMFDXGIBuffer が取得できるか試してみよう。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">DWORD cBuffers = 0;\nauto hr = pSample-&gt;GetBufferCount(&amp;cBuffers);\nif (FAILED(hr))\n{\n    return hr;\n}\n\nMicrosoft::WRL::ComPtr&lt;IMFMediaBuffer&gt; pBuffer;\nif (1 == cBuffers)\n{\n    hr = pSample-&gt;GetBufferByIndex(0, &amp;pBuffer);\n}\nelse\n{\n    hr = pSample-&gt;ConvertToContiguousBuffer(&amp;pBuffer);\n}\nif (FAILED(hr))\n{\n    return hr;\n}\n\nMicrosoft::WRL::ComPtr&lt;IMFDXGIBuffer&gt; pDXGIBuffer;\nhr = pBuffer.As(&amp;pDXGIBuffer);\nif (FAILED(hr))\n{\n    // ここに来た\n    return hr;\n}\n\nMicrosoft::WRL::ComPtr&lt;ID3D11Texture2D&gt; pTexture2D;\nhr = pDXGIBuffer-&gt;GetResource(IID_PPV_ARGS(&amp;pTexture2D));\nif (FAILED(hr))\n{\n    return hr;\n}</code></pre></div>'}}),"\n",a.createElement(n.p,null,"実験２\nStreamSink に IMFGetService を実装した。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">// IMFGetService\nSTDMETHODIMP GetService(__RPC__in REFGUID guidService, __RPC__in REFIID riid, __RPC__deref_out_opt LPVOID* ppvObject)override\n{\n    HRESULT hr = S_OK;\n\n    if (guidService == MR_VIDEO_ACCELERATION_SERVICE)\n    {\n        if (riid == __uuidof(IMFDXGIDeviceManager))\n        {\n            if (NULL != m_pDXGIManager)\n            {\n                *ppvObject = (void*) static_cast&lt;IUnknown*&gt;(m_pDXGIManager);\n                ((IUnknown*)*ppvObject)-&gt;AddRef();\n            }\n            else\n            {\n                hr = E_NOINTERFACE;\n            }\n        }\n        else\n        {\n            hr = E_NOINTERFACE;\n        }\n    }\n    else\n    {\n        hr = MF_E_UNSUPPORTED_SERVICE;\n    }\n\n    return hr;\n}</code></pre></div>'}}),"\n",a.createElement(n.p,null,"IMFSample から ID3D11Texture2D を取得できた。\n上流が、DXVA 化されて Sample のバッファがテクスチャになった。\nどんなテクスチャなのか\nArraySize = 13\nFormat = DXGI_FORMAT_NV12"),"\n",a.createElement(n.p,null,"中身がよくわからぬ。\nDecode された yuv フレームを Swapchain にコピーする"),"\n",a.createElement(n.p,null,"deinterlace\nYUV To RGB\nサイズ調整"),"\n",a.createElement(n.p,null,"等をしてデコード済みのフレームを RGB 画像にする工程。\n２種類の実装がある。"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/cpp/Presenter.cpp"),"\n",a.createElement(n.p,null,"の以下の部分。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">if (m_useXVP)\n{\n    BOOL bInputFrameUsed = FALSE;\n\n    hr = ProcessFrameUsingXVP( pCurrentType, pSample, pTexture2D, rcDest, ppOutputSample, &amp;bInputFrameUsed );\n\n    if (SUCCEEDED(hr) &amp;&amp; !bInputFrameUsed)\n    {\n        *pbProcessAgain = TRUE;\n    }\n}\nelse\n{\n    hr = ProcessFrameUsingD3D11( pTexture2D, pEVTexture2D, dwViewIndex, dwEVViewIndex, rcDest, *punInterlaceMode, ppOutputSample );\n\n    // 省略\n}</code></pre></div>'}}),"\n",a.createElement(n.p,null,"どちらでもだいたい同じ動きになると思う。\nProcessFrameUsingXVP"),"\n",a.createElement(n.p,null,"Video Processor MFT"),"\n",a.createElement(n.p,null,"初期化時に IDXGIDeviceManager を直接渡して DXVA を有効にしている。"),"\n",a.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="c++"><pre class="language-c++"><code class="language-c++">hr = CoCreateInstance(CLSID_VideoProcessorMFT, nullptr, CLSCTX_INPROC_SERVER, IID_IMFTransform, (void**)&amp;m_pXVP);\nif (FAILED(hr))\n{\n    break;\n}\n\n// MFTにDirectXを渡す\nhr = m_pXVP-&gt;ProcessMessage(MFT_MESSAGE_SET_D3D_MANAGER, ULONG_PTR(m_pDXGIManager));\nif (FAILED(hr))\n{\n    break;\n}</code></pre></div>'}}),"\n",a.createElement(n.p,null,"Texture の入ったサンプルを処理して、Texture の入ったサンプルに出力できる。\nProcessFrameUsingD3D11\nD3D11VideoDevice を使う。\nこっちの方が手順が長くて大変。\nおそらく、VideoProcessorMFT は D3D11VideoDevice を使って実装していてこちらの方がローレベルなのであろう。\nDecode\nAPI の説明としてはこれ。"),"\n",a.createElement(n.p,null,"Supporting Direct3D 11 Video Decoding in Media Foundation"),"\n",a.createElement(n.p,null,"DX11VideoRenderer サンプルでは、直接使っていない。\nVideo Processing\nDX11VideoRenderer サンプルでは、D3D11VideoDevice を最後の色変換等で使っている。"),"\n",a.createElement(n.p,null,"DXVA Video Processing"),"\n",a.createElement(n.p,null,"Video Process Blit"),"\n",a.createElement(n.p,null,"DXVA2.0+D3D9 のドキュメントぽい。\nD3D11 ではこの関数。"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"D3D11VideoContext::VideoProcessorBlt")))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(l,e)):l(e)},i=r(8678),s=r(4160),p=r(8736);const u={code:e=>{let{children:n,className:r}=e;return r?a.createElement(p.Z,{className:r},n):a.createElement("code",null,n)}};function o(e){let{data:n,children:r}=e;const l=n.mdx.frontmatter;return a.createElement(i.Z,null,a.createElement("h1",null,l.title),a.createElement("div",{className:"tags-index"},l.tags&&l.tags.length>0&&l.tags.map((e=>a.createElement(s.rU,{to:"/tags/"+e+"/",itemProp:"url"},a.createElement("button",null,e))))),a.createElement(t.Zo,{components:u},r))}function d(e){return a.createElement(o,e,a.createElement(c,e))}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-content-posts-2017-08-mediasink-use-dxva-md-86c2c3618a4e29e1b964.js.map