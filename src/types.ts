import type { MarkdownHeading } from "astro";

export interface GuideCover {
  title: string;
  subtitle: string;
  imgPath: string;
  alt: string;
  href: string;
}

export interface TocItem extends MarkdownHeading {
  subheadings: Array<TocItem>;
}
