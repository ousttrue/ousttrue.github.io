---
title: "UnityでToon"
date: 2016-01-12
taxonomies: {tags: ["unity"]}
---


Toonシェーダーをやってみる。

メニューからインポートすると、
Assets > Import Package > Effects

Assetsが現れる。
Standard Assets/Effects/ToonShading

Toon/Lit
Standard Assets/Effects/ToonShadingのshaderを自分のフォルダにコピーして改造する。
#UsePassを展開して改造準備
Shader "MyToon/Lit Outline" {
    Properties {
        _Color ("Main Color", Color) = (0.5,0.5,0.5,1)
        _OutlineColor ("Outline Color", Color) = (0,0,0,1)
        _Outline ("Outline width", Range (.002, 0.03)) = .005
        _MainTex ("Base (RGB)", 2D) = "white" {}
        _Ramp ("Toon Ramp (RGB)", 2D) = "gray" {} 
    }

    SubShader {
        Tags { "RenderType"="Opaque" }
        UsePass "Toon/Lit/FORWARD"
        UsePass "Toon/Basic Outline/OUTLINE"
    } 
    
    Fallback "Toon/Lit"
}

Toon/Litのinspectorの
Surface shader: Show generated code

から該当するFORWARD Passをコピペし、
Toon/Basic OutlineのOUTLINE Passをコピペする。
適当に整理する。
Shader "MyToon/Custom"
{
    Properties
    {
        _Color("Main Color", Color) = (0.5,0.5,0.5,1)
        _MainTex("Base (RGB)", 2D) = "white" {}
        _Ramp("Toon Ramp (RGB)", 2D) = "gray" {}

        _OutlineColor("Outline Color", Color) = (0,0,0,1)
        _Outline("Outline width", Range(.002, 0.03)) = .005
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        // ---- forward rendering base pass:
        Pass{
            Name "FORWARD"
            Tags{ "LightMode" = "ForwardBase" }

            CGPROGRAM
#pragma vertex vert_surf
#pragma fragment frag_surf
#pragma lighting ToonRamp exclude_path:prepass
#pragma multi_compile_fog
#pragma multi_compile_fwdbase
#include "Custom.cginc"
            ENDCG
        }

        // outline
        Pass{
            Name "OUTLINE"
            Tags{ "LightMode" = "Always" }
            Cull Front
            ZWrite On
            ColorMask RGB
            Blend SrcAlpha OneMinusSrcAlpha

            CGPROGRAM
#pragma vertex vert
#pragma fragment frag
#pragma multi_compile_fog
#pragma multi_compile_fwdbase
#include "Custom.cginc"
            ENDCG
        }
    }

    // for shadow etc...
    Fallback "Diffuse"
}

*.shaderファイルのインデントが扱いずらいのでcgincと分割して手で整形。
気持ちよくindentできるエディタを見繕う必要があるな・・・
Custom.cginc
#include "HLSLSupport.cginc"
#include "UnityShaderVariables.cginc"
// Surface shader code generated based on:
// writes to per-pixel normal: no
// writes to emission: no
// needs world space reflection vector: no
// needs world space normal vector: no
// needs screen space position: no
// needs world space position: no
// needs view direction: no
// needs world space view direction: no
// needs world space position for lighting: no
// needs world space view direction for lighting: no
// needs world space view direction for lightmaps: no
// needs vertex color: no
// needs VFACE: no
// passes tangent-to-world matrix to pixel shader: no
// reads from normal: no
// 1 texcoords actually used
//   float2 _MainTex
#define UNITY_PASS_FORWARDBASE
#include "UnityCG.cginc"
#include "Lighting.cginc"
#include "AutoLight.cginc"

#define INTERNAL_DATA
#define WorldReflectionVector(data,normal) data.worldRefl
#define WorldNormalVector(data,normal) normal

// Original surface shader snippet:
#line 10 ""
#ifdef DUMMY_PREPROCESSOR_TO_WORK_AROUND_HLSL_COMPILER_LINE_HANDLING
#endif

//#pragma surface surf ToonRamp

sampler2D _Ramp;

// custom lighting function that uses a texture ramp based
// on angle between light direction and normal
//#pragma lighting ToonRamp exclude_path:prepass
inline half4 LightingToonRamp(SurfaceOutput s, half3 lightDir, half atten)
{
#ifndef USING_DIRECTIONAL_LIGHT
    lightDir = normalize(lightDir);
#endif

    half d = dot(s.Normal, lightDir)*0.5 + 0.5;
    half3 ramp = tex2D(_Ramp, float2(d, d)).rgb;

    half4 c;
    c.rgb = s.Albedo * _LightColor0.rgb * ramp * (atten * 2);
    c.a = 0;
    return c;
}


