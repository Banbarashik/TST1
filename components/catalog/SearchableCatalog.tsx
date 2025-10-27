"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Search } from "lucide-react";

import { comparatorFor } from "@/lib/sort";
import { sortProducts } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/catalog/productCard";
import SortControls from "./SortControls";

type Props = {
  initialProducts: []; // products already filtered by category (server-side)
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

  const [q, setQ] = useState(initialQ);
  const didMountRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // don't run on first mount (avoids redirecting category pages on initial load)
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    // rebuild params from current search params so we keep other params (e.g. sort)
    const params = new URLSearchParams(sp.toString());

    // reset pagination when searching
    params.delete("page");

    // keep or remove q param depending on current q value
    if (q && q.trim() !== "") params.set("q", q);
    else params.delete("q");

    // avoid unnecessary push if ?q is already equal
    const currentQ = sp.get("q") ?? "";
    if (currentQ === (q ?? "")) return;

    const qs = params.toString();
    const target = `/catalog/all${qs ? `?${qs}` : ""}`;

    // Save current input selection/focus so we can restore it after Next navigation
    if (typeof window !== "undefined") {
      try {
        const el =
          inputRef.current ??
          (document.querySelector(
            'input[name="q"]',
          ) as HTMLInputElement | null);
        if (el) {
          const payload = {
            start: el.selectionStart,
            end: el.selectionEnd,
            value: el.value,
          };
          sessionStorage.setItem(
            "catalog-restore-focus",
            JSON.stringify(payload),
          );
        }
      } catch {
        /* ignore */
      }
    }

    // perform a real navigation so server props (category -> products) update
    router.push(target);
  }, [q, sp, router]);

  // on mount, restore focus/selection if navigation requested it
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("catalog-restore-focus");
    if (!raw) return;
    try {
      const { start, end } = JSON.parse(raw);
      const el =
        inputRef.current ??
        (document.querySelector('input[name="q"]') as HTMLInputElement | null);
      if (el) {
        el.focus();
        if (typeof start === "number" && typeof end === "number") {
          el.setSelectionRange(start, end);
        }
      }
    } catch {
      /* ignore */
    }
    sessionStorage.removeItem("catalog-restore-focus");
  }, []);

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
  }, [filtered, sort]);

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
            ref={inputRef}
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Найти товар..."
            aria-label="Поиск по товарам"
            className={q ? "" : "border-primary-darker/50 border"}
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
        <div className="absolute top-2/3 left-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-2xl sm:top-1/2 sm:text-3xl">
          Некорректный запрос
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
