import { getPosts, getContent } from '$lib/getPosts';
import type { PostType } from '$lib/getPosts';


// @ts-ignore
export async function load({ params }) {
  const posts: PostType[] = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return {};
  }

  return {
    post: Object.assign(post, { content: await getContent(post.slug) })
  };
}
