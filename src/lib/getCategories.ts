import type { CategoryType } from "$lib/CategoryType";
const categoryMap = import.meta.glob("../../categories/**/*.md", { as: 'raw' });


function createCategory(path: string, body: string) {
  const sp = path.split("/");
  sp.shift();
  sp.shift();
  sp.shift();
  // console.log(sp);

  let category: CategoryType;
  if (sp[sp.length - 1] == "index.md") {
    sp.pop();
    return { slug: sp.join("/"), title: sp[sp.length - 1] };
  }
  else {
    const name = sp[sp.length - 1];
    sp[sp.length - 1] = name.substring(0, name.length - 3);
    return { slug: sp.join("/"), title: sp[sp.length - 1] };
  }
}

export async function getCategories(): Promise<CategoryType[]> {
  const categories = [];
  for (const path in categoryMap) {
    const category = createCategory(path, await categoryMap[path]());
    // console.log(category);
    categories.push(category);
  }
  return categories;
}

// @ts-ignore
export const getChildren: (tree: object[], current?: object) => object[] = (
  nodes: CategoryType[], node?: CategoryType) => {
  return nodes.filter((x) => {
    const sp = x.slug.split("/");
    if (node) {
      return x.slug.startsWith(node.slug + "/") && sp.length == node.slug.split("/").length + 1;
    } else {
      return sp.length == 1;
    }
  });
}

// @ts-ignore
export const isSelected: (current: Object, select: Object) => bool = (
  current: CategoryType, select: CategoryType
) => {
  if (select) {
    return select.slug.startsWith(current.slug);
  }
}

