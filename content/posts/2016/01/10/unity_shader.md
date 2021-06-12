---
title: "UnityのUsePassを追う"
date: 2016-01-10
taxonomies: {tags: []}
---

下記のUnityの半透明シェーダーがいったいどういうメカニズムなのかを調べる。
Shaderの元ネタはこちら

Unity で Transparent/Diffuse で描画順が崩れてしまう際の対処法


Shader "Transparent/Diffuse ZWrite" {
    Properties{
        _Color("Main Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }

    SubShader{
        Tags{ "Queue" = "Transparent" "IgnoreProjector" = "True" "RenderType" = "Transparent" }
        LOD 200

        // extra pass that renders to depth buffer only
        Pass{
            ZWrite On
            ColorMask 0
        }

        // paste in forward rendering passes from Transparent/Diffuse
        UsePass "Transparent/Diffuse/FORWARD"
    }

    Fallback "Transparent/VertexLit"
}

２パス描画になる。
パス1: 深度バッファのみの描画
Pass{
    ZWrite On
    ColorMask 0
}

これは、ShaderLab ：旧ライティングというものらしく
Fixed function
という機能らしい。
レガシーとか旧呼ばわりされているけどサンプルコードにしれっと出てくるので知っている必要がある。
次のようなコードが生成されていた。
ShaderのInspector: Fixed function. Show generated codeの該当部分
 Pass {
  Tags { "QUEUE"="Transparent" "IGNOREPROJECTOR"="true" "RenderType"="Transparent" }
  ColorMask 0
CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#include "UnityShaderVariables.cginc"
#pragma multi_compile_fog
#include "UnityCG.cginc"
#define USING_FOG (defined(FOG_LINEAR) || defined(FOG_EXP) || defined(FOG_EXP2))

// uniforms

// vertex shader input data
struct appdata {
  float3 pos : POSITION;
  half4 color : COLOR;
};

// vertex-to-fragment interpolators
struct v2f {
  fixed4 color : COLOR0;
  #if USING_FOG
    fixed fog : TEXCOORD0;
  #endif
  float4 pos : SV_POSITION;
};

// vertex shader
v2f vert (appdata IN) {
  v2f o;
  half4 color = IN.color;
  float3 eyePos = mul (UNITY_MATRIX_MV, float4(IN.pos,1)).xyz;
  half3 viewDir = 0.0;
  o.color = saturate(color);
  // compute texture coordinates
  // fog
  #if USING_FOG
    float fogCoord = length(eyePos.xyz); // radial fog distance
    UNITY_CALC_FOG_FACTOR(fogCoord);
    o.fog = saturate(unityFogFactor);
  #endif
  // transform position
  o.pos = mul(UNITY_MATRIX_MVP, float4(IN.pos,1));
  return o;
}

// fragment shader
fixed4 frag (v2f IN) : SV_Target {
  fixed4 col;
  col = IN.color;
  // fog
  #if USING_FOG
    col.rgb = lerp (unity_FogColor.rgb, col.rgb, IN.fog);
  #endif
  return col;
}
ENDCG
 }

単に頂点カラーをそのまま描画しているようだが、ColorMaskが0なので色は変わらずということらしい。
パス2: カラーバッファ
Transparent/Diffuse
UsePass "Transparent/Diffuse/FORWARD"

は何なのか。
https://unity3d.com/jp/get-unity/download/archive
からビルトインシェーダーをDownloadして観察してみる。
探してみると”Transparent/Diffuse”という名のシェーダーは無くて、
“Legacy Shaders/Transparent/Diffuse”が見つかる。
DefaultResourceExtra/Alpha-Diffuse.shader
Shader "Legacy Shaders/Transparent/Diffuse" {
Properties {
    _Color ("Main Color", Color) = (1,1,1,1)
    _MainTex ("Base (RGB) Trans (A)", 2D) = "white" {}
}

SubShader {
    Tags {"Queue"="Transparent" "IgnoreProjector"="True" "RenderType"="Transparent"}
    LOD 200

CGPROGRAM
#pragma surface surf Lambert alpha:fade

sampler2D _MainTex;
fixed4 _Color;

struct Input {
    float2 uv_MainTex;
};

void surf (Input IN, inout SurfaceOutput o) {
    fixed4 c = tex2D(_MainTex, IN.uv_MainTex) * _Color;
    o.Albedo = c.rgb;
    o.Alpha = c.a;
}
ENDCG
}

Fallback "Legacy Shaders/Transparent/VertexLit"
}

surfaceシェーダーらしい。
surfaceシェーダーが如何なるPassに展開されるのかがまったくわからないが(LightMode等が関係ある？)
FORWARDパスはどこで定義されているのか。
Transparent/Diffuse/FORWARD
DefaultResourcesExtra/Standard.shader
    SubShader
    {
        Tags { "RenderType"="Opaque" "PerformanceChecks"="False" }
        LOD 300
    

        // ------------------------------------------------------------------
        //  Base forward pass (directional light, emission, lightmaps, ...)
        Pass
        {
            Name "FORWARD" 
            Tags { "LightMode" = "ForwardBase" }

            Blend [_SrcBlend] [_DstBlend]
            ZWrite [_ZWrite]

            CGPROGRAM
            #pragma target 3.0
            // TEMPORARY: GLES2.0 temporarily disabled to prevent errors spam on devices without textureCubeLodEXT
            #pragma exclude_renderers gles
            
            // -------------------------------------
                    
            #pragma shader_feature _NORMALMAP
            #pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON
            #pragma shader_feature _EMISSION
            #pragma shader_feature _METALLICGLOSSMAP 
            #pragma shader_feature ___ _DETAIL_MULX2
            #pragma shader_feature _PARALLAXMAP
            
            #pragma multi_compile_fwdbase
            #pragma multi_compile_fog

            #pragma vertex vertBase
            #pragma fragment fragBase
            #include "UnityStandardCoreForward.cginc"

            ENDCG
        }
    }

vertBaseとfragBaseという関数に辿り着く。
vertBaseとfragBase
CGIncludes/UnityStandardCoreForward.cginc
#ifndef UNITY_STANDARD_CORE_FORWARD_INCLUDED
#define UNITY_STANDARD_CORE_FORWARD_INCLUDED

#if defined(UNITY_NO_FULL_STANDARD_SHADER)
#    define UNITY_STANDARD_SIMPLE 1
#endif

#include "UnityStandardConfig.cginc"

#if UNITY_STANDARD_SIMPLE
    #include "UnityStandardCoreForwardSimple.cginc"
    VertexOutputBaseSimple vertBase (VertexInput v) { return vertForwardBaseSimple(v); }
    VertexOutputForwardAddSimple vertAdd (VertexInput v) { return vertForwardAddSimple(v); }
    half4 fragBase (VertexOutputBaseSimple i) : SV_Target { return fragForwardBaseSimpleInternal(i); }
    half4 fragAdd (VertexOutputForwardAddSimple i) : SV_Target { return fragForwardAddSimpleInternal(i); }
#else
    #include "UnityStandardCore.cginc"
    VertexOutputForwardBase vertBase (VertexInput v) { return vertForwardBase(v); }
    VertexOutputForwardAdd vertAdd (VertexInput v) { return vertForwardAdd(v); }
    half4 fragBase (VertexOutputForwardBase i) : SV_Target { return fragForwardBaseInternal(i); }
    half4 fragAdd (VertexOutputForwardAdd i) : SV_Target { return fragForwardAddInternal(i); }
#endif

#endif // UNITY_STANDARD_CORE_FORWARD_INCLUDED

シンプルとノットシンプルの振り分けをしている。
vertBase
    VertexOutputForwardBase vertBase (VertexInput v) { return vertForwardBase(v); }

CGInlucdes/UnityStandardCore.cginc
VertexOutputForwardBase vertForwardBase (VertexInput v)
{
    VertexOutputForwardBase o;
    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);

    float4 posWorld = mul(_Object2World, v.vertex);
    #if UNITY_SPECCUBE_BOX_PROJECTION
        o.posWorld = posWorld.xyz;
    #endif
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    o.tex = TexCoords(v);
    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);
    float3 normalWorld = UnityObjectToWorldNormal(v.normal);
    #ifdef _TANGENT_TO_WORLD
        float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);

        float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);
        o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];
        o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];
        o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];
    #else
        o.tangentToWorldAndParallax[0].xyz = 0;
        o.tangentToWorldAndParallax[1].xyz = 0;
        o.tangentToWorldAndParallax[2].xyz = normalWorld;
    #endif
    //We need this for shadow receving
    TRANSFER_SHADOW(o);

    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);
    
    #ifdef _PARALLAXMAP
        TANGENT_SPACE_ROTATION;
        half3 viewDirForParallax = mul (rotation, ObjSpaceViewDir(v.vertex));
        o.tangentToWorldAndParallax[0].w = viewDirForParallax.x;
        o.tangentToWorldAndParallax[1].w = viewDirForParallax.y;
        o.tangentToWorldAndParallax[2].w = viewDirForParallax.z;
    #endif

    #if UNITY_OPTIMIZE_TEXCUBELOD
        o.reflUVW         = reflect(o.eyeVec, normalWorld);
    #endif

    UNITY_TRANSFER_FOG(o,o.pos);
    return o;
}

