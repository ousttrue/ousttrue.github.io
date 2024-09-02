import { type Frontmatter } from '../mymd-vite-plugin';
import DateFormat from './DateFormat';

function Tag({ tag }: { tag: string }) {
  return <a className="tag" href={`/posts/tags/${tag}`}>{tag}</a>
}

export default function Title({ path, frontmatter }: { path: string, frontmatter: Frontmatter }) {
  return (<header className="title">
    <DateFormat date={frontmatter.date} />
    <a href={path}>
      {frontmatter.title}
    </a>
    {frontmatter.tags ? frontmatter.tags.map((tag, i) => <Tag key={i} tag={tag} />) : ''}
  </header>);
}
