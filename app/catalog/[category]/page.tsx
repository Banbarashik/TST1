import { products } from "@/data/products";
import { categoryTree } from "@/data/categories";

import Image from "next/image";
import Link from "next/link";

import { findCategoryBySlug } from "@/lib/utils";

const defaultCategory = { slug: "all" };

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

  if (filteredProducts.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров в данной категории.
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{categoryTitle}</h1>
      <div className="mb-20 grid grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="rounded-lg border p-4 transition hover:shadow-md">
              <Image
                src={product.img}
                alt={product.name}
                width={300}
                height={300}
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
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
