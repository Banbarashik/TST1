import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import { findCategoryBySlug } from "@/lib/categoryBySlug";

export function resolveSlug(slug: string) {
  const category = findCategoryBySlug(slug, categoryTree);
  if (category) return { type: "category", data: category };

  const product = productData.find((product) => product.id === slug);
  if (product) return { type: "product", data: product };

  return null;
}
