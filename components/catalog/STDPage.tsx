import productData from "@/data/products.json";

import Image from "next/image";

import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import LinkButtonsBlock from "@/components/linkButtonsBlock";

const tableIndicators: Record<string, string> = {
  water:
    "температурой воздуха на выходе, сопротивлением по воде и расходом теплоносителя, вырабатываемой мощностью",
  steam:
    "температурой воздуха на выходе, вырабатываемой мощностью и расходом пара",
};

const tableEquipment: Record<string, string> = {
  water: "насосно-смесительного",
  steam: "пароконденсатного",
};

export default function STDPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);
  const oppositeHeatCarrier =
    product.heatCarrier === "water" ? "steam" : "water";
  const oppositeHeatCarrierAdj = getHeatCarrierAdj(oppositeHeatCarrier);
  const isSTD300 = product.categories.includes("std300");

  const linkButtons = [
    {
      name: `${heatCarrierAdj.plu} агрегаты ${product.shortName}`,
      url:
        product.heatCarrier === "water" ? "/std300-ksk-kpsk" : "/std300-tvv-kp",
      openNewTab: false,
    },
    {
      name: `Каталог ${isSTD300 ? heatCarrierAdj.pluGen : ""} агрегатов ${isSTD300 ? product.shortName : product.model}`,
      url: isSTD300
        ? "/documents/Agregat_STD-300_katalog_2025.pdf"
        : "/documents/Agregat_STD-300-HL_katalog_2025.pdf",
      openNewTab: true,
    },
  ];

  return (
    <div className="@container w-full lg:overflow-x-auto">
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants.map(function (variant, i) {
        const rowsNumberAdj = getRowsNumberAdj(variant.rows);

        const relatedProducts = isSTD300
          ? [
              {
                caption: `Агрегаты СТД-300 ХЛ ${i === 0 ? heatCarrierAdj.plu : oppositeHeatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("std300-hl") &&
                    (i === 0
                      ? p.heatCarrier === product.heatCarrier
                      : p.heatCarrier !== product.heatCarrier),
                ),
              },
              {
                caption: `Агрегаты АО 2 ${product.heatCarrier === "water" ? "в" : "п"} ${rowsNumberAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("ao2") &&
                    p.heatCarrier === product.heatCarrier &&
                    p.rows === variant.rows,
                ),
              },
            ]
          : [
              {
                caption: `Агрегаты СТД-300 ${i === 0 ? heatCarrierAdj.plu : oppositeHeatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("std300") &&
                    (i === 0
                      ? p.heatCarrier === product.heatCarrier
                      : p.heatCarrier !== product.heatCarrier),
                ),
              },
              {
                caption: `Агрегаты АВО ХЛ ${i === 0 ? heatCarrierAdj.plu : oppositeHeatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("avo") &&
                    (i === 0
                      ? p.heatCarrier === product.heatCarrier
                      : p.heatCarrier !== product.heatCarrier),
                ),
              },
            ];

        return (
          <div
            key={variant.id}
            className="mb-6 grid grid-rows-[minmax(0,max-content)_1fr] gap-y-5 sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-6"
          >
            <ProductCard
              isLink={false}
              product={{
                ...variant,
                airPower: product.airPower,
                name: `Агрегат ${variant.model}`,
              }}
              className="row-start-1 row-end-3 self-start justify-self-start sm:row-span-1 lg:col-start-1 lg:row-start-1 lg:row-end-3"
            />
            {/* text */}
            <div className="sm:col-span-full sm:row-start-2 lg:col-auto lg:row-start-1">
              <h2 className="text-xl">{variant.name}.</h2>
              <p className="mb-3 text-xl">ТУ 4864-003-55613706-02</p>
              <ProductParagraph>
                Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
                {variant.calorifier}:
              </ProductParagraph>
              <ul className="text-[17px]">
                <li>
                  - электросварные прямошовные трубки {variant.tubeSize} мм по
                  ГОСТ 10704-91
                </li>
                <li>
                  - цельнотянутые бесшовные трубки {variant.tubeSize} мм по ГОСТ
                  8734-75
                </li>
                <li>с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением</li>
              </ul>
            </div>
            {/* chips */}
            <div className="space-y-4">
              {relatedProducts.map(function (p) {
                return (
                  <div key={p.caption} className="flex flex-col gap-1">
                    <ProductParagraph className="font-bold">
                      {p.caption}
                    </ProductParagraph>
                    <ul className="grid grid-cols-[repeat(auto-fill,minmax(90px,max-content))] gap-x-3 gap-y-4">
                      {p.products.map((product) => (
                        <li key={product.id}>
                          <SimilarProductLink fullWidth={false} id={product.id}>
                            {product.model}
                          </SimilarProductLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <section>
        <ProductSubheader
          text={`Технические характеристики агрегата ${product.model}`}
        />
      </section>

      <ProductSubheader
        text={`Таблица расчета и подбора ${heatCarrierAdj?.gen} агрегата ${product.shortName}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные воздушно-отопительного агрегата{" "}
        {product.shortName} (на базе трех и четырех рядного{" "}
        {product.heatCarrier === "water" ? "многоходового" : "одноходового"}{" "}
        {heatCarrierAdj.gen} калорифера {product.calorifier}) производства ООО
        Т.С.Т. Выбрав в верхней части таблицы подходящий вам график
        теплоносителя, можно ознакомиться с основными теплотехническими
        показателями: {tableIndicators[product.heatCarrier]}.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title={`Таблица расчета и подбора ${heatCarrierAdj?.gen} агрегата ${product.shortName}`}
        className="mb-1 h-66 w-full"
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего{" "}
        {tableEquipment[product.heatCarrier]} оборудования.
      </ProductParagraph>

      <section>
        <ProductSubheader
          text={`Технические характеристики агрегата ${product.model}`}
        />
        <Image
          src={product.drawing}
          alt={`${heatCarrierAdj.nom} агрегат ${product.shortName} габаритные размеры`}
          title={`Отопительный агрегат ${product.model} технические характеристики`}
          width={968}
          height={1}
          className="mb-5"
        />
      </section>

      <LinkButtonsBlock buttons={linkButtons} />
    </div>
  );
}
