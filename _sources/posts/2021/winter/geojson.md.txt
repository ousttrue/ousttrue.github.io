+++
title = "geojson"
date = 2021-12-29
tags = ["gis", "python"]
+++

# geojson

既存のライブラリが重厚長大なものが多いのだけど、
OpenGL や SVG のような二次元のベクター描画で簡単に済ませたい。
その方向で調査。

## format

* <https://datatracker.ietf.org/doc/html/rfc7946>
* <https://ja.wikipedia.org/wiki/GeoJSON>
    * <https://en.wikipedia.org/wiki/GeoJSON>

> GeoJSON is a geospatial data

以下のような様式。
`Feature` の中に `Geometry` が入っている。

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {}
        }
    ]
}
```

| Geometry Object    |
|--------------------|
| Point              |
| MultiPoint         |
| LineString         |
| MultiLineString    |
| Polygon            |
| MultiPolygon       |
| GeometryCollection |

### Point

```json
{
    "type": "Point",
    "coordinates": [100.0, 0.0]
}
```

### Polygon

穴が空いている場合は、複数の頂点リストを保持する。

```json
// No holes:

{
    "type": "Polygon",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
        ]
    ]
}

// with holes:

{
    "type": "Polygon",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
        ],
        [
            [100.8, 0.8],
            [100.8, 0.2],
            [100.2, 0.2],
            [100.2, 0.8],
            [100.8, 0.8]
        ]
    ]
}
```

## read

python で素直に読んでみた。

```python
import pathlib
import json


def process_geometry(geometry: dict):
    match geometry:
        case {"type": "MultiPolygon", "coordinates": coordinates}:
            print(f'{len(coordinates)} polygon')
            for coord in coordinates:
                print(f'  {len(coord)} rings')
                for x in coord:
                    print(f'    {len(x)} points')


def process_feature(feature: dict):
    match feature:
        case {"type": "Feature", "properties": props, "geometry": geometry}:
            print(props)
            process_geometry(geometry)

        case _:
            raise NotImplementedError()


def main(path: pathlib.Path):
    data = json.loads(path.read_bytes())
    match data:
        case {"type": "FeatureCollection", "features": features}:
            for feature in features:
                process_feature(feature)


if __name__ == '__main__':
    main(pathlib.Path('japan.geo.json'))
```

`jpan.geo.json` は、 <https://github.com/dataofjapan/land> です。
実行結果。


```
{'nam': 'Kyoto Fu', 'nam_ja': '京都府', 'id': 26}
4 polygon
  1 rings
    1235 points
  1 rings
    6 points
  1 rings
    8 points
  1 rings
    6 points
```

なるほど。

## GL_LINE_LOOP

単純に `GL_LINE_LOOP` で描画できそうとわかった。

```python
def process_geometry(geometry: dict) -> Polygon:
    match geometry:
        case {"type": "Polygon", "coordinates": polygon}:
            assert len(polygon) == 1
            array = (float2 * len(polygon[0]))()
            for i, (x, y) in enumerate(polygon[0]):
                array[i] = float2(x, y)
            return Polygon(array, [SubMesh(0, len(array))])

        case {"type": "MultiPolygon", "coordinates": polygons}:
            array = (float2 * sum(len(polygon[0]) for polygon in polygons))()
            i = 0
            submeshes = []
            for polygon in polygons:
                assert len(polygon) == 1
                submeshes.append(SubMesh(i, len(polygon[0])))
                for (x, y) in polygon[0]:
                    array[i] = float2(x, y)
                    i += 1
            return Polygon(array, submeshes)

        case _:
            raise NotImplementedError()
```

`orthogonal` の方で適当にビューポートを `(140, 35)` というような適当な経度緯度に調整してやればよさそう。

## data

* <https://github.com/dataofjapan/land>
* <http://geojson.io/>

## 参考

* [GeoJSON (RFC7946) 仕様の注意点など](https://qiita.com/kkdd/items/416b955fb2d3e1327edc)
* <https://github.com/jeremyfromearth/cinder-geojson-experiments>
* <https://github.com/soolmaz-mk/Atlasi>

