import { defineCollection, z } from "astro:content";

const article = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string().max(60),
    }),
});

export const collections = { article };
