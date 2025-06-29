import { products } from "@/data/products";
import type { SelectedProduct } from "@/context/ProductSelectionContext";

/**
 * Calculates the total price for an array of selected products.
 * @param selected Array of { id, amount }
 * @param productList Optional: array of all products (defaults to imported products)
 * @returns total price as a number
 */
export function getTotalPrice(
  selected: SelectedProduct[],
  productList = products,
): number {
  return selected.reduce((sum, sel) => {
    const product = productList.find((p) => p.id === sel.id);
    if (!product) return sum;
    return sum + product.price * sel.amount;
  }, 0);
}
