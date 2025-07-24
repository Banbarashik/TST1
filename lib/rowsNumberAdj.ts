type GrammaticalCase = "nom" | "gen" | "plu" | "pluGen";

const rowsNumberAdjForms: Record<number, Record<GrammaticalCase, string>> = {
  2: {
    nom: "двухрядный",
    plu: "двухрядные",
    gen: "двухрядного",
    pluGen: "двухрядных",
  },
  3: {
    nom: "трехрядный",
    plu: "трехрядные",
    gen: "трехрядного",
    pluGen: "трехрядных",
  },
  4: {
    nom: "четырехрядный",
    plu: "четырехрядные",
    gen: "четырехрядного",
    pluGen: "четырехрядных",
  },
};

export function getRowsNumberAdj(rowsNumber: number) {
  return rowsNumberAdjForms[rowsNumber];
}
