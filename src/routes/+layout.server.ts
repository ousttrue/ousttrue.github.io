import type { PageServerLoad } from './$types';
import { getCategories } from '$lib/getCategories';
import type { StaticDataType } from "$lib/StaticDataType";


export const load: PageServerLoad = async ({ params }) => {
  return {
    categories: await getCategories(),
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
