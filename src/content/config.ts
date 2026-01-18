import { z, defineCollection } from 'astro:content';

const toolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().optional(), // Optional as slug acts as ID in new system
    name: z.string(),
    description: z.string(),
    shortDescription: z.string().optional(),
    categoryId: z.string(),
    tier: z.number().default(1),
    icon: z.string(),
    keywords: z.array(z.string()),
    featured: z.boolean().default(false),
    instructions: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'tools': toolsCollection,
};
