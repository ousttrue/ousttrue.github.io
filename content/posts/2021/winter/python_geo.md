+++
title = "python で GEO"
date = 2021-12-28
tags = ["python", "geo"]
+++

# python で地理情報を扱う

python で地図画像を作ろうと思ったら思いのほか大変だった(まだできていない)のでメモ。

Windows であれば

<https://www.lfd.uci.edu/~gohlke/pythonlibs/>

の助けを借りるのがよさそう。

## GEOS

* <https://libgeos.org/>
* <https://github.com/libgeos/geos>

## GDAL

* depends: GEOS

`gdal-config`

```
sudo apt install libgdal-dev
```

version ?

<https://github.com/OSGeo/gdal/issues/1762>

> You need to install the native library GDAL 3.0.1 first. 

## shapely

* depends: GEOS
* <https://github.com/shapely/shapely>

## fiona

* <https://github.com/Toblerity/Fiona>

## geopandas

* <https://geopandas.org/en/stable/index.html>
* <https://github.com/geopandas/geopandas>
* depends: shapely, fiona

* <https://github.com/sorabatake/article_20455_geopandas/blob/master/geoPandas01.ipynb>

## folium

* <http://python-visualization.github.io/folium/#>

## data

* https://github.com/dataofjapan/land

## geojson OpenGL

* <https://github.com/jeremyfromearth/cinder-geojson-experiments>
* <https://github.com/soolmaz-mk/Atlasi>

## 参考

* [pythonを用いたshapefileやgeojsonの読込および描画](https://qiita.com/HidKamiya/items/5e7240f8f66c9af8b10e)
* [【脱GIS】（Pythonとかで）地理空間情報、位置情報を扱うための情報まとめ【随時更新】](https://qiita.com/aimof/items/b4e4551d27abaf5bb258)
* [Pythonでプロットした地図を出力する](https://note.com/yearman/n/n69fa3f2d583d)