sampler2D _MainTex;
float4 _Color;

struct Input {
    float2 uv_MainTex : TEXCOORD0;
};

void surf(Input IN, inout SurfaceOutput o) {
    half4 c = tex2D(_MainTex, IN.uv_MainTex) * _Color;
    o.Albedo = c.rgb;
    o.Alpha = c.a;
}


// vertex-to-fragment interpolation data
// no lightmaps:
#ifdef LIGHTMAP_OFF
struct v2f_surf {
    float4 pos : SV_POSITION;
    float2 pack0 : TEXCOORD0; // _MainTex
    half3 worldNormal : TEXCOORD1;
    fixed3 vlight : TEXCOORD2; // ambient/SH/vertexlights
    SHADOW_COORDS(3)
        UNITY_FOG_COORDS(4)
#if SHADER_TARGET >= 30
        float4 lmap : TEXCOORD5;
#endif
};
#endif
// with lightmaps:
#ifndef LIGHTMAP_OFF
struct v2f_surf {
    float4 pos : SV_POSITION;
    float2 pack0 : TEXCOORD0; // _MainTex
    half3 worldNormal : TEXCOORD1;
    float4 lmap : TEXCOORD2;
    SHADOW_COORDS(3)
        UNITY_FOG_COORDS(4)
#ifdef DIRLIGHTMAP_COMBINED
        fixed3 tSpace0 : TEXCOORD5;
    fixed3 tSpace1 : TEXCOORD6;
    fixed3 tSpace2 : TEXCOORD7;
#endif
};
#endif
float4 _MainTex_ST;

// vertex shader
v2f_surf vert_surf(appdata_full v) {
    v2f_surf o;
    UNITY_INITIALIZE_OUTPUT(v2f_surf, o);
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    o.pack0.xy = TRANSFORM_TEX(v.texcoord, _MainTex);
    float3 worldPos = mul(_Object2World, v.vertex).xyz;
    fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
#if !defined(LIGHTMAP_OFF) && defined(DIRLIGHTMAP_COMBINED)
    fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);
    fixed tangentSign = v.tangent.w * unity_WorldTransformParams.w;
    fixed3 worldBinormal = cross(worldNormal, worldTangent) * tangentSign;
#endif
#if !defined(LIGHTMAP_OFF) && defined(DIRLIGHTMAP_COMBINED)
    o.tSpace0 = fixed3(worldTangent.x, worldBinormal.x, worldNormal.x);
    o.tSpace1 = fixed3(worldTangent.y, worldBinormal.y, worldNormal.y);
    o.tSpace2 = fixed3(worldTangent.z, worldBinormal.z, worldNormal.z);
#endif
    o.worldNormal = worldNormal;
#ifndef DYNAMICLIGHTMAP_OFF
    o.lmap.zw = v.texcoord2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;
#endif
#ifndef LIGHTMAP_OFF
    o.lmap.xy = v.texcoord1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
#endif

    // SH/ambient and vertex lights
#ifdef LIGHTMAP_OFF
#if UNITY_SHOULD_SAMPLE_SH
    float3 shlight = ShadeSH9(float4(worldNormal, 1.0));
    o.vlight = shlight;
#else
    o.vlight = 0.0;
#endif
#ifdef VERTEXLIGHT_ON
    o.vlight += Shade4PointLights(
            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,
            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,
            unity_4LightAtten0, worldPos, worldNormal);
#endif // VERTEXLIGHT_ON
#endif // LIGHTMAP_OFF

    TRANSFER_SHADOW(o); // pass shadow coordinates to pixel shader
    UNITY_TRANSFER_FOG(o, o.pos); // pass fog coordinates to pixel shader
    return o;
}

