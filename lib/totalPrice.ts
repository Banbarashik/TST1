import { productData } from "@/data/products";

import { SelectedProduct } from "@/types";

/**
 * Calculates the total price for an array of selected products.
 * @param selected Array of { id, amount }
 * @param productList Optional: array of all products (defaults to imported products)
 * @returns total price as a number
 */

function findProductOrVariantById(products, id: string) {
  for (const product of products) {
    if (product.id === id) return product;
    if (product.variants) {
      const variant = product.variants.find((v) => v.id === id);
      if (variant) return variant;
    }
  }
  return null;
}

export function getTotalPrice(
  selected: SelectedProduct[],
  productList = productData,
): number {
  return selected.reduce((sum, sel) => {
    const product = findProductOrVariantById(productList, sel.id);
    if (!product) return sum;
    return sum + product.price * sel.amount;
  }, 0);
}
