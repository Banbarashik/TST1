type GrammaticalCase = "nom" | "gen" | "plu";

const heatCarrierAdjForms: Record<string, Record<GrammaticalCase, string>> = {
  water: {
    nom: "водяной",
    gen: "водяного",
    plu: "водяные",
  },
  steam: {
    nom: "паровой",
    gen: "парового",
    plu: "паровые",
  },
};

export function getHeatCarrierAdj(heatCarrier: string) {
  return heatCarrierAdjForms[heatCarrier];
}
