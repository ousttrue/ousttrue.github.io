import { glob } from 'glob';
import { metaDataCache } from './routes/posts/[...slug=isNotAsset]/metaDataCache';

// export type MetaData = {
//   url: string;
//   title: string;
//   description: string;
//   og: string | undefined;
//   icon: string | undefined;
// };
//
// export const metaDataMap: { [key: string]: MetaData } = {
//   "url": {
//     "url": "url",
//     "title": "(No title)",
//     "description": "",
//     "og": undefined,
//     "icon": undefined
//   }
// }
import fetchSiteMetadata from "fetch-site-metadata";
// function fetchMeta(url: string) {
//   const metas = fetchSiteMetadata(url).then((data) => {
//     const metaData = {
//       url: url,
//       title: data.title ?? "(No title)",
//       description: data.description ?? "",
//       og: data.image?.src?.startsWith("https") ? data.image?.src : undefined,
//       icon: data.icon?.startsWith("https") ? data.icon : undefined,
//     };
//     return metaData;
//   });
//   return metas;
// }

function getExtLinks(mdPath: string): string[] {
  return [];
}

for (const f of glob.globSync('posts/**/*.md')) {
  const cache = metaDataCache[f];
  if (cache) {
  }
  else {
    const links = getExtLinks(f);
    if (links.length > 0) {
      console.log(`${f} => ${links}`);
    }
  }
}

