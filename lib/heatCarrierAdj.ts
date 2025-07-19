type GrammaticalCase = "nom" | "gen" | "plu" | "pluGen";

const heatCarrierAdjForms: Record<string, Record<GrammaticalCase, string>> = {
  water: {
    nom: "водяной",
    gen: "водяного",
    plu: "водяные",
    pluGen: "водяных",
  },
  steam: {
    nom: "паровой",
    gen: "парового",
    plu: "паровые",
    pluGen: "водяных",
  },
};

export function getHeatCarrierAdj(heatCarrier: string) {
  return heatCarrierAdjForms[heatCarrier];
}
