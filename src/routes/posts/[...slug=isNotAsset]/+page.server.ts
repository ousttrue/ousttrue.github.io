import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/getPosts';
import { renderMarkdown } from "$lib/markdownLinkCard";


export const load: PageServerLoad = async ({ params }) => {
  const { posts } = await getPosts();
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) {
    console.log(posts.map(x => x.slug), params);
    throw new Error('not post');
  }
  if (!post.body) {
    throw new Error('not post.body');
  }

  const { html, toc } = await renderMarkdown(post.body);
  post.html = html;
  post.toc = toc;

  return post;
}
