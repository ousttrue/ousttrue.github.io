import { getPosts } from '$lib/getPosts';

// @ts-ignore
export async function load({ params }) {
  const { posts } = await getPosts();

  return Object.assign(params, {
    posts: posts.filter(x =>
      x.tags && x.tags.includes(params.tag))
  })
}
