import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findCategoryBySlug(slug: string, nodes) {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children) {
      const found = findCategoryBySlug(slug, node.children);
      if (found) return found;
    }
  }
  return null;
}
