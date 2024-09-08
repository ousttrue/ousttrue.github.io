import { TAGS } from '../../pages';
import { Tag } from '../../Title.tsx';

export default function(_) {
  return (
    <ul>
      {Array.from(TAGS).toSorted().map((tag) => {
        // let date = `${typeof (post.frontmatter.date)}: ${post.frontmatter.date}`;
        return (<li key={tag}>
          <Tag tag={tag} />
        </li>);
      })
      }
    </ul>
  )
}
