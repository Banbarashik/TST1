import { SelectedProduct } from "@/types";

import { findProductOrVariantById } from "@/lib/findProductOrVariantById";

/**
 * Calculates the total price for an array of selected products.
 * @param selected Array of { id, amount }
 * @param productList Optional: array of all products (defaults to imported products)
 * @returns total price as a number
 */

export function getTotalPrice(selected: SelectedProduct[]): number {
  return selected.reduce((sum, sel) => {
    const product = findProductOrVariantById(sel.id);
    if (!product) return sum;
    return sum + product.price * sel.amount;
  }, 0);
}
