---
title: "RenderingスレッドでC#関数を呼び出すと次回play時に固まる"
date: 2017-04-15
tags: ["unity"]
---

何のことか分かりにくいが以下のコードで再現できる。

```csharp
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
```

SharpDX を Unity 上で使うべく GL.IssuePluginEvent に C#の Delegate を渡す実験をしていた。これをやると、Editor 終了時もしくは次回 play 時に UnityEditor が Freeze する(100%)。Unity5.5.3 と Unity2017.1.0beta1 で再現した。
調べてみたところ、

https://forum.unity3d.com/threads/problem-with-callbacks.87513/

が該当しそうかと思ったがちょっと違う。新しいスレッドを起こしている訳では無いので。 ただ、条件は下記の通り

C#の delegate を関数ポインタとして C に渡す
その関数ポインタが異なるスレッドから呼び出される

次に

https://blog.tedd.no/2016/10/09/investigating-unity-hang-on-second-run-multi-threading/

を当たった。ここで紹介している visualstudio の debug - window - 並列スタックで状況を確認する手法を使ってみたところ以下のようになっていた。

mono_domain_unload が固まっているような気がするぞ。

http://stackoverflow.com/questions/10138015/unloading-mono-domains-in-multithreaded-context

mono が delegate から関数ポインタを作るのに使っているらしい invoke wrappers の周りの回収に失敗しているのではないかというような気がする。

http://d.hatena.ne.jp/saiya_moebius/20090319/1237434037

Unity 上で打つ手は見つからなかった・・・
