import { productData } from "@/data/products";

import type { Metadata } from "next";

import { getProductTypeForms } from "@/lib/productType";

import PritochnyProductPage from "@/components/catalog/pritochnyProductPage";
import KSKProductPage from "@/components/catalog/KSKProductPage";

function getProductType(categories: string[]) {
  if (
    categories.includes("pritochny-vodiany-kalorifery") ||
    categories.includes("pritochny-parovy-kalorifery")
  )
    return "supplyCalorifier";

  if (categories.includes("ksk") || categories.includes("kpsk"))
    return "standardCalorifier";
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
  const shortNameWithHyphen = product.shortName.replace(" ", "-");

  if (productType === "supplyCalorifier") {
    const [sizeStr] = product.shortName.match(/\d+/);
    const size = Number(sizeStr);
    const roundedSize = Math.round(size / 100) * 100;

    return {
      title: `Калорифер приточный ${shortNameWithHyphen}`,
      description: `Приточный ${heatCarrierAdj?.nom} калорифер ${shortNameWithoutHyphen} производительностью по воздуху ${product.airPower} м3/час производства ООО Т.С.Т. Технические характеристики, калькулятор подбора`,
      keywords: `калорифер ${size} ${size},калорифер ${shortNameWithoutHyphen},калорифер ${heatCarrierAdj?.nom} ${size} ${size},калорифер ${heatCarrierAdj?.nom} ${shortNameWithoutHyphen},калорифер приточный ${size} ${size},калорифер ${heatCarrierAdj?.nom} приточный ${size} ${size},калорифер ${size} ${size} технические характеристики,калорифер ${shortNameWithoutHyphen} расчет и подбор,приточный калорифер ${size} ${size} производительность по воздуху ${product.airPower},${heatCarrierAdj?.nom} калорифер ${roundedSize} ${roundedSize}`,
    };
  }

  if (productType === "standardCalorifier") {
    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, вес, расчет и цена калорифера ${product.shortName} 02 ХЛ3`,
      keywords: `калорифер ${product.shortName},калорифер ${product.shortName} 02 хл3,калорифер ${shortNameWithoutHyphen} ${heatCarrierAdj.nom},калорифер ${shortNameWithoutHyphen} технические характеристики,калорифер ${shortNameWithoutHyphen} габаритные размеры,купить калорифер ${product.shortName},калорифер ${shortNameWithoutHyphen} цена,калорифер ${shortNameWithoutHyphen} производительность,калорифер ${shortNameWithoutHyphen} масса,кск ${shortNameWithoutHyphen}`,
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
    return <PritochnyProductPage product={product} />;

  if (productType === "standardCalorifier")
    return <KSKProductPage product={product} />;
}
