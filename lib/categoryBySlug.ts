import type { Category } from "@/types";

export function findCategoryBySlug(
  slug: string,
  nodes: Category[],
): Category | null {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children) {
      const found = findCategoryBySlug(slug, node.children);
      if (found) return found;
    }
  }
  return null;
}
