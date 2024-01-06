import type { PageServerLoad } from './$types';
import type { StaticDataType } from '$lib/StaticDataType.d.ts';
import { getCategories } from '$lib/getCategories';


export const load: PageServerLoad = async ({ params }) => {

  const data: StaticDataType = {
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
  };

  return data;
}
