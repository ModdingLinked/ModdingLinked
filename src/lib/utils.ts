import type { TocItem } from "@/types";
import type { MarkdownHeading } from "astro";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function diveChildren(item: TocItem, depth: number): Array<TocItem> {
  if (depth === 1 || !item.subheadings.length) {
    return item.subheadings;
  } else {
    return diveChildren(
      item.subheadings[item.subheadings.length - 1] as TocItem,
      depth - 1,
    );
  }
}

export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
  const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
  const toc: Array<TocItem> = [];

  bodyHeadings.forEach((h) => {
    const heading: TocItem = { ...h, subheadings: [] };

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      const lastItemInToc = toc[toc.length - 1]!;
      if (heading.depth < lastItemInToc.depth) {
        throw new Error(`Orphan heading found: ${heading.text}.`);
      }

      const gap = heading.depth - lastItemInToc.depth;
      const target = diveChildren(lastItemInToc, gap);
      target.push(heading);
    }
  });
  return toc;
}
