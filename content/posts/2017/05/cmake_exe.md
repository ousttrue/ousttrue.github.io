---
Title: "msbuildとcmakeの在りか"
date: 2017-05-28
Tags: []
---

bat作るときにたまに使う
cmake.exeとmsbuild.exeの在りかについて

VisualStudio2017内のcmake.exe
VisualStudio2017に同梱されるようになったcmakeのパスについて。
以下のパスに存在する。
C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe
version確認
PS> &"C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe" --version
cmake version 3.6.20160606-g0391f-MSVC

CMake suite maintained and supported by Kitware (kitware.com/cmake).

レジストリからパスを得る
システムドライブの容量節約のためVSのインストールパスを変更している場合に必要だった。
regコマンドでコマンドラインで値を得る。
> reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7" /v "15.0"

HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7
    15.0    REG_SZ    C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\


cmake呼び出しbat
cmake_vs2017.bat
@echo off
FOR /F "TOKENS=1,2,*" %%A IN ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7" /v "15.0"') DO IF "%%A"=="15.0" SET VSPATH=%%C
@echo on

set CMAKE="%VSPATH%\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe"
set BUILD_DIR="build_vs2017"

if not exist %BUILD_DIR% mkdir %BUILD_DIR%
pushd %BUILD_DIR%
%CMAKE% -D CMAKE_INSTALL_PREFIX=%VCPKG_DIR%/installed/x64-windows -D OpenCVDir=%VCPKG_DIR%/installed/x64-windows/share/opencv .. -G "Visual Studio 15 2017 Win64"
popd

使用例

https://github.com/ousttrue/msgpackpp/blob/master/cmake_vs2017.bat

VisualStudio2017内のmsbuild
C:/Program Files (x86)/Microsoft Visual Studio/2017/Community/MSBuild/15.0/Bin/msbuild.exe
なので
> reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7" /v "15.0"

HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7
    15.0    REG_SZ    C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\


と組み合わせると得られる。
@echo off
FOR /F "TOKENS=1,2,*" %%A IN ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\VisualStudio\SxS\VS7" /v "15.0"') DO IF "%%A"=="15.0" SET VSPATH=%%C
@echo on

set MSBUILD="%VSPATH%\MSBuild\15.0\Bin\msbuild.exe"

VisualStudio2015内のmsbuild

https://github.com/Microsoft/HoloToolkit-Unity/blob/master/Assets/HoloToolkit/Build/Editor/BuildDeployTools.cs#L72

レジストリ
HKLM\Software\Microsoft\MSBuild\ToolsVersions\14.0
から得ることができる。
@echo off
FOR /F "TOKENS=1,2,*" %%A IN ('reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSBuild\ToolsVersions" /v "14.0"') DO IF "%%A"=="14.0" SET MSBUILDPATH=%%C
@echo on

set MSBUILD="%MSBUILDPATH%\msbuild.exe"

