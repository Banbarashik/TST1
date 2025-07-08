import { productData } from "@/data/products";

import { sortProducts } from "@/lib/utils";

import ProductCard from "@/components/catalog/productCard";

export default function Catalog() {
  const sortedProducts = productData.sort((a, b) =>
    sortProducts(a.name, b.name),
  );

  if (sortedProducts.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров.
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">Вся продукция</h1>
      <div className="mb-20 grid grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
