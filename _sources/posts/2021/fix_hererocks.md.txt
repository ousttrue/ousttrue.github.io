+++
title = "VS2019 向けに hererocks を修正(vswhere を使う)"
date = 2021-07-15
tags = ["python", "lua", "nvim"]
+++

hererocks が VS2019BuildTools を検知して動作するように改造してみた。

<https://github.com/luarocks/hererocks/pull/15>

通るかどうかは微妙。
内容的に、通りづらそう。
古い vc を使っていたり MinGW 使っていたりすると実験できないしね。
とりあえず、既存の動いている部分が壊れないようには配慮した。

採用されれば、

<https://github.com/wbthomason/packer.nvim/issues/302>

も進展する。
Windows 版の luarocks 呼び出しに改造が必要なのだが、
先に hererocks が動いている必要があるという順番。

とりあえず単体で試すことができて

```
# C:/Python38/Scripts/pip.exe
$ pip install https://github.com/ousttrue/hererocks/archive/add_vswhere.zip
```

とする。

```
# C:/Python38/Scripts/hererocks.exe
$ hererocks.exe --target vs -j 2.1.0-beta3 -r latest build_dir
Using cl.exe found in PATH.
Fetching LuaJIT 2.1.0-beta3 (target: vs) (cached)
Verifying SHA256 checksum
Building LuaJIT 2.1.0-beta3 (target: vs)
Installing LuaJIT 2.1.0-beta3 (target: vs)
Fetching LuaRocks 3.7.0 (cached)
Verifying SHA256 checksum
Building and installing LuaRocks 3.7.0
```

lua はシステムにインストールして全体でライブラリを共有するというよりは、
プロジェクト単位でインストールしてローカルに必要なライブラリだけを追加するという運用になりそう。
なので、 hererocks でプロジェクトローカルに lua をサクッとビルドできるのはなかなかよい。
python の venv 的な運用。
展開先は、 `.gitignore` する。

ただ、外部ライブラリのラッパーがさくっと動くかというと Windows だと厳しいものがありますな・・・。
vcpkg と連携させるとか、更なる頑張りが必要かもしれない。
なので、 luajit の ffi が面白いかもしれない。
standalone の lua インタプリタを使う場合は `hererocks` がいいのではないか。

## vswhere メモ

<https://github.com/Microsoft/vswhere>

`cl.exe`, `msbuild.exe` などの探索に使う。
`vs2017 version 15.2` 以降に入っているらしい。

こんな感じに使う。

```
# %ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe
> vswhere -nologo -products *
instanceId: 6762dfe1
installDate: 2020/07/21 9:26:34
installationName: VisualStudio/16.7.3+30503.244
installationPath: C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools
installationVersion: 16.7.30503.244
productId: Microsoft.VisualStudio.Product.BuildTools
productPath: C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\Common7\Tools\LaunchDevCmd.bat
state: 4294967295
isComplete: 1
isLaunchable: 1
isPrerelease: 0
isRebootRequired: 0
displayName: Visual Studio Build Tools 2019
description: Visual Studio Build Tools では、Visual Studio IDE を必要とせずに、MSBuild ベースのネイティブ マネージド アプリケーションをビルドできます。また、Visual C++ のコンパイラやライブラリ、MFC、ATL、および C++/CLI サポートをインストールするオプションも用意されています。
channelId: VisualStudio.16.Release
channelUri: https://aka.ms/vs/16/release/channel
enginePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\resources\app\ServiceHub\Services\Microsoft.VisualStudio.Setup.Service
releaseNotes: https://go.microsoft.com/fwlink/?LinkId=660893#16.7.3
thirdPartyNotices: https://go.microsoft.com/fwlink/?LinkId=660909
updateDate: 2020-09-13T06:19:26.0508205Z
catalog_buildBranch: d16.7
catalog_buildVersion: 16.7.30503.244
catalog_id: VisualStudio/16.7.3+30503.244
catalog_localBuild: build-lab
catalog_manifestName: VisualStudio
catalog_manifestType: installer
catalog_productDisplayVersion: 16.7.3
catalog_productLine: Dev16
catalog_productLineVersion: 2019
catalog_productMilestone: RTW
catalog_productMilestoneIsPreRelease: False
catalog_productName: Visual Studio
catalog_productPatchVersion: 3
catalog_productPreReleaseMilestoneSuffix: 1.0
catalog_productSemanticVersion: 16.7.3+30503.244
catalog_requiredEngineVersion: 2.7.3132.26759
properties_campaignId:
properties_channelManifestId: VisualStudio.16.Release/16.7.3+30503.244
properties_nickname:
properties_setupEngineFilePath: C:\Program Files (x86)\Microsoft Visual Studio\Installer\vs_installershell.exe
```

<https://github.com/microsoft/vswhere/wiki/Find-VC>

フィルタをかけられる。

```
> vswhere -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools
```

見つかったパスから先は固定であるとみなして、 `vcvars64.bat` などを見つける。

