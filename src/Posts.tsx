import { SORTED_POSTS } from './pages';
import Title from './Title';
import type { Frontmatter, MarkdownData } from '../mymd-vite-plugin.ts';

type Props = {
  tag?: string,
};

function filter(key: string, post: MarkdownData, props: Props): boolean {
  if (props.tag) {
    if (post.frontmatter.tags) {
      for (const tag of post.frontmatter.tags) {
        if (tag == props.tag) {
          return true;
        }
      }
    }
    return false;
  }

  return true;
}

export default function(props: Props) {
  return (
    <>
      {SORTED_POSTS.filter(
        ([key, post]) => filter(key, post, props)
      ).map(
        ([key, post]) => <Title key={key} path={key} frontmatter={post.frontmatter} />
      )}
    </>
  )
}
