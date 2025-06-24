import { products } from "@/data/products";
import { categoryTree } from "@/data/categories";

import Image from "next/image";
import Link from "next/link";

// const categories = ["all", "kalorifer", "vodyanoy kalorifer"];

export default async function Catalog({
  params,
}: {
  params: { category: string };
}) {
  const { category: categorySlug } = await params;

  const filteredProducts =
    categorySlug === "all"
      ? products
      : products.filter((product) => product.categories.includes(categorySlug));

  console.log(filteredProducts);

  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="rounded-lg border p-4 transition hover:shadow-md">
              <Image
                src={product.img}
                alt={product.name}
                width={300}
                height={200}
                className="mb-2 h-48 w-full object-cover"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
