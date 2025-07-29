import { productData } from "@/data/products";

import type { Metadata } from "next";

import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";

import SupplyCalorifierPage from "@/components/catalog/supplyCalorifierPage";
import KSKProductPage from "@/components/catalog/KSKProductPage";
import STDPage from "@/components/catalog/STDPage";
import AVOPage from "@/components/catalog/AVOPage";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";
import ElectroEquipmentPage from "@/components/catalog/ElectroEquipmentPage";

function getProductType(categories: string[]) {
  if (
    categories.includes("pritochny-vodiany-kalorifery") ||
    categories.includes("pritochny-parovy-kalorifery")
  )
    return "supplyCalorifier";
  if (
    categories.includes("ksk") ||
    categories.includes("kpsk") ||
    categories.includes("tvv") ||
    categories.includes("kp") ||
    categories.includes("kfb")
  )
    return "standardCalorifier";
  if (categories.includes("ao2")) return "ao2";
  if (categories.includes("std300") || categories.includes("std300-hl"))
    return "std300";
  if (categories.includes("avo")) return "avo";
  if (categories.includes("energonagrevatelynoe-oborudovanie"))
    return "electroEquipment";
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
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);
  const shortNameWithoutHyphen = product.shortName.replace("-", " ");

  if (productType === "supplyCalorifier") {
    const isKPVS = product.categories.includes("kpvs");
    const isKPVU = product.categories.includes("kpvu");
    const isKPPS = product.categories.includes("kpps");
    const isKPPU = product.categories.includes("kppu");

    const size = `${product.size} ${product.size}`;

    const diffKeys = [
      `калорифер ${size} ${isKPVU || isKPPS ? heatCarrierAdj.nom : "мощность"}`,
    ];

    return {
      title: ``,
      description: ``,
      keywords: diffKeys.join(","),
    };
  }

  if (productType === "standardCalorifier") {
    const isKFB = product.categories.includes("kfb");
    const shortName = isKFB ? product.model : product.shortName;
    const shortNameWithoutHyphen = shortName.replace("-", " ");

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${shortName} ${heatCarrierAdj?.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, расчет, подбор, цена калорифера ${shortName}`,
      keywords: `калорифер ${isKFB ? `${product.size} a${product.rows}` : `${product.rows} ${product.size}`} ${heatCarrierAdj?.nom},${isKFB ? shortName : shortNameWithoutHyphen},калорифер ${isKFB ? shortName : shortNameWithoutHyphen},калорифер ${isKFB ? shortName : shortNameWithoutHyphen} ${heatCarrierAdj?.nom},калорифер ${isKFB ? shortName : shortNameWithoutHyphen} технические характеристики,калорифер ${isKFB ? shortName : shortNameWithoutHyphen} габаритные размеры,калорифер ${isKFB ? shortName : shortNameWithoutHyphen} производительность,калорифер ${isKFB ? shortName : shortNameWithoutHyphen} мощность,калорифер ${isKFB ? shortName : shortNameWithoutHyphen} купить,калорифер ${isKFB ? shortName : shortNameWithoutHyphen} цена`,
    };
  }

  if (productType === "ao2") {
    const rowsNumberAdj = getRowsNumberAdj(product.rows);
    const shortNameWithoutHyphen = product.shortName.replace("-", " ");
    const modelWithoutHyphen = product.model.replace("-", " ");

    return {
      title: `Агрегает ${product.shortName} отопительный ${heatCarrierAdj.nom} ${rowsNumberAdj.nom}`,
      description: `Агрегат ${shortNameWithoutHyphen} воздушно отопительный ${heatCarrierAdj.nom} ${rowsNumberAdj.nom} – производство ООО Т.С.Т. Характеристики, расчет, подбор, цена водяного агрегата ${product.model}`,
      keywords: `${modelWithoutHyphen},агрегат ${modelWithoutHyphen} ${heatCarrierAdj.nom},агрегат ${shortNameWithoutHyphen} ${product.calorifier},отопительный агрегат ${modelWithoutHyphen} расчет и подбор,воздушно-отопительный агрегат ${modelWithoutHyphen},агрегат ${modelWithoutHyphen} технические характеристики,агрегат отопительный ${modelWithoutHyphen} мощность,воздушный агрегат ${modelWithoutHyphen} производительность,отопительный агрегат ${modelWithoutHyphen} купить,${heatCarrierAdj.nom} агрегат ${modelWithoutHyphen} цена`,
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
  if (productType === "standardCalorifier" || productType === "ao2")
    return <KSKProductPage product={product} />;
  if (productType === "std300") return <STDPage product={product} />;
  if (productType === "avo") return <AVOPage product={product} />;
  if (productType === "electroEquipment")
    return <ElectroEquipmentPage product={product} />;
}
