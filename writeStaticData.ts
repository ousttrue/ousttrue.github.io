import { getDynamicPosts } from './getPosts.js';


export async function writeStaticData(dst: string) {
  const fs = await import('node:fs/promises');
  const data = await getDynamicPosts();
  // console.log(JSON.stringify(data, null, 2));

  fs.writeFile(dst, `

export function getPosts() {
  return ${JSON.stringify(data, null, 2)}
}

// workadound for minista
export default function Dummy(){ return <></> }
`);
}

writeStaticData('src/pages/posts.ts');
