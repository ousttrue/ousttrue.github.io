"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[481],{7314:function(e,n,t){t.r(n);var r=t(1151),o=t(7294);function a(e){const n=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),e.components);return o.createElement(o.Fragment,null,o.createElement(n.p,null,"SharpDX で Hololens が頓挫したので、C++でまいりましょう。"),"\n",o.createElement(n.p,null,"VisualStudio2015update3 しか Univsersal cpp HolographicApp template が含まれないので github にコピーしておいた。"),"\n",o.createElement(n.p,null,"https://github.com/ousttrue/HolographicApp"),"\n",o.createElement(n.p,null,"エミュレーターで描画が乱れる件"),"\n",o.createElement(n.pre,null,o.createElement(n.code,null,">>(tools)から\n")),"\n",o.createElement(n.p,null,"check を外したらなおった。\n実機\n問題ない。\nHololens 特有の部分\n通常の DirectX と HolographicApp の違いを調べていたのだけれど、\n両目レンダリングを効率よくするために、複数のレンダーターゲットに対して\nまとめてパイプラインを実行する関連のようだ。"),"\n",o.createElement(n.pre,null,o.createElement(n.code,{className:"language-cpp"},"VPAndRTArrayIndexFromAnyShaderFeedingRasterizer\nVPAndRTArrayIndexFromAnyShaderFeedingRasterizerないとき(エミュレーター)\n// A constant buffer that stores the model transform.\ncbuffer ModelConstantBuffer : register(b0)\n{\n    float4x4 model;\n};\n\n// A constant buffer that stores each set of view and projection matrices in column-major format.\ncbuffer ViewProjectionConstantBuffer : register(b1)\n{\n    float4x4 viewProjection[2];\n};\n\n// Per-vertex data used as input to the vertex shader.\nstruct VertexShaderInput\n{\n    min16float3 pos     : POSITION;\n    min16float3 color   : COLOR0;\n    uint        instId  : SV_InstanceID;\n};\n\n// Per-vertex data passed to the geometry shader.\n// Note that the render target array index will be set by the geometry shader\n// using the value of viewId.\nstruct VertexShaderOutput\n{\n    min16float4 pos     : SV_POSITION;\n    min16float3 color   : COLOR0;\n    uint        viewId  : TEXCOORD0;  // SV_InstanceID % 2\n};\n\n// Simple shader to do vertex processing on the GPU.\nVertexShaderOutput main(VertexShaderInput input)\n{\n    VertexShaderOutput output;\n    float4 pos = float4(input.pos, 1.0f);\n\n    // Note which view this vertex has been sent to. Used for matrix lookup.\n    // Taking the modulo of the instance ID allows geometry instancing to be used\n    // along with stereo instanced drawing; in that case, two copies of each\n    // instance would be drawn, one for left and one for right.\n    int idx = input.instId % 2;\n\n    // Transform the vertex position into world space.\n    pos = mul(pos, model);\n\n    // Correct for perspective and project the vertex position onto the screen.\n    pos = mul(pos, viewProjection[idx]);\n    output.pos = (min16float4)pos;\n\n    // Pass the color through without modification.\n    output.color = input.color;\n\n    // Set the instance ID. The pass-through geometry shader will set the\n    // render target array index to whatever value is set here.\n    output.viewId = idx;\n\n    return output;\n}\n\n\n// Per-vertex data from the vertex shader.\nstruct GeometryShaderInput\n{\n    min16float4 pos     : SV_POSITION;\n    min16float3 color   : COLOR0;\n    uint        instId  : TEXCOORD0;\n};\n\n// Per-vertex data passed to the rasterizer.\nstruct GeometryShaderOutput\n{\n    min16float4 pos     : SV_POSITION;\n    min16float3 color   : COLOR0;\n    uint        rtvId   : SV_RenderTargetArrayIndex; // <- RTVテクスチャアレイのindex\n};\n\n// This geometry shader is a pass-through that leaves the geometry unmodified\n// and sets the render target array index.\n[maxvertexcount(3)]\nvoid main(triangle GeometryShaderInput input[3], inout TriangleStream<GeometryShaderOutput> outStream)\n{\n    GeometryShaderOutput output;\n    [unroll(3)]\n    for (int i = 0; i < 3; ++i)\n    {\n        output.pos   = input[i].pos;\n        output.color = input[i].color;\n        output.rtvId = input[i].instId;\n        outStream.Append(output);\n    }\n}\n\nVPAndRTArrayIndexFromAnyShaderFeedingRasterizerあるとき\n// A constant buffer that stores the model transform.\ncbuffer ModelConstantBuffer : register(b0)\n{\n    float4x4 model;\n};\n\n// A constant buffer that stores each set of view and projection matrices in column-major format.\ncbuffer ViewProjectionConstantBuffer : register(b1)\n{\n    float4x4 viewProjection[2];\n};\n\n// Per-vertex data used as input to the vertex shader.\nstruct VertexShaderInput\n{\n    min16float3 pos     : POSITION;\n    min16float3 color   : COLOR0;\n    uint        instId  : SV_InstanceID;\n};\n\n// Per-vertex data passed to the geometry shader.\n// Note that the render target array index is set here in the vertex shader.\nstruct VertexShaderOutput\n{\n    min16float4 pos     : SV_POSITION;\n    min16float3 color   : COLOR0;\n    uint        rtvId   : SV_RenderTargetArrayIndex; // SV_InstanceID % 2 // <- RTVテクスチャアレイのindex\n};\n\n// Simple shader to do vertex processing on the GPU.\nVertexShaderOutput main(VertexShaderInput input)\n{\n    VertexShaderOutput output;\n    float4 pos = float4(input.pos, 1.0f);\n\n    // Note which view this vertex has been sent to. Used for matrix lookup.\n    // Taking the modulo of the instance ID allows geometry instancing to be used\n    // along with stereo instanced drawing; in that case, two copies of each\n    // instance would be drawn, one for left and one for right.\n    int idx = input.instId % 2;\n\n    // Transform the vertex position into world space.\n    pos = mul(pos, model);\n\n    // Correct for perspective and project the vertex position onto the screen.\n    pos = mul(pos, viewProjection[idx]);\n    output.pos = (min16float4)pos;\n\n    // Pass the color through without modification.\n    output.color = input.color;\n\n    // Set the render target array index.\n    output.rtvId = idx;\n\n    return output;\n}\n")),"\n",o.createElement(n.p,null,"どう違うのか\n見比べてみたところ、\nVPAndRTArrayIndexFromAnyShaderFeedingRasterizer=true の場合\nVertexShader で SV_RenderTargetArrayIndex を使うことが可能で、\nそうでない場合は VertexShader で使うことができないが GeometryShader で SV_RenderTargetArrayIndex を使うことが可能ということらしい。\nデバッガで確認したところ、実機・エミュレーター共に\nbackbuffer は D3D11_TEXTURE2D_DESC.ArraySize=2 となっていた。"),"\n",o.createElement(n.p,null,"https://developer.microsoft.com/en-us/windows/mixed-reality/rendering_in_directx#important_note_about_rendering_on_non-hololens_devices"),"\n",o.createElement(n.p,null,"実機では VPAndRTArrayIndexFromAnyShaderFeedingRasterizer=true、エミュレーターで false で gometryshader 版になることがわかった。\nSV_RenderTargetArrayIndex"),"\n",o.createElement(n.p,null,"VR のためのステレオレンダリングを高速化するアイデア"),"\n",o.createElement(n.p,null,"なんとなくわかってきた。"),"\n",o.createElement(n.p,null,"ジオメトリシェーダを使用した複数画面描画"),"\n",o.createElement(n.p,null,"SV_ViewportArrayIndex というのもあるらしい。\nなるほどー。"),"\n",o.createElement(n.p,null,"セマンティクス (DirectX HLSL)"),"\n",o.createElement(n.p,null,"まとめ\nD3D11 専用のレンダラを作ってみる。\nHololens と UWP 兼用のプロジェクトにできそうな気がする。\nHololens の初期化に失敗したら通常の UWP にフォールバックすればよいのではないか。"),"\n",o.createElement(n.pre,null,o.createElement(n.code,null,"HoloApp\n    Backbuffer\n    CameraUpdate\n    Input\n        |\n        v\n    +----------+\n    |SceneGraph|\n    |Renderer  |\n    +----------+\n        ^\n        |\n    Input\n    CameraUpdate\n    Backbuffer\nUwpApp\n")),"\n",o.createElement(n.p,null,"こんな感じのプロジェクトを模索してみよう。"))}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?o.createElement(n,e,o.createElement(a,e)):a(e)}},1151:function(e,n,t){t.d(n,{ah:function(){return a}});var r=t(7294);const o=r.createContext({});function a(e){const n=r.useContext(o);return r.useMemo((()=>"function"==typeof e?e(n):{...n,...e}),[n,e])}}}]);
//# sourceMappingURL=component---content-posts-2017-07-hololens-cpp-md-be1aee3e7a37862cbe44.js.map