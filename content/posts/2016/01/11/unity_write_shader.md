---
title: "UnityのShaderを書いてみる"
date: 2016-01-11
tags: ["unity"]
---

アルファブレンディング
シャドウキャスター
シャドウレシーバー

なシェーダー。

```
基本
新規作成
Create -> Shader -> UnLitShader
CustomShader

Shader "CustomShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            // make fog work
            #pragma multi_compile_fog

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                UNITY_FOG_COORDS(1)
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;

            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                fixed4 col = tex2D(_MainTex, i.uv);
                // apply fog
                UNITY_APPLY_FOG(i.fogCoord, col);
                return col;
            }
            ENDCG
        }
    }
}

この時点でテクスチャが表示できるけど一度無にしよう
Shader "CustomShader"
{
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            float4 vert(float4 v:POSITION) : SV_POSITION{
                return mul(UNITY_MATRIX_MVP, v);
            }
            fixed4 frag() : COLOR{
                return fixed4(1.0,0.0,0.0,1.0);
            }
            ENDCG
        }
    }
}


頂点変形だけを適用して赤一色。
Color
べたにマテリアル色が出る。
Shader "CustomShader"
{
    Properties
    {
        _Color("Color", Color) = (1,1,1,1)
    }
    SubShader
    {
    Tags{ "RenderType" = "Opaque" }
    LOD 100

    Pass
    {
        CGPROGRAM
#pragma target 3.0
#pragma vertex vert
#pragma fragment frag

        uniform float4 _Color;

        float4 vert(float4 v:POSITION) : SV_POSITION{
            return mul(UNITY_MATRIX_MVP, v);
        }
        fixed4 frag() : COLOR{
            return _Color;
        }
        ENDCG
    }

    } // SurShader
}

_Colorプロパティを定義して、uniform変数_Colorを宣言し使う。
Texture
テクスチャ色を乗算
Shader "CustomShader"
{
    Properties
    {
        _Color("Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }
    SubShader
    {
    Tags{ "RenderType" = "Opaque" }
    LOD 100

    Pass
    {
        CGPROGRAM
#pragma target 3.0
#pragma vertex vert
#pragma fragment frag

        struct appdata
        {
            float4 vertex : POSITION;
            float2 uv : TEXCOORD0;
        };
        struct v2f
        {
            float2 uv : TEXCOORD0;
            float4 vertex : SV_POSITION;
        };

        uniform float4 _Color;
        uniform sampler2D _MainTex;

        v2f vert(appdata v){
            v2f o;
            o.vertex= mul(UNITY_MATRIX_MVP, v.vertex);
            o.uv = v.uv;
            return o;
        }
        fixed4 frag(v2f i) : COLOR{
            fixed4 tex = tex2D(_MainTex, i.uv);
            return _Color * tex;
        }
        ENDCG
    }

    } // SurShader
}


シェーダーの入力に位置とUV、出力に変換済みの位置とUVが必要になったので構造体appdataとv2fを導入
_MainTexプロパティを導入し、サンプラー_MainTexを宣言してtex2D関数で使う

AlphaBlending
追加分
Shader "CustomShader"
{
    SubShader
    {
    // 背景を含む不透明なものの後で描画する
    Tags{ "Queue" = "Transparent" }

    Pass
    {
        Blend SrcAlpha OneMinusSrcAlpha
    }

    } // SurShader
}


ここまでで照明の無い基本的なシェーダーができる。
UnityCG.cgincを使う
最初に新規作成したShaderにAplhaBlendingを追加した感じ。
uniform変数のuniformは省略できる。
Shader "CustomShader"
{
    Properties
    {
        _Color("Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }
    SubShader
    {
        Tags{ "Queue" = "Transparent" }
        LOD 100

    Pass
    {
        Blend SrcAlpha OneMinusSrcAlpha

        CGPROGRAM
        #pragma target 3.0
        #pragma vertex vert
        #pragma fragment frag

        // make fog work
        #pragma multi_compile_fog

        #include "UnityCG.cginc"

        struct appdata
        {
            float4 vertex : POSITION;
            float2 uv : TEXCOORD0;
        };

        struct v2f
        {
            float2 uv : TEXCOORD0;
            UNITY_FOG_COORDS(1)
            float4 vertex : SV_POSITION;
        };

        float4 _Color;
        sampler2D _MainTex;
        float4 _MainTex_ST;

        v2f vert(appdata v)
        {
            v2f o;
            o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
            o.uv = TRANSFORM_TEX(v.uv, _MainTex);
            UNITY_TRANSFER_FOG(o,o.vertex);
            return o;
        }

        fixed4 frag(v2f i) : SV_Target
        {
            // sample the texture
            fixed4 col = tex2D(_MainTex, i.uv);
            // apply fog
            UNITY_APPLY_FOG(i.fogCoord, col);
            return col * _Color;
        }
        ENDCG
    }

    } // SurShader
}

Lighting導入
Vertex and Fragment Shader Examplesの後半Calculating Lighting
を参考にライティングをやってみる。
forward rendringを使うことで

DirectionalLight
ambient
lightmap
reflections

を扱える。
Tags {"LightMode"="ForwardBase"}

を定義することでUnityの組み込み変数を通じて上記のシーンのライティング情報を得ることができるようになる。
頂点ライティングによるDiffuse & Ambient

DirectionalLightによるDiffuse計算
appdata_base導入(UnityCG.cgincで定義)
v2fにdiffuse追加
vertでdiffuse計算

Shader "CustomShader"
{
    Properties
    {
        _Color("Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }
    SubShader
    {
        Tags{ "Queue" = "Transparent" }
        LOD 100

    Pass
    {
        Tags{ "LightMode" = "ForwardBase" }

        Blend SrcAlpha OneMinusSrcAlpha

        CGPROGRAM
        #pragma target 3.0
        #pragma vertex vert
        #pragma fragment frag

        // make fog work
        #pragma multi_compile_fog

        #include "UnityCG.cginc"
        #include "UnityLightingCommon.cginc" // for _LightColor0

        struct v2f
        {
            float2 uv : TEXCOORD0;
            fixed4 diffuse : COLOR0; // diffuse lighting color
            float4 vertex : SV_POSITION;
            UNITY_FOG_COORDS(1)
        };

        uniform float4 _Color;
        uniform sampler2D _MainTex;
        float4 _MainTex_ST;

        v2f vert(appdata_base v)
        {
            v2f o;
            o.vertex = mul(UNITY_MATRIX_MVP, v.vertex);
            o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);

            // get vertex normal in world space
            half3 worldNormal = UnityObjectToWorldNormal(v.normal);
            // dot product between normal and light direction for
            // standard diffuse (Lambert) lighting
            half nl = max(0, dot(worldNormal, _WorldSpaceLightPos0.xyz));
            // factor in the light color
            o.diffuse = nl * _LightColor0;

            // the only difference from previous shader:
            // in addition to the diffuse lighting from the main light,
            // add illumination from ambient or light probes
            // ShadeSH9 function from UnityCG.cginc evaluates it,
            // using world space normal
            o.diffuse.rgb += ShadeSH9(half4(worldNormal,1));

            UNITY_TRANSFER_FOG(o,o.vertex);
            return o;
        }

        fixed4 frag(v2f i) : SV_Target
        {
            // sample the texture
            fixed4 col = tex2D(_MainTex, i.uv) * _Color;
            // apply fog
            UNITY_APPLY_FOG(i.fogCoord, col);
            col.rgb *= i.diffuse;
            return col;
        }
        ENDCG
    }

    } // SurShader
}

Shadowキャスティング
ShadowMapに深度を描画するPassを追加する。
簡単なのは下記。
// pull in shadow caster from VertexLit built-in shader
UsePass "Legacy Shaders/VertexLit/SHADOWCASTER"

手作りもできる。

pragma multi_compile_shadowcasterがポイント

    // shadow caster rendering pass, implemented manually
    // using macros from UnityCG.cginc
    Pass
    {
        Tags{ "LightMode" = "ShadowCaster" }

        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma multi_compile_shadowcaster
        #include "UnityCG.cginc"

        struct v2f {
            V2F_SHADOW_CASTER;
        };

        v2f vert(appdata_base v)
        {
            v2f o;
            TRANSFER_SHADOW_CASTER_NORMALOFFSET(o)
                return o;
        }

        float4 frag(v2f i) : SV_Target
        {
            SHADOW_CASTER_FRAGMENT(i)
        }
        ENDCG
    }

ShadowReceiveing

pragma multi_compile_fwdbaseがポイント

Shader "CustomShader"
{
    Properties
    {
        _Color("Color", Color) = (1,1,1,1)
        _MainTex("Base (RGB) Trans (A)", 2D) = "white" {}
    }
    SubShader
    {
    Tags{ "Queue" = "Geometry" }
    LOD 100

    Pass
    {
        Tags{ "LightMode" = "ForwardBase" "IgnoreProjector" = "True" "PerformanceChecks" = "False" }
        ZWrite On
        Blend SrcAlpha OneMinusSrcAlpha

        CGPROGRAM
        #pragma target 3.0
        #pragma vertex vert
        #pragma fragment frag

        // make fog work
        #pragma multi_compile_fog

        #include "UnityCG.cginc"
        #include "UnityLightingCommon.cginc" // for _LightColor0

        // compile shader into multiple variants, with and without shadows
        // (we don't care about any lightmaps yet, so skip these variants)
        #pragma multi_compile_fwdbase nolightmap nodirlightmap nodynlightmap novertexlight
        // shadow helper functions and macros
        #include "AutoLight.cginc"

        struct v2f
        {
            float2 uv : TEXCOORD0;
            float4 pos : SV_POSITION;
            fixed4 diff : COLOR0; // diffuse lighting color
            fixed3 ambient : COLOR1;
            SHADOW_COORDS(1) // put shadows data into TEXCOORD1
            UNITY_FOG_COORDS(1)
        };

        uniform float4 _Color;
        uniform sampler2D _MainTex;
        float4 _MainTex_ST;

        v2f vert(appdata_base v)
        {
            v2f o;
            o.pos = mul(UNITY_MATRIX_MVP, v.vertex);
            o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);

            // get vertex normal in world space
            half3 worldNormal = UnityObjectToWorldNormal(v.normal);
            // dot product between normal and light direction for
            // standard diffuse (Lambert) lighting
            half nl = max(0, dot(worldNormal, _WorldSpaceLightPos0.xyz));
            // factor in the light color
            o.diff = nl * _LightColor0;

            // the only difference from previous shader:
            // in addition to the diffuse lighting from the main light,
            // add illumination from ambient or light probes
            // ShadeSH9 function from UnityCG.cginc evaluates it,
            // using world space normal
            o.ambient = ShadeSH9(half4(worldNormal, 1));

            // compute shadows data
            TRANSFER_SHADOW(o)

            UNITY_TRANSFER_FOG(o,o.vertex);
            return o;
        }

        fixed4 frag(v2f i) : SV_Target
        {
            // sample the texture
            fixed4 col = tex2D(_MainTex, i.uv) * _Color;

            fixed shadow = SHADOW_ATTENUATION(i);

            // darken light's illumination with shadow, keep ambient intact
            fixed3 lighting = i.diff * shadow + i.ambient;
            col.rgb *= lighting;

            // apply fog
            UNITY_APPLY_FOG(i.fogCoord, col);

            return col;
        }
        ENDCG
    }

    // shadow caster rendering pass, implemented manually
    // using macros from UnityCG.cginc
    Pass
    {
        Tags{ "LightMode" = "ShadowCaster" }

        CGPROGRAM
        #pragma vertex vert
        #pragma fragment frag
        #pragma multi_compile_shadowcaster
        #include "UnityCG.cginc"

        struct v2f {
            V2F_SHADOW_CASTER;
        };

        v2f vert(appdata_base v)
        {
            v2f o;
            TRANSFER_SHADOW_CASTER_NORMALOFFSET(o)
                return o;
        }

        float4 frag(v2f i) : SV_Target
        {
            SHADOW_CASTER_FRAGMENT(i)
        }
        ENDCG
    }

    } // SurShader

    Fallback "Transparent/VertexLit"
}
```
