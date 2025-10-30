import productData from "@/data/products.json";

import Image from "next/image";

import { sortProducts } from "@/lib/utils";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import LinkButtonsBlock from "@/components/linkButtonsBlock";

const tableEquipment: Record<string, string> = {
  water: "насосно-смесительного",
  steam: "пароконденсатного",
};

const tableHeaders = {
  water: [
    <>
      Производительность по воздуху, м<sup>3</sup>/час
    </>,
    "Тепловая мощность калорифера, кВт",
    <>
      Площадь поверхности теплообмена, м<sup>2</sup>
    </>,
    <>
      Площадь фронтального сечения, м<sup>2</sup>
    </>,
    "Объем воздухонагревателя, л",
    "Количество рядов теплообменника",
    "Количество теплообменных трубок",
    "Число ходов по теплоносителю",
    "Диаметр патрубков, Ду мм",
    "Масса, кг",
    "Аэродинамическое сопротивление min, Па",
    "Аэродинамическое сопротивление max, Па",
    "Гидравлическое сопротивление min, кПа",
    "Гидравлическое сопротивление max, кПа",
    "Скорость теплоносителя min, м/сек",
    "Скорость теплоносителя max, м/сек",
    <>
      Расход теплоносителя min, м<sup>3</sup>/час
    </>,
    <>
      Расход теплоносителя max, м<sup>3</sup>/час
    </>,
    <>
      Коэффициент теплопередачи min, Вт/(м<sup>2</sup>•°С)
    </>,
    <>
      Коэффициент теплопередачи max, Вт/(м<sup>2</sup>•°С)
    </>,
  ],
  steam: [
    <>
      Производительность по воздуху, м<sup>3</sup>/час
    </>,
    "Тепловая мощность калорифера, кВт",
    <>
      Площадь поверхности теплообмена, м<sup>2</sup>
    </>,
    <>
      Площадь фронтального сечения, м<sup>2</sup>
    </>,
    <>
      Емкость воздухонагревателя, м<sup>3</sup>
    </>,
    "Количество рядов теплообменника",
    "Количество теплообменных трубок",
    "Число ходов по теплоносителю",
    "Диаметр патрубков, Ду мм",
    "Масса, кг",
    "Аэродинамическое сопротивление min, Па",
    "Аэродинамическое сопротивление max, Па",
    "Расход теплоносителя min, кг/час",
    "Расход теплоносителя max, кг/час",
    <>
      Коэффициент теплопередачи min, Вт/(м<sup>2</sup>•°С)
    </>,
    <>
      Коэффициент теплопередачи max, Вт/(м<sup>2</sup>•°С)
    </>,
  ],
};

