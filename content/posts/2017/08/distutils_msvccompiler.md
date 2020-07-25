---
Title: "distutilsでcl.exeが見つからない"
date: 2017-08-06
Tags: []
---

PythonじゃなくてVisualStudio側の問題のようなのだけど、setup.pyでネイティブモジュールをビルドするときに顕在化したので。

こういう感じのネイティブモジュールを作った。
from distutils.core import setup, Extension


imgui_module = Extension('_swig_imgui',
        sources=[
            #'imgui_wrap.cxx',
            'imgui.i',
            'imgui/imgui.cpp',
            'imgui/imgui_draw.cpp',
            'imgui/imgui_demo.cpp',
            ],
        swig_opts=[
            #'-modern',
            '-c++',
            '-py3',
            ]
        )

setup (name = 'swig_imgui',
        version = '0.1',
        author      = "ousttrue",
        description = """imgui wrapper using swig""",
        ext_modules = [imgui_module],
        py_modules = ["swig_imgui"],
        )

> python setup.py build

とするとエラーになる。
Windows10(64bit)上のvs2017 + vcbuildtoolsの組み合わせの環境である。
cl.exe /c /nologo /Ox /W3 /GL /DNDEBUG /MD -ID:\Anaconda3\include -ID:\Anaconda3\include /EHsc /Tpimgui_wrap.cpp /Fobuild\temp.win-amd64-3.6\Release\imgui_wrap.obj
error: command 'cl.exe' failed: No such file or directory

distutilsがcl.exeを探すのに失敗しているようなのである。
lib/distutils下を調べてみた。
どうやらlib/distutils/_msvccompiler.pyでvcvarsall.batから環境変数を得ることに失敗しているらしい。
実際、C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.batの呼び出しが失敗していることを突き止めた。
Error in script usage. The correct usage is:
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" [option]
  or
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" [option] store
  or
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" [option] [version number]
  or
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" [option] store [version number]
where [option] is: x86 | amd64 | arm | x86_amd64 | x86_arm | amd64_x86 | amd64_arm
where [version number] is either the full Windows 10 SDK version number or "8.1" to use the windows 8.1 SDK
:
The store parameter sets environment variables to support
  store (rather than desktop) development.
:
For example:
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x86_amd64
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x86_arm store
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x86_amd64 10.0.10240.0
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x86_arm store 10.0.10240.0
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x64 8.1
    "C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat" x64 store 8.1

コマンドラインから実行しても失敗していて、vcvarsall.batに以下のコードがあるのだが、
:setup_buildsku
if not exist "%~dp0..\..\..\Microsoft Visual C++ Build Tools\vcbuildtools.bat" goto usage
set CurrentDir=%CD%
call "%~dp0..\..\..\Microsoft Visual C++ Build Tools\vcbuildtools.bat" %1 %2
cd /d %CurrentDir%
goto :eof

C:\Program Files (x86)\Microsoft Visual Studio\Shared\14.0\VC\vcvarsall.bat
から
C:\Program Files (x86)\Microsoft Visual C++ Build Tools\vcbuildtools.bat"
への相対パスだと一致しないよなーと。
これが原因でcl.exeのパスが取れない。
setup.pyにモンキーパッチを当ててcl.exeを発見できるようにしてみた。
以下をsetup.pyの先頭に追加。
# monkey patch for _msvccompiler
import distutils._msvccompiler
import os
import subprocess
def _get_vc_env(plat_spec):
    if os.getenv("DISTUTILS_USE_SDK"):
        return {
            key.lower(): value
            for key, value in os.environ.items()
        }

    vcvarsall, vcruntime = distutils._msvccompiler._find_vcvarsall(plat_spec)
    if not vcvarsall:
        raise DistutilsPlatformError("Unable to find vcvarsall.bat")

    try:
        out = subprocess.check_output(
            'cmd /u /c "{}" {} && set'.format(vcvarsall, plat_spec),
            stderr=subprocess.STDOUT,
        ).decode('utf-16le', errors='replace')
        #######################################################################
        if out.startswith("Error in script usage"):
            out = subprocess.check_output(
                'cmd /u /c "{}" {} && set'.format("C:\\Program Files (x86)\\Microsoft Visual C++ Build Tools\\vcbuildtools.bat", plat_spec),
                stderr=subprocess.STDOUT,
            ).decode('utf-16le', errors='replace')
        #######################################################################
    except subprocess.CalledProcessError as exc:
        log.error(exc.output)
        raise DistutilsPlatformError("Error executing {}"
                .format(exc.cmd))

    env = {
        key.lower(): value
        for key, _, value in
        (line.partition('=') for line in out.splitlines())
        if key and value
    }

    if vcruntime:
        env['py_vcruntime_redist'] = vcruntime
    return env
distutils._msvccompiler._get_vc_env=_get_vc_env

以前にもこんなことやったことあるような気がする・・・。
