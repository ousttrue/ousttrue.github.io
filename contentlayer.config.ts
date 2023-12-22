// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: false },
    previewimage: { type: 'string', required: false },
    draft: { type: 'boolean', required: false },
    extra: { type: 'json', required: false },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      description: 'タグ',
      required: false,
    },
  },
  computedFields: {
    path: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'src/pages/posts', documentTypes: [Post] })
