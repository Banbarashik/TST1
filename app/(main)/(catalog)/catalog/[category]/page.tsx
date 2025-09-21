import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import Link from "next/link";
import type { Metadata } from "next";

import { sortProducts } from "@/lib/utils";
import { findCategoryBySlug } from "@/lib/categoryBySlug";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";
import SortControls from "@/components/catalog/SortControls";
import { comparatorFor, parseSortParam } from "@/lib/sort";

const PRODUCTS_PER_PAGE = 21;

const defaultCategory = {
  title: "Воздушно-отопительное оборудование",
  slug: "all",
  metadata: {
    title: "Каталог воздушно-отопительного оборудования",
    description:
      "Каталог воздушно-отопительного оборудования производства ООО Т.С.Т. Цена водяных и паровых калориферов, отопительных агрегатов, электронагревательных установок",
    keywords:
      "каталог воздушно-отопительного оборудования,каталог оборудования для воздушного отопления,водяное оборудование для воздушного отопления,паровое оборудование для воздушного отопления,электрическое оборудование для воздушного отопления",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  if (slug === "all") return defaultCategory.metadata;

  const category = findCategoryBySlug(slug, categoryTree);
  if (!category) return { title: "Товары отсутствуют" };

  return category.metadata;
}

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

  const sortParam = parseSortParam(query?.sort); // ⟵ сначала определяем сортировку

  // 1) фильтрация по категории
  const filteredProducts =
    slug === "all"
      ? productData
      : productData.filter((p) => p.categories?.includes(slug));

  let ordered: typeof filteredProducts;

  if (sortParam === "default") {
    // 2A) ТОЛЬКО для "По умолчанию" — группируем по последней категории
    const groups: Record<string, typeof filteredProducts> = {};
    for (const product of filteredProducts) {
      const cats = product.categories ?? ["unknown"];
      const key = cats.length ? cats[cats.length - 1] : "unknown";
      (groups[key] ??= []).push(product);
    }
    const sortedGroups = Object.values(groups).map((g) =>
      g.sort((a, b) => sortProducts(a.name, b.name)),
    );
    ordered = sortedGroups.flat();
  } else {
    // 2B) Для ЛЮБОЙ другой сортировки — БЕЗ группировки
    ordered = [...filteredProducts];
  }

  // после блока, где получаешь ordered (с группировкой только для default)
  const cmp = comparatorFor(sortParam);
  if (cmp) {
    // важно: не мутировать исходный массив, особенно если productData используется ещё где-то
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
      <div className="flex w-full items-center justify-center text-3xl">
        Нет товаров в данной категории
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
    <div className="lg:w-full xl:w-auto">
      <div className="flex flex-col justify-between md:flex-row lg:gap-4">
        <h1 className="mb-6 text-xl font-bold uppercase lg:text-2xl">
          {title}
        </h1>
        <SortControls />
      </div>

      {/* Контрол сортировки */}

      {/* Сетка товаров */}
      <div className="mb-20 grid gap-5 sm:grid-cols-3 lg:grid-cols-2">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Пагинация — сохраняем sort в href */}
      {totalPages > 1 && (
        <div className="flex flex-wrap gap-4">
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
      )}
    </div>
  );
}
