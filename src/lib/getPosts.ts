import type { PostType, PostsType } from '$lib/postTypes';
import fm from 'front-matter';

const postsMap = import.meta.glob('../../posts/**/*', { as: 'raw' })

export async function getPosts(): Promise<PostsType> {

  const posts: PostType[] = [];
  const tags: { [key: string]: number } = {};

  {
    for (const key in postsMap) {
      if (!key.endsWith('.md')) {
        continue;
      }

      const md = await postsMap[key]();
      const { attributes, body } = fm<PostType>(md);
      // console.log(attributes);
      attributes.slug = key.substring(12, key.length - 3).replace(/\\/g, '/');
      attributes.body = body;

      if (attributes.extra) {
        if (attributes.extra.css == 'gist') {
          if (attributes.tags) {
            attributes.tags.push('gist')
          }
          else {
            attributes.tags = ['gist']
          }
        }
        else if (attributes.extra.css == 'github') {
          if (attributes.tags) {
            attributes.tags[0] = 'github'
          }
          else {
            attributes.tags = ['github']
          }
        }
      }

      if (attributes.tags) {
        attributes.tags = attributes.tags.map((tag) => tag.toLowerCase());
        for (const tag of attributes.tags) {
          if (tag in tags) {
            tags[tag]++;
          }
          else {
            tags[tag] = 1;
          }
        }
      }
      posts.push(attributes);
    }
    posts.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

  }

  const tagItems = Object.keys(tags).map((tag) => ({
    name: tag,
    count: tags[tag],
  }));
  tagItems.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return {
    posts,
    tags: tagItems
  };
}

