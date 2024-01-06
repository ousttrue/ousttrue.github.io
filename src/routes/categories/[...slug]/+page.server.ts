import type { PageServerLoad } from './$types';
import { getCategories } from "$lib/getCategories";


export const load: PageServerLoad = async ({ params }) => {
  const tree = await getCategories();
  const select = tree.find(x => x.slug == params.slug);

  return { tree, select };
}

