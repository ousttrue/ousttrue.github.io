import { type Props } from '../../pages';

export default function(props: Props) {
  const { posts } = props;
  return (
    <ul>
      {
        Object.entries(posts).map(([key, post], i) => (<li key={key}>
          <a href={key}>
            {post.title}
          </a>
        </li>))
      }
    </ul>
  )
}

