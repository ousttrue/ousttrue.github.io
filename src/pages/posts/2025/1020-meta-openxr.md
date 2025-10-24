---
date: 2025-10-20
title: Meta-OpenXR-SDK をビルドしてみる
tags: [openxr]
---

https://github.com/meta-quest/Meta-OpenXR-SDK/tree/v78

Windows msvc+cmake で全部ビルドできた。
build.zig 管理下に移してみる。

起動時の assets のロードでエラーになる。

- box.ovrscene が無い => SmallRoom.gltf.ovrscene で置き換え
- gaze_cursor_circle_64x64.ktx が無い => 作った

| Samples/XrSamples            | pc          | quest3 | note                                                                                                         |
| ---------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| XrColorSpaceFB               | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-colorspace                           |
| XrHandsFB                    | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-hand-tracking                        |
| XrHandTrackingWideMotionMode | ok          |        | https://developers.meta.com/horizon/documentation/native/android/native-wide-motion-mode                     |
| XrMicrogestures              | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-openxr-hand-tracking-microgestures   |
| XrHandDataSource             | ok          |        |                                                                                                              |
| XrHandsAndControllers        | ok          |        |                                                                                                              |
| XrControllers                | ok          |        |                                                                                                              |
| XrBodyFaceEyeSocial          | ok          |        | https://developers.meta.com/horizon/documentation/native/android/move-body-tracking                          |
| XrPassthrough                | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-passthrough                          |
| XrPassthroughOcclusion       | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-depth                                |
| XrInput                      | ok          |        | https://developers.meta.com/horizon/documentation/native/android/mobile-openxr-input GUI input sample. grab. |
| XrDynamicObjects             | not ?       |        | https://developers.meta.com/horizon/documentation/native/android/mobile-dynamic-object-tracker               |
| XrVirtualKeyboard            | not ?       |        | https://developers.meta.com/horizon/documentation/native/android/mobile-openxr-virtual-keyboard-sample       |
| XrSceneModel                 | ok          |        | https://developers.meta.com/horizon/documentation/native/android/openxr-scene-overview                       |
| XrSpatialAnchor              | ok          |        | https://developers.meta.com/horizon/documentation/native/android/openxr-spatial-anchors-samples              |
| XrColocationDiscovery        | ok ?        |        | https://developers.meta.com/horizon/documentation/native/android/openxr-colocation-discovery-overview        |
| XrSceneSharing               | ok ?        |        | https://developers.meta.com/horizon/documentation/native/android/openxr-space-sharing-samples                |
| //                           |             |        |                                                                                                              |
| XrSpaceWarp                  | not compile |        |
| XrCompositor_NativeActivity  | --          |        |

QuestLink でひととおり試してみた。
XrSpaceWarp が Android 要素を直接 `include` していてビルドできなかった以外は全部ビルドは通った。
VirtualKeyboard など意外は動作させることもできた。

khronos の hello_xr サンプルより、改造して遊ぶ元としては使いやすいかもしれない。
hello_xr はなるべく多くの環境をサポートするべく、マルチOS, マルチGPU 故の複雑さがあり、
そのわりにシーンは単純なのである。
対して Meta-OpenXR-SDK は、PC+Opengl と Android-OpenGLES の2環境のみのサポートだが、
シーンはわりと機能がある。
ktx, gltf とか font texture のできる簡易 GUI とかある。

handtracking + passthorugh 、scene model あたりを扱いたいのでもうちっと、
これを研究する。

WiVRn でも動作確認してみようかのう。
