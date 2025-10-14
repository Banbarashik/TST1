"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Search } from "lucide-react";

import { comparatorFor } from "@/lib/sort";
import { sortProducts } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";
import SortControls from "./SortControls";

type Product = any;

type Props = {
  initialProducts: Product[]; // products already filtered by category (server-side)
  sort?: string;
  initialQ?: string;
  page?: number;
  productsPerPage?: number;
};

// normalize for matching: lower-case and strip everything except letters and digits
const normalizeForSearch = (s: unknown) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[^0-9a-zа-яё]/g, "");

export default function SearchableCatalog({
  initialProducts,
  initialQ = "",
  sort = "default",
  page = 1,
  productsPerPage = 21,
}: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const params = new URLSearchParams(sp.toString());

  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    params.delete("page");
    router.push(`?${params.toString()}`);
  }, [q]);

  const filtered = useMemo(() => {
    const ql = (q ?? "").trim();
    if (!ql) return initialProducts;

    const qNormalized = normalizeForSearch(ql);

    return initialProducts.filter((p) => {
      const name = String(p.name ?? "");
      const nameLower = name.toLowerCase();

      // two checks:
      // 1) plain substring match on lowercased original (works for regular spaced queries)
      // 2) normalized match with all non-alphanumerics removed (handles "Калориферкск", "2-3" vs "23", etc.)
      if (nameLower.includes(ql.toLowerCase())) return true;

      const nameNormalized = normalizeForSearch(name);
      return nameNormalized.includes(qNormalized);
    });
  }, [initialProducts, q]);

  const ordered = useMemo(() => {
    if (sort === "default") {
      // group by last category, then sort each group by name
      const groups: Record<string, Product[]> = {};
      for (const product of filtered) {
        const cats = product.categories ?? ["unknown"];
        const key = cats.length ? cats[cats.length - 1] : "unknown";
        (groups[key] ??= []).push(product);
      }
      const sortedGroups = Object.values(groups).map((g) =>
        g.sort((a, b) => sortProducts(a.name, b.name)),
      );
      return sortedGroups.flat();
    } else {
      const cmp = comparatorFor(sort);
      if (cmp) return [...filtered].sort(cmp);
      return [...filtered];
    }
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(ordered.length / productsPerPage));
  const startIdx = (page - 1) * productsPerPage;
  const paginated = ordered.slice(startIdx, startIdx + productsPerPage);

  // helper чтобы сохранять sort в ссылках пагинации
  const makePageHref = (i: number) => {
    const params = new URLSearchParams();
    params.set("page", String(i));
    if (sort !== "default") params.set("sort", sort);
    return `?${params.toString()}`;
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="relative w-full max-w-80">
          <Input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти товар..."
            aria-label="Поиск по товарам"
          />
          <Search
            width={20}
            height={20}
            color="#9ca3af"
            className="absolute top-1/2 right-2 -translate-y-1/2"
          />
        </div>
        <SortControls className="hidden sm:flex" />
      </div>

      {ordered.length === 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Нет товаров в данной категории
        </div>
      ) : (
        <>
          <div className="mb-20 grid gap-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap gap-4 xl:justify-center xl:gap-2.5">
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
        </>
      )}
    </div>
  );
}
