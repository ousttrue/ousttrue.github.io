export type ItemType = {
  name: string;
  url: string;
  icon: string;
};

const items: ItemType[] = [
  {
    name: "MesonBook(docusaurus)",
    url: "https://ousttrue.github.io/meson_book/",
    icon: "🔗",
  },
  {
    name: "CmakeBook(docusaurus)",
    url: "https://ousttrue.github.io/cmake_book/",
    icon: "🔗",
  },
  {
    name: "BlenderBook(docusaurus)",
    url: "https://ousttrue.github.io/blender_book/",
    icon: "🔗",
  },
  {
    name: "NvimNote(vitepress)",
    url: "https://ousttrue.github.io/my_nvim/",
    icon: "🔗",
  },
  {
    name: "Three.js練習(ladle + r3f)",
    url: "https://ousttrue.github.io/threets/",
    icon: "🔗",
  },
  {
    name: "地図練習(ladle + maplibre)",
    url: "https://ousttrue.github.io/map_sample/",
    icon: "🔗",
  },
  { name: "w3mノート", url: "https://ousttrue.github.io/w3m/", icon: "🔗" },
]

const zig_items: ItemType[] = [
  {
    name: "zig note 2",
    url: "https://ousttrue.github.io/zig_note/",
    icon: "🔗",
  },
  { name: "kilo", url: "https://ousttrue.github.io/kilo/", icon: "🔗" },
  { name: "zig_uv", url: "https://github.com/ousttrue/zig_uv", icon: "🔗" },
]

const zig_sokol: ItemType[] = [
  { name: "rowmath", url: "https://ousttrue.github.io/rowmath/", icon: "🔗" },
  {
    name: "emsdk-zig",
    url: "https://github.com/ousttrue/emsdk-zig",
    icon: "🔗",
  },
  {
    name: "zig-sokol-sample",
    url: "https://ousttrue.github.io/zig-sokol-sample/",
    icon: "🔗",
  },
  {
    name: "ゆれもの",
    url: "https://ousttrue.github.io/yuremono/",
    icon: "🔗",
  },
  {
    name: "learnopengl-examples(zig)",
    url: "https://ousttrue.github.io/learnopengl-examples/",
    icon: "🔗",
  },
  {
    name: "ozz-animation",
    url: "https://ousttrue.github.io/ozz-animation/",
    icon: "🔗",
  },
  {
    name: "zigltf",
    url: "https://ousttrue.github.io/zigltf/",
    icon: "🔗",
  },
]

const vrmeditor: ItemType[] = [
  { name: "grapho", url: "https://ousttrue.github.io/grapho/", icon: "🔗" },
  { name: "cuber", url: "https://ousttrue.github.io/cuber/", icon: "🔗" },
  {
    name: "VrmEditor",
    url: "https://ousttrue.github.io/VrmEditor/",
    icon: "🔗",
  },
]

const openvr: ItemType[] = [
  { name: "VRExperiment", url: "https://github.com/ousttrue/VRExperiment", icon: "🔗" },
  { name: "ExtraTracker", url: "https://github.com/ousttrue/ExtraTracker", icon: "🔗" },
]

export const DATA: { [name: string]: ItemType[] } = {
  items: items,
  zig_items: zig_items,
  zig_sokol: zig_sokol,
  vrmeditor: vrmeditor,
  openvr: openvr,
};
