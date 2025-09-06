import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import Link from "next/link";

import { sortProducts } from "@/lib/utils";
import { findCategoryBySlug } from "@/lib/categoryBySlug";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";

const defaultCategory = {
  title: "Вся продукция",
  slug: "all",
};

const PRODUCTS_PER_PAGE = 21;

export default async function Catalog({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { page?: string };
}) {
  const query = await searchParams;
  const { category: slug } = await params;
  const { title } = findCategoryBySlug(slug, categoryTree) ?? defaultCategory;

  let filteredProducts =
    slug === "all"
      ? productData
      : productData.filter((product) => product.categories?.includes(slug));

  if (slug === "all") {
    // 1. Group by series
    const seriesGroups: Record<string, typeof productData> = {};
    for (const product of productData) {
      const key = product.series ?? "unknown";
      if (!seriesGroups[key]) seriesGroups[key] = [];
      seriesGroups[key].push(product);
    }

    // 2. Sort each group by airPower
    const sortedGroups = Object.values(seriesGroups).map((group) =>
      group.sort((a, b) => sortProducts(a.name, b.name)),
    );

    // 3. Flatten the 2D array
    filteredProducts = sortedGroups.flat();
  }

  const page = Number(query?.page) || 1;
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + PRODUCTS_PER_PAGE,
  );

  if (filteredProducts.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров в данной категории.
      </div>
    );

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{title}</h1>
      <div className="mb-20 grid grid-cols-3 gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mb-10 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            asChild
            key={i + 1}
            variant="outline"
            size="icon"
            className={
              page === i + 1
                ? "bg-primary text-white hover:text-white"
                : "bg-white"
            }
          >
            <Link href={`?page=${i + 1}`}>{i + 1}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