// fragment shader
fixed4 frag_surf(v2f_surf IN) : SV_Target{
    // prepare and unpack data
    Input surfIN;
    UNITY_INITIALIZE_OUTPUT(Input,surfIN);
    surfIN.uv_MainTex.x = 1.0;
    surfIN.uv_MainTex = IN.pack0.xy;
    float3 lightDir = _WorldSpaceLightPos0.xyz;
#ifdef UNITY_COMPILER_HLSL
    SurfaceOutput o = (SurfaceOutput)0;
#else
    SurfaceOutput o;
#endif
    o.Albedo = 0.0;
    o.Emission = 0.0;
    o.Specular = 0.0;
    o.Alpha = 0.0;
    o.Gloss = 0.0;
    fixed3 normalWorldVertex = fixed3(0,0,1);
    o.Normal = IN.worldNormal;
    normalWorldVertex = IN.worldNormal;

    // call surface function
    surf(surfIN, o);

    // compute lighting & shadowing factor
    UNITY_LIGHT_ATTENUATION(atten, IN, worldPos)
        fixed4 c = 0;
#ifdef LIGHTMAP_OFF
    c.rgb += o.Albedo * IN.vlight;
#endif // LIGHTMAP_OFF

    // lightmaps
#ifndef LIGHTMAP_OFF
#ifdef DIRLIGHTMAP_OFF
    // single lightmap
    fixed4 lmtex = UNITY_SAMPLE_TEX2D(unity_Lightmap, IN.lmap.xy);
    fixed3 lm = DecodeLightmap(lmtex);
#elif DIRLIGHTMAP_COMBINED
    // directional lightmaps
    fixed4 lmtex = UNITY_SAMPLE_TEX2D(unity_Lightmap, IN.lmap.xy);
    half3 lm = DecodeLightmap(lmtex);
#elif DIRLIGHTMAP_SEPARATE
    // directional with specular - no support
    half4 lmtex = 0;
    half3 lm = 0;
#endif // DIRLIGHTMAP_OFF

#endif // LIGHTMAP_OFF


    // realtime lighting: call lighting function
#ifdef LIGHTMAP_OFF
    c += LightingToonRamp(o, lightDir, atten);
#else
    c.a = o.Alpha;
#endif

#ifndef LIGHTMAP_OFF
    // combine lightmaps with realtime shadows
#ifdef SHADOWS_SCREEN
#if defined(UNITY_NO_RGBM)
    c.rgb += o.Albedo * min(lm, atten * 2);
#else
    c.rgb += o.Albedo * max(min(lm,(atten * 2)*lmtex.rgb), lm*atten);
#endif
#else // SHADOWS_SCREEN
    c.rgb += o.Albedo * lm;
#endif // SHADOWS_SCREEN
#endif // LIGHTMAP_OFF

#ifndef DYNAMICLIGHTMAP_OFF
    fixed4 dynlmtex = UNITY_SAMPLE_TEX2D(unity_DynamicLightmap, IN.lmap.zw);
    c.rgb += o.Albedo * DecodeRealtimeLightmap(dynlmtex);
#endif

    UNITY_APPLY_FOG(IN.fogCoord, c); // apply fog
    UNITY_OPAQUE_ALPHA(c.a);
    return c;
}

//////////////////////////////////////////////////////////////////////////////
// outline
//////////////////////////////////////////////////////////////////////////////
#include "UnityCG.cginc"

struct appdata {
    float4 vertex : POSITION;
    float3 normal : NORMAL;
};

struct v2f {
    float4 pos : SV_POSITION;
    UNITY_FOG_COORDS(0)
        fixed4 color : COLOR;
};

uniform float _Outline;
uniform float4 _OutlineColor;

v2f vert(appdata v) {
    v2f o;
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);

    float3 norm = normalize(mul((float3x3)UNITY_MATRIX_IT_MV, v.normal));
    float2 offset = TransformViewToProjection(norm.xy);

    o.pos.xy += offset * o.pos.z * _Outline;
    o.color = _OutlineColor;
    UNITY_TRANSFER_FOG(o, o.pos);
    return o;
}

fixed4 frag(v2f i) : SV_Target
{
    UNITY_APPLY_FOG(i.fogCoord, i.color);
    return i.color;
}

改造準備完了。
改造した

alpha blending
影と陰の合成とRampの適用法を改造

なかなか難しい。
顔は別光源にして影が落ちないようにする必要があるね。
顔にDiffuseは必要ない。
#include "HLSLSupport.cginc"
#include "UnityShaderVariables.cginc"
// Surface shader code generated based on:
// writes to per-pixel normal: no
// writes to emission: no
// needs world space reflection vector: no
// needs world space normal vector: no
// needs screen space position: no
// needs world space position: no
// needs view direction: no
// needs world space view direction: no
// needs world space position for lighting: no
// needs world space view direction for lighting: no
// needs world space view direction for lightmaps: no
// needs vertex color: no
// needs VFACE: no
// passes tangent-to-world matrix to pixel shader: no
// reads from normal: no
// 1 texcoords actually used
//   float2 _MainTex
#define UNITY_PASS_FORWARDBASE
#include "UnityCG.cginc"
#include "Lighting.cginc"
#include "AutoLight.cginc"

#define INTERNAL_DATA
#define WorldReflectionVector(data,normal) data.worldRefl
#define WorldNormalVector(data,normal) normal

