---
Title: "dracoの基本"
Published: 2017-12-12
Tags: ["gltf"]
---

Googleのメッシュ圧縮ライブラリDracoの使い方を調査中。

https://github.com/google/draco
コマンドラインツールからobjとply形式の読み書きができるのでそこから解読する。
ポイントクラウドの読み書き
点群を表すdraco::PointCloud型があって、それを継承して面を追加したdraco::Mesh型がある。
まずは、基本となるPointCloudの読み書き。
#include "draco/point_cloud/point_cloud.h"
#include "draco/point_cloud/point_cloud_builder.h"
#include "draco/compression/encode.h"
#include "draco/compression/decode.h"


struct Vector3
{
    float x;
    float y;
    float z;
};

/*
static int AddPositionAttribute(draco::PointCloud *pc, int vertexCount)
{
    draco::GeometryAttribute va;
    va.Init(draco::GeometryAttribute::POSITION, nullptr, 3, draco::DT_FLOAT32, false, 
        sizeof(float) * 3, 0);
    return pc->AddAttribute(va, false, vertexCount);
}
static int AddTexCoordAttribute(draco::PointCloud *pc, int vertexCount)
{
    draco::GeometryAttribute va;
    va.Init(draco::GeometryAttribute::TEX_COORD, nullptr, 2, draco::DT_FLOAT32, false,
        sizeof(float) * 2, 0);
    return pc->AddAttribute(va, false, vertexCount);
}
static int AddNormaldAttribute(draco::PointCloud *pc, int vertexCount)
{
    draco::GeometryAttribute va;
    va.Init(draco::GeometryAttribute::NORMAL, nullptr, 3, draco::DT_FLOAT32, false,
        sizeof(float) * 3, 0);
    return pc->AddAttribute(va, false, vertexCount);
}
*/

int main(int argc, char **argv)
{
    Vector3 vertices[] =
    {
        {-1, -1, -1},
        { -1, 1, -1 },
        { 1, 1, -1 },
        { 1, -1, -1 },
    };

    // setup point cloud
    /*
    draco::PointCloud pc;
    pc.set_num_points(_countof(vertices));

    {
        auto pos_att_id = AddPositionAttribute(&pc, _countof(vertices));
        auto attr = pc.attribute(pos_att_id);
        auto size = attr->size();
        attr->SetAttributeValue(draco::AttributeValueIndex(0), vertices);
    }
    */
    draco::PointCloudBuilder builder;
    builder.Start(_countof(vertices));
    auto pos_att_id = builder.AddAttribute(draco::GeometryAttribute::POSITION, 3, draco::DT_FLOAT32);
    for (int i = 0; i < _countof(vertices); ++i) {
        builder.SetAttributeValueForPoint(pos_att_id, draco::PointIndex(i), &vertices[i]);
    }
    auto res = builder.Finalize(false);

    draco::EncoderBuffer encodeBuffer;
    {
        // encode
        draco::Encoder encoder;
        auto  status = encoder.EncodePointCloudToBuffer(*res, &encodeBuffer);
    }

    {
        // decode
        draco::DecoderBuffer decodeBuffer;
        decodeBuffer.Init(encodeBuffer.data(), encodeBuffer.size());

        draco::Decoder decoder;
        auto statusor = decoder.DecodePointCloudFromBuffer(&decodeBuffer);

        auto dpc = std::move(statusor).value();
        auto num = dpc->NumNamedAttributes(draco::GeometryAttribute::POSITION);
        auto attr = dpc->GetNamedAttribute(draco::GeometryAttribute::POSITION);
        std::vector<Vector3> positions(attr->size());
        for (int i = 0; i < positions.size(); ++i)
        {
            attr->ConvertValue<float, 3>(draco::AttributeValueIndex(i), &positions[i].x);
        }
    }

    return 0;
}

参考になるファイルは、

point_cloud_builder_test.cc(build point cloud)
draco_encoder.cc(obj to draco)
draco_decoder.cc(draco to obj)

PointCloud -> dracoとdraco->PointCloud->get pointsは簡単でAPIを素直に呼び出せばいい。
問題は如何にPointCloudを構築するか。draco_encoderから解読したローレベルのAPIでやってみたらうまくいかなかったのだが、draco::PointCloudBuilderを発見した。
Meshの読み書き
ToDo…