普通に頂点シェーダー。たぶん
fragBase
    half4 fragBase (VertexOutputForwardBase i) : SV_Target { return fragForwardBaseInternal(i); }

CGInlucdes/UnityStandardCore.cginc
#define FRAGMENT_SETUP(x) FragmentCommonData x = \
    FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));

struct FragmentCommonData
{
    half3 diffColor, specColor;
    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.
    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.
    half oneMinusReflectivity, oneMinusRoughness;
    half3 normalWorld, eyeVec, posWorld;
    half alpha;

#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE
    half3 reflUVW;
#endif

#if UNITY_STANDARD_SIMPLE
    half3 tangentSpaceNormal;
#endif
};

half4 OutputForward (half4 output, half alphaFromSurface)
{
    #if defined(_ALPHABLEND_ON) || defined(_ALPHAPREMULTIPLY_ON)
        output.a = alphaFromSurface;
    #else
        UNITY_OPAQUE_ALPHA(output.a);
    #endif
    return output;
}

half4 fragForwardBaseInternal (VertexOutputForwardBase i)
{
    FRAGMENT_SETUP(s)
#if UNITY_OPTIMIZE_TEXCUBELOD
    s.reflUVW        = i.reflUVW;
#endif

    UnityLight mainLight = MainLight (s.normalWorld);
    half atten = SHADOW_ATTENUATION(i);


    half occlusion = Occlusion(i.tex.xy);
    UnityGI gi = FragmentGI (s, occlusion, i.ambientOrLightmapUV, atten, mainLight);

    half4 c = UNITY_BRDF_PBS (s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);
    c.rgb += UNITY_BRDF_GI (s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);
    c.rgb += Emission(i.tex.xy);

    UNITY_APPLY_FOG(i.fogCoord, c.rgb);
    return OutputForward (c, s.alpha);
}

