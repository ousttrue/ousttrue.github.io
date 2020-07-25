---
Title: "MediaSinkを実装する"
date: 2017-08-27
Tags: []
---

DX11VideoRendererを解読して、VideoRenderer要件を探る。

Microsoftのサンプルがあり参考になる。

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer

これは結構がっつり作ってあるので、削って最低限必要な要素を探る。
IMFMediaSinkを作る
手抜きしてIMFActivate抜きで。
https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/c++/DX11VideoRenderer.h
を参考に最低限を実装してみる。
guidgen.exeでguidを決めた。
CustomVideoRenderer.h
#pragma once
#include <windows.h>

// {8C5C51AD-F400-4B2A-BD36-4990D07420B4}
DEFINE_GUID(CLSID_CustomVideoRenderer, 
0x8c5c51ad, 0xf400, 0x4b2a, 0xbd, 0x36, 0x49, 0x90, 0xd0, 0x74, 0x20, 0xb4);

STDAPI CreateCustomVideoRenderer(REFIID riid, void **ppvObject);

DX11VideoRendererから必要な部分をコピペしてくるだけである。
CustomVideoRenderer.c++
#include "CustomVideoRenderer.h"
#include <mfidl.h>


class CustomVideoRenderer: public IMFMediaSink
{
    ULONG m_nRefCount = 1;

public:
    // IUnknown
    STDMETHODIMP_(ULONG) AddRef(void)override
    {
        return InterlockedIncrement(&m_nRefCount);
    }

    STDMETHODIMP QueryInterface(REFIID iid, __RPC__deref_out _Result_nullonfailure_ void** ppv)override
    {
        if (!ppv)
        {
            return E_POINTER;
        }
        if (iid == IID_IUnknown)
        {
            *ppv = static_cast<IUnknown*>(static_cast<IMFMediaSink*>(this));
        }
        else if (iid == __uuidof(IMFMediaSink))
        {
            *ppv = static_cast<IMFMediaSink*>(this);
        }
        else
        {
            *ppv = NULL;
            return E_NOINTERFACE;
        }
        AddRef();
        return S_OK;
    }

    STDMETHODIMP_(ULONG) Release(void)override
    {
        ULONG uCount = InterlockedDecrement(&m_nRefCount);
        if (uCount == 0)
        {
            delete this;
        }
        // For thread safety, return a temporary variable.
        return uCount;
    }

