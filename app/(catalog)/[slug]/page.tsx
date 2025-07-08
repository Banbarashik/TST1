import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import { notFound } from "next/navigation";

import { resolveSlug } from "@/lib/resolveSlug";
import { findCategoryBySlug } from "@/lib/categoryBySlug";
import { sortProducts } from "@/lib/utils";

import ProductCard from "@/components/catalog/productCard";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const resolved = resolveSlug(slug);
  console.log(resolved);

  if (!resolved) return notFound();

  if (resolved.type === "category") {
    const category = resolved.data;
    if (!category) return <p>Категория не найдена.</p>;

    const { title, description } = category;

    const filteredProducts = productData.filter((product) =>
      product.categories?.includes(slug),
    );

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
        <div>
          {description?.map((desc) => (
            <p key={desc} className="text-lg">
              {desc}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
