import type { PageServerLoad, RouteParams } from './$types';
import type { PostType } from "$lib";
import { getCategories } from "$lib/getCategories";
import { getPosts } from "$lib/getPosts";
import { renderMarkdown } from "$lib/markdownLinkCard";


export const load: PageServerLoad = async ({ params }: { params: RouteParams }) => {
  const allPosts = await getPosts();
  const categories = await getCategories();
  const select = categories.find(x => x.slug == params.slug);
  if (!select) {
    throw new Error(`no category: ${params.slug}`);
  }
  const sp = params.slug.split("/");

  const posts: PostType[] = allPosts.posts.filter((post) => {
    if (post.tags && post.tags.includes(sp[sp.length - 1])) {
      return true;
    }
  });
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  const data = { tree: categories, select, posts, html: '' };
  if (select.body) {
    const { html } = await renderMarkdown(select.body);
    data.html = html;
  }
  return data;
}
