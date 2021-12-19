---
title: "MeidaFoundation情報収集"
date: 2017-08-25
taxonomies: {tags: []}
---

DirectShow後継の動画・音声フレームワーク。

sampleのありか

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation

Win7Samplesに気付かず・・・
はじめの一歩
ここから始めるのがよい。

Audio/Video Playback

How to Play Media Files with Media Foundation

Media Session Playback Example。ソースあり



MediaSessionPlaybackExampleで動画を開くとこんな感じのTopologyになる。
動画(MediaSource)--->video-> EVR(MediaSink)
                 |
                 +->audio-> SAR(MediaSink)

MediaSourceとMediaSinkを作ってつなぐのがMediaFoundationの基本概念。
CMakeでビルドできるように取りまとめた。

https://github.com/ousttrue/MediaFoundationSample/tree/master/MediaSessionPlaybackExample

構成
DirectShowとは違う感じのところがある。

IMFMediaSourceがストレージとDemuxerを内包している
なので途中で枝分かれするというよりも、IMFMediaStream -> IMFTransform -> IMFStreamSinkというラインが複数ある感じになる。


+---------------+
|IMFMediaSource |
+---------------+
|+-------------+|
||IMFByteStream||
|+-------------+|                                          VideoRenderer
|  |  |Read     |                                          +------------+
|  |  v         |     (compressed) decoder (uncompressed)  |IMFMediaSink|
|  | +--------------+ IMFSample +------------+ IMFSample +-------------+|
|  | |IMFMediaStream|---------->|IMFTransform|---------->|IMFStreamSink|+
|  v +--------------+           +------------+           +-------------+
| +--------------+              +------------+           +-------------+
| |IMFMediaStream|------------->|IMFTransform|---------->|IMFStreamSink|+
| +--------------+  IMFSample   +------------+ IMFSample +-------------+|
+---------------+   (compressed)           (uncompressed)  |IMFMediaSink|
                                                           +------------+
                                                           AudioRendrer

TopoEdit

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/topoedit
http://blogs.microsoft.co.il/pavely/2011/03/11/introduction-to-topoedit/

いろんなAPI
MediaSource(入力)とMediaSink(出力)を駆動する高レベルのAPIが複数ある。
[Obsolete]古のPlayer

IMFPMediaPlayer


Important  Deprecated. This API may be removed from future releases of Windows. Applications should use the Media Session for playback.


https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/Win7Samples/multimedia/mediafoundation/SimplePlay
https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/MFPlayer2

[Desktop]再生向けのSession
Player向けのAPI。UWPには無い。

Media Session
http://blog.firefly-vj.net/2009/06/01/mediafoundation-play-with-mediasession.html
Media Foundationの再生サンプルの状態管理をMSMで行う

Topology

Topologies

変換向けのReader
Clockが必要ない用途に向いている。
各フレームを最速で処理したい場合や、MediaSourceがWebCamである場合など。

Source Reader
Using the Source Reader to Process Media Data
The Source Reader does not support reverse playback, even if the media source does.
MediaFoundationでID3D11Texture2Dに動画のフレームを読み込む 覚書β
MediaFoundation — 動画の読み込み

[Desktop][UWP]WinRTのEngine
Windows.Mediaのバックエンド？。UWPとDesktopの両方で使える。

Supported Microsoft Media Foundation APIs for Windows Phone 8
Walkthrough: Using Microsoft Media Foundation for Windows Phone 8


using a MediaElement control is a much quicker and easier way
You also must use MF if you want to use video as a texture on 3-D geometry

DXVAが簡単にできる。むしろUWPではDXVAしかない様子。情報少ないけど。

Media engine native C++ video playback sample

MediaSource

Media Sources

Writing a Custom Media Source
Case Study: MPEG-1 Media Source

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/mpeg1source
https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsource

Source Resolver

Using the Source Resolver

URL

IMFSourceResolver::CreateObjectFromURL

ByteStream

IMFSourceResolver::CreateObjectFromByteStream

ByteStreamを自作する
MP3 File Source

https://msdn.microsoft.com/en-us/library/windows/desktop/ff685299(v=vs.85).aspx

MPEG-4 File Source

https://msdn.microsoft.com/en-us/library/windows/desktop/dd757766(v=vs.85).aspx

MediaSink

Media Sinks

EVR

Enhanced Video Renderer
MediaSink
HWNDを渡してWindowに描画させることが出来る。
Presenterを自作して描画をカスタマイズできる。
D3D9 ?
EVR カスタムプレゼンタを実装する

SAR

Streaming Audio Renderer

AudioSink自作

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsink

VideoSink自作

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer

Playbackに対応した自前描画を作るには。

MediaSinkを自作する
MediaSinkでDXVAを使う

SampleGrabberSink

MFCreateSampleGrabberSinkActivate

MediaTransform

Media Foundation Transforms

About MFTs

Comparison of MFTs and DMOs

H.264

H.264 Video Decoder

DXVA
DirectX Video Acceleration。

About DXVA 2.0
Adding a Decoder to a Topology

MR_VIDEO_ACCELERATION_SERVICE
D3d9

Supporting DXVA 2.0 in Media Foundation
DXVA Video Processing
IDirect3DDeviceManager9

D3D11

https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer
Supporting Direct3D 11 Video Decoding in Media Foundation
IMFDXGIDeviceManager

Sample & Buffer
Sampleの中にBufferが入っている。

Media Samples

Video Samples

Media Buffers
https://github.com/loskutov/VideoCapture/blob/master/src/DesktopDuplicationSampleProvider.cpp

MediaType

Media Types

Presentation Clock

Presentation Clock

Media Event

Media Event Generators

linkするライブラリ
関数はドキュメントでわかるが定数はどれに入っているかわからない。
わりと総当たりで試すはめになる。

mf.lib
mfplat.lib
mfuuid.lib
strmiids.lib
wmcodecdspuuid.lib

参考

Media Foundation Programming Guide

