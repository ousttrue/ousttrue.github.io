---
Title: "WRLを使った最近のComプログラミング"
Published: 2017-9-8
Tags: ["c++", "com"]
---

古のATLのWindows8以降？版のWRLを使ってみる。

## IXMLHTTPRequest2を使うサンプルコードをベースにWRL化してみる。
ComPtr
何はともあれComPtrを取り入れる。
Before
```cpp
#include <Msxml6.h>
#pragma comment(lib, "msxml6.lib")

#define SAFERELEASE(p){ if(p){p->Release(); p=nullptr;}}

int main(int, char **)
{
    CoInitializeEx(NULL, COINITBASE_MULTITHREADED);

    IXMLHTTPRequest2 *pXHR=nullptr;
    auto hr = CoCreateInstance(CLSID_FreeThreadedXMLHTTP60,
            NULL,
            CLSCTX_INPROC_SERVER,
            IID_PPV_ARGS(&pXHR));
    if (FAILED(hr)) {
        goto EXIT;
    }

EXIT:
    SAFERELEASE(pXHR);
    CoUninitialize();

    if (FAILED(hr)) {
        return 1;
    }
    return 0;
}
```

## SAFERELEASEとgoto
ComPtrを取り入れてSAFERELEASEとgotoを除去しよう。
After
RAIIを取り入れて積極的にEarly Outできる(後始末が自動になったので)。
```cpp
#include <Msxml6.h>
#pragma comment(lib, "msxml6.lib")
#include <wrl/client.h>


class ComInitializer
{
public:
    ComInitializer()
    {
        CoInitializeEx(NULL, COINITBASE_MULTITHREADED);
    }
    ~ComInitializer()
    {
        CoUninitialize();
    }
};

int main(int, char **)
{
    ComInitializer co;

    Microsoft::WRL::ComPtr<IXMLHTTPRequest2> pXHR;
    auto hr = CoCreateInstance(CLSID_FreeThreadedXMLHTTP60,
            NULL,
            CLSCTX_INPROC_SERVER,
            IID_PPV_ARGS(&pXHR));
    if (FAILED(hr)) {
        return 1;
    }

    return 0;
}
```

## IUnknown実装とComPtr初期化
Callbackの定義等で自らComオブジェクトを定義する場合がある。
IXMLHTTPRequest2Callbackを実装する例。
Before

```cpp
class CCallback :public IXMLHTTPRequest2Callback
{
    ULONG m_cRef=1;

public:
    CCallback()
    {
    }

    ~CCallback()
    {
    }

    // IUnknown
    STDMETHODIMP_(ULONG) AddRef()override
    {
        InterlockedIncrement(&m_cRef);
        return m_cRef;
    }

    STDMETHODIMP_(ULONG) Release()override
    {
        ULONG ulRefCount = InterlockedDecrement(&m_cRef);
        if (0 == m_cRef)
        {
            delete this;
        }
        return ulRefCount;
    }

    STDMETHODIMP QueryInterface (REFIID riid, void **ppvObj)override
    {
        // Always set out parameter to NULL, validating it first.
        if (!ppvObj) return E_INVALIDARG;

        *ppvObj = NULL;
        if (riid == IID_IUnknown 
                || riid == IID_IXMLHTTPRequest2Callback 
           )
        {
            // Increment the reference count and return the pointer.
            *ppvObj = (LPVOID)this;
            AddRef();
            return NOERROR;
        }

        return E_NOINTERFACE;
    }

    // IXMLHTTPRequest2Callback
    STDMETHODIMP OnRedirect(
        __RPC__in_opt IXMLHTTPRequest2 *pXHR,
        __RPC__in_string const WCHAR *pwszRedirectUrl)override
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP
        OnHeadersAvailable(
            __RPC__in_opt IXMLHTTPRequest2 *pXHR,
            DWORD dwStatus,
            __RPC__in_string const WCHAR *pwszStatus
        )override
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP
        OnDataAvailable(
            __RPC__in_opt IXMLHTTPRequest2 *pXHR,
            __RPC__in_opt ISequentialStream *pResponseStream
        )override
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP
        OnResponseReceived(
            __RPC__in_opt IXMLHTTPRequest2 *pXHR,
            __RPC__in_opt ISequentialStream *pResponseStream
        )override
    {
        return E_NOTIMPL;
    }

    STDMETHODIMP
        OnError(
            __RPC__in_opt IXMLHTTPRequest2 *pXHR,
            HRESULT hrError
        )override
    {
        return E_NOTIMPL;
    }
};
```

IUnknownの実装(AddRef, Release, QueryInterface)が定型コードである

newしたときにリファレンスカウントが1であること、AddRef, Releaseを正しく実装する
QueryInterfaceを正しく実装する(あとでインタフェースを増減させたときに更新を忘れたりする)

ComPtrの初期化が不穏
```cpp
Microsoft::WRL::ComPtr<CCallback> pCallback;
// RefCount=1のインスタンスを内部ポインタ(&演算子)に渡す
*((CCallback**)&pCallback)=new CCallback(); 
```

または、
```cpp
Microsoft::WRL::ComPtr<CCallback> pCallback(new CCallback); // 1+1はRefCount=2
pCallback.Get()->Release(); // 1に減らす
```

のようなあからさまに不穏なコードを書かなければならない。
間違いの元である。
After
```cpp
#include <wrl/implements.h>
class CCallback :
    public Microsoft::WRL::RuntimeClass<
    Microsoft::WRL::RuntimeClassFlags<Microsoft::WRL::ClassicCom>, IXMLHTTPRequest2Callback>
{
public: 
    CCallback()
    {
    }

    ~CCallback()
    {
    }

    // IXMLHTTPRequest2Callback
    // 省略
};
```

とすることでIUnknownの実装をWRL::RuntimeClassに任せることができる。
また、newによる初期化を禁止されるので、newではなくWRL::Makeを使う。
```
error C2248: 'Microsoft::WRL::Details::DontUseNewUseMake::operator new': private メンバー (クラス 'Microsoft::WRL::Details::DontUseNewUseMake' で宣言されている) にアクセスできません。
```

```cpp
Microsoft::WRL::ComPtr<CCallback> pCallback=Microsoft::WRL::Make<CCallback>();
```

## MakeAndInitialize 初期化メソッド
Makeよりこっちの方がCom風。
RuntimeClassInitializeという名前のメンバ関数で初期化する。失敗した場合はS_OK以外を返す。
```cpp
class CCallback :
    public Microsoft::WRL::RuntimeClass<
    Microsoft::WRL::RuntimeClassFlags<Microsoft::WRL::ClassicCom>, IXMLHTTPRequest2Callback>
{
public: 

    STDMETHODIMP RuntimeClassInitialize()
    {
        return S_OK;
    }

};

Microsoft::WRL::ComPtr<CCallback> pCallback;
hr=Microsoft::WRL::MakeAndInitialize<CCallback>(&pCallback);
if (FAILED(hr)) {
    return 2;
}
```

MakeAndInitialize 初期化メソッド(引数)
9つまでいける。

```cpp
    STDMETHODIMP RuntimeClassInitialize(DWORD value)
    {
        return S_OK;
    }

    DWORD value = 255;
    Microsoft::WRL::ComPtr<CCallback> pCallback;
    hr=Microsoft::WRL::MakeAndInitialize<CCallback>(&pCallback, value);
    if (FAILED(hr)) {
        return 2;
    }
```
