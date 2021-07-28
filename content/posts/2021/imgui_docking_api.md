+++
title = "ImGui の API"
date = 2021-07-28
taxonomies.tags = ["imgui"]
[extra]
image = 'dockbuilder.jpg'
+++

ようやく `FFI` の整備ができたので、ImGui の API 調査に進む

## DockingBuilder

`imgui_internal.h` に一連の `Docking` 向けの API がある。

```c++
    // Docking - Builder function needs to be generally called before the node is used/submitted.
    // - The DockBuilderXXX functions are designed to _eventually_ become a public API, but it is too early to expose it and guarantee stability.
    // - Do not hold on ImGuiDockNode* pointers! They may be invalidated by any split/merge/remove operation and every frame.
    // - To create a DockSpace() node, make sure to set the ImGuiDockNodeFlags_DockSpace flag when calling DockBuilderAddNode().
    //   You can create dockspace nodes (attached to a window) _or_ floating nodes (carry its own window) with this API.
    // - DockBuilderSplitNode() create 2 child nodes within 1 node. The initial node becomes a parent node.
    // - If you intend to split the node immediately after creation using DockBuilderSplitNode(), make sure
    //   to call DockBuilderSetNodeSize() beforehand. If you don't, the resulting split sizes may not be reliable.
    // - Call DockBuilderFinish() after you are done.
    IMGUI_API void          DockBuilderDockWindow(const char* window_name, ImGuiID node_id);
    IMGUI_API ImGuiDockNode*DockBuilderGetNode(ImGuiID node_id);
    inline ImGuiDockNode*   DockBuilderGetCentralNode(ImGuiID node_id)              { ImGuiDockNode* node = DockBuilderGetNode(node_id); if (!node) return NULL; return DockNodeGetRootNode(node)->CentralNode; }
    IMGUI_API ImGuiID       DockBuilderAddNode(ImGuiID node_id = 0, ImGuiDockNodeFlags flags = 0);
    IMGUI_API void          DockBuilderRemoveNode(ImGuiID node_id);                 // Remove node and all its child, undock all windows
    IMGUI_API void          DockBuilderRemoveNodeDockedWindows(ImGuiID node_id, bool clear_settings_refs = true);
    IMGUI_API void          DockBuilderRemoveNodeChildNodes(ImGuiID node_id);       // Remove all split/hierarchy. All remaining docked windows will be re-docked to the remaining root node (node_id).
    IMGUI_API void          DockBuilderSetNodePos(ImGuiID node_id, ImVec2 pos);
    IMGUI_API void          DockBuilderSetNodeSize(ImGuiID node_id, ImVec2 size);
    IMGUI_API ImGuiID       DockBuilderSplitNode(ImGuiID node_id, ImGuiDir split_dir, float size_ratio_for_node_at_dir, ImGuiID* out_id_at_dir, ImGuiID* out_id_at_opposite_dir); // Create 2 child nodes in this parent node.
    IMGUI_API void          DockBuilderCopyDockSpace(ImGuiID src_dockspace_id, ImGuiID dst_dockspace_id, ImVector<const char*>* in_window_remap_pairs);
    IMGUI_API void          DockBuilderCopyNode(ImGuiID src_node_id, ImGuiID dst_node_id, ImVector<ImGuiID>* out_node_remap_pairs);
    IMGUI_API void          DockBuilderCopyWindowSettings(const char* src_name, const char* dst_name);
    IMGUI_API void          DockBuilderFinish(ImGuiID node_id);
```

* [PossiblyAShrub/dock_builder_example.cpp](https://gist.github.com/PossiblyAShrub/0aea9511b84c34e191eaa90dd7225969)
* <https://github.com/ocornut/imgui/issues/2109>

## Tree

{{ image(path="tree.jpg") }}

## Table
