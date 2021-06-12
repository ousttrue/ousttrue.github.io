---
title: "Windows上でPython3.5をビルドする"
date: 2017-04-20
Tags: []
---

VisualStudio2015でPython3.5(64bit Debug)をビルドする。

ソースをダウンロードして解凍した。
Python-3.5.3
build.batを実行する
> cd Python-3.5.3/PCbuild
Python-3.5.3/PCbuild> build.bat -p x64 -c Debug

pythoncore.vcxproj -> Python-3.5.3\PCBuild\amd64\python35_d.dll


できあがり。
