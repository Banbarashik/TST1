import { products } from "@/data/products";
import { categoryTree } from "@/data/categories";

import { sortCyrillicAlphabetically, findCategoryBySlug } from "@/lib/utils";

import ProductCard from "@/components/catalog/productCard";

const defaultCategory = { title: "Вся продукция", slug: "all" };

export default async function Catalog({
  params,
}: {
  params: { category: string };
}) {
  const { category: categorySlug } = await params;

  const { title: categoryTitle, description: categoryDescription } =
    findCategoryBySlug(categorySlug, categoryTree) ?? defaultCategory;

  const filteredProducts =
    categorySlug === "all"
      ? products
      : products.filter((product) => product.categories.includes(categorySlug));

  const sortedProducts = filteredProducts.sort((a, b) =>
    sortCyrillicAlphabetically(a.name, b.name),
  );

  if (sortedProducts.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров в данной категории.
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{categoryTitle}</h1>
      <div className="mb-20 grid grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>
        {categoryDescription?.map((desc) => (
          <p key={desc} className="text-lg">
            {desc}
          </p>
        ))}
      </div>
    </div>
  );
}
