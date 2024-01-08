import fm from 'front-matter';
import type { CategoryType } from "$lib/CategoryType";
import type { PostType } from "$lib";
const categoryMap = import.meta.glob("../../categories/**/*.md", { as: 'raw' });
import { getPosts } from "$lib/getPosts";


function createCategory(path: string, attributes: any, body: string, posts: PostType[]) {
  const sp = path.split("/");
  sp.shift();
  sp.shift();
  sp.shift();

  if (sp[sp.length - 1] == "index.md") {
    sp.pop();
  }
  else {
    const name = sp[sp.length - 1];
    sp[sp.length - 1] = name.substring(0, name.length - 3);
  }
  // console.log(sp);
  posts = posts.filter(x => x.tags && x.tags.some(y => sp.includes(y)));
  return {
    slug: sp.join("/"), title: sp[sp.length - 1],
    body,
    attributes,
    posts,
  } satisfies CategoryType;
}

export async function getCategories(): Promise<CategoryType[]> {
  const posts = await getPosts();
  const categories = [];
  for (const path in categoryMap) {
    const md = await categoryMap[path]();
    const { attributes, body } = fm<PostType>(md);
    const category = createCategory(path, attributes, body, posts.posts);
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
  return false;
}