export default function KSKProductPage({ product }: { product: KSKProduct }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);

  const isCalorifier = product.categories.includes("kalorifer");
  const isAgregat = product.categories.includes("agregaty");
  const isKFB = product.categories.includes("kfb");

  const categories = ["ksk", "kpsk", "tvv", "kp", "kfb", "ao2"];
  const category = categories.find((cat) => product.categories.includes(cat));

  const productsByCategory = productData
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => sortProducts(a.name, b.name));

  const extraCategory =
    category === "ksk" ? "tvv" : category === "kpsk" ? "kp" : null;

  const extraProducts = extraCategory
    ? productData.filter(
        (p) => p.categories.includes(extraCategory) && p.size === product.size,
      )
    : [];

  const productsByRows = productsByCategory.filter(
    (p) =>
      p.rows === product.rows &&
      ((!isKFB && !isAgregat) || p.heatCarrier === product.heatCarrier),
  );
  const productsBySize = [
    ...productsByCategory.filter((p) => p.size === product.size),
    ...extraProducts,
  ];

  const rowsNumberAdj = getRowsNumberAdj(product.rows);

  //TODO change to an object
  let URLs: string[] = [];
  if (category === "ksk")
    URLs = ["kalorifery-ksk", "Kalorifer_KSK_katalog_2025.pdf"];
  if (category === "kpsk")
    URLs = ["kalorifery-kpsk", "Kalorifer_KPSK_katalog_2025.pdf"];
  if (category === "tvv")
    URLs = ["kalorifery-tvv", "Kalorifer_TVV_katalog_2025.pdf"];
  if (category === "kp")
    URLs = ["kalorifery-kp", "Kalorifer_KP_katalog_2025.pdf"];
  if (category === "kfb" && product.heatCarrier === "water")
    URLs = ["kalorifery-kfb-a", "Kalorifer_KFB_katalog_2025.pdf"];
  if (category === "kfb" && product.heatCarrier === "steam")
    URLs = ["kalorifery-kfb", "Kalorifer_KFB_katalog_2025.pdf"];
  if (category === "ao2" && product.heatCarrier === "water")
    URLs = ["ao2-ksk-kpsk", "Agregat_AO2_katalog_2025.pdf"];
  if (category === "ao2" && product.heatCarrier === "steam")
    URLs = ["ao2-kpsk-ksk", "Agregat_AO2_katalog_2025.pdf"];

  const linkButtons = [
    {
      name: `${isKFB || isAgregat ? heatCarrierAdj.plu : ""} ${isCalorifier ? "калориферы" : "агрегаты"} ${product.series} ${isKFB || isAgregat ? "" : "- характеристики"}`,
      url: "/" + URLs[0],
      openNewTab: false,
    },
    {
      name: `Каталог ${isAgregat ? heatCarrierAdj.pluGen : ""} ${isCalorifier ? "калориферов" : "агрегатов"} ${product.series} ${isKFB && product.heatCarrier === "water" ? "М" : isKFB && product.heatCarrier === "steam" ? "П" : ""}`,
      url: "/documents/" + URLs[1],
      openNewTab: true,
    },
  ];

  return (
    <div className="@container w-full lg:overflow-x-auto">
      <h1 className="mb-8 text-xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 grid grid-rows-[minmax(0,max-content)_1fr] gap-y-5 sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-6">
        <ProductCard
          product={product}
          isLink={false}
          className="row-start-1 row-end-3 self-start justify-self-start sm:row-span-1 xl:col-start-1 xl:row-start-1 xl:row-end-3"
        />
        {/* text */}
        <div className="sm:col-span-full sm:row-start-2 xl:col-auto xl:row-start-1">
          <h2 className="mb-3 text-xl">
            <div className="sm:inline">
              {isCalorifier ? "Калорифер" : "Воздушно-отопительный агрегат"}{" "}
              {product.model}
              {product.climate && ` ${product.climate}`}.{" "}
            </div>
            {isAgregat ? (
              <div>ТУ 4864-003-55613706-02</div>
            ) : (
              "ТУ 4863-002-55613706-02"
            )}
          </h2>
          <ProductParagraph className="text-[16px]">
            {isCalorifier
              ? "Теплоотдающие элементы:"
              : `Теплоотдающие элементы ${heatCarrierAdj.gen} калорифера ${product.calorifier}:`}{" "}
          </ProductParagraph>
          <ul>
            <li>
              - электросварные прямошовные трубки {product.tubeSize} мм по ГОСТ
              10704-91
            </li>
            <li>
              - цельнотянутые бесшовные трубки {product.tubeSize} мм по ГОСТ
              8734-75
            </li>
            <li>с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением</li>
          </ul>
        </div>
        {/* chips */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              {isCalorifier ? "Все калориферы" : "Агрегаты"} данного типоразмера
            </ProductParagraph>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(90px,max-content))] gap-x-3 gap-y-4">
              {productsBySize.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {isCalorifier && !isKFB ? p.shortName : p.model}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              {isCalorifier ? "Стандартные" : "Все"} {rowsNumberAdj.plu}{" "}
              типоразмеры
            </ProductParagraph>
            <ul className="mx-1 grid grid-cols-[repeat(auto-fill,minmax(90px,max-content))] gap-x-3 gap-y-4">
              {productsByRows.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {isCalorifier && !isKFB ? p.shortName : p.model}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mb-4">
        <ProductSubheader
          text={`Технические характеристики ${isCalorifier ? `калорифера ${product.shortName} ${heatCarrierAdj?.gen}` : `агрегата ${product.model}`}`}
        />
        {/* TABLES */}
        <div className="mb-6 flex flex-col sm:flex-row sm:gap-6 md:gap-10 lg:gap-6 xl:gap-14">
          <table
            className="basis-full"
            style={{ border: "1px solid rgb(229, 231, 235)" }}
          >
            <tbody>
              {tableHeaders[product.heatCarrier]
                .slice(0, product.heatCarrier === "water" ? 10 : 8)
                .map((header, idx) => (
                  <tr key={idx}>
                    <th
                      className="py-2 pl-1 text-left sm:py-1.5"
                      style={{ border: "1px solid rgb(229, 231, 235)" }}
                    >
                      {header}
                    </th>
                    <td
                      style={{ border: "1px solid rgb(229, 231, 235)" }}
                      className="pr-1 text-right"
                    >
                      {product.specsTableValues[idx]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <table
            className="basis-full"
            style={{ border: "1px solid rgb(229, 231, 235)" }}
          >
            <tbody>
              {tableHeaders[product.heatCarrier]
                .slice(product.heatCarrier === "water" ? 10 : 8)
                .map((header, idx) => (
                  <tr key={idx}>
                    <th
                      className="py-2 pl-1 text-left sm:py-1.5"
                      style={{ border: "1px solid rgb(229, 231, 235)" }}
                    >
                      {header}
                    </th>
                    <td
                      className="pr-1 text-right"
                      style={{ border: "1px solid rgb(229, 231, 235)" }}
                    >
                      {
                        product.specsTableValues[
                          product.heatCarrier === "water" ? idx + 10 : idx + 8
                        ]
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* ROW OF IMAGES */}
        {product.frontView && product.parts && (
          <div className="flex flex-col gap-4 sm:flex-row md:gap-6 lg:gap-4 xl:gap-10">
            <div
              className={`relative w-full`}
              style={{
                aspectRatio: `${product.frontView.width}/${product.frontView.height}`,
              }}
            >
              <Image
                src={product.frontView.url}
                alt={`Воздухонагреватель ${product.shortName}`}
                title={product.name}
                fill
              />
            </div>
            <div
              className={`relative w-full`}
              style={{
                aspectRatio: `${product.parts.width}/${product.parts.height}`,
              }}
            >
              <Image
                src={product.parts.url}
                alt={`${product.name} чертеж`}
                title={`Калорифер ${heatCarrierAdj.nom} ${product.shortName}`}
                fill
              />
            </div>
          </div>
        )}
      </section>

      <ProductSubheader
        text={`Таблица расчета и подбора ${heatCarrierAdj?.gen} ${isCalorifier ? "калорифера" : "агрегата"} ${isCalorifier ? product.shortName : product.model}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные {heatCarrierAdj?.gen}{" "}
        {isCalorifier
          ? `калорифера ${product.shortName}`
          : `агрегата ${product.shortName.replace(" ", "")} (на базе ${rowsNumberAdj.gen} ${heatCarrierAdj.gen} калорифера ${product.calorifier.replace(/[0-9]/g, "")})`}{" "}
        производства ООО Т.С.Т. Выбрав в верхней части таблицы подходящий вам
        график теплоносителя, можно ознакомиться с основными теплотехническими
        показателями: температурой воздуха на выходе,
        {isCalorifier &&
          product.heatCarrier === "water" &&
          " гидравлическим и аэродинамическим сопротивлением,"}{" "}
        {!isCalorifier &&
          product.heatCarrier === "water" &&
          " сопротивлением по воде и расходом теплоносителя,"}{" "}
        {isCalorifier &&
          product.heatCarrier === "steam" &&
          " аэродинамическим сопротивлением,"}{" "}
        вырабатываемой мощностью
        {product.heatCarrier === "steam" && " и расходом пара"}.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title={`Таблица рабочих параметров ${isCalorifier ? "калорифера" : "агрегата"}`}
        className={`${isCalorifier ? "h-65" : "h-59"} mb-1 w-full`}
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего
        {isCalorifier && " вентиляционного и"}{" "}
        {tableEquipment[product.heatCarrier]} оборудования.
      </ProductParagraph>

      <ProductSubheader
        text={`Габаритные размеры ${isCalorifier ? "калорифера" : "агрегата"} ${product.shortName}`}
      />
      <Image
        src={product.drawing}
        alt={`${heatCarrierAdj.nom} ${isCalorifier ? `калорифер ${product.shortName}` : `агрегат ${product.model}`} габаритные размеры`}
        title={`${isCalorifier ? `Калорифер ${product.shortName} ${heatCarrierAdj?.nom}` : `Отопительный агрегат ${product.model}`} технические характеристики`}
        width={968}
        height={1}
        className="mb-4"
      />
      <div className="mb-10 w-full overflow-x-auto">
        <table className="w-full min-w-231 xl:min-w-auto">
          <thead>
            <tr>
              <th
                colSpan={9}
                className="pl-1 text-left"
                style={{ fontSize: "11pt" }}
              >
                Габаритные и присоединительные размеры калорифера{" "}
                {product.shortName} {heatCarrierAdj?.gen}, мм
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {product.heatCarrier === "water" ? (
                <>
                  <td>L</td>
                  <td>L 1</td>
                  <td>L 2</td>
                  <td>L 3</td>
                  <td>H</td>
                  <td>H 1</td>
                  <td>H 2</td>
                </>
              ) : (
                <>
                  <td>H</td>
                  <td>H 1</td>
                  <td>H 2</td>
                  <td>H 3</td>
                  <td>B</td>
                  <td>B 1</td>
                  <td>B 2</td>
                </>
              )}
              <td>C</td>
              <td>dy</td>
            </tr>
            <tr>
              {product.sizeTableValues.map((value, i) => (
                <td key={i} style={{ fontSize: "11pt" }}>
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <LinkButtonsBlock buttons={linkButtons} />
    </div>
  );
}
