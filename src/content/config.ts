import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string().max(100, 'The title length must be less than or equal to 100 chars'),
        description: z.string().optional(),
        tags: z.array(z.string()),
        author: z.string().optional(),
        authorImage: z.string().optional(),
        authorTwitter: z.string().optional(),
        date: z.coerce.date(),
        image: z.string().optional(),
        category: z.string().optional(),
    })
})

export const collections = {
    'blog': blogCollection
}
