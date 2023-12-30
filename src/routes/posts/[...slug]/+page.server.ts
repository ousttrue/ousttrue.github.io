import { getPosts } from '$lib/getPosts';


// @ts-ignore
export async function load({ params }) {
  const { posts } = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);
  return post;
}