普通にピクセルシェーダーで便利関数がいっぱい定義済みという感じか。
しかし、#ifの類がたくさんありどのルートが使われるか不明瞭。
includeを展開してみる
UsePassの代わりに自前のファイルにシェーダーのコードをコピーしてそっちを使ってみる。
DefaultResourcesExtra/Standard.shaderから切り張り
        Pass{
            Name "FORWARD"
            Tags{ "LightMode" = "ForwardBase" }

            ZWrite Off
            ColorMask RGB
            Blend SrcAlpha OneMinusSrcAlpha

            CGPROGRAM
            #pragma target 2.0
            
            #pragma shader_feature _NORMALMAP
            #pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON
            #pragma shader_feature _EMISSION 
            #pragma shader_feature _METALLICGLOSSMAP 
            #pragma shader_feature ___ _DETAIL_MULX2
            // SM2.0: NOT SUPPORTED shader_feature _PARALLAXMAP

            #pragma skip_variants SHADOWS_SOFT DIRLIGHTMAP_COMBINED DIRLIGHTMAP_SEPARATE

            #pragma multi_compile_fwdbase
            #pragma multi_compile_fog

            #pragma vertex vertBase
            #pragma fragment fragBase

            #include "TransparentDiffuseWithZwrite_FORWARD.cginc"
            ENDCG
        }


UnityStandardCore.cgincから使うところだけ収集。
TransparentDiffuseWithZwrite_FORWARD.cginc
#include "UnityStandardConfig.cginc"
#include "UnityCG.cginc"
#include "UnityStandardInput.cginc"
#include "AutoLight.cginc"

struct VertexOutputForwardBase
{
    float4 pos                            : SV_POSITION;
    float4 tex                            : TEXCOORD0;
    half3 eyeVec                         : TEXCOORD1;
    half4 tangentToWorldAndParallax[3]    : TEXCOORD2;    // [3x3:tangentToWorld | 1x3:viewDirForParallax]
    half4 ambientOrLightmapUV            : TEXCOORD5;    // SH or Lightmap UV
    SHADOW_COORDS(6)
        UNITY_FOG_COORDS(7)

        // next ones would not fit into SM2.0 limits, but they are always for SM3.0+
#if UNITY_SPECCUBE_BOX_PROJECTION
        float3 posWorld                    : TEXCOORD8;
#endif

#if UNITY_OPTIMIZE_TEXCUBELOD
#if UNITY_SPECCUBE_BOX_PROJECTION
    half3 reflUVW                : TEXCOORD9;
#else
    half3 reflUVW                : TEXCOORD8;
#endif
#endif
};

half3 NormalizePerVertexNormal(half3 n)
{
#if (SHADER_TARGET < 30) || UNITY_STANDARD_SIMPLE
    return normalize(n);
#else
    return n; // will normalize per-pixel instead
#endif
}

half3 NormalizePerPixelNormal(half3 n)
{
#if (SHADER_TARGET < 30) || UNITY_STANDARD_SIMPLE
    return n;
#else
    return normalize(n);
#endif
}

UnityLight MainLight(half3 normalWorld)
{
    UnityLight l;
#ifdef LIGHTMAP_OFF

    l.color = _LightColor0.rgb;
    l.dir = _WorldSpaceLightPos0.xyz;
    l.ndotl = LambertTerm(normalWorld, l.dir);
#else
    // no light specified by the engine
    // analytical light might be extracted from Lightmap data later on in the shader depending on the Lightmap type
    l.color = half3(0.f, 0.f, 0.f);
    l.ndotl = 0.f;
    l.dir = half3(0.f, 0.f, 0.f);
#endif

    return l;
}

