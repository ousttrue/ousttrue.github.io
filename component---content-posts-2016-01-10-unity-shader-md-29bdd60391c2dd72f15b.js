"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5443],{8899:function(n,e,a){a.r(e);var r=a(1151),t=a(7294);function o(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,r.ah)(),n.components);return t.createElement(t.Fragment,null,t.createElement(e.p,null,"下記の Unity の半透明シェーダーがいったいどういうメカニズムなのかを調べる。\nShader の元ネタはこちら"),"\n",t.createElement(e.p,null,"Unity で Transparent/Diffuse で描画順が崩れてしまう際の対処法"),"\n",t.createElement(e.pre,null,t.createElement(e.code,null,'Shader "Transparent/Diffuse ZWrite" {\n    Properties{\n        _Color("Main Color", Color) = (1,1,1,1)\n        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}\n    }\n\n    SubShader{\n        Tags{ "Queue" = "Transparent" "IgnoreProjector" = "True" "RenderType" = "Transparent" }\n        LOD 200\n\n        // extra pass that renders to depth buffer only\n        Pass{\n            ZWrite On\n            ColorMask 0\n        }\n\n        // paste in forward rendering passes from Transparent/Diffuse\n        UsePass "Transparent/Diffuse/FORWARD"\n    }\n\n    Fallback "Transparent/VertexLit"\n}\n\n２パス描画になる。\nパス1: 深度バッファのみの描画\nPass{\n    ZWrite On\n    ColorMask 0\n}\n\nこれは、ShaderLab ：旧ライティングというものらしく\nFixed function\nという機能らしい。\nレガシーとか旧呼ばわりされているけどサンプルコードにしれっと出てくるので知っている必要がある。\n次のようなコードが生成されていた。\nShaderのInspector: Fixed function. Show generated codeの該当部分\n Pass {\n  Tags { "QUEUE"="Transparent" "IGNOREPROJECTOR"="true" "RenderType"="Transparent" }\n  ColorMask 0\nCGPROGRAM\n#pragma vertex vert\n#pragma fragment frag\n#include "UnityShaderVariables.cginc"\n#pragma multi_compile_fog\n#include "UnityCG.cginc"\n#define USING_FOG (defined(FOG_LINEAR) || defined(FOG_EXP) || defined(FOG_EXP2))\n\n// uniforms\n\n// vertex shader input data\nstruct appdata {\n  float3 pos : POSITION;\n  half4 color : COLOR;\n};\n\n// vertex-to-fragment interpolators\nstruct v2f {\n  fixed4 color : COLOR0;\n  #if USING_FOG\n    fixed fog : TEXCOORD0;\n  #endif\n  float4 pos : SV_POSITION;\n};\n\n// vertex shader\nv2f vert (appdata IN) {\n  v2f o;\n  half4 color = IN.color;\n  float3 eyePos = mul (UNITY_MATRIX_MV, float4(IN.pos,1)).xyz;\n  half3 viewDir = 0.0;\n  o.color = saturate(color);\n  // compute texture coordinates\n  // fog\n  #if USING_FOG\n    float fogCoord = length(eyePos.xyz); // radial fog distance\n    UNITY_CALC_FOG_FACTOR(fogCoord);\n    o.fog = saturate(unityFogFactor);\n  #endif\n  // transform position\n  o.pos = mul(UNITY_MATRIX_MVP, float4(IN.pos,1));\n  return o;\n}\n\n// fragment shader\nfixed4 frag (v2f IN) : SV_Target {\n  fixed4 col;\n  col = IN.color;\n  // fog\n  #if USING_FOG\n    col.rgb = lerp (unity_FogColor.rgb, col.rgb, IN.fog);\n  #endif\n  return col;\n}\nENDCG\n }\n\n単に頂点カラーをそのまま描画しているようだが、ColorMaskが0なので色は変わらずということらしい。\nパス2: カラーバッファ\nTransparent/Diffuse\nUsePass "Transparent/Diffuse/FORWARD"\n\nは何なのか。\nhttps://unity3d.com/jp/get-unity/download/archive\nからビルトインシェーダーをDownloadして観察してみる。\n探してみると”Transparent/Diffuse”という名のシェーダーは無くて、\n“Legacy Shaders/Transparent/Diffuse”が見つかる。\nDefaultResourceExtra/Alpha-Diffuse.shader\nShader "Legacy Shaders/Transparent/Diffuse" {\nProperties {\n    _Color ("Main Color", Color) = (1,1,1,1)\n    _MainTex ("Base (RGB) Trans (A)", 2D) = "white" {}\n}\n\nSubShader {\n    Tags {"Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent"}\n    LOD 200\n\nCGPROGRAM\n#pragma surface surf Lambert alpha:fade\n\nsampler2D _MainTex;\nfixed4 _Color;\n\nstruct Input {\n    float2 uv_MainTex;\n};\n\nvoid surf (Input IN, inout SurfaceOutput o) {\n    fixed4 c = tex2D(_MainTex, IN.uv_MainTex) * _Color;\n    o.Albedo = c.rgb;\n    o.Alpha = c.a;\n}\nENDCG\n}\n\nFallback "Legacy Shaders/Transparent/VertexLit"\n}\n\nsurfaceシェーダーらしい。\nsurfaceシェーダーが如何なるPassに展開されるのかがまったくわからないが(LightMode等が関係ある？)\nFORWARDパスはどこで定義されているのか。\nTransparent/Diffuse/FORWARD\nDefaultResourcesExtra/Standard.shader\n    SubShader\n    {\n        Tags { "RenderType"="Opaque" "PerformanceChecks"="False" }\n        LOD 300\n\n\n        // ------------------------------------------------------------------\n        //  Base forward pass (directional light, emission, lightmaps, ...)\n        Pass\n        {\n            Name "FORWARD"\n            Tags { "LightMode" = "ForwardBase" }\n\n            Blend [_SrcBlend] [_DstBlend]\n            ZWrite [_ZWrite]\n\n            CGPROGRAM\n            #pragma target 3.0\n            // TEMPORARY: GLES2.0 temporarily disabled to prevent errors spam on devices without textureCubeLodEXT\n            #pragma exclude_renderers gles\n\n            // -------------------------------------\n\n            #pragma shader_feature _NORMALMAP\n            #pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON\n            #pragma shader_feature _EMISSION\n            #pragma shader_feature _METALLICGLOSSMAP\n            #pragma shader_feature ___ _DETAIL_MULX2\n            #pragma shader_feature _PARALLAXMAP\n\n            #pragma multi_compile_fwdbase\n            #pragma multi_compile_fog\n\n            #pragma vertex vertBase\n            #pragma fragment fragBase\n            #include "UnityStandardCoreForward.cginc"\n\n            ENDCG\n        }\n    }\n\nvertBaseとfragBaseという関数に辿り着く。\nvertBaseとfragBase\nCGIncludes/UnityStandardCoreForward.cginc\n#ifndef UNITY_STANDARD_CORE_FORWARD_INCLUDED\n#define UNITY_STANDARD_CORE_FORWARD_INCLUDED\n\n#if defined(UNITY_NO_FULL_STANDARD_SHADER)\n#    define UNITY_STANDARD_SIMPLE 1\n#endif\n\n#include "UnityStandardConfig.cginc"\n\n#if UNITY_STANDARD_SIMPLE\n    #include "UnityStandardCoreForwardSimple.cginc"\n    VertexOutputBaseSimple vertBase (VertexInput v) { return vertForwardBaseSimple(v); }\n    VertexOutputForwardAddSimple vertAdd (VertexInput v) { return vertForwardAddSimple(v); }\n    half4 fragBase (VertexOutputBaseSimple i) : SV_Target { return fragForwardBaseSimpleInternal(i); }\n    half4 fragAdd (VertexOutputForwardAddSimple i) : SV_Target { return fragForwardAddSimpleInternal(i); }\n#else\n    #include "UnityStandardCore.cginc"\n    VertexOutputForwardBase vertBase (VertexInput v) { return vertForwardBase(v); }\n    VertexOutputForwardAdd vertAdd (VertexInput v) { return vertForwardAdd(v); }\n    half4 fragBase (VertexOutputForwardBase i) : SV_Target { return fragForwardBaseInternal(i); }\n    half4 fragAdd (VertexOutputForwardAdd i) : SV_Target { return fragForwardAddInternal(i); }\n#endif\n\n#endif // UNITY_STANDARD_CORE_FORWARD_INCLUDED\n\nシンプルとノットシンプルの振り分けをしている。\nvertBase\n    VertexOutputForwardBase vertBase (VertexInput v) { return vertForwardBase(v); }\n\nCGInlucdes/UnityStandardCore.cginc\nVertexOutputForwardBase vertForwardBase (VertexInput v)\n{\n    VertexOutputForwardBase o;\n    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);\n\n    float4 posWorld = mul(_Object2World, v.vertex);\n    #if UNITY_SPECCUBE_BOX_PROJECTION\n        o.posWorld = posWorld.xyz;\n    #endif\n    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);\n    o.tex = TexCoords(v);\n    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);\n    float3 normalWorld = UnityObjectToWorldNormal(v.normal);\n    #ifdef _TANGENT_TO_WORLD\n        float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);\n\n        float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);\n        o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];\n        o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];\n        o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];\n    #else\n        o.tangentToWorldAndParallax[0].xyz = 0;\n        o.tangentToWorldAndParallax[1].xyz = 0;\n        o.tangentToWorldAndParallax[2].xyz = normalWorld;\n    #endif\n    //We need this for shadow receving\n    TRANSFER_SHADOW(o);\n\n    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);\n\n    #ifdef _PARALLAXMAP\n        TANGENT_SPACE_ROTATION;\n        half3 viewDirForParallax = mul (rotation, ObjSpaceViewDir(v.vertex));\n        o.tangentToWorldAndParallax[0].w = viewDirForParallax.x;\n        o.tangentToWorldAndParallax[1].w = viewDirForParallax.y;\n        o.tangentToWorldAndParallax[2].w = viewDirForParallax.z;\n    #endif\n\n    #if UNITY_OPTIMIZE_TEXCUBELOD\n        o.reflUVW         = reflect(o.eyeVec, normalWorld);\n    #endif\n\n    UNITY_TRANSFER_FOG(o,o.pos);\n    return o;\n}\n\n普通に頂点シェーダー。たぶん\nfragBase\n    half4 fragBase (VertexOutputForwardBase i) : SV_Target { return fragForwardBaseInternal(i); }\n\nCGInlucdes/UnityStandardCore.cginc\n#define FRAGMENT_SETUP(x) FragmentCommonData x = \\\n    FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));\n\nstruct FragmentCommonData\n{\n    half3 diffColor, specColor;\n    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.\n    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.\n    half oneMinusReflectivity, oneMinusRoughness;\n    half3 normalWorld, eyeVec, posWorld;\n    half alpha;\n\n#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE\n    half3 reflUVW;\n#endif\n\n#if UNITY_STANDARD_SIMPLE\n    half3 tangentSpaceNormal;\n#endif\n};\n\nhalf4 OutputForward (half4 output, half alphaFromSurface)\n{\n    #if defined(_ALPHABLEND_ON) || defined(_ALPHAPREMULTIPLY_ON)\n        output.a = alphaFromSurface;\n    #else\n        UNITY_OPAQUE_ALPHA(output.a);\n    #endif\n    return output;\n}\n\nhalf4 fragForwardBaseInternal (VertexOutputForwardBase i)\n{\n    FRAGMENT_SETUP(s)\n#if UNITY_OPTIMIZE_TEXCUBELOD\n    s.reflUVW        = i.reflUVW;\n#endif\n\n    UnityLight mainLight = MainLight (s.normalWorld);\n    half atten = SHADOW_ATTENUATION(i);\n\n\n    half occlusion = Occlusion(i.tex.xy);\n    UnityGI gi = FragmentGI (s, occlusion, i.ambientOrLightmapUV, atten, mainLight);\n\n    half4 c = UNITY_BRDF_PBS (s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);\n    c.rgb += UNITY_BRDF_GI (s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);\n    c.rgb += Emission(i.tex.xy);\n\n    UNITY_APPLY_FOG(i.fogCoord, c.rgb);\n    return OutputForward (c, s.alpha);\n}\n\n普通にピクセルシェーダーで便利関数がいっぱい定義済みという感じか。\nしかし、#ifの類がたくさんありどのルートが使われるか不明瞭。\nincludeを展開してみる\nUsePassの代わりに自前のファイルにシェーダーのコードをコピーしてそっちを使ってみる。\nDefaultResourcesExtra/Standard.shaderから切り張り\n        Pass{\n            Name "FORWARD"\n            Tags{ "LightMode" = "ForwardBase" }\n\n            ZWrite Off\n            ColorMask RGB\n            Blend SrcAlpha OneMinusSrcAlpha\n\n            CGPROGRAM\n            #pragma target 2.0\n\n            #pragma shader_feature _NORMALMAP\n            #pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON\n            #pragma shader_feature _EMISSION\n            #pragma shader_feature _METALLICGLOSSMAP\n            #pragma shader_feature ___ _DETAIL_MULX2\n            // SM2.0: NOT SUPPORTED shader_feature _PARALLAXMAP\n\n            #pragma skip_variants SHADOWS_SOFT DIRLIGHTMAP_COMBINED DIRLIGHTMAP_SEPARATE\n\n            #pragma multi_compile_fwdbase\n            #pragma multi_compile_fog\n\n            #pragma vertex vertBase\n            #pragma fragment fragBase\n\n            #include "TransparentDiffuseWithZwrite_FORWARD.cginc"\n            ENDCG\n        }\n\n\nUnityStandardCore.cgincから使うところだけ収集。\nTransparentDiffuseWithZwrite_FORWARD.cginc\n#include "UnityStandardConfig.cginc"\n#include "UnityCG.cginc"\n#include "UnityStandardInput.cginc"\n#include "AutoLight.cginc"\n\nstruct VertexOutputForwardBase\n{\n    float4 pos                            : SV_POSITION;\n    float4 tex                            : TEXCOORD0;\n    half3 eyeVec                         : TEXCOORD1;\n    half4 tangentToWorldAndParallax[3]    : TEXCOORD2;    // [3x3:tangentToWorld | 1x3:viewDirForParallax]\n    half4 ambientOrLightmapUV            : TEXCOORD5;    // SH or Lightmap UV\n    SHADOW_COORDS(6)\n        UNITY_FOG_COORDS(7)\n\n        // next ones would not fit into SM2.0 limits, but they are always for SM3.0+\n#if UNITY_SPECCUBE_BOX_PROJECTION\n        float3 posWorld                    : TEXCOORD8;\n#endif\n\n#if UNITY_OPTIMIZE_TEXCUBELOD\n#if UNITY_SPECCUBE_BOX_PROJECTION\n    half3 reflUVW                : TEXCOORD9;\n#else\n    half3 reflUVW                : TEXCOORD8;\n#endif\n#endif\n};\n\nhalf3 NormalizePerVertexNormal(half3 n)\n{\n#if (SHADER_TARGET < 30) || UNITY_STANDARD_SIMPLE\n    return normalize(n);\n#else\n    return n; // will normalize per-pixel instead\n#endif\n}\n\nhalf3 NormalizePerPixelNormal(half3 n)\n{\n#if (SHADER_TARGET < 30) || UNITY_STANDARD_SIMPLE\n    return n;\n#else\n    return normalize(n);\n#endif\n}\n\nUnityLight MainLight(half3 normalWorld)\n{\n    UnityLight l;\n#ifdef LIGHTMAP_OFF\n\n    l.color = _LightColor0.rgb;\n    l.dir = _WorldSpaceLightPos0.xyz;\n    l.ndotl = LambertTerm(normalWorld, l.dir);\n#else\n    // no light specified by the engine\n    // analytical light might be extracted from Lightmap data later on in the shader depending on the Lightmap type\n    l.color = half3(0.f, 0.f, 0.f);\n    l.ndotl = 0.f;\n    l.dir = half3(0.f, 0.f, 0.f);\n#endif\n\n    return l;\n}\n\ninline half4 VertexGIForward(VertexInput v, float3 posWorld, half3 normalWorld)\n{\n    half4 ambientOrLightmapUV = 0;\n    // Static lightmaps\n#ifndef LIGHTMAP_OFF\n    ambientOrLightmapUV.xy = v.uv1.xy * unity_LightmapST.xy + unity_LightmapST.zw;\n    ambientOrLightmapUV.zw = 0;\n    // Sample light probe for Dynamic objects only (no static or dynamic lightmaps)\n#elif UNITY_SHOULD_SAMPLE_SH\n#ifdef VERTEXLIGHT_ON\n    // Approximated illumination from non-important point lights\n    ambientOrLightmapUV.rgb = Shade4PointLights(\n            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,\n            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,\n            unity_4LightAtten0, posWorld, normalWorld);\n#endif\n\n    ambientOrLightmapUV.rgb = ShadeSHPerVertex(normalWorld, ambientOrLightmapUV.rgb);\n#endif\n\n#ifdef DYNAMICLIGHTMAP_ON\n    ambientOrLightmapUV.zw = v.uv2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;\n#endif\n\n    return ambientOrLightmapUV;\n}\n\nVertexOutputForwardBase vertForwardBase(VertexInput v)\n{\n    VertexOutputForwardBase o;\n    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);\n\n    float4 posWorld = mul(_Object2World, v.vertex);\n#if UNITY_SPECCUBE_BOX_PROJECTION\n    o.posWorld = posWorld.xyz;\n#endif\n    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);\n    o.tex = TexCoords(v);\n    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);\n    float3 normalWorld = UnityObjectToWorldNormal(v.normal);\n#ifdef _TANGENT_TO_WORLD\n    float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);\n\n    float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);\n    o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];\n    o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];\n    o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];\n#else\n    o.tangentToWorldAndParallax[0].xyz = 0;\n    o.tangentToWorldAndParallax[1].xyz = 0;\n    o.tangentToWorldAndParallax[2].xyz = normalWorld;\n#endif\n    //We need this for shadow receving\n    TRANSFER_SHADOW(o);\n\n    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);\n\n#ifdef _PARALLAXMAP\n    TANGENT_SPACE_ROTATION;\n    half3 viewDirForParallax = mul(rotation, ObjSpaceViewDir(v.vertex));\n    o.tangentToWorldAndParallax[0].w = viewDirForParallax.x;\n    o.tangentToWorldAndParallax[1].w = viewDirForParallax.y;\n    o.tangentToWorldAndParallax[2].w = viewDirForParallax.z;\n#endif\n\n#if UNITY_OPTIMIZE_TEXCUBELOD\n    o.reflUVW = reflect(o.eyeVec, normalWorld);\n#endif\n\n    UNITY_TRANSFER_FOG(o,o.pos);\n    return o;\n}\n\nVertexOutputForwardBase vertBase(VertexInput v) { return vertForwardBase(v); }\n//VertexOutputForwardAdd vertAdd(VertexInput v) { return vertForwardAdd(v); }\n\n#ifdef _PARALLAXMAP\n#define IN_VIEWDIR4PARALLAX(i) NormalizePerPixelNormal(half3(i.tangentToWorldAndParallax[0].w,i.tangentToWorldAndParallax[1].w,i.tangentToWorldAndParallax[2].w))\n#define IN_VIEWDIR4PARALLAX_FWDADD(i) NormalizePerPixelNormal(i.viewDirForParallax.xyz)\n#else\n#define IN_VIEWDIR4PARALLAX(i) half3(0,0,0)\n#define IN_VIEWDIR4PARALLAX_FWDADD(i) half3(0,0,0)\n#endif\n\n#if UNITY_SPECCUBE_BOX_PROJECTION\n#define IN_WORLDPOS(i) i.posWorld\n#else\n#define IN_WORLDPOS(i) half3(0,0,0)\n#endif\n\nstruct FragmentCommonData\n{\n    half3 diffColor, specColor;\n    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.\n    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.\n    half oneMinusReflectivity, oneMinusRoughness;\n    half3 normalWorld, eyeVec, posWorld;\n    half alpha;\n\n#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE\n    half3 reflUVW;\n#endif\n\n#if UNITY_STANDARD_SIMPLE\n    half3 tangentSpaceNormal;\n#endif\n};\n\ninline FragmentCommonData MetallicSetup(float4 i_tex)\n{\n    half2 metallicGloss = MetallicGloss(i_tex.xy);\n    half metallic = metallicGloss.x;\n    half oneMinusRoughness = metallicGloss.y;        // this is 1 minus the square root of real roughness m.\n\n    half oneMinusReflectivity;\n    half3 specColor;\n    half3 diffColor = DiffuseAndSpecularFromMetallic(Albedo(i_tex), metallic, /*out*/ specColor, /*out*/ oneMinusReflectivity);\n\n    FragmentCommonData o = (FragmentCommonData)0;\n    o.diffColor = diffColor;\n    o.specColor = specColor;\n    o.oneMinusReflectivity = oneMinusReflectivity;\n    o.oneMinusRoughness = oneMinusRoughness;\n    return o;\n}\n\n\n#ifndef UNITY_SETUP_BRDF_INPUT\n#define UNITY_SETUP_BRDF_INPUT SpecularSetup\n#endif\n\ninline FragmentCommonData SpecularSetup(float4 i_tex)\n{\n    half4 specGloss = SpecularGloss(i_tex.xy);\n    half3 specColor = specGloss.rgb;\n    half oneMinusRoughness = specGloss.a;\n\n    half oneMinusReflectivity;\n    half3 diffColor = EnergyConservationBetweenDiffuseAndSpecular(Albedo(i_tex), specColor, /*out*/ oneMinusReflectivity);\n\n    FragmentCommonData o = (FragmentCommonData)0;\n    o.diffColor = diffColor;\n    o.specColor = specColor;\n    o.oneMinusReflectivity = oneMinusReflectivity;\n    o.oneMinusRoughness = oneMinusRoughness;\n    return o;\n}\n\nhalf3 PerPixelWorldNormal(float4 i_tex, half4 tangentToWorld[3])\n{\n#ifdef _NORMALMAP\n    half3 tangent = tangentToWorld[0].xyz;\n    half3 binormal = tangentToWorld[1].xyz;\n    half3 normal = tangentToWorld[2].xyz;\n\n#if UNITY_TANGENT_ORTHONORMALIZE\n    normal = NormalizePerPixelNormal(normal);\n\n    // ortho-normalize Tangent\n    tangent = normalize(tangent - normal * dot(tangent, normal));\n\n    // recalculate Binormal\n    half3 newB = cross(normal, tangent);\n    binormal = newB * sign(dot(newB, binormal));\n#endif\n\n    half3 normalTangent = NormalInTangentSpace(i_tex);\n    half3 normalWorld = NormalizePerPixelNormal(tangent * normalTangent.x + binormal * normalTangent.y + normal * normalTangent.z); // @TODO: see if we can squeeze this normalize on SM2.0 as well\n#else\n    half3 normalWorld = normalize(tangentToWorld[2].xyz);\n#endif\n    return normalWorld;\n}\n\n#define FRAGMENT_SETUP(x) FragmentCommonData x = \\\n                                                 FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));\n\ninline FragmentCommonData FragmentSetup(float4 i_tex, half3 i_eyeVec, half3 i_viewDirForParallax, half4 tangentToWorld[3], half3 i_posWorld)\n{\n    i_tex = Parallax(i_tex, i_viewDirForParallax);\n\n    half alpha = Alpha(i_tex.xy);\n#if defined(_ALPHATEST_ON)\n    clip(alpha - _Cutoff);\n#endif\n\n    FragmentCommonData o = UNITY_SETUP_BRDF_INPUT(i_tex);\n    o.normalWorld = PerPixelWorldNormal(i_tex, tangentToWorld);\n    o.eyeVec = NormalizePerPixelNormal(i_eyeVec);\n    o.posWorld = i_posWorld;\n\n    // NOTE: shader relies on pre-multiply alpha-blend (_SrcBlend = One, _DstBlend = OneMinusSrcAlpha)\n    o.diffColor = PreMultiplyAlpha(o.diffColor, alpha, o.oneMinusReflectivity, /*out*/ o.alpha);\n    return o;\n}\n\ninline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light, bool reflections)\n{\n    UnityGIInput d;\n    d.light = light;\n    d.worldPos = s.posWorld;\n    d.worldViewDir = -s.eyeVec;\n    d.atten = atten;\n#if defined(LIGHTMAP_ON) || defined(DYNAMICLIGHTMAP_ON)\n    d.ambient = 0;\n    d.lightmapUV = i_ambientOrLightmapUV;\n#else\n    d.ambient = i_ambientOrLightmapUV.rgb;\n    d.lightmapUV = 0;\n#endif\n    d.boxMax[0] = unity_SpecCube0_BoxMax;\n    d.boxMin[0] = unity_SpecCube0_BoxMin;\n    d.probePosition[0] = unity_SpecCube0_ProbePosition;\n    d.probeHDR[0] = unity_SpecCube0_HDR;\n\n    d.boxMax[1] = unity_SpecCube1_BoxMax;\n    d.boxMin[1] = unity_SpecCube1_BoxMin;\n    d.probePosition[1] = unity_SpecCube1_ProbePosition;\n    d.probeHDR[1] = unity_SpecCube1_HDR;\n\n    if (reflections)\n    {\n        Unity_GlossyEnvironmentData g;\n        g.roughness = 1 - s.oneMinusRoughness;\n#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE\n        g.reflUVW = s.reflUVW;\n#else\n        g.reflUVW = reflect(s.eyeVec, s.normalWorld);\n#endif\n\n        return UnityGlobalIllumination(d, occlusion, s.normalWorld, g);\n    }\n    else\n    {\n        return UnityGlobalIllumination(d, occlusion, s.normalWorld);\n    }\n}\n\ninline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light)\n{\n    return FragmentGI(s, occlusion, i_ambientOrLightmapUV, atten, light, true);\n}\n\nhalf4 OutputForward(half4 output, half alphaFromSurface)\n{\n#if defined(_ALPHABLEND_ON) || defined(_ALPHAPREMULTIPLY_ON)\n    output.a = alphaFromSurface;\n#else\n    UNITY_OPAQUE_ALPHA(output.a);\n#endif\n    return output;\n}\n\nhalf4 fragForwardBaseInternal(VertexOutputForwardBase i)\n{\n    FRAGMENT_SETUP(s)\n#if UNITY_OPTIMIZE_TEXCUBELOD\n        s.reflUVW = i.reflUVW;\n#endif\n\n    UnityLight mainLight = MainLight(s.normalWorld);\n    half atten = SHADOW_ATTENUATION(i);\n\n\n    half occlusion = Occlusion(i.tex.xy);\n    UnityGI gi = FragmentGI(s, occlusion, i.ambientOrLightmapUV, atten, mainLight);\n\n    half4 c = UNITY_BRDF_PBS(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);\n    c.rgb += UNITY_BRDF_GI(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);\n    c.rgb += Emission(i.tex.xy);\n\n    UNITY_APPLY_FOG(i.fogCoord, c.rgb);\n    return OutputForward(c, s.alpha);\n}\n\nhalf4 fragBase(VertexOutputForwardBase i) : SV_Target{ return fragForwardBaseInternal(i); }\n//half4 fragAdd(VertexOutputForwardAdd i) : SV_Target{ return fragForwardAddInternal(i); }\n\nある程度#includeを除いてシンプル化した。しかし、アルファブレンディングがなかなか有効にならずに悩んだ。\n原因は、\n#pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON\n\nで、このShaderキーワードの_ALPHABLEND_ONをEnableにしてやる必要があった。\nmaterial.EnableKeyword("_ALPHABLEND_ON");\n\nビルトインシェーダーでは何故自動で”_ALPHABLEND_ON”になるのか\nDefaultResourcesExtra/Standard.shaderの末尾\n    CustomEditor "StandardShaderGUI"\n\nでカスタムエディタが指定してありこれを経由してマテリアルに介入してたのであった・・・。わかりにくいw\nshader_featureとmulti_compileを剥がす\n少しコード整理。\nshader_featureとmulti_compileを剥がした。\nピクセルシェーダーは、GIとか書いてあってわりと複雑なのでその辺には手を触れず。\n#include "UnityStandardConfig.cginc"\n#include "UnityCG.cginc"\n#include "UnityStandardInput.cginc"\n#include "AutoLight.cginc"\n\n//////////////////////////////////////////////////////////////////////////////\n// vertBase\n//////////////////////////////////////////////////////////////////////////////\nstruct VertexOutputForwardBase\n{\n    float4 pos                            : SV_POSITION;\n    float4 tex                            : TEXCOORD0;\n    half3 eyeVec                         : TEXCOORD1;\n    half4 tangentToWorldAndParallax[3]    : TEXCOORD2;    // [3x3:tangentToWorld | 1x3:viewDirForParallax]\n    half4 ambientOrLightmapUV            : TEXCOORD5;    // SH or Lightmap UV\n    SHADOW_COORDS(6)\n    UNITY_FOG_COORDS(7)\n};\n\ninline half4 VertexGIForward(VertexInput v, float3 posWorld, half3 normalWorld)\n{\n    half4 ambientOrLightmapUV = 0;\n    // Static lightmaps\n#ifndef LIGHTMAP_OFF\n    ambientOrLightmapUV.xy = v.uv1.xy * unity_LightmapST.xy + unity_LightmapST.zw;\n    ambientOrLightmapUV.zw = 0;\n    // Sample light probe for Dynamic objects only (no static or dynamic lightmaps)\n#elif UNITY_SHOULD_SAMPLE_SH\n#ifdef VERTEXLIGHT_ON\n    // Approximated illumination from non-important point lights\n    ambientOrLightmapUV.rgb = Shade4PointLights(\n            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,\n            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,\n            unity_4LightAtten0, posWorld, normalWorld);\n#endif\n\n    ambientOrLightmapUV.rgb = ShadeSHPerVertex(normalWorld, ambientOrLightmapUV.rgb);\n#endif\n\n#ifdef DYNAMICLIGHTMAP_ON\n    ambientOrLightmapUV.zw = v.uv2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;\n#endif\n\n    return ambientOrLightmapUV;\n}\n\nhalf3 NormalizePerVertexNormal(half3 n)\n{\n    return normalize(n);\n}\n\nVertexOutputForwardBase vertForwardBase(VertexInput v)\n{\n    VertexOutputForwardBase o;\n    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);\n\n    float4 posWorld = mul(_Object2World, v.vertex);\n#if UNITY_SPECCUBE_BOX_PROJECTION\n    o.posWorld = posWorld.xyz;\n#endif\n    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);\n    o.tex = TexCoords(v);\n    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);\n    float3 normalWorld = UnityObjectToWorldNormal(v.normal);\n#ifdef _TANGENT_TO_WORLD\n    float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);\n\n    float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);\n    o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];\n    o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];\n    o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];\n#else\n    o.tangentToWorldAndParallax[0].xyz = 0;\n    o.tangentToWorldAndParallax[1].xyz = 0;\n    o.tangentToWorldAndParallax[2].xyz = normalWorld;\n#endif\n    //We need this for shadow receving\n    TRANSFER_SHADOW(o);\n\n    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);\n\n#if UNITY_OPTIMIZE_TEXCUBELOD\n    o.reflUVW = reflect(o.eyeVec, normalWorld);\n#endif\n\n    UNITY_TRANSFER_FOG(o,o.pos);\n    return o;\n}\n\nVertexOutputForwardBase vertBase(VertexInput v) { return vertForwardBase(v); }\n\n//////////////////////////////////////////////////////////////////////////////\n// fragBase\n//////////////////////////////////////////////////////////////////////////////\n#define IN_VIEWDIR4PARALLAX(i) half3(0,0,0)\n#define IN_VIEWDIR4PARALLAX_FWDADD(i) half3(0,0,0)\n#define IN_WORLDPOS(i) half3(0,0,0)\n\nstruct FragmentCommonData\n{\n    half3 diffColor, specColor;\n    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.\n    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.\n    half oneMinusReflectivity, oneMinusRoughness;\n    half3 normalWorld, eyeVec, posWorld;\n    half alpha;\n\n#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE\n    half3 reflUVW;\n#endif\n\n#if UNITY_STANDARD_SIMPLE\n    half3 tangentSpaceNormal;\n#endif\n};\n\n#ifndef UNITY_SETUP_BRDF_INPUT\n#define UNITY_SETUP_BRDF_INPUT SpecularSetup\n#endif\n\ninline FragmentCommonData SpecularSetup(float4 i_tex)\n{\n    half4 specGloss = SpecularGloss(i_tex.xy);\n    half3 specColor = specGloss.rgb;\n    half oneMinusRoughness = specGloss.a;\n\n    half oneMinusReflectivity;\n    half3 diffColor = EnergyConservationBetweenDiffuseAndSpecular(Albedo(i_tex), specColor, /*out*/ oneMinusReflectivity);\n\n    FragmentCommonData o = (FragmentCommonData)0;\n    o.diffColor = diffColor;\n    o.specColor = specColor;\n    o.oneMinusReflectivity = oneMinusReflectivity;\n    o.oneMinusRoughness = oneMinusRoughness;\n    return o;\n}\n\nhalf3 PerPixelWorldNormal(float4 i_tex, half4 tangentToWorld[3])\n{\n    half3 normalWorld = normalize(tangentToWorld[2].xyz);\n    return normalWorld;\n}\n\n#define FRAGMENT_SETUP(x) FragmentCommonData x = \\\n                                                 FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));\n\ninline FragmentCommonData FragmentSetup(float4 i_tex, half3 i_eyeVec, half3 i_viewDirForParallax, half4 tangentToWorld[3], half3 i_posWorld)\n{\n    i_tex = Parallax(i_tex, i_viewDirForParallax);\n\n    half alpha = Alpha(i_tex.xy);\n\n    FragmentCommonData o = UNITY_SETUP_BRDF_INPUT(i_tex);\n    o.normalWorld = PerPixelWorldNormal(i_tex, tangentToWorld);\n    o.eyeVec = i_eyeVec;\n    o.posWorld = i_posWorld;\n\n    // NOTE: shader relies on pre-multiply alpha-blend (_SrcBlend = One, _DstBlend = OneMinusSrcAlpha)\n    o.diffColor = PreMultiplyAlpha(o.diffColor, alpha, o.oneMinusReflectivity, /*out*/ o.alpha);\n    return o;\n}\n\ninline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light, bool reflections)\n{\n    UnityGIInput d;\n    d.light = light;\n    d.worldPos = s.posWorld;\n    d.worldViewDir = -s.eyeVec;\n    d.atten = atten;\n#if defined(LIGHTMAP_ON) || defined(DYNAMICLIGHTMAP_ON)\n    d.ambient = 0;\n    d.lightmapUV = i_ambientOrLightmapUV;\n#else\n    d.ambient = i_ambientOrLightmapUV.rgb;\n    d.lightmapUV = 0;\n#endif\n    d.boxMax[0] = unity_SpecCube0_BoxMax;\n    d.boxMin[0] = unity_SpecCube0_BoxMin;\n    d.probePosition[0] = unity_SpecCube0_ProbePosition;\n    d.probeHDR[0] = unity_SpecCube0_HDR;\n\n    d.boxMax[1] = unity_SpecCube1_BoxMax;\n    d.boxMin[1] = unity_SpecCube1_BoxMin;\n    d.probePosition[1] = unity_SpecCube1_ProbePosition;\n    d.probeHDR[1] = unity_SpecCube1_HDR;\n\n    if (reflections)\n    {\n        Unity_GlossyEnvironmentData g;\n        g.roughness = 1 - s.oneMinusRoughness;\n#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE\n        g.reflUVW = s.reflUVW;\n#else\n        g.reflUVW = reflect(s.eyeVec, s.normalWorld);\n#endif\n\n        return UnityGlobalIllumination(d, occlusion, s.normalWorld, g);\n    }\n    else\n    {\n        return UnityGlobalIllumination(d, occlusion, s.normalWorld);\n    }\n}\n\ninline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light)\n{\n    return FragmentGI(s, occlusion, i_ambientOrLightmapUV, atten, light, true);\n}\n\nUnityLight MainLight(half3 normalWorld)\n{\n    UnityLight l;\n#ifdef LIGHTMAP_OFF\n\n    l.color = _LightColor0.rgb;\n    l.dir = _WorldSpaceLightPos0.xyz;\n    l.ndotl = LambertTerm(normalWorld, l.dir);\n#else\n    // no light specified by the engine\n    // analytical light might be extracted from Lightmap data later on in the shader depending on the Lightmap type\n    l.color = half3(0.f, 0.f, 0.f);\n    l.ndotl = 0.f;\n    l.dir = half3(0.f, 0.f, 0.f);\n#endif\n\n    return l;\n}\n\nhalf4 fragForwardBaseInternal(VertexOutputForwardBase i)\n{\n    FRAGMENT_SETUP(s)\n#if UNITY_OPTIMIZE_TEXCUBELOD\n        s.reflUVW = i.reflUVW;\n#endif\n\n    UnityLight mainLight = MainLight(s.normalWorld);\n    half atten = SHADOW_ATTENUATION(i);\n\n    half occlusion = Occlusion(i.tex.xy);\n    UnityGI gi = FragmentGI(s, occlusion, i.ambientOrLightmapUV, atten, mainLight);\n\n    half4 c = UNITY_BRDF_PBS(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);\n    c.rgb += UNITY_BRDF_GI(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);\n    c.rgb += Emission(i.tex.xy);\n\n    UNITY_APPLY_FOG(i.fogCoord, c.rgb);\n    c.a = s.alpha;\n    return c;\n}\n\nhalf4 fragBase(VertexOutputForwardBase i) : SV_Target{ return fragForwardBaseInternal(i); }\n\n1パスでいいんじゃないの？\nUsePassを展開したことによってZWrite Onできるようになったw。Oh…\nShader "Transparent/Diffuse ZWrite" {\n    Properties{\n        _Color("Main Color", Color) = (1,1,1,1)\n        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}\n    }\n\n    SubShader{\n\n        Tags{ "Queue" = "Transparent" "IgnoreProjector" = "True" "RenderType" = "Transparent" }\n        LOD 200\n\n        // paste in forward rendering passes from Transparent/Diffuse\n        //UsePass "Legacy Shaders/Transparent/Diffuse/FORWARD"\n\n        Pass{\n            Name "FORWARD"\n            Tags{ "LightMode" = "ForwardBase" }\n\n            ZWrite On\n            ColorMask RGB\n            Blend SrcAlpha OneMinusSrcAlpha\n\n            CGPROGRAM\n            #pragma target 2.0\n\n            #pragma skip_variants SHADOWS_SOFT DIRLIGHTMAP_COMBINED DIRLIGHTMAP_SEPARATE\n\n            // これは要るっぽい\n            #pragma multi_compile_fwdbase\n            #pragma multi_compile_fog\n\n            #pragma vertex vertBase\n            #pragma fragment fragBase\n\n            #include "TransparentDiffuseWithZwrite_FORWARD.cginc"\n            ENDCG\n        }\n\n    } // SubShader\n\n    //Fallback "Transparent/VertexLit"\n}\n\nよし、スクラッチでシェーダーを書こうw\nmulti_compile_fwdbase\nFrameDebuggerで見たところシェーダーのdefineがまとめて変わっていた。LIGHTMAP_OFF等に依存していると影響がある。\nまとめてmulti_compileを定義しているだけっぽい。\nまとめ\n\nsurfaceシェーダーでは無い(shaderのinspectorにも書いてあった)\nUsePassでsurfaceシェーダーのPASSを指定することもできる\nそれ故大変分かりにくい(可読性とコード量とのトレードオフが大きい)\nsurfaceシェーダーも何らかの形でvertexとfragmentを含むPassの集合に展開されている(どう展開されるのか知りたいんだけど)\n')))}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?t.createElement(e,n,t.createElement(o,n)):o(n)}},1151:function(n,e,a){a.d(e,{ah:function(){return o}});var r=a(7294);const t=r.createContext({});function o(n){const e=r.useContext(t);return r.useMemo((()=>"function"==typeof n?n(e):{...e,...n}),[e,n])}}}]);
//# sourceMappingURL=component---content-posts-2016-01-10-unity-shader-md-29bdd60391c2dd72f15b.js.map