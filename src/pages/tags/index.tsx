import { TAGS } from "../../pages";
import { Tag } from "../../Title.tsx";

export default function(_) {
  return (
    <div className="items">
      {Array.from(TAGS)
        .toSorted()
        .map((tag) => {
          // let date = `${typeof (post.frontmatter.date)}: ${post.frontmatter.date}`;
          return (
            <div className="item" key={tag}>
              <Tag tag={tag} />
            </div>
          );
        })}
    </div>
  );
}
