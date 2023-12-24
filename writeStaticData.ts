import { getDynamicPosts } from './src/pages/posts/getDynamicPosts.js';


export async function writeStaticData(dst: string) {
  const fs = await import('node:fs/promises');
  const posts = await getDynamicPosts();

  fs.writeFile(dst, `
import React from 'react';

export function getStaticPosts() {
  return ${JSON.stringify(posts, null, 2)}
}

// workadound for minista
export default function Dummy(){ return <></> }
`);
}

writeStaticData('src/pages/posts/getStaticPosts.tsx');
