import { defineCollection, z } from "astro:content";

const article = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160),
      keywords: z.string().array(),
    }),
});

export const collections = { article };
