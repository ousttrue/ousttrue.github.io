---
title: pythonでGIS
date: 2019-08-27
taxonomies: {tags: ["python"]}
---

Windows10。

## vcpkgでCの関連ライブラリをインストール

```
$ vcpkg install --triplet x64-windows geos gdal
```

30分くらいかかった。

環境変数、 `GDAL_DATA` に `%VCPKG_DIR%\installed\x64-windows\share\gdal` ビルド先のフォルダを指定する。

## GDAL

* https://gdal.org/

### python

* https://pypi.org/project/GDAL/

```
$ pip install gdal
fatal error C1083: Cannot open include file: 'cpl_port.h': No such file or directory
```

事前にVCPKGでビルドしてある。 `INLUCDE` を指し示す。

```
$ pip install --global-option=build_ext --global-option="-IC:\vcpkg\installed\x64-windows\include" gdal
'GDALGetSpatialRef': identifier not found
```

バージョンをCのGDALに合わせる。vcpkg でインストールしたのは `2.4.1` だった。
gdalの `2.4.1` は欠番みたいなので、 `2.4.2` にしてみた。

```
$ pip install --global-option=build_ext --global-option="-IC:\vcpkg\installed\x64-windows\include" --global-option="-LC:\vcpkg\installed\x64-windows\lib" 'gdal==2.4.2'
LINK : fatal error LNK1181: cannot open input file 'gdal_i.lib'
```

`gdal_i.lib` inline の static library かな？
探したら、 `vcpkg` のビルドフォルダにあったので lib にコピーする。

```
$ copy C:\vcpkg\buildtrees\gdal\src-x64-windows-release\gdal-2.4.1\gdal_i.lib C:\vcpkg\installed\x64-windows\lib\
$ pip install --global-option=build_ext --global-option="-IC:\vcpkg\installed\x64-windows\include" --global-option="-LC:\vcpkg\installed\x64-windows\lib" 'gdal==2.4.2'
Successfully installed gdal-2.4.2
```

OK

* https://www.gis-py.com/entry/py-gdal
* https://pcjericks.github.io/py-gdalogr-cookbook/index.html
