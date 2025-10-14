import productData from "@/data/products.json";
import { categoryTree } from "@/data/categories";

import type { Metadata } from "next";

import { parseSortParam } from "@/lib/sort";
import { findCategoryBySlug } from "@/lib/categoryBySlug";

import SortControls from "@/components/catalog/SortControls";
import SearchableCatalog from "@/components/catalog/SearchableCatalog";

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
  searchParams?: { page?: string; sort?: string; q?: string };
}) {
  const query = await searchParams;
  const { category: slug } = await params;
  const { title } = findCategoryBySlug(slug, categoryTree) ?? defaultCategory;

  const sortParam = parseSortParam(query?.sort); // ⟵ сначала определяем сортировку
  const qParam = query?.q?.trim() ?? "";

  // 1) фильтрация по категории (search handled client-side for live updates)
  const filteredProducts =
    slug === "all"
      ? productData
      : productData.filter((p) => p.categories?.includes(slug));

  return (
    <div className="lg:w-full xl:w-auto">
      <h1 className="mb-6 text-xl font-bold uppercase lg:text-2xl">{title}</h1>

      {/* Client-side searchable catalog: updates as you type */}
      <SearchableCatalog
        initialProducts={filteredProducts}
        sort={sortParam}
        initialQ={qParam}
        page={Number(query?.page) || 1}
        productsPerPage={PRODUCTS_PER_PAGE}
      />
    </div>
  );
}
