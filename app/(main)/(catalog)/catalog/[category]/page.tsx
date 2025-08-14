import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import { sortProducts } from "@/lib/utils";
import { findCategoryBySlug } from "@/lib/categoryBySlug";

import ProductCard from "@/components/catalog/productCard";

const defaultCategory = {
  title: "Вся продукция",
  slug: "all",
};

export default async function Catalog({
  params,
}: {
  params: { category: string };
}) {
  const { category: slug } = await params;

  const { title } = findCategoryBySlug(slug, categoryTree) ?? defaultCategory;

  const filteredProducts =
    slug === "all"
      ? productData
      : productData.filter((product) => product.categories?.includes(slug));

  const sortedProducts = filteredProducts.sort((a, b) =>
    sortProducts(a.name, b.name),
  );

  if (sortedProducts.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров в данной категории.
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{title}</h1>
      <div className="mb-20 grid grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
