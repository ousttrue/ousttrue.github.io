import type { CategoryType } from "$lib/CategoryType";
import type { QuadData } from "$lib/QuadData";

export type StaticDataType = {
  categories: CategoryType[];
  current?: CategoryType;
  quads: QuadData[];
};