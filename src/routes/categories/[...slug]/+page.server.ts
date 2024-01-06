import type { PageServerLoad } from './$types';
import type { PostType } from "$lib";
import { getCategories } from "$lib/getCategories";
import { getPosts } from "$lib/getPosts";


export const load: PageServerLoad = async ({ params }) => {
  const allPosts = await getPosts();
  const tree = await getCategories();
  const select = tree.find(x => x.slug == params.slug);
  const sp = params.slug.split("/");

  const posts: PostType[] = allPosts.posts.filter((post) => {
    if (post.tags && post.tags.includes(sp[sp.length - 1])) {
      return true;
    }
  });
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return { tree, select, posts };
}

