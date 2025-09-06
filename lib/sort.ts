// lib/sort.ts
type Product = {
  name: string;
  price?: number;
  [k: string]: any;
};

export type SortParam =
  | "default"
  | "name_asc"
  | "name_desc"
  | "price_asc"
  | "price_desc";

export function parseSortParam(raw?: string): SortParam {
  if (!raw) return "default";
  const allowed: SortParam[] = [
    "default",
    "name_asc",
    "name_desc",
    "price_asc",
    "price_desc",
  ];
  return (allowed.includes(raw as SortParam) ? raw : "default") as SortParam;
}

export function comparatorFor(sort: SortParam) {
  switch (sort) {
    case "name_asc":
      return (a: Product, b: Product) =>
        a.name.localeCompare(b.name, "ru", { sensitivity: "base" });
    case "name_desc":
      return (a: Product, b: Product) =>
        b.name.localeCompare(a.name, "ru", { sensitivity: "base" });
    case "price_asc":
      return (a: Product, b: Product) =>
        (a.price ?? Infinity) - (b.price ?? Infinity);
    case "price_desc":
      return (a: Product, b: Product) =>
        (b.price ?? -Infinity) - (a.price ?? -Infinity);
    default:
      return null; // "default" — не трогаем порядок, оставляем как есть
  }
}
