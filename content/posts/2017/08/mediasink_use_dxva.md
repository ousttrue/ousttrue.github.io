---
title: "MediaSinkでDXVA"
date: 2017-08-28
taxonomies: {tags: []}
---

MediaSinkでDXVAを使うには。


https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer

解読の後半。
DXVAが何かということについてはぼんやりとしているのだけれど、VideoSampleのバッファーにD3Dのテクスチャを使うということぽい。

DirectX Surface Buffer

ということはPipelineのどこかのタイミングでCPU上のbitmapをCreateTextureしてGPUに移動するのだけど、DecoderなりRendererなりのなるべく上流でGPUに上げた方がうれしいという話。
ID3D11DeviceをMediaSessionに供給する
Pipelineでテクスチャをやりとりするのだからデバイスを共有しましょうと。MediaSessionの場合は、レンダラがデバイスを作成してIMFDXGIDeviceManagerを公開する。
公開するのはIMFGetServiceを通してぽい。
この辺。
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

実験
まだIMFGetServiceを実装していないVideoRendererで、
ProcessSampleに入ってくるIMFSampleからIMFDXGIBufferが取得できるか試してみよう。
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

実験２
StreamSinkにIMFGetServiceを実装した。
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

IMFSampleからID3D11Texture2Dを取得できた。
上流が、DXVA化されてSampleのバッファがテクスチャになった。
どんなテクスチャなのか
ArraySize = 13
Format = DXGI_FORMAT_NV12

中身がよくわからぬ。
DecodeされたyuvフレームをSwapchainにコピーする

deinterlace
YUV To RGB
サイズ調整

等をしてデコード済みのフレームをRGB画像にする工程。
２種類の実装がある。

https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/cpp/Presenter.cpp

の以下の部分。
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

どちらでもだいたい同じ動きになると思う。
ProcessFrameUsingXVP

Video Processor MFT

初期化時にIDXGIDeviceManagerを直接渡してDXVAを有効にしている。
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

Textureの入ったサンプルを処理して、Textureの入ったサンプルに出力できる。
ProcessFrameUsingD3D11
D3D11VideoDeviceを使う。
こっちの方が手順が長くて大変。
おそらく、VideoProcessorMFTはD3D11VideoDeviceを使って実装していてこちらの方がローレベルなのであろう。
Decode
APIの説明としてはこれ。

Supporting Direct3D 11 Video Decoding in Media Foundation

DX11VideoRendererサンプルでは、直接使っていない。
Video Processing
DX11VideoRendererサンプルでは、D3D11VideoDeviceを最後の色変換等で使っている。

DXVA Video Processing

Video Process Blit


DXVA2.0+D3D9のドキュメントぽい。
D3D11ではこの関数。

D3D11VideoContext::VideoProcessorBlt

