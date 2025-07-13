type GrammaticalCase = "nom" | "gen" | "plu";

const typeForms: Record<string, Record<GrammaticalCase, string>> = {
  "vodiany-kalorifery": {
    nom: "водяной",
    gen: "водяного",
    plu: "водяные",
  },
  "parovy-kalorifery": {
    nom: "паровой",
    gen: "парового",
    plu: "паровые",
  },
};

function getProductTypeKey(categories: string[]): string | null {
  return categories.includes("vodiany-kalorifery")
    ? "vodiany-kalorifery"
    : categories.includes("parovy-kalorifery")
      ? "parovy-kalorifery"
      : null;
}

export function getProductTypeForms(categories: string[]) {
  const typeKey = getProductTypeKey(categories);
  return typeKey ? typeForms[typeKey] : null;
}
