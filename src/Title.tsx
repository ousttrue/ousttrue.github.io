import { type Frontmatter } from '../mymd-vite-plugin';
import DateFormat from './DateFormat';

export function Tag({ tag }: { tag: string }) {
  return <a className="button" href={`/tags/${tag}`}>{tag}</a>
}

export default function Title({ path, frontmatter }: { path: string, frontmatter: Frontmatter }) {
  return (<header className="title">
    <h1><a href={path}>
      {frontmatter.title}
    </a></h1>
    <DateFormat date={frontmatter.date} />
    {frontmatter.tags ? frontmatter.tags.map((tag, i) => <Tag key={i} tag={tag} />) : ''}
  </header>);
}