inline half4 VertexGIForward(VertexInput v, float3 posWorld, half3 normalWorld)
{
    half4 ambientOrLightmapUV = 0;
    // Static lightmaps
#ifndef LIGHTMAP_OFF
    ambientOrLightmapUV.xy = v.uv1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
    ambientOrLightmapUV.zw = 0;
    // Sample light probe for Dynamic objects only (no static or dynamic lightmaps)
#elif UNITY_SHOULD_SAMPLE_SH
#ifdef VERTEXLIGHT_ON
    // Approximated illumination from non-important point lights
    ambientOrLightmapUV.rgb = Shade4PointLights(
            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,
            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,
            unity_4LightAtten0, posWorld, normalWorld);
#endif

    ambientOrLightmapUV.rgb = ShadeSHPerVertex(normalWorld, ambientOrLightmapUV.rgb);
#endif

#ifdef DYNAMICLIGHTMAP_ON
    ambientOrLightmapUV.zw = v.uv2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;
#endif

    return ambientOrLightmapUV;
}

VertexOutputForwardBase vertForwardBase(VertexInput v)
{
    VertexOutputForwardBase o;
    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);

    float4 posWorld = mul(_Object2World, v.vertex);
#if UNITY_SPECCUBE_BOX_PROJECTION
    o.posWorld = posWorld.xyz;
#endif
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    o.tex = TexCoords(v);
    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);
    float3 normalWorld = UnityObjectToWorldNormal(v.normal);
#ifdef _TANGENT_TO_WORLD
    float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);

    float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);
    o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];
    o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];
    o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];
#else
    o.tangentToWorldAndParallax[0].xyz = 0;
    o.tangentToWorldAndParallax[1].xyz = 0;
    o.tangentToWorldAndParallax[2].xyz = normalWorld;
#endif
    //We need this for shadow receving
    TRANSFER_SHADOW(o);

    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);

#ifdef _PARALLAXMAP
    TANGENT_SPACE_ROTATION;
    half3 viewDirForParallax = mul(rotation, ObjSpaceViewDir(v.vertex));
    o.tangentToWorldAndParallax[0].w = viewDirForParallax.x;
    o.tangentToWorldAndParallax[1].w = viewDirForParallax.y;
    o.tangentToWorldAndParallax[2].w = viewDirForParallax.z;
#endif

#if UNITY_OPTIMIZE_TEXCUBELOD
    o.reflUVW = reflect(o.eyeVec, normalWorld);
#endif

    UNITY_TRANSFER_FOG(o,o.pos);
    return o;
}

VertexOutputForwardBase vertBase(VertexInput v) { return vertForwardBase(v); }
//VertexOutputForwardAdd vertAdd(VertexInput v) { return vertForwardAdd(v); }

#ifdef _PARALLAXMAP
#define IN_VIEWDIR4PARALLAX(i) NormalizePerPixelNormal(half3(i.tangentToWorldAndParallax[0].w,i.tangentToWorldAndParallax[1].w,i.tangentToWorldAndParallax[2].w))
#define IN_VIEWDIR4PARALLAX_FWDADD(i) NormalizePerPixelNormal(i.viewDirForParallax.xyz)
#else
#define IN_VIEWDIR4PARALLAX(i) half3(0,0,0)
#define IN_VIEWDIR4PARALLAX_FWDADD(i) half3(0,0,0)
#endif

#if UNITY_SPECCUBE_BOX_PROJECTION
#define IN_WORLDPOS(i) i.posWorld
#else
#define IN_WORLDPOS(i) half3(0,0,0)
#endif

struct FragmentCommonData
{
    half3 diffColor, specColor;
    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.
    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.
    half oneMinusReflectivity, oneMinusRoughness;
    half3 normalWorld, eyeVec, posWorld;
    half alpha;

#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE
    half3 reflUVW;
#endif

#if UNITY_STANDARD_SIMPLE
    half3 tangentSpaceNormal;
#endif
};

inline FragmentCommonData MetallicSetup(float4 i_tex)
{
    half2 metallicGloss = MetallicGloss(i_tex.xy);
    half metallic = metallicGloss.x;
    half oneMinusRoughness = metallicGloss.y;        // this is 1 minus the square root of real roughness m.

    half oneMinusReflectivity;
    half3 specColor;
    half3 diffColor = DiffuseAndSpecularFromMetallic(Albedo(i_tex), metallic, /*out*/ specColor, /*out*/ oneMinusReflectivity);

    FragmentCommonData o = (FragmentCommonData)0;
    o.diffColor = diffColor;
    o.specColor = specColor;
    o.oneMinusReflectivity = oneMinusReflectivity;
    o.oneMinusRoughness = oneMinusRoughness;
    return o;
}


