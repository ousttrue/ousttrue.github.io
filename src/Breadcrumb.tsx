import path from "node:path";

export default function Breadcrumb({ url }: { url: string }) {
  const list: string[] = [];
  let current = path.dirname(url);
  while (current != "/") {
    list.unshift(current);
    current = path.dirname(current);
  }
  return (
    <>
      <div className="breadcrumb">
        <ul>
          {list.map((key) => (
            <li key={key}>
              <a href={key + "/index.html"}>{path.basename(key)}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
