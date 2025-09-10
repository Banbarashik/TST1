import { productData } from "@/data/products";

import { Product, ProductVariant, SupplyCalorifier, KSKProduct } from "@/types";

export function findProductOrVariantById(
  id: string,
  products?:
    | Product
    | ProductVariant
    | SupplyCalorifier
    | KSKProduct = productData,
) {
  for (const product of products) {
    if (product.id === id) return product;
    if (product.variants) {
      const variant = product.variants.find((v) => v.id === id);
      if (variant) return variant;
    }
  }
  return null;
}
