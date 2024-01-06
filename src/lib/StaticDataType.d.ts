import type { QuadData } from "$lib/QuadData.d.ts";
import type { CategoryType } from './routes/categories/[...slug]/CategoryType.d.ts';


export type StaticDataType = {
  quads: QuadData[];
  categories: CategoryType[];
};
