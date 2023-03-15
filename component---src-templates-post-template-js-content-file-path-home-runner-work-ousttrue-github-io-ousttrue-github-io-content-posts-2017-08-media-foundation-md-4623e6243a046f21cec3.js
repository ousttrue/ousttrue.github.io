"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1257],{6289:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var l=t(1151),a=t(7294);function r(e){const n=Object.assign({p:"p"},(0,l.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(n.p,null,"DirectShow後継の動画・音声フレームワーク。"),"\n",a.createElement(n.p,null,"sampleのありか"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation"),"\n",a.createElement(n.p,null,"Win7Samplesに気付かず・・・\nはじめの一歩\nここから始めるのがよい。"),"\n",a.createElement(n.p,null,"Audio/Video Playback"),"\n",a.createElement(n.p,null,"How to Play Media Files with Media Foundation"),"\n",a.createElement(n.p,null,"Media Session Playback Example。ソースあり"),"\n",a.createElement(n.p,null,"MediaSessionPlaybackExampleで動画を開くとこんな感じのTopologyになる。\n動画(MediaSource)---\x3evideo-> EVR(MediaSink)\n|\n+->audio-> SAR(MediaSink)"),"\n",a.createElement(n.p,null,"MediaSourceとMediaSinkを作ってつなぐのがMediaFoundationの基本概念。\nCMakeでビルドできるように取りまとめた。"),"\n",a.createElement(n.p,null,"https://github.com/ousttrue/MediaFoundationSample/tree/master/MediaSessionPlaybackExample"),"\n",a.createElement(n.p,null,"構成\nDirectShowとは違う感じのところがある。"),"\n",a.createElement(n.p,null,"IMFMediaSourceがストレージとDemuxerを内包している\nなので途中で枝分かれするというよりも、IMFMediaStream -> IMFTransform -> IMFStreamSinkというラインが複数ある感じになる。"),"\n",a.createElement(n.p,null,"+---------------+\n|IMFMediaSource |\n+---------------+\n|+-------------+|\n||IMFByteStream||\n|+-------------+|                                          VideoRenderer\n|  |  |Read     |                                          +------------+\n|  |  v         |     (compressed) decoder (uncompressed)  |IMFMediaSink|\n|  | +--------------+ IMFSample +------------+ IMFSample +-------------+|\n|  | |IMFMediaStream|----------\x3e|IMFTransform|----------\x3e|IMFStreamSink|+\n|  v +--------------+           +------------+           +-------------+\n| +--------------+              +------------+           +-------------+\n| |IMFMediaStream|-------------\x3e|IMFTransform|----------\x3e|IMFStreamSink|+\n| +--------------+  IMFSample   +------------+ IMFSample +-------------+|\n+---------------+   (compressed)           (uncompressed)  |IMFMediaSink|\n+------------+\nAudioRendrer"),"\n",a.createElement(n.p,null,"TopoEdit"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/topoedit\nhttp://blogs.microsoft.co.il/pavely/2011/03/11/introduction-to-topoedit/"),"\n",a.createElement(n.p,null,"いろんなAPI\nMediaSource(入力)とMediaSink(出力)を駆動する高レベルのAPIが複数ある。\n[Obsolete]古のPlayer"),"\n",a.createElement(n.p,null,"IMFPMediaPlayer"),"\n",a.createElement(n.p,null,"Important  Deprecated. This API may be removed from future releases of Windows. Applications should use the Media Session for playback."),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/blob/master/Samples/Win7Samples/multimedia/mediafoundation/SimplePlay\nhttps://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/MFPlayer2"),"\n",a.createElement(n.p,null,"[Desktop]再生向けのSession\nPlayer向けのAPI。UWPには無い。"),"\n",a.createElement(n.p,null,"Media Session\nhttp://blog.firefly-vj.net/2009/06/01/mediafoundation-play-with-mediasession.html\nMedia Foundationの再生サンプルの状態管理をMSMで行う"),"\n",a.createElement(n.p,null,"Topology"),"\n",a.createElement(n.p,null,"Topologies"),"\n",a.createElement(n.p,null,"変換向けのReader\nClockが必要ない用途に向いている。\n各フレームを最速で処理したい場合や、MediaSourceがWebCamである場合など。"),"\n",a.createElement(n.p,null,"Source Reader\nUsing the Source Reader to Process Media Data\nThe Source Reader does not support reverse playback, even if the media source does.\nMediaFoundationでID3D11Texture2Dに動画のフレームを読み込む 覚書β\nMediaFoundation — 動画の読み込み"),"\n",a.createElement(n.p,null,"[Desktop][UWP]WinRTのEngine\nWindows.Mediaのバックエンド？。UWPとDesktopの両方で使える。"),"\n",a.createElement(n.p,null,"Supported Microsoft Media Foundation APIs for Windows Phone 8\nWalkthrough: Using Microsoft Media Foundation for Windows Phone 8"),"\n",a.createElement(n.p,null,"using a MediaElement control is a much quicker and easier way\nYou also must use MF if you want to use video as a texture on 3-D geometry"),"\n",a.createElement(n.p,null,"DXVAが簡単にできる。むしろUWPではDXVAしかない様子。情報少ないけど。"),"\n",a.createElement(n.p,null,"Media engine native C++ video playback sample"),"\n",a.createElement(n.p,null,"MediaSource"),"\n",a.createElement(n.p,null,"Media Sources"),"\n",a.createElement(n.p,null,"Writing a Custom Media Source\nCase Study: MPEG-1 Media Source"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/mpeg1source\nhttps://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsource"),"\n",a.createElement(n.p,null,"Source Resolver"),"\n",a.createElement(n.p,null,"Using the Source Resolver"),"\n",a.createElement(n.p,null,"URL"),"\n",a.createElement(n.p,null,"IMFSourceResolver::CreateObjectFromURL"),"\n",a.createElement(n.p,null,"ByteStream"),"\n",a.createElement(n.p,null,"IMFSourceResolver::CreateObjectFromByteStream"),"\n",a.createElement(n.p,null,"ByteStreamを自作する\nMP3 File Source"),"\n",a.createElement(n.p,null,"https://msdn.microsoft.com/en-us/library/windows/desktop/ff685299(v=vs.85).aspx"),"\n",a.createElement(n.p,null,"MPEG-4 File Source"),"\n",a.createElement(n.p,null,"https://msdn.microsoft.com/en-us/library/windows/desktop/dd757766(v=vs.85).aspx"),"\n",a.createElement(n.p,null,"MediaSink"),"\n",a.createElement(n.p,null,"Media Sinks"),"\n",a.createElement(n.p,null,"EVR"),"\n",a.createElement(n.p,null,"Enhanced Video Renderer\nMediaSink\nHWNDを渡してWindowに描画させることが出来る。\nPresenterを自作して描画をカスタマイズできる。\nD3D9 ?\nEVR カスタムプレゼンタを実装する"),"\n",a.createElement(n.p,null,"SAR"),"\n",a.createElement(n.p,null,"Streaming Audio Renderer"),"\n",a.createElement(n.p,null,"AudioSink自作"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/Win7Samples/multimedia/mediafoundation/wavsink"),"\n",a.createElement(n.p,null,"VideoSink自作"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer"),"\n",a.createElement(n.p,null,"Playbackに対応した自前描画を作るには。"),"\n",a.createElement(n.p,null,"MediaSinkを自作する\nMediaSinkでDXVAを使う"),"\n",a.createElement(n.p,null,"SampleGrabberSink"),"\n",a.createElement(n.p,null,"MFCreateSampleGrabberSinkActivate"),"\n",a.createElement(n.p,null,"MediaTransform"),"\n",a.createElement(n.p,null,"Media Foundation Transforms"),"\n",a.createElement(n.p,null,"About MFTs"),"\n",a.createElement(n.p,null,"Comparison of MFTs and DMOs"),"\n",a.createElement(n.p,null,"H.264"),"\n",a.createElement(n.p,null,"H.264 Video Decoder"),"\n",a.createElement(n.p,null,"DXVA\nDirectX Video Acceleration。"),"\n",a.createElement(n.p,null,"About DXVA 2.0\nAdding a Decoder to a Topology"),"\n",a.createElement(n.p,null,"MR_VIDEO_ACCELERATION_SERVICE\nD3d9"),"\n",a.createElement(n.p,null,"Supporting DXVA 2.0 in Media Foundation\nDXVA Video Processing\nIDirect3DDeviceManager9"),"\n",a.createElement(n.p,null,"D3D11"),"\n",a.createElement(n.p,null,"https://github.com/Microsoft/Windows-classic-samples/tree/master/Samples/DX11VideoRenderer\nSupporting Direct3D 11 Video Decoding in Media Foundation\nIMFDXGIDeviceManager"),"\n",a.createElement(n.p,null,"Sample & Buffer\nSampleの中にBufferが入っている。"),"\n",a.createElement(n.p,null,"Media Samples"),"\n",a.createElement(n.p,null,"Video Samples"),"\n",a.createElement(n.p,null,"Media Buffers\nhttps://github.com/loskutov/VideoCapture/blob/master/src/DesktopDuplicationSampleProvider.cpp"),"\n",a.createElement(n.p,null,"MediaType"),"\n",a.createElement(n.p,null,"Media Types"),"\n",a.createElement(n.p,null,"Presentation Clock"),"\n",a.createElement(n.p,null,"Presentation Clock"),"\n",a.createElement(n.p,null,"Media Event"),"\n",a.createElement(n.p,null,"Media Event Generators"),"\n",a.createElement(n.p,null,"linkするライブラリ\n関数はドキュメントでわかるが定数はどれに入っているかわからない。\nわりと総当たりで試すはめになる。"),"\n",a.createElement(n.p,null,"mf.lib\nmfplat.lib\nmfuuid.lib\nstrmiids.lib\nwmcodecdspuuid.lib"),"\n",a.createElement(n.p,null,"参考"),"\n",a.createElement(n.p,null,"Media Foundation Programming Guide"))}var i=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?a.createElement(n,e,a.createElement(r,e)):r(e)};t(8678);function o(e){let{data:n,children:t}=e;return a.createElement(a.Fragment,null,a.createElement("h1",null,n.mdx.frontmatter.title),a.createElement(l.Zo,null,t))}function m(e){return a.createElement(o,e,a.createElement(i,e))}},8678:function(e,n,t){t(7294)},1151:function(e,n,t){t.d(n,{Zo:function(){return o},ah:function(){return r}});var l=t(7294);const a=l.createContext({});function r(e){const n=l.useContext(a);return l.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}const i={};function o({components:e,children:n,disableParentContext:t}){let o;return o=t?"function"==typeof e?e({}):e||i:r(e),l.createElement(a.Provider,{value:o},n)}}}]);
//# sourceMappingURL=component---src-templates-post-template-js-content-file-path-home-runner-work-ousttrue-github-io-ousttrue-github-io-content-posts-2017-08-media-foundation-md-4623e6243a046f21cec3.js.map