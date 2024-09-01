export default function(props) {
  console.log(props);
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