// Original surface shader snippet:
#line 10 ""
#ifdef DUMMY_PREPROCESSOR_TO_WORK_AROUND_HLSL_COMPILER_LINE_HANDLING
#endif

//#pragma surface surf ToonRamp

sampler2D _Ramp;

// custom lighting function that uses a texture ramp based
// on angle between light direction and normal
//#pragma lighting ToonRamp exclude_path:prepass
inline half3 LightingToonRamp(half3 rgb, half diffuse, half atten)
{
    float d = min(diffuse, atten);
    float3 ramp = tex2D(_Ramp, float2(d, d));
    return rgb * ramp;
}

sampler2D _MainTex;
float4 _Color;

struct Input {
    float2 uv_MainTex : TEXCOORD0;
};

void surf(Input IN, inout SurfaceOutput o) {
    half4 c = tex2D(_MainTex, IN.uv_MainTex) * _Color;
    o.Albedo = c.rgb;
    o.Alpha = c.a;
}


// vertex-to-fragment interpolation data
// no lightmaps:
#ifdef LIGHTMAP_OFF
struct v2f_surf {
    float4 pos : SV_POSITION;
    float2 pack0 : TEXCOORD0; // _MainTex
    half3 worldNormal : TEXCOORD1;
    fixed3 vlight : TEXCOORD2; // ambient/SH/vertexlights
    SHADOW_COORDS(3)
        UNITY_FOG_COORDS(4)
#if SHADER_TARGET >= 30
        float4 lmap : TEXCOORD5;
#endif
};
#endif
// with lightmaps:
#ifndef LIGHTMAP_OFF
struct v2f_surf {
    float4 pos : SV_POSITION;
    float2 pack0 : TEXCOORD0; // _MainTex
    half3 worldNormal : TEXCOORD1;
    float4 lmap : TEXCOORD2;
    SHADOW_COORDS(3)
        UNITY_FOG_COORDS(4)
#ifdef DIRLIGHTMAP_COMBINED
        fixed3 tSpace0 : TEXCOORD5;
    fixed3 tSpace1 : TEXCOORD6;
    fixed3 tSpace2 : TEXCOORD7;
#endif
};
#endif
float4 _MainTex_ST;

// vertex shader
v2f_surf vert_surf(appdata_full v) {
    v2f_surf o;
    UNITY_INITIALIZE_OUTPUT(v2f_surf, o);
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
    o.pack0.xy = TRANSFORM_TEX(v.texcoord, _MainTex);
    float3 worldPos = mul(_Object2World, v.vertex).xyz;
    fixed3 worldNormal = UnityObjectToWorldNormal(v.normal);
#if !defined(LIGHTMAP_OFF) && defined(DIRLIGHTMAP_COMBINED)
    fixed3 worldTangent = UnityObjectToWorldDir(v.tangent.xyz);
    fixed tangentSign = v.tangent.w * unity_WorldTransformParams.w;
    fixed3 worldBinormal = cross(worldNormal, worldTangent) * tangentSign;
#endif
#if !defined(LIGHTMAP_OFF) && defined(DIRLIGHTMAP_COMBINED)
    o.tSpace0 = fixed3(worldTangent.x, worldBinormal.x, worldNormal.x);
    o.tSpace1 = fixed3(worldTangent.y, worldBinormal.y, worldNormal.y);
    o.tSpace2 = fixed3(worldTangent.z, worldBinormal.z, worldNormal.z);
#endif
    o.worldNormal = worldNormal;
#ifndef DYNAMICLIGHTMAP_OFF
    o.lmap.zw = v.texcoord2.xy * unity_DynamicLightmapST.xy + unity_DynamicLightmapST.zw;
#endif
#ifndef LIGHTMAP_OFF
    o.lmap.xy = v.texcoord1.xy * unity_LightmapST.xy + unity_LightmapST.zw;
#endif

    // SH/ambient and vertex lights
#ifdef LIGHTMAP_OFF
#if UNITY_SHOULD_SAMPLE_SH
    float3 shlight = ShadeSH9(float4(worldNormal, 1.0));
    o.vlight = shlight;
#else
    o.vlight = 0.0;
#endif
#ifdef VERTEXLIGHT_ON
    o.vlight += Shade4PointLights(
            unity_4LightPosX0, unity_4LightPosY0, unity_4LightPosZ0,
            unity_LightColor[0].rgb, unity_LightColor[1].rgb, unity_LightColor[2].rgb, unity_LightColor[3].rgb,
            unity_4LightAtten0, worldPos, worldNormal);
#endif // VERTEXLIGHT_ON
#endif // LIGHTMAP_OFF

    TRANSFER_SHADOW(o); // pass shadow coordinates to pixel shader
    UNITY_TRANSFER_FOG(o, o.pos); // pass fog coordinates to pixel shader
    return o;
}

