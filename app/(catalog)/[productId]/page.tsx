import { productData } from "@/data/products";

import type { Metadata } from "next";

import { getProductTypeForms } from "@/lib/productType";

import SupplyCalorifierPage from "@/components/catalog/supplyCalorifierPage";
import KSKProductPage from "@/components/catalog/KSKProductPage";

function getProductType(categories: string[]) {
  if (
    categories.includes("pritochny-vodiany-kalorifery") ||
    categories.includes("pritochny-parovy-kalorifery")
  )
    return "supplyCalorifier";

  if (categories.includes("ksk") || categories.includes("kpsk"))
    return "standardCalorifier";

  if (categories.includes("std300")) return "std300";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  if (!product) return {};

  const productType = getProductType(product.categories);
  const heatCarrierAdj = getProductTypeForms(product.categories);
  const shortNameWithoutHyphen = product.shortName.replace("-", " ");

  if (productType === "supplyCalorifier") {
    const [sizeStr] = product.shortName.match(/\d+/);
    const size = Number(sizeStr);
    const roundedSize = Math.round(size / 100) * 100;
    const shortNameWithHyphen = product.shortName.replace(" ", "-");

    return {
      title: `Калорифер приточный ${shortNameWithHyphen}`,
      description: `Приточный ${heatCarrierAdj?.nom} калорифер ${shortNameWithoutHyphen} производительностью по воздуху ${product.airPower} м3/час производства ООО Т.С.Т. Технические характеристики, калькулятор подбора`,
      keywords: `калорифер ${size} ${size},калорифер ${shortNameWithoutHyphen},калорифер ${heatCarrierAdj?.nom} ${size} ${size},калорифер ${heatCarrierAdj?.nom} ${shortNameWithoutHyphen},калорифер приточный ${size} ${size},калорифер ${heatCarrierAdj?.nom} приточный ${size} ${size},калорифер ${size} ${size} технические характеристики,калорифер ${shortNameWithoutHyphen} расчет и подбор,приточный калорифер ${size} ${size} производительность по воздуху ${product.airPower},${heatCarrierAdj?.nom} калорифер ${roundedSize} ${roundedSize}`,
    };
  }

  if (productType === "standardCalorifier") {
    const shortNameWithoutHyphen = product.shortName.replace("-", " ");

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj?.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, расчет, подбор, цена калорифера ${product.shortName}`,
      keywords: `калорифер ${product.rows} ${product.size} ${heatCarrierAdj?.nom},${shortNameWithoutHyphen},калорифер ${shortNameWithoutHyphen},калорифер ${shortNameWithoutHyphen} ${heatCarrierAdj?.nom},калорифер ${shortNameWithoutHyphen} технические характеристики,калорифер ${shortNameWithoutHyphen} габаритные размеры,калорифер ${shortNameWithoutHyphen} производительность,калорифер ${shortNameWithoutHyphen} мощность,калорифер ${shortNameWithoutHyphen} купить,калорифер ${shortNameWithoutHyphen} цена`,
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  if (!product) return <div>Товар не найден</div>;

  const productType = getProductType(product.categories);

  if (productType === "supplyCalorifier")
    return <SupplyCalorifierPage product={product} />;

  if (productType === "standardCalorifier")
    return <KSKProductPage product={product} />;

  if (productType === "std300") return <STDPage />;
}
