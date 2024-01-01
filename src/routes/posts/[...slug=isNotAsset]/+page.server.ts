import { getPosts, getAsset } from '$lib/getPosts';
import path from 'node:path';

// @ts-ignore
export async function load({ params }) {
  const ext = path.extname(params.slug).toLowerCase();
  switch (ext) {
    default:
      {
        // { slug: '2021/imgui_docking_api' }
        const { posts } = await getPosts();
        const post = posts.find((post) => post.slug === params.slug);
        return post;
      }
  }
}
