import { z, defineCollection } from 'astro:content';

const toolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().optional(),
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

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    heroDescription: z.string(),
    metrics: z.object({
      primary: z.object({ value: z.string(), label: z.string() }),
      secondary: z.object({ value: z.string(), label: z.string() }),
    }),
    roadmap: z.array(z.object({
      step: z.string(),
      title: z.string(),
      desc: z.string(),
    })).optional(),
  }),
});

export const collections = {
  'tools': toolsCollection,
  'services': servicesCollection,
};
