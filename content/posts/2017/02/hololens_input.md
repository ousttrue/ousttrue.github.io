---
Title: "HoloToolkitのInputManager"
date: 2017-02-18
Tags: ["hololens"]
---

HololensのInputManagerの動きを読んでみた

HoloToolkit.Unity.InputModule.InputManager
Assets/HoloToolkit/Input/Prefabs/InputManagerプレハブから見る。
InputManager
  + (GazeManager)
  + (GazeStablilizer)
  + (InputManager)
  + (StabilizationPlaneModifier)

  GesturesInput# BaseInputSource(UnityEngine.VR.WSA.Input.GestureRecognizerを通じてジェスチャーを取得する)
  RawInteractionSourcesInput# BaseInputSource(UnityEngine.VR.WSA.Input.InteractionSourceを通じて手の検出・位置・ロストなどのイベントを検知する)
  EditorHandsInput# BaseInputSource(Editor向けに手イベントを偽装する)

こんな感じに親子関係があって結構たくさんスクリプトがアタッチされている。
主要な部分だけに減らすと以下の3つのスクリプトになる。
InputManager
  + (GazeManager)
  + (InputManager)
  GesturesInput# BaseInputSource(UnityEngine.VR.WSA.Input.GestureRecognizerを通じてジェスチャーを取得する)

この３つのスクリプトは下記のように連携する。
GazeManager -> raycast -> hitObject
                                  |
                                  v
GesturesInput -> event -> InputManager -> hitObjectのeventハンドラを実行する

UnityのEventSystemとの連携
通常のUnityのEventは、EventSystemがアタッチされたInputModule(StandardInputModule)のProcess関数をコールすることで始まる。
HoloToolkitのInputManagerは、GestureRecognizer等からのイベントを即座にUnityのEventに変換して発行していた。
ShouldSendUnityUiEventsでInputManager.csを検索すると以下がヒットする。
HoloToolkit-Unity\Assets\HoloToolkit\Input\Scripts\InputManager.cs(308)
HoloToolkit-Unity\Assets\HoloToolkit\Input\Scripts\InputManager.cs(317)
HoloToolkit-Unity\Assets\HoloToolkit\Input\Scripts\InputManager.cs(340)
HoloToolkit-Unity\Assets\HoloToolkit\Input\Scripts\InputManager.cs(363)
HoloToolkit-Unity\Assets\HoloToolkit\Input\Scripts\InputManager.cs(386)

コードを見てみると
// hololensのevent
ExecuteEvents.ExecuteHierarchy(newObject, null, OnFocusEnterEventHandler);
if (ShouldSendUnityUiEvents)
{
    // unity仕様に変換して実行
    ExecuteEvents.ExecuteHierarchy(newObject
        , GazeManager.Instance.UnityUIPointerEvent, ExecuteEvents.pointerEnterHandler);
}

という風になっていて、以下の5種類のイベント転送を実装していた。

IPointerClickHandler
IPointerDownHandler
IPointerEnterHandler
IPointerExitHandler
IPointerUpHandler

これだとButton等のクリックイベントを処理するタイプのものは動く。
DragとかScrollイベントは別途イベント転送してやる必要がありそう。
なるほど。
