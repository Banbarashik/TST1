// app/(...)/[category]/page.tsx  (твой файл)
import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";
import Link from "next/link";

import { sortProducts } from "@/lib/utils";
import { findCategoryBySlug } from "@/lib/categoryBySlug";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";
import SortControls from "@/components/catalog/SortControls"; // ⟵ новое
import { comparatorFor, parseSortParam } from "@/lib/sort"; // ⟵ новое

const defaultCategory = { title: "Вся продукция", slug: "all" };
const PRODUCTS_PER_PAGE = 21;

export default async function Catalog({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { page?: string; sort?: string };
}) {
  const query = await searchParams;
  const { category: slug } = await params;
  const { title } = findCategoryBySlug(slug, categoryTree) ?? defaultCategory;

  // 1) фильтруем по категории
  let filteredProducts =
    slug === "all"
      ? productData
      : productData.filter((p) => p.categories?.includes(slug));

  // 2) "дефолтный" порядок: группировка по последней категории + сортировка внутри по имени
  // (оставляем, как у тебя сейчас)
  const categoryGroups: Record<string, typeof productData> = {};
  for (const product of filteredProducts) {
    const categoriesArr = product.categories ?? ["unknown"];
    const key =
      categoriesArr.length > 0
        ? categoriesArr[categoriesArr.length - 1]
        : "unknown";
    if (!categoryGroups[key]) categoryGroups[key] = [];
    categoryGroups[key].push(product);
  }
  const sortedGroups = Object.values(categoryGroups).map((group) =>
    group.sort((a, b) => sortProducts(a.name, b.name)),
  );
  let ordered = sortedGroups.flat();

  // 3) Если в query выбран sort ≠ default — применяем глобальную сортировку
  const sortParam = parseSortParam(query?.sort);
  const cmp = comparatorFor(sortParam);
  if (cmp) {
    ordered = [...ordered].sort(cmp);
  }

  // 4) пагинация
  const page = Number(query?.page) || 1;
  const totalPages = Math.ceil(ordered.length / PRODUCTS_PER_PAGE);
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = ordered.slice(
    startIdx,
    startIdx + PRODUCTS_PER_PAGE,
  );

  if (ordered.length === 0)
    return (
      <div className="flex w-full items-center justify-center text-xl">
        Нет товаров в данной категории.
      </div>
    );

  // helper чтобы сохранять sort в ссылках пагинации
  const makePageHref = (i: number) => {
    const params = new URLSearchParams();
    params.set("page", String(i));
    if (sortParam !== "default") params.set("sort", sortParam);
    return `?${params.toString()}`;
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{title}</h1>

      {/* Контрол сортировки */}
      <SortControls />

      {/* Сетка товаров */}
      <div className="mb-20 grid grid-cols-3 gap-5">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Пагинация — сохраняем sort в href */}
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
            <Link href={makePageHref(i + 1)}>{i + 1}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
