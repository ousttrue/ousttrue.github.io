import { type MarkdownData } from '../../../mymd-vite-plugin';

export default function ({ posts }: { posts: { [key: string]: MarkdownData } }) {
  return (
    <ul>
      {Object.entries(posts).toSorted((a, b) => a[1].frontmatter.date < b[1].frontmatter.date ? 1 : -1).map(([key, post]) => {
        let date = `${typeof (post.frontmatter.date)}: ${post.frontmatter.date}`;
        return (<li key={key}>
          <span>{`${date}`}</span>
          <a href={key}>
            {post.frontmatter.title}
          </a>
        </li>);
      })
      }
    </ul>
  )
}
