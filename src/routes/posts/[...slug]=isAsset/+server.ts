// import { getPosts, getAsset } from '$lib/getPosts';
import path from 'node:path';


export async function GET({ params }) {
  const ext = path.extname(params.slug).toLowerCase();
  switch (ext) {
    case '.jpg':
      {
        // { slug: '2021/table.jpg' }
        const buffer = await import(`posts/${params.slug}`);
        const response = new Response(buffer);
        response.headers.set('Content-Type', 'image/jpeg');
        // response.headers.set('Content-Length', buffer.length);
        return response;
      }
  }
}