#ifndef UNITY_SETUP_BRDF_INPUT
#define UNITY_SETUP_BRDF_INPUT SpecularSetup
#endif

inline FragmentCommonData SpecularSetup(float4 i_tex)
{
    half4 specGloss = SpecularGloss(i_tex.xy);
    half3 specColor = specGloss.rgb;
    half oneMinusRoughness = specGloss.a;

    half oneMinusReflectivity;
    half3 diffColor = EnergyConservationBetweenDiffuseAndSpecular(Albedo(i_tex), specColor, /*out*/ oneMinusReflectivity);

    FragmentCommonData o = (FragmentCommonData)0;
    o.diffColor = diffColor;
    o.specColor = specColor;
    o.oneMinusReflectivity = oneMinusReflectivity;
    o.oneMinusRoughness = oneMinusRoughness;
    return o;
}

half3 PerPixelWorldNormal(float4 i_tex, half4 tangentToWorld[3])
{
#ifdef _NORMALMAP
    half3 tangent = tangentToWorld[0].xyz;
    half3 binormal = tangentToWorld[1].xyz;
    half3 normal = tangentToWorld[2].xyz;

#if UNITY_TANGENT_ORTHONORMALIZE
    normal = NormalizePerPixelNormal(normal);

    // ortho-normalize Tangent
    tangent = normalize(tangent - normal * dot(tangent, normal));

    // recalculate Binormal
    half3 newB = cross(normal, tangent);
    binormal = newB * sign(dot(newB, binormal));
#endif

    half3 normalTangent = NormalInTangentSpace(i_tex);
    half3 normalWorld = NormalizePerPixelNormal(tangent * normalTangent.x + binormal * normalTangent.y + normal * normalTangent.z); // @TODO: see if we can squeeze this normalize on SM2.0 as well
#else
    half3 normalWorld = normalize(tangentToWorld[2].xyz);
#endif
    return normalWorld;
}

#define FRAGMENT_SETUP(x) FragmentCommonData x = \
                                                 FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));

inline FragmentCommonData FragmentSetup(float4 i_tex, half3 i_eyeVec, half3 i_viewDirForParallax, half4 tangentToWorld[3], half3 i_posWorld)
{
    i_tex = Parallax(i_tex, i_viewDirForParallax);

    half alpha = Alpha(i_tex.xy);
#if defined(_ALPHATEST_ON)
    clip(alpha - _Cutoff);
#endif

    FragmentCommonData o = UNITY_SETUP_BRDF_INPUT(i_tex);
    o.normalWorld = PerPixelWorldNormal(i_tex, tangentToWorld);
    o.eyeVec = NormalizePerPixelNormal(i_eyeVec);
    o.posWorld = i_posWorld;

    // NOTE: shader relies on pre-multiply alpha-blend (_SrcBlend = One, _DstBlend = OneMinusSrcAlpha)
    o.diffColor = PreMultiplyAlpha(o.diffColor, alpha, o.oneMinusReflectivity, /*out*/ o.alpha);
    return o;
}

inline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light, bool reflections)
{
    UnityGIInput d;
    d.light = light;
    d.worldPos = s.posWorld;
    d.worldViewDir = -s.eyeVec;
    d.atten = atten;
#if defined(LIGHTMAP_ON) || defined(DYNAMICLIGHTMAP_ON)
    d.ambient = 0;
    d.lightmapUV = i_ambientOrLightmapUV;
#else
    d.ambient = i_ambientOrLightmapUV.rgb;
    d.lightmapUV = 0;
#endif
    d.boxMax[0] = unity_SpecCube0_BoxMax;
    d.boxMin[0] = unity_SpecCube0_BoxMin;
    d.probePosition[0] = unity_SpecCube0_ProbePosition;
    d.probeHDR[0] = unity_SpecCube0_HDR;

    d.boxMax[1] = unity_SpecCube1_BoxMax;
    d.boxMin[1] = unity_SpecCube1_BoxMin;
    d.probePosition[1] = unity_SpecCube1_ProbePosition;
    d.probeHDR[1] = unity_SpecCube1_HDR;

    if (reflections)
    {
        Unity_GlossyEnvironmentData g;
        g.roughness = 1 - s.oneMinusRoughness;
#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE
        g.reflUVW = s.reflUVW;
#else
        g.reflUVW = reflect(s.eyeVec, s.normalWorld);
#endif

        return UnityGlobalIllumination(d, occlusion, s.normalWorld, g);
    }
    else
    {
        return UnityGlobalIllumination(d, occlusion, s.normalWorld);
    }
}

inline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light)
{
    return FragmentGI(s, occlusion, i_ambientOrLightmapUV, atten, light, true);
}

