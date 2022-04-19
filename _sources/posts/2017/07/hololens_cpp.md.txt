---
title: "c++でHololens"
date: 2017-07-09
tags: ['cpp', 'hololens']
---

SharpDXでHololensが頓挫したので、C++でまいりましょう。

VisualStudio2015update3しかUnivsersal cpp HolographicApp templateが含まれないので githubにコピーしておいた。

https://github.com/ousttrue/HolographicApp

エミュレーターで描画が乱れる件
>>(tools)から

checkを外したらなおった。
実機
問題ない。
Hololens特有の部分
通常のDirectXとHolographicAppの違いを調べていたのだけれど、
両目レンダリングを効率よくするために、複数のレンダーターゲットに対して
まとめてパイプラインを実行する関連のようだ。
VPAndRTArrayIndexFromAnyShaderFeedingRasterizer
VPAndRTArrayIndexFromAnyShaderFeedingRasterizerないとき(エミュレーター)
// A constant buffer that stores the model transform.
cbuffer ModelConstantBuffer : register(b0)
{
    float4x4 model;
};

// A constant buffer that stores each set of view and projection matrices in column-major format.
cbuffer ViewProjectionConstantBuffer : register(b1)
{
    float4x4 viewProjection[2];
};

// Per-vertex data used as input to the vertex shader.
struct VertexShaderInput
{
    min16float3 pos     : POSITION;
    min16float3 color   : COLOR0;
    uint        instId  : SV_InstanceID;
};

// Per-vertex data passed to the geometry shader.
// Note that the render target array index will be set by the geometry shader
// using the value of viewId.
struct VertexShaderOutput
{
    min16float4 pos     : SV_POSITION;
    min16float3 color   : COLOR0;
    uint        viewId  : TEXCOORD0;  // SV_InstanceID % 2
};

// Simple shader to do vertex processing on the GPU.
VertexShaderOutput main(VertexShaderInput input)
{
    VertexShaderOutput output;
    float4 pos = float4(input.pos, 1.0f);

    // Note which view this vertex has been sent to. Used for matrix lookup.
    // Taking the modulo of the instance ID allows geometry instancing to be used
    // along with stereo instanced drawing; in that case, two copies of each 
    // instance would be drawn, one for left and one for right.
    int idx = input.instId % 2;

    // Transform the vertex position into world space.
    pos = mul(pos, model);

    // Correct for perspective and project the vertex position onto the screen.
    pos = mul(pos, viewProjection[idx]);
    output.pos = (min16float4)pos;

    // Pass the color through without modification.
    output.color = input.color;

    // Set the instance ID. The pass-through geometry shader will set the
    // render target array index to whatever value is set here.
    output.viewId = idx;

    return output;
}


// Per-vertex data from the vertex shader.
struct GeometryShaderInput
{
    min16float4 pos     : SV_POSITION;
    min16float3 color   : COLOR0;
    uint        instId  : TEXCOORD0;
};

// Per-vertex data passed to the rasterizer.
struct GeometryShaderOutput
{
    min16float4 pos     : SV_POSITION;
    min16float3 color   : COLOR0;
    uint        rtvId   : SV_RenderTargetArrayIndex; // <- RTVテクスチャアレイのindex
};

// This geometry shader is a pass-through that leaves the geometry unmodified 
// and sets the render target array index.
[maxvertexcount(3)]
void main(triangle GeometryShaderInput input[3], inout TriangleStream<GeometryShaderOutput> outStream)
{
    GeometryShaderOutput output;
    [unroll(3)]
    for (int i = 0; i < 3; ++i)
    {
        output.pos   = input[i].pos;
        output.color = input[i].color;
        output.rtvId = input[i].instId;
        outStream.Append(output);
    }
}

VPAndRTArrayIndexFromAnyShaderFeedingRasterizerあるとき
// A constant buffer that stores the model transform.
cbuffer ModelConstantBuffer : register(b0)
{
    float4x4 model;
};

// A constant buffer that stores each set of view and projection matrices in column-major format.
cbuffer ViewProjectionConstantBuffer : register(b1)
{
    float4x4 viewProjection[2];
};

// Per-vertex data used as input to the vertex shader.
struct VertexShaderInput
{
    min16float3 pos     : POSITION;
    min16float3 color   : COLOR0;
    uint        instId  : SV_InstanceID;
};

// Per-vertex data passed to the geometry shader.
// Note that the render target array index is set here in the vertex shader.
struct VertexShaderOutput
{
    min16float4 pos     : SV_POSITION;
    min16float3 color   : COLOR0;
    uint        rtvId   : SV_RenderTargetArrayIndex; // SV_InstanceID % 2 // <- RTVテクスチャアレイのindex
};

// Simple shader to do vertex processing on the GPU.
VertexShaderOutput main(VertexShaderInput input)
{
    VertexShaderOutput output;
    float4 pos = float4(input.pos, 1.0f);

    // Note which view this vertex has been sent to. Used for matrix lookup.
    // Taking the modulo of the instance ID allows geometry instancing to be used
    // along with stereo instanced drawing; in that case, two copies of each 
    // instance would be drawn, one for left and one for right.
    int idx = input.instId % 2;

    // Transform the vertex position into world space.
    pos = mul(pos, model);

    // Correct for perspective and project the vertex position onto the screen.
    pos = mul(pos, viewProjection[idx]);
    output.pos = (min16float4)pos;

    // Pass the color through without modification.
    output.color = input.color;

    // Set the render target array index.
    output.rtvId = idx;

    return output;
}

どう違うのか
見比べてみたところ、
VPAndRTArrayIndexFromAnyShaderFeedingRasterizer=trueの場合
VertexShaderでSV_RenderTargetArrayIndexを使うことが可能で、
そうでない場合はVertexShaderで使うことができないがGeometryShaderでSV_RenderTargetArrayIndexを使うことが可能ということらしい。
デバッガで確認したところ、実機・エミュレーター共に
backbufferはD3D11_TEXTURE2D_DESC.ArraySize=2となっていた。

https://developer.microsoft.com/en-us/windows/mixed-reality/rendering_in_directx#important_note_about_rendering_on_non-hololens_devices

実機ではVPAndRTArrayIndexFromAnyShaderFeedingRasterizer=true、エミュレーターでfalseでgometryshader版になることがわかった。
SV_RenderTargetArrayIndex

VRのためのステレオレンダリングを高速化するアイデア

なんとなくわかってきた。

ジオメトリシェーダを使用した複数画面描画

SV_ViewportArrayIndexというのもあるらしい。
なるほどー。

セマンティクス (DirectX HLSL)

まとめ
D3D11専用のレンダラを作ってみる。
HololensとUWP兼用のプロジェクトにできそうな気がする。
Hololensの初期化に失敗したら通常のUWPにフォールバックすればよいのではないか。
HoloApp
    Backbuffer
    CameraUpdate
    Input
        |
        v
    +----------+
    |SceneGraph|
    |Renderer  |
    +----------+
        ^
        |
    Input
    CameraUpdate
    Backbuffer
UwpApp

こんな感じのプロジェクトを模索してみよう。
