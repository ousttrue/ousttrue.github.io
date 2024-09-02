import { type MarkdownData } from '../../../mymd-vite-plugin';

export default function({ posts }: { posts: { [key: string]: MarkdownData } }) {
  return (
    <ul>
      {
        Object.entries(posts).toSorted((a, b) => a < b ? 1 : -1).map(([key, post]) => (<li key={key}>
          <span>{`${post.frontmatter.date}`}</span>
          <a href={key}>
            {post.frontmatter.title}
          </a>
        </li>))
      }
    </ul>
  )
}

