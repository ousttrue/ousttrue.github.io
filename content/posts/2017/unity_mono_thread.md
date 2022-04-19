---
title: "UnityEditorでnativeスレッドからC# delegateを呼ぶと後でフリーズする件"
date: 2017-10-30
tags: ["unity"]
---

タイトルが長いが、RenderingスレッドでC#関数を呼び出すと次回play時に固まるの続きです。

前回の記事についてメールで指摘をいただきました。
意訳

mono_thread_detachすればいいよ

なるほど、やってみよう。
mono_thread_detachとは

http://docs.go-mono.com/index.aspx?link=xhtml%3Adeploy%2Fmono-api-threads.html

そいう関数があることはわかった。名前しか分からん。

http://www.mono-project.com/docs/advanced/embedding/
https://github.com/mono/mono/blob/master/docs/threading

Monoをスクリプトエンジンとしてホスティングする場合に使うAPIらしい。
MonoエンジンでC#のコードを実行する場合実行スレッドでは事前にスレッドの初期化をする必要があり、他所で作られた既存のスレッドを初期化するのがmono_thread_attachらしい。 mono_thread_attachされたスレッドはMonoの終了時に回収対象として登録されるが、これを解除するのがmono_thread_detachのようだ。
やってみる
documentが見つからなかったので、使われているコードを参考にしてみる。

https://github.com/jart/freeswitch/blob/master/src/mod/languages/mod_managed/mod_managed.cpp

using System;
using System.Runtime.InteropServices;
using UnityEngine;


public class CallbackOnRenderThread : MonoBehaviour
{
    [DllImport("mono")]
    static extern IntPtr mono_thread_current();

    [DllImport("mono")]
    static extern IntPtr mono_thread_detach(IntPtr p);

    public int m_count;
    public IntPtr m_renderThread;

    void OnRender(int eventID)
    {
        m_count++;
        m_renderThread = mono_thread_current();
    }

    private void OnApplicationQuit()
    {
        Debug.Log(m_count);

        if (m_renderThread != IntPtr.Zero)
        {
            Debug.LogFormat("detach thread: {0}", m_renderThread);
            mono_thread_detach(m_renderThread);
            m_renderThread = IntPtr.Zero;
        }
    }

    delegate void OnRenderFunc(int eventID);
    OnRenderFunc m_callback;

    void Update()
    {
        m_callback = new OnRenderFunc(OnRender);
        var p = Marshal.GetFunctionPointerForDelegate(m_callback);
        GL.IssuePluginEvent(p, 0);
    }
}

Collecting from unknown threadと怒られる・・・
ならば、
public class CallbackOnRenderThread : MonoBehaviour
{
    [DllImport("mono")]
    static extern IntPtr mono_thread_current();

    [DllImport("mono")]
    static extern IntPtr mono_thread_detach(IntPtr p);

    public int m_count;
    //public IntPtr m_renderThread;

    void OnRender(int eventID)
    {
        try
        {
            m_count++;
        }
        finally
        {
            mono_thread_detach(mono_thread_current());
        }
    }

    delegate void OnRenderFunc(int eventID);
    OnRenderFunc m_callback;

    void Update()
    {
        m_callback = new OnRenderFunc(OnRender);
        var p = Marshal.GetFunctionPointerForDelegate(m_callback);
        GL.IssuePluginEvent(p, 0);
    }
}

できちゃった。
やったぜ。