// fragment shader
fixed4 frag_surf(v2f_surf IN) : SV_Target{
    // prepare and unpack data
    Input surfIN;
    UNITY_INITIALIZE_OUTPUT(Input,surfIN);
    surfIN.uv_MainTex.x = 1.0;
    surfIN.uv_MainTex = IN.pack0.xy;
    float3 lightDir = _WorldSpaceLightPos0.xyz;
#ifdef UNITY_COMPILER_HLSL
    SurfaceOutput o = (SurfaceOutput)0;
#else
    SurfaceOutput o;
#endif
    o.Albedo = 0.0;
    o.Emission = 0.0;
    o.Specular = 0.0;
    o.Alpha = 0.0;
    o.Gloss = 0.0;
    fixed3 normalWorldVertex = fixed3(0,0,1);
    o.Normal = IN.worldNormal;
    normalWorldVertex = IN.worldNormal;

    // call surface function
    surf(surfIN, o);

    // compute lighting & shadowing factor
    UNITY_LIGHT_ATTENUATION(atten, IN, worldPos)
        fixed4 c = 0;
#ifdef LIGHTMAP_OFF
    c.rgb += o.Albedo * IN.vlight;
#endif // LIGHTMAP_OFF

    // lightmaps
#ifndef LIGHTMAP_OFF
#ifdef DIRLIGHTMAP_OFF
    // single lightmap
    fixed4 lmtex = UNITY_SAMPLE_TEX2D(unity_Lightmap, IN.lmap.xy);
    fixed3 lm = DecodeLightmap(lmtex);
#elif DIRLIGHTMAP_COMBINED
    // directional lightmaps
    fixed4 lmtex = UNITY_SAMPLE_TEX2D(unity_Lightmap, IN.lmap.xy);
    half3 lm = DecodeLightmap(lmtex);
#elif DIRLIGHTMAP_SEPARATE
    // directional with specular - no support
    half4 lmtex = 0;
    half3 lm = 0;
#endif // DIRLIGHTMAP_OFF

#endif // LIGHTMAP_OFF


    // realtime lighting: call lighting function
    c.a = o.Alpha;
#ifdef LIGHTMAP_OFF
#ifndef USING_DIRECTIONAL_LIGHT
    lightDir = normalize(lightDir);
#endif
    half diffuse = max(0, dot(o.Normal, lightDir));
    c.rgb += LightingToonRamp(o.Albedo, diffuse, atten);
#else

    // combine lightmaps with realtime shadows
#ifdef SHADOWS_SCREEN
#if defined(UNITY_NO_RGBM)
    c.rgb += o.Albedo * min(lm, atten * 2);
#else
    c.rgb += o.Albedo * max(min(lm,(atten * 2)*lmtex.rgb), lm*atten);
#endif
#else // SHADOWS_SCREEN
    c.rgb += o.Albedo * lm;
#endif // SHADOWS_SCREEN
#endif // LIGHTMAP_OFF

#ifndef DYNAMICLIGHTMAP_OFF
    fixed4 dynlmtex = UNITY_SAMPLE_TEX2D(unity_DynamicLightmap, IN.lmap.zw);
    c.rgb += o.Albedo * DecodeRealtimeLightmap(dynlmtex);
#endif

    UNITY_APPLY_FOG(IN.fogCoord, c); // apply fog

    return c;
}

//////////////////////////////////////////////////////////////////////////////
// outline
//////////////////////////////////////////////////////////////////////////////
#include "UnityCG.cginc"

struct appdata {
    float4 vertex : POSITION;
    float3 normal : NORMAL;
};

struct v2f {
    float4 pos : SV_POSITION;
    UNITY_FOG_COORDS(0)
        fixed4 color : COLOR;
};

uniform float _Outline;
uniform float4 _OutlineColor;

v2f vert(appdata v) {
    v2f o;
    o.pos = mul(UNITY_MATRIX_MVP, v.vertex);

    float3 norm = normalize(mul((float3x3)UNITY_MATRIX_IT_MV, v.normal));
    float2 offset = TransformViewToProjection(norm.xy);

    o.pos.xy += offset * min(1, o.pos.z) * _Outline; // 太さ調整
    o.color = _OutlineColor;
    UNITY_TRANSFER_FOG(o, o.pos);
    return o;
}

fixed4 frag(v2f i) : SV_Target
{
    UNITY_APPLY_FOG(i.fogCoord, i.color);
    return i.color;
}