half4 OutputForward(half4 output, half alphaFromSurface)
{
#if defined(_ALPHABLEND_ON) || defined(_ALPHAPREMULTIPLY_ON)
    output.a = alphaFromSurface;
#else
    UNITY_OPAQUE_ALPHA(output.a);
#endif
    return output;
}

half4 fragForwardBaseInternal(VertexOutputForwardBase i)
{
    FRAGMENT_SETUP(s)
#if UNITY_OPTIMIZE_TEXCUBELOD
        s.reflUVW = i.reflUVW;
#endif

    UnityLight mainLight = MainLight(s.normalWorld);
    half atten = SHADOW_ATTENUATION(i);


    half occlusion = Occlusion(i.tex.xy);
    UnityGI gi = FragmentGI(s, occlusion, i.ambientOrLightmapUV, atten, mainLight);

    half4 c = UNITY_BRDF_PBS(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);
    c.rgb += UNITY_BRDF_GI(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);
    c.rgb += Emission(i.tex.xy);

    UNITY_APPLY_FOG(i.fogCoord, c.rgb);
    return OutputForward(c, s.alpha);
}

half4 fragBase(VertexOutputForwardBase i) : SV_Target{ return fragForwardBaseInternal(i); }
//half4 fragAdd(VertexOutputForwardAdd i) : SV_Target{ return fragForwardAddInternal(i); }

ある程度#includeを除いてシンプル化した。しかし、アルファブレンディングがなかなか有効にならずに悩んだ。
原因は、
#pragma shader_feature _ _ALPHATEST_ON _ALPHABLEND_ON _ALPHAPREMULTIPLY_ON

で、このShaderキーワードの_ALPHABLEND_ONをEnableにしてやる必要があった。
material.EnableKeyword("_ALPHABLEND_ON");

ビルトインシェーダーでは何故自動で”_ALPHABLEND_ON”になるのか
DefaultResourcesExtra/Standard.shaderの末尾
    CustomEditor "StandardShaderGUI"

でカスタムエディタが指定してありこれを経由してマテリアルに介入してたのであった・・・。わかりにくいw
shader_featureとmulti_compileを剥がす
少しコード整理。
shader_featureとmulti_compileを剥がした。
ピクセルシェーダーは、GIとか書いてあってわりと複雑なのでその辺には手を触れず。
#include "UnityStandardConfig.cginc"
#include "UnityCG.cginc"
#include "UnityStandardInput.cginc"
#include "AutoLight.cginc"

//////////////////////////////////////////////////////////////////////////////
// vertBase
//////////////////////////////////////////////////////////////////////////////
struct VertexOutputForwardBase
{
    float4 pos                            : SV_POSITION;
    float4 tex                            : TEXCOORD0;
    half3 eyeVec                         : TEXCOORD1;
    half4 tangentToWorldAndParallax[3]    : TEXCOORD2;    // [3x3:tangentToWorld | 1x3:viewDirForParallax]
    half4 ambientOrLightmapUV            : TEXCOORD5;    // SH or Lightmap UV
    SHADOW_COORDS(6)
    UNITY_FOG_COORDS(7)
};

inline half4 VertexGIForward(VertexInput v, float3 posWorld, half3 normalWorld)
{
    half4 ambientOrLightmapUV = 0;
    // Static lightmaps
#ifndef LIGHTMAP_OFF
    ambientOrLightmapUV.xy = v.uv1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
    ambientOrLightmapUV.zw = 0;
    // Sample light probe for Dynamic objects only (no static or dynamic lightmaps)
#elif UNITY_SHOULD_SAMPLE_SH
#ifdef VERTEXLIGHT_ON
    // Approximated illumination from non-important point lights
    ambientOrLightmapUV.rgb = Shade4PointLights(
            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,
            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,
            unity_4LightAtten0, posWorld, normalWorld);
#endif

    ambientOrLightmapUV.rgb = ShadeSHPerVertex(normalWorld, ambientOrLightmapUV.rgb);
#endif

#ifdef DYNAMICLIGHTMAP_ON
    ambientOrLightmapUV.zw = v.uv2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;
#endif

    return ambientOrLightmapUV;
}

half3 NormalizePerVertexNormal(half3 n)
{
    return normalize(n);
}

