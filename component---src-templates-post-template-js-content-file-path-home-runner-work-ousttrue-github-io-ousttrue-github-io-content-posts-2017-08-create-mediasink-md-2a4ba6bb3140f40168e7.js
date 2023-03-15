"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1361],{6850:function(e,n,t){t.r(n),t.d(n,{default:function(){return d}});var r=t(1151),a=t(7294);function i(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"DX11VideoRenderer を解読して、VideoRenderer 要件を探る。"),"\n",a.createElement(n.p,null,"Microsoft のサンプルがあり参考になる。"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer"),"\n",a.createElement(n.p,null,"これは結構がっつり作ってあるので、削って最低限必要な要素を探る。\nIMFMediaSink を作る\n手抜きして IMFActivate 抜きで。\nhttps://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/DX11VideoRenderer/c++/DX11VideoRenderer.h\nを参考に最低限を実装してみる。\nguidgen.exe で guid を決めた。\nCustomVideoRenderer.h"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},'#pragma once\n#include <windows.h>\n\n// {8C5C51AD-F400-4B2A-BD36-4990D07420B4}\nDEFINE_GUID(CLSID_CustomVideoRenderer,\n0x8c5c51ad, 0xf400, 0x4b2a, 0xbd, 0x36, 0x49, 0x90, 0xd0, 0x74, 0x20, 0xb4);\n\nSTDAPI CreateCustomVideoRenderer(REFIID riid, void **ppvObject);\n\nDX11VideoRendererから必要な部分をコピペしてくるだけである。\nCustomVideoRenderer.c++\n#include "CustomVideoRenderer.h"\n#include <mfidl.h>\n\n\nclass CustomVideoRenderer: public IMFMediaSink\n{\n    ULONG m_nRefCount = 1;\n\npublic:\n    // IUnknown\n    STDMETHODIMP_(ULONG) AddRef(void)override\n    {\n        return InterlockedIncrement(&m_nRefCount);\n    }\n\n    STDMETHODIMP QueryInterface(REFIID iid, __RPC__deref_out _Result_nullonfailure_ void** ppv)override\n    {\n        if (!ppv)\n        {\n            return E_POINTER;\n        }\n        if (iid == IID_IUnknown)\n        {\n            *ppv = static_cast<IUnknown*>(static_cast<IMFMediaSink*>(this));\n        }\n        else if (iid == __uuidof(IMFMediaSink))\n        {\n            *ppv = static_cast<IMFMediaSink*>(this);\n        }\n        else\n        {\n            *ppv = NULL;\n            return E_NOINTERFACE;\n        }\n        AddRef();\n        return S_OK;\n    }\n\n    STDMETHODIMP_(ULONG) Release(void)override\n    {\n        ULONG uCount = InterlockedDecrement(&m_nRefCount);\n        if (uCount == 0)\n        {\n            delete this;\n        }\n        // For thread safety, return a temporary variable.\n        return uCount;\n    }\n\n    // IMFMediaSink methods\n    STDMETHODIMP AddStreamSink(DWORD dwStreamSinkIdentifier, __RPC__in_opt IMFMediaType* pMediaType, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;\n    STDMETHODIMP GetCharacteristics(__RPC__out DWORD* pdwCharacteristics)override;\n    STDMETHODIMP GetPresentationClock(__RPC__deref_out_opt IMFPresentationClock** ppPresentationClock)override;\n    STDMETHODIMP GetStreamSinkById(DWORD dwIdentifier, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;\n    STDMETHODIMP GetStreamSinkByIndex(DWORD dwIndex, __RPC__deref_out_opt IMFStreamSink** ppStreamSink)override;\n    STDMETHODIMP GetStreamSinkCount(__RPC__out DWORD* pcStreamSinkCount)override;\n    STDMETHODIMP RemoveStreamSink(DWORD dwStreamSinkIdentifier)override;\n    STDMETHODIMP SetPresentationClock(__RPC__in_opt IMFPresentationClock* pPresentationClock)override;\n    STDMETHODIMP Shutdown(void)override;\n};\n\n\nSTDAPI CreateCustomVideoRenderer(REFIID riid, void **ppvObject)\n{\n    if(!ppvObject){\n        return E_FAIL;\n    }\n\n    auto sink=new CustomVideoRenderer();\n    *ppvObject=sink;\n    return S_OK;\n}\n\n使う\nIMFStreamSinkからIMFTopologyNodeを作る。\n\nCreating Output Nodes\n\n    Microsoft::WRL::ComPtr<IMFTopologyNode> pOutputNode;\n    if(FAILED(hr = MFCreateTopologyNode(MF_TOPOLOGY_OUTPUT_NODE, &pOutputNode)))\n    {\n        return hr;\n    }\n\n    Microsoft::WRL::ComPtr<IMFMediaSink> pSink;\n    // 自前のIMFMediaSinkを作る\n    if(FAILED(hr=CreateCustomVideoRenderer(IID_PPV_ARGS(&pSink)))){\n        return hr;\n    }\n\n    Microsoft::WRL::ComPtr<IMFStreamSink> pSSink;\n    if(FAILED(hr=pSink->GetStreamSinkByIndex(0, &pSSink))){\n        // まだ作っていないのでここでエラーになる\n        return hr;\n    }\n\n    if (FAILED(hr = pOutputNode->SetObject(pSSink.Get())))\n    {\n        return hr;\n    }\n')),"\n",a.createElement(n.p,null,"IMFStreamSink がひとつは必要\n作る。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"class CustomVideoStreamSink: public IMFStreamSink\n{\n    ULONG m_nRefCount = 1;\n\n    const DWORD                 STREAM_ID;\n    CCritSec&                   m_critSec;                      // critical section for thread safety\n    Microsoft::WRL::ComPtr<IMFMediaSink>               m_pSink;\n\npublic:\n    CustomVideoStreamSink(DWORD dwStreamId, CCritSec& critSec\n            , IMFMediaSink *parent)\n        : STREAM_ID(dwStreamId)\n          , m_critSec(critSec)\n          , m_pSink(parent)\n    {\n    }\n\n    // IUnknown\n    STDMETHODIMP_(ULONG) AddRef(void)override;\n    STDMETHODIMP QueryInterface(REFIID iid, __RPC__deref_out _Result_nullonfailure_ void** ppv)override;\n    STDMETHODIMP_(ULONG) Release(void)override;\n\n    // IMFStreamSink\n    STDMETHODIMP Flush(void)override;\n    STDMETHODIMP GetIdentifier(__RPC__out DWORD* pdwIdentifier)override;\n    STDMETHODIMP GetMediaSink(__RPC__deref_out_opt IMFMediaSink** ppMediaSink)override;\n    STDMETHODIMP GetMediaTypeHandler(__RPC__deref_out_opt IMFMediaTypeHandler** ppHandler)override;\n    STDMETHODIMP PlaceMarker(MFSTREAMSINK_MARKER_TYPE eMarkerType, __RPC__in const PROPVARIANT* pvarMarkerValue, __RPC__in const PROPVARIANT* pvarContextValue)override;\n    STDMETHODIMP ProcessSample(__RPC__in_opt IMFSample* pSample)override;\n\n    // IMFMediaEventGenerator (from IMFStreamSink)\n    STDMETHODIMP BeginGetEvent(IMFAsyncCallback* pCallback,IUnknown* punkState)override;\n    STDMETHODIMP EndGetEvent(IMFAsyncResult* pResult, _Out_ IMFMediaEvent** ppEvent)override;\n    STDMETHODIMP GetEvent(DWORD dwFlags, __RPC__deref_out_opt IMFMediaEvent** ppEvent)override;\n    STDMETHODIMP QueueEvent(MediaEventType met, __RPC__in REFGUID guidExtendedType, HRESULT hrStatus, __RPC__in_opt const PROPVARIANT* pvValue)override;\n};\n")),"\n",a.createElement(n.p,null,"メソッドの中身は"),"\n",a.createElement(n.p,null,a.createElement(n.code,null,"return E_FAIL;")),"\n",a.createElement(n.p,null,"でお茶を濁した。"),"\n",a.createElement(n.p,null,"IMFMediaSink::AddStreamSink 実装\nIMFMediaSink::GetStreamSinkById 実装\nIMFMediaSink::GetStreamSinkByIndex 実装\nIMFMediaSink::GetStreamSinkCount 実装\nIMFMediaSink::RemoveStreamSink 実装\n実行してみる。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},'// Handler for Media Session events.\nvoid OnPlayerEvent(HWND hwnd, WPARAM pUnkPtr)\n{\n    HRESULT hr = g_pPlayer->HandleEvent(pUnkPtr);\n    if (FAILED(hr))\n    {\n        // ここに来る\n        NotifyError(hwnd, L"An error occurred.", hr);\n    }\n    UpdateUI(hwnd, g_pPlayer->GetState());\n}\n\n    // Get the event status. If the operation that triggered the event\n    // did not succeed, the status is a failure code.\n    HRESULT hrStatus = S_OK;\n    hr = pEvent->GetStatus(&hrStatus);\n\n    // Check if the async operation succeeded.\n    if (SUCCEEDED(hr) && FAILED(hrStatus))\n    {\n        // ここに来る\n        hr=hrStatus;\n    }\n')),"\n",a.createElement(n.p,null,"デバッガで調べたら IMFStreamSink::GetMediaSink の直後にエラーになることがわかった。\nIMFStreamSink::GetMediaSink 実装\nたんたんとエラーを直していく。\nIMFStreamSink::GetMediaTypeHandler 実装"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"HRESULT DX11VideoRenderer::CStreamSink::GetMediaTypeHandler(__RPC__deref_out_opt IMFMediaTypeHandler** ppHandler)\n{\n    CAutoLock lock(&m_critSec);\n\n    if (ppHandler == NULL)\n    {\n        return E_POINTER;\n    }\n\n    HRESULT hr = CheckShutdown();\n\n    // This stream object acts as its own type handler, so we QI ourselves.\n    if (SUCCEEDED(hr))\n    {\n        hr = this->QueryInterface(IID_IMFMediaTypeHandler, (void**)ppHandler);\n    }\n\n    return hr;\n}\n")),"\n",a.createElement(n.p,null,"IMFMediaTypeHandler が必要。\nStreamSink に IMFMediaTypeHandler を実装\nこのインタフェースは StreamSink が処理できる MediaType を示すので必要。\nサポートするフォーマットを決める。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"// IMFMediaTypeHandler\nSTDMETHODIMP GetCurrentMediaType(_Outptr_ IMFMediaType** ppMediaType);\nSTDMETHODIMP GetMajorType(__RPC__out GUID* pguidMajorType);\nSTDMETHODIMP GetMediaTypeByIndex(DWORD dwIndex, _Outptr_ IMFMediaType** ppType);\nSTDMETHODIMP GetMediaTypeCount(__RPC__out DWORD* pdwTypeCount);\nSTDMETHODIMP IsMediaTypeSupported(IMFMediaType* pMediaType, _Outptr_opt_result_maybenull_ IMFMediaType** ppMediaType);\nSTDMETHODIMP SetCurrentMediaType(IMFMediaType* pMediaType);\n\nPresentationClockが必要\n\nPresentation Clock\n\nIMFMediaSink::GetPresentationClock実装\nIMFMediaSink::SetPresentationClock実装\nMediaSinkにIMFClockStateSinkを実装\n// IMFClockStateSink methods\nSTDMETHODIMP OnClockPause(MFTIME hnsSystemTime);\nSTDMETHODIMP OnClockRestart(MFTIME hnsSystemTime);\nSTDMETHODIMP OnClockSetRate(MFTIME hnsSystemTime, float flRate);\nSTDMETHODIMP OnClockStart(MFTIME hnsSystemTime, LONGLONG llClockStartOffset);\nSTDMETHODIMP OnClockStop(MFTIME hnsSystemTime);\n")),"\n",a.createElement(n.p,null,"Data Flow\nここまでの実装で IMFSession::Start の呼び出しに応じて IMFClockStateSink::OnClockStart が呼ばれるようになった。\nData Flow"),"\n",a.createElement(n.p,null,"Media sinks use a pull model"),"\n",a.createElement(n.p,null,"MesiaSink 側からサンプルを取りに行かないといけない。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,null,"[1] The client sets the media types and the presentation clock. The media sink registers itself with the presentation clock to receive notifications about clock state changes.\n[2][3][4] はPreroll。ミニマムを目指す今回は省略。\n[5] The client calls IMFPresentationClock::Start to start the presentation clock.\n[6] The presentation clock notifies the media sink that the clock is starting, by calling IMFClockStateSink::OnClockStart.\n[7] To get more data, each stream sink sends MEStreamSinkRequestSample events. In response to each of these events, the client gets the next sample and calls ProcessSample. This step is repeated until the presentation ends.\n")),"\n",a.createElement(n.p,null,"State Changes\nIMFClockStateSink の実装について。"),"\n",a.createElement(n.p,null,"In addition, stream sinks must send the following events when they have completed the state transitions:"),"\n",a.createElement(n.p,null,"OnClockStart, OnClockRestart: MEStreamSinkStarted event\nOnClockPause: MEStreamSinkPaused event\nOnClockStop: MEStreamSinkStopped event"),"\n",a.createElement(n.p,null,"なるほど。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"STDMETHODIMP OnClockStart(MFTIME hnsSystemTime, LONGLONG llClockStartOffset)override\n{\n    CAutoLock lock(&m_csMediaSink);\n\n    HRESULT hr = CheckShutdown();\n    if (SUCCEEDED(hr))\n    {\n        //\n        // これが必要。このあとMEStreamSinkRequestSampleを受け付ける\n        //\n        hr = m_pStream->QueueEvent(MEStreamSinkStarted, GUID_NULL, hr, NULL);\n    }\n    if (SUCCEEDED(hr))\n    {\n        hr = m_pStream->QueueEvent(MEStreamSinkRequestSample, GUID_NULL, hr, NULL);\n    }\n\n    return hr;\n}\n")),"\n",a.createElement(n.p,null,"ついに IMFStreamSink::ProcessSample がコールされた。\n試しに下記のような実装にしてみたがこれでは Clock 無視で最速でフレームを消化してしまうのでだめ。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"int m_count = 0;\nSTDMETHODIMP ProcessSample(**RPC**in_opt IMFSample\\* pSample)override\n{\n++m_count;\n\n    auto hr = S_OK;\n    hr = QueueEvent(MEStreamSinkRequestSample, GUID_NULL, hr, NULL);\n\n    return hr;\n\n}\n")),"\n",a.createElement(n.p,null,"MEStreamSinkRequestSample をスケジューリングする"),"\n",a.createElement(n.p,null,"Scheduled Work Items"),"\n",a.createElement(n.p,null,"これを使ってみる。"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-cpp"},"BOOL NeedMoreSamples(void)\n{\n    const DWORD cSamplesInFlight = /*m_SamplesToProcess.GetCount() +*/ m_cOutstandingSampleRequests;\n\n    return cSamplesInFlight < SAMPLE_QUEUE_HIWATER_THRESHOLD;\n}\n\nHRESULT RequestSamples(IMFAsyncResult* pAsyncResult)\n{\n    HRESULT hr = S_OK;\n\n    while (NeedMoreSamples())\n    {\n        hr = CheckShutdown();\n        if (FAILED(hr))\n        {\n            break;\n        }\n\n        m_cOutstandingSampleRequests++;\n\n        hr = QueueEvent(MEStreamSinkRequestSample, GUID_NULL, S_OK, NULL);\n    }\n\n    // 再突入\n    hr=QueueRequest();\n\n    return hr;\n}\n\n// 正しいRateにする必要がある\nconst INT64 interval = 1000 / 30;\n\nHRESULT QueueRequest()\n{\n    HRESULT hr = S_OK;\n\n    if (SUCCEEDED(hr))\n    {\n        // Enqueue\n        MFWORKITEM_KEY cancelKey;\n        hr = MFScheduleWorkItem(&m_WorkQueueCB, nullptr, -interval, &cancelKey);\n    }\n\n    return hr;\n}\n\nint m_count = 0;\nSTDMETHODIMP ProcessSample(__RPC__in_opt IMFSample* pSample)override\n{\n    ++m_count;\n\n    m_cOutstandingSampleRequests--;\n\n    // do something\n\n    return  S_OK;\n}\n")),"\n",a.createElement(n.p,null,"DX11VideoRenderer::CScheduler を使えばよいと思う。\nだいたい仕組みがわかった。\nDX11VideoRenderer から引き算して最小限の構成にする(ProcessSample が何もしない)場合、\n以下の部品を残す必要がありそう。"),"\n",a.createElement(n.p,null,"Scheduler\nStreamSink: IMFStreamSink, IMFMediaTypeHandler\nMesiaSink: IMFMediaSink, IMFClockStateSink"))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?a.createElement(n,e,a.createElement(i,e)):i(e)};t(8678);function l(e){let{data:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(r.Zo,null,t))}function d(e){return a.createElement(l,e,a.createElement(o,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return l},ah:function(){return i}});var r=t(7294);const a=r.createContext({});function i(e){const n=r.useContext(a);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const o={};function l({components:e,children:n,disableParentContext:t}){let l;return l=t?"function"==typeof e?e({}):e||o:i(e),r.createElement(a.Provider,{value:l},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-08-create-mediasink-md-2a4ba6bb3140f40168e7.js.map