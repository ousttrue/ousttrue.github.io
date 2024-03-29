---
title: "Three.jsでpmd読み込み"
date: 2015-12-22
tags: []
---

こちらのモデルを使わせていただいております。

threejs_pmd_loader.ts source
PmdLoader.ts source
変換せずに直接 Pmd を読み込むべくカスタムローダーを作ってみよう。
まず、SJIS 操作が必要なのでこちらを使わせて頂いた。

- https://github.com/polygonplanet/encoding.js
  あとは JSONLoader を参考にして ArrayBuffer から地道に情報を切り出していく。
  ArrayBuffer から情報を切り出すのはこつがわかれば簡単で以下のようなヘルパークラスを作れば
  さくさくできる。
  BinaryReader

```javascript
class BinaryReader {
  m_buffer: ArrayBuffer;
  m_postiion = 0;

  constructor(buffer: ArrayBuffer) {
    this.m_buffer = buffer;
  }

  read(length: number) {
    var slice = this.m_buffer.slice(this.m_postiion, this.m_postiion + length);
    this.m_postiion += length;
    return slice;
  }

  readString(length: number): string {
    var slice = new Uint8Array(this.read(length));
    let i = 0;
    for (; i < slice.byteLength; ++i) {
      if (slice[i] == 0) {
        break;
      }
    }

    return Encoding.codeToString(
      Encoding.convert(slice.slice(0, i), {
        to: "UNICODE",
        from: "SJIS",
      })
    );
  }

  readFloat(): number {
    var read = this.read(4);
    return new Float32Array(read)[0];
  }

  readVector2(): THREE.Vector2 {
    return new THREE.Vector2(this.readFloat(), this.readFloat());
  }

  readVector3(): THREE.Vector3 {
    return new THREE.Vector3(
      this.readFloat(),
      this.readFloat(),
      this.readFloat()
    );
  }

  readRGB(): THREE.Color {
    return new THREE.Color(
      this.readFloat(),
      this.readFloat(),
      this.readFloat()
    );
  }

  // int
  readInt16(): number {
    var read = this.read(2);
    return new Int16Array(read)[0];
  }

  readInt32(): number {
    var read = this.read(4);
    return new Int32Array(read)[0];
  }

  // uint
  readUint8(): number {
    var read = this.read(1);
    return new Uint8Array(read)[0];
  }

  readUint16(): number {
    var read = this.read(2);
    return new Uint16Array(read)[0];
  }

  readUint16Array(count: number): Uint16Array {
    var read = this.read(2 * count);
    return new Uint16Array(read);
  }
}
```

先頭の Vertices, Indices, Materials を読み込むところまで実装した。
意外とあっさり Texture 読み込みまでできちゃった。Three.js 便利ですなぁ。
骨を入れる前にシェーダーをやろう。
トゥーンシェーダーでないと見栄えが悪い。
