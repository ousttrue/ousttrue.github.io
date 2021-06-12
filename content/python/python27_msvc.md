---
Title: "Python27のbuild_extで新しいVCを使う"
date: 2017-10-08
taxonomies: {tags: ["python", "cpp"]}
---

python2.7のnativeモジュールをビルドするのにMSVC9(VisualStudio2008)ではなく、
MSVC15(VisualStudio2017)とかを使うには。

本当はPythone.exeをビルドしたコンパイラにバージョンを合わせた方がいいのかもしれないが、古いC++でコンパイルできるようにコードを修正するのが嫌なので。
例。
```python
# setup.py
from distutils.core import setup, Extension

iex = Extension('iex', sources = ['PyIex/iexmodule.cpp'])

setup (name = 'pyalembic',
       version = '1.0',
       description = 'python binding of Alembic',
       ext_modules = [iex])
```

```
> python.exe setup.py build
running build
running build_ext
building 'iex' extension
error: Unable to find vcvarsall.bat
```

vs2008をインストールしていないのでエラーになる。
調べたところdistutils/mvsc9compiler.pyのfind_vcvarsallを置き換えればよさそう。

```python
# monkey patch for msvccompiler
import distutils.msvc9compiler
def find_vcvarsall(version):
    return "C:/Program Files (x86)/Microsoft Visual Studio/2017/Community/VC/Auxiliary/Build/vcvarsall.bat"
distutils.msvc9compiler.find_vcvarsall=find_vcvarsall


from distutils.core import setup, Extension
import os

iex = Extension('iex', 
                sources = ['PyIex/iexmodule.cpp'],
                include_dirs = [
                    os.environ['VCPKG_DIR']+'/installed/x64-windows/include',
                    os.environ['VCPKG_DIR']+'/installed/x64-windows/include/openexr'
                    ],
                library_dirs=[
                    os.environ['VCPKG_DIR']+'/installed/x64-windows/lib'
                    ],
                libraries=[
                    'Iex-2_2',
                    ]
                )

setup (name = 'pyalembic',
       version = '1.0',
       description = 'python binding of Alembic',
       ext_modules = [iex])
```

VS2017のコンパイラでビルドできた。