VertexOutputForwardBase vertForwardBase(VertexInput v)
{
    VertexOutputForwardBase o;
    UNITY_INITIALIZE_OUTPUT(VertexOutputForwardBase, o);

    float4 posWorld = mul(_Object2World, v.vertex);
#if UNITY_SPECCUBE_BOX_PROJECTION
    o.posWorld = posWorld.xyz;
#endif
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    o.tex = TexCoords(v);
    o.eyeVec = NormalizePerVertexNormal(posWorld.xyz - _WorldSpaceCameraPos);
    float3 normalWorld = UnityObjectToWorldNormal(v.normal);
#ifdef _TANGENT_TO_WORLD
    float4 tangentWorld = float4(UnityObjectToWorldDir(v.tangent.xyz), v.tangent.w);

    float3x3 tangentToWorld = CreateTangentToWorldPerVertex(normalWorld, tangentWorld.xyz, tangentWorld.w);
    o.tangentToWorldAndParallax[0].xyz = tangentToWorld[0];
    o.tangentToWorldAndParallax[1].xyz = tangentToWorld[1];
    o.tangentToWorldAndParallax[2].xyz = tangentToWorld[2];
#else
    o.tangentToWorldAndParallax[0].xyz = 0;
    o.tangentToWorldAndParallax[1].xyz = 0;
    o.tangentToWorldAndParallax[2].xyz = normalWorld;
#endif
    //We need this for shadow receving
    TRANSFER_SHADOW(o);

    o.ambientOrLightmapUV = VertexGIForward(v, posWorld, normalWorld);

#if UNITY_OPTIMIZE_TEXCUBELOD
    o.reflUVW = reflect(o.eyeVec, normalWorld);
#endif

    UNITY_TRANSFER_FOG(o,o.pos);
    return o;
}

VertexOutputForwardBase vertBase(VertexInput v) { return vertForwardBase(v); }

//////////////////////////////////////////////////////////////////////////////
// fragBase
//////////////////////////////////////////////////////////////////////////////
#define IN_VIEWDIR4PARALLAX(i) half3(0,0,0)
#define IN_VIEWDIR4PARALLAX_FWDADD(i) half3(0,0,0)
#define IN_WORLDPOS(i) half3(0,0,0)

struct FragmentCommonData
{
    half3 diffColor, specColor;
    // Note: oneMinusRoughness & oneMinusReflectivity for optimization purposes, mostly for DX9 SM2.0 level.
    // Most of the math is being done on these (1-x) values, and that saves a few precious ALU slots.
    half oneMinusReflectivity, oneMinusRoughness;
    half3 normalWorld, eyeVec, posWorld;
    half alpha;

#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE
    half3 reflUVW;
#endif

#if UNITY_STANDARD_SIMPLE
    half3 tangentSpaceNormal;
#endif
};

#ifndef UNITY_SETUP_BRDF_INPUT
#define UNITY_SETUP_BRDF_INPUT SpecularSetup
#endif

inline FragmentCommonData SpecularSetup(float4 i_tex)
{
    half4 specGloss = SpecularGloss(i_tex.xy);
    half3 specColor = specGloss.rgb;
    half oneMinusRoughness = specGloss.a;

    half oneMinusReflectivity;
    half3 diffColor = EnergyConservationBetweenDiffuseAndSpecular(Albedo(i_tex), specColor, /*out*/ oneMinusReflectivity);

    FragmentCommonData o = (FragmentCommonData)0;
    o.diffColor = diffColor;
    o.specColor = specColor;
    o.oneMinusReflectivity = oneMinusReflectivity;
    o.oneMinusRoughness = oneMinusRoughness;
    return o;
}

half3 PerPixelWorldNormal(float4 i_tex, half4 tangentToWorld[3])
{
    half3 normalWorld = normalize(tangentToWorld[2].xyz);
    return normalWorld;
}

#define FRAGMENT_SETUP(x) FragmentCommonData x = \
                                                 FragmentSetup(i.tex, i.eyeVec, IN_VIEWDIR4PARALLAX(i), i.tangentToWorldAndParallax, IN_WORLDPOS(i));

inline FragmentCommonData FragmentSetup(float4 i_tex, half3 i_eyeVec, half3 i_viewDirForParallax, half4 tangentToWorld[3], half3 i_posWorld)
{
    i_tex = Parallax(i_tex, i_viewDirForParallax);

    half alpha = Alpha(i_tex.xy);

    FragmentCommonData o = UNITY_SETUP_BRDF_INPUT(i_tex);
    o.normalWorld = PerPixelWorldNormal(i_tex, tangentToWorld);
    o.eyeVec = i_eyeVec;
    o.posWorld = i_posWorld;

    // NOTE: shader relies on pre-multiply alpha-blend (_SrcBlend = One, _DstBlend = OneMinusSrcAlpha)
    o.diffColor = PreMultiplyAlpha(o.diffColor, alpha, o.oneMinusReflectivity, /*out*/ o.alpha);
    return o;
}

