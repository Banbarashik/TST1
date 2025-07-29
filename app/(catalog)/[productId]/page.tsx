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
  if (categories.includes("ksk") || categories.includes("kpsk"))
    return "ksk_kpsk";
  if (categories.includes("tvv") || categories.includes("kp")) return "tvv_kp";
  if (categories.includes("kfb")) return "kfb";
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

  if (productType === "kfb") {
    const amountOfWays =
      product.heatCarrier === "water" ? "многоходовой" : "одноходовой";

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.model}`,
      description: `Калорифер ${product.series}-${product.size} ${heatCarrierAdj.nom} – производитель ООО Т.С.Т. Производство, технические характеристики, размеры, расчет, подбор, цена ${heatCarrierAdj.gen} калорифера ${product.shortName}`,
      keywords: `калорифер ${product.model},калорифер ${product.shortName} ${heatCarrierAdj.nom},калорифер ${product.shortName} ${heatCarrierAdj.nom} технические характеристики,калорифер ${product.shortName} ${heatCarrierAdj.nom} габаритные размеры,калорифер ${product.model} расчет и подбор,цена калорифера ${product.shortName} ${heatCarrierAdj.gen},купить калорифер ${product.shortName} ${heatCarrierAdj.nom},калорифер для шахт ${product.shortName} ${heatCarrierAdj.nom},калорифер ${product.shortName} ${amountOfWays},${product.heatCarrier === "water" ? "калориферная секция водяная" : "калорифер для сушилок паровой"} ${product.shortName}`,
    };
  }

  if (productType === "tvv_kp") {
    const series = product.heatCarrier === "water" ? "ВНВ" : "ВНП";
    const size = `${product.rows}${product.size.length > 1 ? product.size : "0" + product.size}`;
    const altName = `воздухонагреватель ${series} 113 ${size}`;
    const shortAltName = `${series} ${size}`;

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} – производитель ООО Т.С.Т. Производство, характеристики, расчет, цена водяного воздухонагревателя для холодного климата ${series} 113 22 ХЛ`,
      keywords: `калорифер ${product.shortName},калорифер ${product.shortName} цена,калорифер ${product.shortName} технические характеристики,калорифер ${product.shortName} габаритные размеры,калорифер ${product.shortName} подбор,калорифер ${shortAltName},калорифер ${shortAltName} ${heatCarrierAdj.nom},${altName},${altName} 22 хл,${altName} купить`,
    };
  }

  if (productType === "ksk_kpsk") {
    const name = `${product.series} ${product.rows} ${product.size}`;

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, расчет, подбор, цена калорифера ${name}`,
      keywords: `${name},калорифер ${name},калорифер ${name} водяной,калорифер ${name} технические характеристики,калорифер ${name} габаритные размеры,купить калорифер ${product.shortName},калорифер ${name} цена,калорифер ${name} расчет,калорифер ${name} подбор,калорифер ${name} мощность`,
    };
  }

  if (productType === "supplyCalorifier") {
    const isKPVS = product.categories.includes("kpvs");
    const isKPVU = product.categories.includes("kpvu");
    const isKPPS = product.categories.includes("kpps");
    const isKPPU = product.categories.includes("kppu");

    const size = `${product.size} ${product.size}`;

    let heatPower = 0;
    if (isKPVS || isKPPS)
      heatPower = product.variants.find((p) => p.rows === 2).heatPower;
    if (isKPVU || isKPPU)
      heatPower = product.variants.find((p) => p.rows === 4).heatPower;

    let keys = "";
    if (isKPVS)
      keys = `калорифер ${size},калорифер ${size} приточный,калорифер ${size} производитель,калорифер производительность ${product.airPower} м3/час,калорифер тепловая мощность ${heatPower} кВт`;
    if (isKPVU)
      keys = `калорифер ${size} ${heatCarrierAdj.nom},калорифер ${size} приточный ${heatCarrierAdj.nom},калорифер ${size} расчет,калорифер объем нагреваемого воздуха ${product.airPower} м3/час,калорифер производительность по теплу ${heatPower} кВт`;
    if (isKPPS)
      keys = `калорифер ${size} ${heatCarrierAdj.nom},калорифер ${size} приточный,калорифер ${size} ${heatCarrierAdj.nom} производитель,${heatCarrierAdj.nom} калорифер для нагрева воздуха ${product.airPower} м3/час,мощность ${heatCarrierAdj.gen} калорифера ${heatPower} кВт`;
    if (isKPPU)
      keys = `калорифер ${size} мощность,калорифер ${size} технические характеристики,калорифер ${size} производительность,${heatCarrierAdj.nom} калорифер для сушильной камеры ${product.airPower} м3/час,${heatCarrierAdj.nom} калорифер для сушки ${heatPower} кВт`;

    return {
      title: product.name,
      description: `${heatCarrierAdj.nom} приточный калорифер ${product.shortName} производительностью по воздуху ${product.airPower} м3/час производства ООО Т.С.Т. Технические характеристики, калькулятор подбора`,
      keywords: `${product.series} ${size},калорифер ${product.series} ${size},калорифер ${product.series} ${size} водяной,калорифер ${product.series} ${size} цена,калорифер ${product.series} ${size} купить,${keys}`,
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
  if (
    productType === "ksk_kpsk" ||
    productType === "tvv_kp" ||
    productType === "kfb" ||
    productType === "ao2"
  )
    return <KSKProductPage product={product} />;
  if (productType === "std300") return <STDPage product={product} />;
  if (productType === "avo") return <AVOPage product={product} />;
  if (productType === "electroEquipment")
    return <ElectroEquipmentPage product={product} />;
}
