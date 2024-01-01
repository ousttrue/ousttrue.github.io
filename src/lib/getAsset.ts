import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';


const typeMap: { [key: string]: string } = {
  '.jpg': 'image/jpeg',
};


export async function getAsset(slug: string): Promise<{ buffer: Buffer, contentType: string }> {
  console.log("getAsset", slug);
  const buffer = await fs.readFile(`posts/${slug}`);
  return {
    buffer,
    contentType: typeMap[path.extname(slug).toLowerCase()] ?? 'application/octet-stream',
  };
}

export function getAssetSync(slug: string): { buffer: Buffer, contentType: string } {
  console.log("getAssetSync", slug);
  const buffer = fsSync.readFileSync(`posts/${slug}`);
  return {
    buffer,
    contentType: typeMap[path.extname(slug).toLowerCase()] ?? 'application/octet-stream',
  };
}
