---
title: "Holotoolkit-unityでMSBuild-15.0(VS2017)を使う"
date: 2017-04-16
tags: ["unity"]
---

VS2017 からレジストリの構成が変わっている。

http://stackoverflow.com/questions/328017/path-to-msbuild

```csharp
public static string CalcMSBuildPath(string msBuildVersion)
{
    if (msBuildVersion == "15.0")
    {
        using (var key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(
            @"SOFTWARE\WOW6432Node\Microsoft\VisualStudio\SxS\VS7"))
        {
            if (key == null)
            {
                return null;
            }
            string folder = key.GetValue(msBuildVersion) as string;
            string msBuildPath = Path.Combine(folder, "MSBuild\\15.0\\Bin\\msbuild.exe");
            return msBuildPath;
        }
    }

    // 既存のコード
}
```