    // IMFMediaSink methods
    STDMETHODIMP AddStreamSink(DWORD dwStreamSinkIdentifier, __RPC__in_opt IMFMediaType* pMediaType, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;
    STDMETHODIMP GetCharacteristics(__RPC__out DWORD* pdwCharacteristics)override;
    STDMETHODIMP GetPresentationClock(__RPC__deref_out_opt IMFPresentationClock** ppPresentationClock)override;
    STDMETHODIMP GetStreamSinkById(DWORD dwIdentifier, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;
    STDMETHODIMP GetStreamSinkByIndex(DWORD dwIndex, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;
    STDMETHODIMP GetStreamSinkCount(__RPC__out DWORD* pcStreamSinkCount)override;
    STDMETHODIMP RemoveStreamSink(DWORD dwStreamSinkIdentifier)override;
    STDMETHODIMP SetPresentationClock(__RPC__in_opt IMFPresentationClock* pPresentationClock)override;
    STDMETHODIMP Shutdown(void)override;
};


STDAPI CreateCustomVideoRenderer(REFIID riid, void **ppvObject)
{
    if(!ppvObject){
        return E_FAIL;
    }

    auto sink=new CustomVideoRenderer();
    *ppvObject=sink;
    return S_OK;
}

使う
IMFStreamSinkからIMFTopologyNodeを作る。

Creating Output Nodes

    Microsoft::WRL::ComPtr<IMFTopologyNode> pOutputNode;
    if(FAILED(hr = MFCreateTopologyNode(MF_TOPOLOGY_OUTPUT_NODE, &pOutputNode)))
    {
        return hr;
    }

    Microsoft::WRL::ComPtr<IMFMediaSink> pSink;
    // 自前のIMFMediaSinkを作る
    if(FAILED(hr=CreateCustomVideoRenderer(IID_PPV_ARGS(&pSink)))){
        return hr;
    }

    Microsoft::WRL::ComPtr<IMFStreamSink> pSSink;
    if(FAILED(hr=pSink->GetStreamSinkByIndex(0, &pSSink))){
        // まだ作っていないのでここでエラーになる
        return hr;
    }

    if (FAILED(hr = pOutputNode->SetObject(pSSink.Get())))
    {
        return hr;
    }

IMFStreamSinkがひとつは必要
作る。
class CustomVideoStreamSink: public IMFStreamSink
{
    ULONG m_nRefCount = 1;

    const DWORD                 STREAM_ID;
    CCritSec&                   m_critSec;                      // critical section for thread safety
    Microsoft::WRL::ComPtr<IMFMediaSink>               m_pSink; 

public:
    CustomVideoStreamSink(DWORD dwStreamId, CCritSec& critSec
            , IMFMediaSink *parent)
        : STREAM_ID(dwStreamId)
          , m_critSec(critSec)
          , m_pSink(parent)
    {
    }

    // IUnknown
    STDMETHODIMP_(ULONG) AddRef(void)override;
    STDMETHODIMP QueryInterface(REFIID iid, __RPC__deref_out _Result_nullonfailure_ void** ppv)override;
    STDMETHODIMP_(ULONG) Release(void)override;

    // IMFStreamSink
    STDMETHODIMP Flush(void)override;
    STDMETHODIMP GetIdentifier(__RPC__out DWORD* pdwIdentifier)override;
    STDMETHODIMP GetMediaSink(__RPC__deref_out_opt IMFMediaSink** ppMediaSink)override;
    STDMETHODIMP GetMediaTypeHandler(__RPC__deref_out_opt IMFMediaTypeHandler** ppHandler)override;
    STDMETHODIMP PlaceMarker(MFSTREAMSINK_MARKER_TYPE eMarkerType, __RPC__in const PROPVARIANT* pvarMarkerValue, __RPC__in const PROPVARIANT* pvarContextValue)override;
    STDMETHODIMP ProcessSample(__RPC__in_opt IMFSample* pSample)override;

    // IMFMediaEventGenerator (from IMFStreamSink)
    STDMETHODIMP BeginGetEvent(IMFAsyncCallback* pCallback,IUnknown* punkState)override;
    STDMETHODIMP EndGetEvent(IMFAsyncResult* pResult, _Out_ IMFMediaEvent** ppEvent)override;
    STDMETHODIMP GetEvent(DWORD dwFlags, __RPC__deref_out_opt IMFMediaEvent** ppEvent)override;
    STDMETHODIMP QueueEvent(MediaEventType met, __RPC__in REFGUID guidExtendedType, HRESULT hrStatus, __RPC__in_opt const PROPVARIANT* pvValue)override;
};

メソッドの中身は
return E_FAIL;

でお茶を濁した。
IMFMediaSink::AddStreamSink実装
IMFMediaSink::GetStreamSinkById実装
IMFMediaSink::GetStreamSinkByIndex実装
IMFMediaSink::GetStreamSinkCount実装
IMFMediaSink::RemoveStreamSink実装
実行してみる。
// Handler for Media Session events.
void OnPlayerEvent(HWND hwnd, WPARAM pUnkPtr)
{
    HRESULT hr = g_pPlayer->HandleEvent(pUnkPtr);
    if (FAILED(hr))
    {
        // ここに来る
        NotifyError(hwnd, L"An error occurred.", hr);
    }
    UpdateUI(hwnd, g_pPlayer->GetState());
}

    // Get the event status. If the operation that triggered the event 
    // did not succeed, the status is a failure code.
    HRESULT hrStatus = S_OK;
    hr = pEvent->GetStatus(&hrStatus);

    // Check if the async operation succeeded.
    if (SUCCEEDED(hr) && FAILED(hrStatus)) 
    {
        // ここに来る
        hr=hrStatus;
    }

デバッガで調べたらIMFStreamSink::GetMediaSinkの直後にエラーになることがわかった。
IMFStreamSink::GetMediaSink実装
たんたんとエラーを直していく。
IMFStreamSink::GetMediaTypeHandler実装
HRESULT DX11VideoRenderer::CStreamSink::GetMediaTypeHandler(__RPC__deref_out_opt IMFMediaTypeHandler** ppHandler)
{
    CAutoLock lock(&m_critSec);

    if (ppHandler == NULL)
    {
        return E_POINTER;
    }

    HRESULT hr = CheckShutdown();

    // This stream object acts as its own type handler, so we QI ourselves.
    if (SUCCEEDED(hr))
    {
        hr = this->QueryInterface(IID_IMFMediaTypeHandler, (void**)ppHandler);
    }

    return hr;
}

IMFMediaTypeHandlerが必要。
StreamSinkにIMFMediaTypeHandlerを実装
このインタフェースはStreamSinkが処理できるMediaTypeを示すので必要。
サポートするフォーマットを決める。
// IMFMediaTypeHandler
STDMETHODIMP GetCurrentMediaType(_Outptr_ IMFMediaType** ppMediaType);
STDMETHODIMP GetMajorType(__RPC__out GUID* pguidMajorType);
STDMETHODIMP GetMediaTypeByIndex(DWORD dwIndex, _Outptr_ IMFMediaType** ppType);
STDMETHODIMP GetMediaTypeCount(__RPC__out DWORD* pdwTypeCount);
STDMETHODIMP IsMediaTypeSupported(IMFMediaType* pMediaType, _Outptr_opt_result_maybenull_ IMFMediaType** ppMediaType);
STDMETHODIMP SetCurrentMediaType(IMFMediaType* pMediaType);

PresentationClockが必要

Presentation Clock

IMFMediaSink::GetPresentationClock実装
IMFMediaSink::SetPresentationClock実装
MediaSinkにIMFClockStateSinkを実装
// IMFClockStateSink methods
STDMETHODIMP OnClockPause(MFTIME hnsSystemTime);
STDMETHODIMP OnClockRestart(MFTIME hnsSystemTime);
STDMETHODIMP OnClockSetRate(MFTIME hnsSystemTime, float flRate);
STDMETHODIMP OnClockStart(MFTIME hnsSystemTime, LONGLONG llClockStartOffset);
STDMETHODIMP OnClockStop(MFTIME hnsSystemTime);

Data Flow
ここまでの実装でIMFSession::Startの呼び出しに応じてIMFClockStateSink::OnClockStartが呼ばれるようになった。
Data Flow

Media sinks use a pull model

MesiaSink側からサンプルを取りに行かないといけない。

[1] The client sets the media types and the presentation clock. The media sink registers itself with the presentation clock to receive notifications about clock state changes.
[2][3][4] はPreroll。ミニマムを目指す今回は省略。
[5] The client calls IMFPresentationClock::Start to start the presentation clock.
[6] The presentation clock notifies the media sink that the clock is starting, by calling IMFClockStateSink::OnClockStart.
[7] To get more data, each stream sink sends MEStreamSinkRequestSample events. In response to each of these events, the client gets the next sample and calls ProcessSample. This step is repeated until the presentation ends.

State Changes
IMFClockStateSinkの実装について。

In addition, stream sinks must send the following events when they have completed the state transitions:


OnClockStart, OnClockRestart: MEStreamSinkStarted event
OnClockPause: MEStreamSinkPaused event
OnClockStop: MEStreamSinkStopped event

なるほど。
STDMETHODIMP OnClockStart(MFTIME hnsSystemTime, LONGLONG llClockStartOffset)override
{
    CAutoLock lock(&m_csMediaSink);

    HRESULT hr = CheckShutdown();
    if (SUCCEEDED(hr))
    {
        //
        // これが必要。このあとMEStreamSinkRequestSampleを受け付ける
        //
        hr = m_pStream->QueueEvent(MEStreamSinkStarted, GUID_NULL, hr, NULL);
    }
    if (SUCCEEDED(hr))
    {
        hr = m_pStream->QueueEvent(MEStreamSinkRequestSample, GUID_NULL, hr, NULL);
    }

    return hr;
}

ついにIMFStreamSink::ProcessSampleがコールされた。
試しに下記のような実装にしてみたがこれではClock無視で最速でフレームを消化してしまうのでだめ。
int m_count = 0;
STDMETHODIMP ProcessSample(__RPC__in_opt IMFSample* pSample)override
{
    ++m_count;

    auto hr = S_OK;
    hr = QueueEvent(MEStreamSinkRequestSample, GUID_NULL, hr, NULL);

    return hr;
}

MEStreamSinkRequestSampleをスケジューリングする

Scheduled Work Items

これを使ってみる。
BOOL NeedMoreSamples(void)
{
    const DWORD cSamplesInFlight = /*m_SamplesToProcess.GetCount() +*/ m_cOutstandingSampleRequests;

    return cSamplesInFlight < SAMPLE_QUEUE_HIWATER_THRESHOLD;
}

HRESULT RequestSamples(IMFAsyncResult* pAsyncResult)
{
    HRESULT hr = S_OK;

    while (NeedMoreSamples())
    {
        hr = CheckShutdown();
        if (FAILED(hr))
        {
            break;
        }

        m_cOutstandingSampleRequests++;

        hr = QueueEvent(MEStreamSinkRequestSample, GUID_NULL, S_OK, NULL);
    }

    // 再突入
    hr=QueueRequest();

    return hr;
}

// 正しいRateにする必要がある
const INT64 interval = 1000 / 30;

HRESULT QueueRequest()
{
    HRESULT hr = S_OK;

    if (SUCCEEDED(hr))
    {
        // Enqueue
        MFWORKITEM_KEY cancelKey;
        hr = MFScheduleWorkItem(&m_WorkQueueCB, nullptr, -interval, &cancelKey);
    }

    return hr;
}

int m_count = 0;
STDMETHODIMP ProcessSample(__RPC__in_opt IMFSample* pSample)override
{
    ++m_count;

    m_cOutstandingSampleRequests--;

    // do something

    return  S_OK;
}

DX11VideoRenderer::CSchedulerを使えばよいと思う。
だいたい仕組みがわかった。
DX11VideoRendererから引き算して最小限の構成にする(ProcessSampleが何もしない)場合、
以下の部品を残す必要がありそう。

Scheduler
StreamSink: IMFStreamSink, IMFMediaTypeHandler
MesiaSink: IMFMediaSink, IMFClockStateSink

