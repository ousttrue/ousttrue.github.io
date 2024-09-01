import { Posts } from '../../pages';

export default function() {
  return (
    <ul>
      {
        Object.entries(Posts).map(([key, post]) => (<li key={key}>
          <a href={key}>
            {post.frontmatter.title}
          </a>
        </li>))
      }
    </ul>
  )
}