inline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light, bool reflections)
{
    UnityGIInput d;
    d.light = light;
    d.worldPos = s.posWorld;
    d.worldViewDir = -s.eyeVec;
    d.atten = atten;
#if defined(LIGHTMAP_ON) || defined(DYNAMICLIGHTMAP_ON)
    d.ambient = 0;
    d.lightmapUV = i_ambientOrLightmapUV;
#else
    d.ambient = i_ambientOrLightmapUV.rgb;
    d.lightmapUV = 0;
#endif
    d.boxMax[0] = unity_SpecCube0_BoxMax;
    d.boxMin[0] = unity_SpecCube0_BoxMin;
    d.probePosition[0] = unity_SpecCube0_ProbePosition;
    d.probeHDR[0] = unity_SpecCube0_HDR;

    d.boxMax[1] = unity_SpecCube1_BoxMax;
    d.boxMin[1] = unity_SpecCube1_BoxMin;
    d.probePosition[1] = unity_SpecCube1_ProbePosition;
    d.probeHDR[1] = unity_SpecCube1_HDR;

    if (reflections)
    {
        Unity_GlossyEnvironmentData g;
        g.roughness = 1 - s.oneMinusRoughness;
#if UNITY_OPTIMIZE_TEXCUBELOD || UNITY_STANDARD_SIMPLE
        g.reflUVW = s.reflUVW;
#else
        g.reflUVW = reflect(s.eyeVec, s.normalWorld);
#endif

        return UnityGlobalIllumination(d, occlusion, s.normalWorld, g);
    }
    else
    {
        return UnityGlobalIllumination(d, occlusion, s.normalWorld);
    }
}

inline UnityGI FragmentGI(FragmentCommonData s, half occlusion, half4 i_ambientOrLightmapUV, half atten, UnityLight light)
{
    return FragmentGI(s, occlusion, i_ambientOrLightmapUV, atten, light, true);
}

UnityLight MainLight(half3 normalWorld)
{
    UnityLight l;
#ifdef LIGHTMAP_OFF

    l.color = _LightColor0.rgb;
    l.dir = _WorldSpaceLightPos0.xyz;
    l.ndotl = LambertTerm(normalWorld, l.dir);
#else
    // no light specified by the engine
    // analytical light might be extracted from Lightmap data later on in the shader depending on the Lightmap type
    l.color = half3(0.f, 0.f, 0.f);
    l.ndotl = 0.f;
    l.dir = half3(0.f, 0.f, 0.f);
#endif

    return l;
}

half4 fragForwardBaseInternal(VertexOutputForwardBase i)
{
    FRAGMENT_SETUP(s)
#if UNITY_OPTIMIZE_TEXCUBELOD
        s.reflUVW = i.reflUVW;
#endif

    UnityLight mainLight = MainLight(s.normalWorld);
    half atten = SHADOW_ATTENUATION(i);

    half occlusion = Occlusion(i.tex.xy);
    UnityGI gi = FragmentGI(s, occlusion, i.ambientOrLightmapUV, atten, mainLight);

    half4 c = UNITY_BRDF_PBS(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, gi.light, gi.indirect);
    c.rgb += UNITY_BRDF_GI(s.diffColor, s.specColor, s.oneMinusReflectivity, s.oneMinusRoughness, s.normalWorld, -s.eyeVec, occlusion, gi);
    c.rgb += Emission(i.tex.xy);

    UNITY_APPLY_FOG(i.fogCoord, c.rgb);
    c.a = s.alpha;
    return c;
}

half4 fragBase(VertexOutputForwardBase i) : SV_Target{ return fragForwardBaseInternal(i); }

1パスでいいんじゃないの？
UsePassを展開したことによってZWrite Onできるようになったw。Oh…
Shader "Transparent/Diffuse ZWrite" {
    Properties{
        _Color("Main Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }

    SubShader{

        Tags{ "Queue" = "Transparent" "IgnoreProjector" = "True" "RenderType" = "Transparent" }
        LOD 200

        // paste in forward rendering passes from Transparent/Diffuse
        //UsePass "Legacy Shaders/Transparent/Diffuse/FORWARD"

        Pass{
            Name "FORWARD"
            Tags{ "LightMode" = "ForwardBase" }

            ZWrite On
            ColorMask RGB
            Blend SrcAlpha OneMinusSrcAlpha

            CGPROGRAM
            #pragma target 2.0
    
            #pragma skip_variants SHADOWS_SOFT DIRLIGHTMAP_COMBINED DIRLIGHTMAP_SEPARATE

            // これは要るっぽい
            #pragma multi_compile_fwdbase
            #pragma multi_compile_fog

            #pragma vertex vertBase
            #pragma fragment fragBase

            #include "TransparentDiffuseWithZwrite_FORWARD.cginc"
            ENDCG
        }

    } // SubShader

    //Fallback "Transparent/VertexLit"
}

よし、スクラッチでシェーダーを書こうw
multi_compile_fwdbase
FrameDebuggerで見たところシェーダーのdefineがまとめて変わっていた。LIGHTMAP_OFF等に依存していると影響がある。
まとめてmulti_compileを定義しているだけっぽい。
まとめ

surfaceシェーダーでは無い(shaderのinspectorにも書いてあった)
UsePassでsurfaceシェーダーのPASSを指定することもできる
それ故大変分かりにくい(可読性とコード量とのトレードオフが大きい)
surfaceシェーダーも何らかの形でvertexとfragmentを含むPassの集合に展開されている(どう展開されるのか知りたいんだけど)

