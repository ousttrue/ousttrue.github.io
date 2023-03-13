---
title: "MediaSinkでDXVA"
date: 2017-08-28
tags: []
---

MediaSink で DXVA を使うには。

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer

解読の後半。
DXVA が何かということについてはぼんやりとしているのだけれど、VideoSample のバッファーに D3D のテクスチャを使うということぽい。

DirectX Surface Buffer

ということは Pipeline のどこかのタイミングで CPU 上の bitmap を CreateTexture して GPU に移動するのだけど、Decoder なり Renderer なりのなるべく上流で GPU に上げた方がうれしいという話。
ID3D11Device を MediaSession に供給する
Pipeline でテクスチャをやりとりするのだからデバイスを共有しましょうと。MediaSession の場合は、レンダラがデバイスを作成して IMFDXGIDeviceManager を公開する。
公開するのは IMFGetService を通してぽい。
この辺。

```c++
HRESULT DX11VideoRenderer::CMediaSink::GetService(__RPC__in REFGUID guidService, __RPC__in REFIID riid, __RPC__deref_out_opt LPVOID* ppvObject)
{
    HRESULT hr = S_OK;

    if (guidService == MF_RATE_CONTROL_SERVICE)
    {
        hr = QueryInterface(riid, ppvObject);
    }
    else if (guidService == MR_VIDEO_RENDER_SERVICE)
    {
        hr = m_pPresenter->QueryInterface(riid, ppvObject);
    }
    else if (guidService == MR_VIDEO_ACCELERATION_SERVICE)
    {
        // ここからIMFDXGIDeviceManagerを得る
        hr = m_pPresenter->GetService(guidService, riid, ppvObject);
    }
    else
    {
        hr = MF_E_UNSUPPORTED_SERVICE;
    }

    return hr;
}
```

実験
まだ IMFGetService を実装していない VideoRenderer で、
ProcessSample に入ってくる IMFSample から IMFDXGIBuffer が取得できるか試してみよう。

```c++
DWORD cBuffers = 0;
auto hr = pSample->GetBufferCount(&cBuffers);
if (FAILED(hr))
{
    return hr;
}

Microsoft::WRL::ComPtr<IMFMediaBuffer> pBuffer;
if (1 == cBuffers)
{
    hr = pSample->GetBufferByIndex(0, &pBuffer);
}
else
{
    hr = pSample->ConvertToContiguousBuffer(&pBuffer);
}
if (FAILED(hr))
{
    return hr;
}

Microsoft::WRL::ComPtr<IMFDXGIBuffer> pDXGIBuffer;
hr = pBuffer.As(&pDXGIBuffer);
if (FAILED(hr))
{
    // ここに来た
    return hr;
}

Microsoft::WRL::ComPtr<ID3D11Texture2D> pTexture2D;
hr = pDXGIBuffer->GetResource(IID_PPV_ARGS(&pTexture2D));
if (FAILED(hr))
{
    return hr;
}
```

実験２
StreamSink に IMFGetService を実装した。

```c++
// IMFGetService
STDMETHODIMP GetService(__RPC__in REFGUID guidService, __RPC__in REFIID riid, __RPC__deref_out_opt LPVOID* ppvObject)override
{
    HRESULT hr = S_OK;

    if (guidService == MR_VIDEO_ACCELERATION_SERVICE)
    {
        if (riid == __uuidof(IMFDXGIDeviceManager))
        {
            if (NULL != m_pDXGIManager)
            {
                *ppvObject = (void*) static_cast<IUnknown*>(m_pDXGIManager);
                ((IUnknown*)*ppvObject)->AddRef();
            }
            else
            {
                hr = E_NOINTERFACE;
            }
        }
        else
        {
            hr = E_NOINTERFACE;
        }
    }
    else
    {
        hr = MF_E_UNSUPPORTED_SERVICE;
    }

    return hr;
}
```

IMFSample から ID3D11Texture2D を取得できた。
上流が、DXVA 化されて Sample のバッファがテクスチャになった。
どんなテクスチャなのか
ArraySize = 13
Format = DXGI_FORMAT_NV12

中身がよくわからぬ。
Decode された yuv フレームを Swapchain にコピーする

deinterlace
YUV To RGB
サイズ調整

等をしてデコード済みのフレームを RGB 画像にする工程。
２種類の実装がある。

https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/cpp/Presenter.cpp

の以下の部分。

```c++
if (m_useXVP)
{
    BOOL bInputFrameUsed = FALSE;

    hr = ProcessFrameUsingXVP( pCurrentType, pSample, pTexture2D, rcDest, ppOutputSample, &bInputFrameUsed );

    if (SUCCEEDED(hr) && !bInputFrameUsed)
    {
        *pbProcessAgain = TRUE;
    }
}
else
{
    hr = ProcessFrameUsingD3D11( pTexture2D, pEVTexture2D, dwViewIndex, dwEVViewIndex, rcDest, *punInterlaceMode, ppOutputSample );

    // 省略
}
```

どちらでもだいたい同じ動きになると思う。
ProcessFrameUsingXVP

Video Processor MFT

初期化時に IDXGIDeviceManager を直接渡して DXVA を有効にしている。

```c++
hr = CoCreateInstance(CLSID_VideoProcessorMFT, nullptr, CLSCTX_INPROC_SERVER, IID_IMFTransform, (void**)&m_pXVP);
if (FAILED(hr))
{
    break;
}

// MFTにDirectXを渡す
hr = m_pXVP->ProcessMessage(MFT_MESSAGE_SET_D3D_MANAGER, ULONG_PTR(m_pDXGIManager));
if (FAILED(hr))
{
    break;
}
```

Texture の入ったサンプルを処理して、Texture の入ったサンプルに出力できる。
ProcessFrameUsingD3D11
D3D11VideoDevice を使う。
こっちの方が手順が長くて大変。
おそらく、VideoProcessorMFT は D3D11VideoDevice を使って実装していてこちらの方がローレベルなのであろう。
Decode
API の説明としてはこれ。

Supporting Direct3D 11 Video Decoding in Media Foundation

DX11VideoRenderer サンプルでは、直接使っていない。
Video Processing
DX11VideoRenderer サンプルでは、D3D11VideoDevice を最後の色変換等で使っている。

DXVA Video Processing

Video Process Blit

DXVA2.0+D3D9 のドキュメントぽい。
D3D11 ではこの関数。

`D3D11VideoContext::VideoProcessorBlt`
