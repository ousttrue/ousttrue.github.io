import path from 'node:path';

const assetsMap = import.meta.glob('../../../posts/**/*.jpg', { as: 'raw' })

export async function GET({ params }) {
  console.log(params);
  const ext = path.extname(params.slug).toLowerCase();
  switch (ext) {
    case '.jpg':
      {
        // { slug: '2021/table.jpg' }
        const asset = assetsMap[`../../../posts/${params.slug}`];
        const buffer = await asset();
        const response = new Response(buffer);
        response.headers.set('Content-Type', 'image/jpeg');
        // response.headers.set('Content-Length', buffer.length);
        return response;
      }
  }
}
