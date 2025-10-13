"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";
import { comparatorFor } from "@/lib/sort";
import { sortProducts } from "@/lib/utils";

type Product = any;

type Props = {
  initialProducts: Product[]; // products already filtered by category (server-side)
  initialSort?: string;
  initialQ?: string;
  initialPage?: number;
  productsPerPage?: number;
};

export default function SearchableCatalog({
  initialProducts,
  initialSort = "default",
  initialQ = "",
  initialPage = 1,
  productsPerPage = 21,
}: Props) {
  const [q, setQ] = useState(initialQ);
  const [page, setPage] = useState(initialPage);
  const [sortParam, setSortParam] = useState(initialSort);

  useEffect(() => {
    // reset page to 1 on query change
    setPage(1);
  }, [q, sortParam]);

  const filtered = useMemo(() => {
    const ql = (q ?? "").trim().toLowerCase();
    if (!ql) return initialProducts;
    return initialProducts.filter((p) => {
      const name = String(p.name ?? "").toLowerCase();
      const description = String(p.description ?? "").toLowerCase();
      return name.includes(ql) || description.includes(ql);
    });
  }, [initialProducts, q]);

  const ordered = useMemo(() => {
    if (sortParam === "default") {
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
      const cmp = comparatorFor(sortParam);
      if (cmp) return [...filtered].sort(cmp);
      return [...filtered];
    }
  }, [filtered, sortParam]);

  const totalPages = Math.max(1, Math.ceil(ordered.length / productsPerPage));
  const startIdx = (page - 1) * productsPerPage;
  const paginated = ordered.slice(startIdx, startIdx + productsPerPage);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по товарам"
            className="w-full"
            aria-label="Поиск по товарам"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setQ("");
            }}
          >
            Очистить
          </Button>
        </div>

        {/* A simple client-side sort selector to allow immediate sorting without page reload.
            If you prefer server-driven SortControls, keep server SortControls in page.tsx. */}
        <select
          className="rounded border px-2 py-1"
          value={sortParam}
          onChange={(e) => setSortParam(e.target.value)}
        >
          <option value="default">По умолчанию</option>
          <option value="price_asc">Цена: по возрастанию</option>
          <option value="price_desc">Цена: по убыванию</option>
          <option value="name_asc">Название: A→Z</option>
          <option value="name_desc">Название: Z→A</option>
        </select>
      </div>

      {ordered.length === 0 ? (
        <div className="flex w-full items-center justify-center text-3xl">
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
                  key={i + 1}
                  variant={page === i + 1 ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(i + 1)}
                  className={
                    page === i + 1 ? "bg-primary text-white" : "bg-white"
                  }
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
