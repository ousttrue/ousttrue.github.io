import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/getPosts';


export const load: PageServerLoad = async ({ params }) => {
  const { posts } = await getPosts();
  const found = posts.find((post) => post.slug === params.slug);
  if (!found) {
    console.log(posts.map(x => x.slug), params);
  }
  return found;
}
