import { getPosts } from '$lib/getPosts';

// @ts-ignore
export async function load({ params }) {
  const { posts } = await getPosts();
  return posts.find((post) => post.slug === params.slug);
}
