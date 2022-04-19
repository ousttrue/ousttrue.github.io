---
title: "RenderingスレッドでC#関数を呼び出すと次回play時に固まる"
date: 2017-04-15
tags: ["unity"]
---

何のことか分かりにくいが以下のコードで再現できる。
public int m_count;

void OnRender(int eventID)
{
    m_count++;
}

void Update()
{
    var p = Marshal.GetFunctionPointerForDelegate(OnRender);
    GL.IssuePluginEvent(p, 0);
}


SharpDXをUnity上で使うべくGL.IssuePluginEventにC#のDelegateを渡す実験をしていた。これをやると、Editor終了時もしくは次回play時にUnityEditorがFreezeする(100%)。Unity5.5.3とUnity2017.1.0beta1で再現した。
調べてみたところ、

https://forum.unity3d.com/threads/problem-with-callbacks.87513/

が該当しそうかと思ったがちょっと違う。新しいスレッドを起こしている訳では無いので。 ただ、条件は下記の通り

C#のdelegateを関数ポインタとしてCに渡す
その関数ポインタが異なるスレッドから呼び出される

次に

https://blog.tedd.no/2016/10/09/investigating-unity-hang-on-second-run-multi-threading/

を当たった。ここで紹介しているvisualstudioのdebug - window - 並列スタックで状況を確認する手法を使ってみたところ以下のようになっていた。


mono_domain_unloadが固まっているような気がするぞ。

http://stackoverflow.com/questions/10138015/unloading-mono-domains-in-multithreaded-context

monoがdelegateから関数ポインタを作るのに使っているらしいinvoke wrappersの周りの回収に失敗しているのではないかというような気がする。

http://d.hatena.ne.jp/saiya_moebius/20090319/1237434037

Unity上で打つ手は見つからなかった・・・
