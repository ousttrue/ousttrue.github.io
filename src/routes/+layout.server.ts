import type { LayoutServerLoad, LayoutParams } from './$types';
import { getCategories } from '$lib/getCategories';
import type { StaticDataType } from "$lib/StaticDataType";


export const load: LayoutServerLoad = async ({ params }: { params: LayoutParams }) => {
  const categories = await getCategories();
  const current = categories.find((x) => x.slug == params.slug);
  return {
    categories,
    current,
    quads: [
      {
        name: "MesonBook",
        url: "https://ousttrue.github.io/meson_book/",
        icon: "🔗",
      },
      {
        name: "CmakeBook",
        url: "https://ousttrue.github.io/cmake_book/",
        icon: "🔗",
      },
      {
        name: "BlenderBook",
        url: "https://ousttrue.github.io/blender_book/",
        icon: "🔗",
      },
    ],
  } satisfies StaticDataType;
};
