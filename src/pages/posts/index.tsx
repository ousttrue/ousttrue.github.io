import { SortedPosts } from '../../pages';
import Title from '../../Title';

export default function(_) {
  return (
    <ul>
      {SortedPosts.map(([key, post]) => {
        // let date = `${typeof (post.frontmatter.date)}: ${post.frontmatter.date}`;
        return (<li key={key}>
          <Title path={key} frontmatter={post.frontmatter} />
        </li>);
      })
      }
    </ul>
  )
}
