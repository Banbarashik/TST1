import { productData } from "@/data/products";

import type { Metadata } from "next";

import { capitalizeFirst } from "@/lib/utils";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";

import STDPage from "@/components/catalog/STDPage";
import AVOPage from "@/components/catalog/AVOPage";
import TenyPage from "@/components/catalog/TenyPage";
import QuestionButton from "@/components/questionButton";
import KSKProductPage from "@/components/catalog/KSKProductPage";
import SupplyCalorifierPage from "@/components/catalog/supplyCalorifierPage";
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
  if (categories.includes("std300")) return "std300";
  if (categories.includes("std300-hl")) return "std300-hl";
  if (categories.includes("avo")) return "avo";
  if (categories.includes("sfo")) return "sfo";
  if (categories.includes("sfotc")) return "sfotc";
  if (categories.includes("shuk")) return "shuk";
  if (categories.includes("teny")) return "teny";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  if (!product) return { title: "Товар не найден" };

  const productType = getProductType(product.categories);
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);

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
      title: `Калорифер приточный ${product.shortName} ${heatCarrierAdj.nom}`,
      description: `${capitalizeFirst(heatCarrierAdj.nom)} приточный калорифер ${product.shortName} производительностью по воздуху ${product.airPower} м3/час производства ООО Т.С.Т. Технические характеристики, калькулятор подбора`,
      keywords: `${product.series} ${size},калорифер ${product.series} ${size},калорифер ${product.series} ${size} ${heatCarrierAdj.nom},калорифер ${product.series} ${size} цена,калорифер ${product.series} ${size} купить,${keys}`,
    };
  }

  if (productType === "ksk_kpsk") {
    const name = `${product.series} ${product.rows} ${product.size}`;

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, расчет, подбор, цена калорифера ${name}`,
      keywords: `${name},калорифер ${name},калорифер ${name} ${heatCarrierAdj.nom},калорифер ${name} технические характеристики,калорифер ${name} габаритные размеры,купить калорифер ${product.shortName},калорифер ${name} цена,калорифер ${name} расчет,калорифер ${name} подбор,калорифер ${name} мощность`,
    };
  }

  if (productType === "tvv_kp") {
    const series = product.heatCarrier === "water" ? "ВНВ" : "ВНП";
    const size = `${product.rows}${product.size < 10 ? "0" + product.size : product.size}`;
    const altName = `воздухонагреватель ${series} 113 ${size}`;
    const shortAltName = `${series} ${size}`;

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} – производитель ООО Т.С.Т. Производство, характеристики, расчет, цена водяного воздухонагревателя холодного климата ${series} 113 ${size} 22 ХЛ`,
      keywords: `калорифер ${product.shortName},калорифер ${product.shortName} цена,калорифер ${product.shortName} технические характеристики,калорифер ${product.shortName} габаритные размеры,калорифер ${product.shortName} подбор,калорифер ${shortAltName},калорифер ${shortAltName} ${heatCarrierAdj.nom},${altName},${altName} 22 хл,${altName} купить`,
    };
  }

  if (productType === "kfb") {
    const amountOfWays =
      product.heatCarrier === "water" ? "многоходовой" : "одноходовой";

    return {
      title: `Калорифер ${heatCarrierAdj.nom} ${product.model}`,
      description: `Калорифер ${product.shortName} ${heatCarrierAdj.nom} – производитель ООО Т.С.Т. Производство, технические характеристики, размеры, расчет, подбор, цена ${heatCarrierAdj.gen} калорифера ${product.shortName}`,
      keywords: `калорифер ${product.model},калорифер ${product.shortName} ${heatCarrierAdj.nom},калорифер ${product.shortName} ${heatCarrierAdj.nom} технические характеристики,калорифер ${product.shortName} ${heatCarrierAdj.nom} габаритные размеры,калорифер ${product.model} расчет и подбор,цена калорифера ${product.shortName} ${heatCarrierAdj.gen},купить калорифер ${product.shortName} ${heatCarrierAdj.nom},калорифер для шахт ${product.shortName} ${heatCarrierAdj.nom},калорифер ${product.shortName} ${amountOfWays},${product.heatCarrier === "water" ? "калориферная секция водяная" : "калорифер для сушилок паровой"} ${product.shortName}`,
    };
  }

  if (productType === "ao2") {
    const rowsNumberAdj = getRowsNumberAdj(product.rows);
    const shortNameWithoutHyphen = product.shortName.replace("-", " ");
    const modelWithoutHyphen = product.model.replace("-", " ");

    return {
      title: `Агрегат ${product.shortName} отопительный ${heatCarrierAdj.nom} ${rowsNumberAdj.nom}`,
      description: `Агрегат ${shortNameWithoutHyphen} воздушно отопительный ${heatCarrierAdj.nom} ${rowsNumberAdj.nom} – производство ООО Т.С.Т. Характеристики, расчет, подбор, цена ${heatCarrierAdj.gen} агрегата ${product.model}`,
      keywords: `${modelWithoutHyphen},агрегат ${modelWithoutHyphen} ${heatCarrierAdj.nom},агрегат ${shortNameWithoutHyphen} ${product.calorifier},отопительный агрегат ${modelWithoutHyphen} расчет и подбор,воздушно-отопительный агрегат ${modelWithoutHyphen},агрегат ${modelWithoutHyphen} технические характеристики,агрегат отопительный ${modelWithoutHyphen} мощность,воздушный агрегат ${modelWithoutHyphen} производительность,отопительный агрегат ${modelWithoutHyphen} купить,${heatCarrierAdj.nom} агрегат ${modelWithoutHyphen} цена`,
    };
  }

  if (productType === "avo") {
    return {
      title: `Агрегаты воздушного отопления АВО ХЛ ${heatCarrierAdj.plu}`,
      description: `Агрегат АВО ХЛ воздушно-отопительный ${heatCarrierAdj.nom} – производство ООО Т.С.Т. Характеристики, расчет, подбор, цена водяного агрегата для холодного климата АВО ${product.calorifier}`,
      keywords: `агрегат аво 3-55-01 ${heatCarrierAdj.nom},агрегат аво 4-95-01 ${heatCarrierAdj.nom},агрегат аво 7-165-01 ${heatCarrierAdj.nom},отопительный агрегат аво 3-55-01 ${heatCarrierAdj.nom} расчет,агрегат отопительный аво 4-95-01 ${heatCarrierAdj.nom} подбор,воздушный ${heatCarrierAdj.nom} агрегат аво 7-165-01 мощность,${heatCarrierAdj.nom} агрегат аво 7-165-01 производительность,агрегат аво хл ${heatCarrierAdj.nom} производитель,агрегат аво хл ${heatCarrierAdj.nom} купить,агрегат аво хл ${heatCarrierAdj.nom} цена`,
    };
  }

  if (productType === "std300" || productType === "std300-hl") {
    const hl = productType === "std300-hl" ? "ХЛ" : "";

    return {
      title: `Агрегат СТД-300 ${hl} отопительный ${heatCarrierAdj.nom}`,
      description: `Агрегат СТД 300 ${hl} воздушно-отопительный ${heatCarrierAdj.nom} – производство ООО Т.С.Т. Характеристики, расчет, подбор, цена ${heatCarrierAdj.gen} агрегата СТД 300 ${hl}`,
      keywords: `стд 300 ${product.heatCarrier === "water" ? "в" : "п"} ${hl},агрегат стд 300 ${hl} ${heatCarrierAdj.nom},агрегат стд 300 ${product.calorifier}3,отопительный агрегат стд 300 ${product.calorifier}4 расчет и подбор,воздушно-отопительный агрегат ${product.model}3,агрегат ${product.model}4 технические характеристики,агрегат отопительный ${heatCarrierAdj.nom} стд 300 ${hl} мощность,воздушный агрегат стд 300 ${hl} ${product.heatCarrier === "water" ? "в" : "п"} производительность,отопительный агрегат стд 300 ${hl} ${product.heatCarrier === "water" ? "в" : "п"} купить,${heatCarrierAdj.nom} агрегат стд 300 ${hl} цена`,
    };
  }

  if (productType === "sfo") {
    return {
      title: `${product.name}. Производство`,
      description: `Электрокалорифер СФО (ЭКО) ${product.size} - производитель ООО Т.С.Т. Производство, технические характеристики, подбор кабеля, электрическая схема подключения, цена СФО ${product.size}`,
      keywords: `электрокалорифер сфо ${product.size},электрокалорифер эко ${product.size},купить электрокалорифер сфо ${product.size},калорифер сфо ${product.size} цена,производство электрокалориферов сфо ${product.size},технические характеристики и габаритные размеры сфо ${product.size},комплектация и чертеж калорифера эко ${product.size},электрическая схема подключения сфо ${product.size},подбор проводов и кабелей для подключения электрического калорифера сфо ${product.size},канальный электрический калорифер СФО ${product.size}`,
    };
  }
  if (productType === "sfotc") {
    return {
      title: `${product.name}. Производство`,
      description: `Электрокалориферная установка СФОЦ (ЭКОЦ) ${product.size} - производитель ООО Т.С.Т. Производство, характеристики, размеры, подбор кабеля, схема подключения, цена СФОЦ ${product.size}`,
      keywords: `электрокалориферная установка сфоц ${product.size},электрокалориферная установка экоц ${product.size},купить установку сфоц ${product.size},электрокалорифер сфоц ${product.size} цена,производство электрокалориферных установок сфоц ${product.size},технические характеристики и габаритные размеры экоц ${product.size},комплектация и чертеж калорифера экоц ${product.size},электрическая схема подключения сфоц ${product.size},подбор проводов и кабелей для подключения электрокалориферной установки сфоц ${product.size},приточная установка сфоц ${product.size} для вентиляционной сети`,
    };
  }
  if (productType === "shuk") {
    return {
      title: `${product.name}. Производство`,
      description: `Шкаф управления калорифером ШУК ${product.size} - производитель ООО Т.С.Т. Производство, технические характеристики, электрическая схема подключения, цена ШУК ${product.size}`,
      keywords: `шкаф управления калорифером ШУК ${product.size},шкаф управления электрокалорифером СФО ${product.size},шкаф управления электрическим калорифером ЭКО ${product.size},шкаф управления для приточной установки СФОЦ ${product.size},шкаф управления для установки вентиляционной сети ЭКОЦ ${product.size},электрическая схема подсоединения шкафов управления ШУК ${product.size},купить шкаф управления калорифером ШУК ${product.size},технические характеристики ШУК ${product.size},комплектация шкафов управления калориферами ШУК ${product.size},пускозащитная аппаратура для шкафа управления ШУК ${product.size}`,
    };
  }

  if (productType === "teny") {
    return {
      title: "ТЭНы оребренные. Производство",
      description:
        "ТЭНы оребренные - производитель ООО Т.С.Т. ТЭН воздушный оребренный 2.5 кВт 220 В для электрокалориферов и электрокалориферных установок, цена оребренного тэна для нагрева воздуха",
      keywords:
        "тэн оребренный,тэн воздушный оребренный,тэн прямой оребренный,тэны для воздуха оребренные,оребренные тэны для нагрева воздуха,купить оребренный тэн,тэн оребренный воздушный купить,оребренный тэн воздушный цена,тэн воздушный оребренный 2.5 квт,тэн воздушный оребренный 220",
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

  if (!product)
    return (
      <div className="flex w-full items-center justify-center text-3xl">
        Товар не найден
      </div>
    );

  const productType = getProductType(product.categories);

  if (productType === "supplyCalorifier")
    return (
      <>
        <SupplyCalorifierPage product={product} />
        <QuestionButton />
      </>
    );

  if (
    productType === "ksk_kpsk" ||
    productType === "tvv_kp" ||
    productType === "kfb" ||
    productType === "ao2"
  )
    return (
      <>
        <KSKProductPage product={product} />
        <QuestionButton />
      </>
    );

  if (productType === "std300" || productType === "std300-hl")
    return (
      <>
        <STDPage product={product} />
        <QuestionButton />
      </>
    );

  if (productType === "avo")
    return (
      <>
        <AVOPage product={product} />
        <QuestionButton />
      </>
    );

  if (
    productType === "sfo" ||
    productType === "sfotc" ||
    productType === "shuk"
  )
    return <ElectroEquipmentPage product={product} />;

  if (productType === "teny") return <TenyPage product={product} />;
}
