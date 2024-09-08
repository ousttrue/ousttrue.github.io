import { TAGS } from '../../pages';

function Tag({ tag }: { tag: string }) {
  return (<a href={`/tags/${tag}`}>{tag}</a>);
}

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
