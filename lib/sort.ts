// lib/sort.ts
type Product = {
  name: string;
  price?: number;
  airPower: number;
  [k: string]: any;
};

export type SortParam = "default" | "airPower_asc" | "airPower_desc";

export function parseSortParam(raw?: string): SortParam {
  if (!raw) return "default";
  const allowed: SortParam[] = ["default", "airPower_asc", "airPower_desc"];
  return (allowed.includes(raw as SortParam) ? raw : "default") as SortParam;
}

export function comparatorFor(sort: SortParam) {
  switch (sort) {
    case "airPower_asc":
      return (a: Product, b: Product) => a.airPower - b.airPower;
    case "airPower_desc":
      return (a: Product, b: Product) => b.airPower - a.airPower;
    default:
      return null; // "default" — не трогаем порядок, оставляем как есть
  }
}
