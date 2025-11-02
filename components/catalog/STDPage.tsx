import productData from "@/data/products.json";

import Image from "next/image";

import { capitalizeFirst } from "@/lib/utils";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import LinkButtonsBlock from "@/components/linkButtonsBlock";
import React from "react";

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

function tableHeaders(model: string) {
  return {
    water: [
      `Наименование агрегата ${model}`,
      <>
        Производительность по воздуху, м<sup>3</sup>/час
      </>,
      "Тепловая мощность агрегата, кВт",
      "Установленный вентилятор",
      "Двигатель, кВт/об. мин.",
      "Масса отопительного агрегата, кг",
      "Установленный водяной калорифер",
      "Объем комплектуемого калорифера, л",
      <>
        Площадь поверхности теплообмена, м<sup>2</sup>
      </>,
      "Диаметр патрубков, Ду мм",
      <>
        Расход теплоносителя min-max, м<sup>3</sup>/час
      </>,
      "Гидравлическое сопротивление min- max, кПа",
    ],
    steam: [
      `Наименование агрегата ${model}`,
      <>
        Производительность по воздуху, м<sup>3</sup>/час
      </>,
      "Тепловая мощность агрегата, кВт",
      "Установленный вентилятор",
      "Двигатель, кВт/об. мин.",
      "Масса отопительного агрегата, кг",
      "Установленный паровой калорифер",
      <>
        Емкость комплектуемого калорифера, м<sup>3</sup>
      </>,
      <>
        Площадь поверхности теплообмена, м<sup>2</sup>
      </>,
      "Диаметр патрубков, Ду мм",
      "Расход теплоносителя min, кг/час",
      "Расход теплоносителя max, кг/час",
    ],
  };
}

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
        <div className="mb-6 flex flex-col sm:flex-row sm:gap-6 md:gap-10 lg:gap-6 xl:gap-24">
          <table
            className="basis-full"
            style={{ border: "1px solid rgb(229, 231, 235)" }}
          >
            <tbody>
              {tableHeaders(product.model)
                [product.heatCarrier].slice(0, 6)
                .map((header, idx) => (
                  <React.Fragment key={idx}>
                    <tr>
                      <th
                        colSpan={2}
                        style={{ border: "1px solid rgb(229, 231, 235)" }}
                        className="py-1.5"
                      >
                        {header}
                      </th>
                    </tr>
                    <tr>
                      {product.variants.map((v) => (
                        <td
                          key={v.id}
                          style={{ border: "1px solid rgb(229, 231, 235)" }}
                          className="py-1.5"
                        >
                          {v.specsTablesValues[idx]}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
          <table
            className="basis-full"
            style={{ border: "1px solid rgb(229, 231, 235)" }}
          >
            <tbody>
              {tableHeaders(product.model)
                [product.heatCarrier].slice(6)
                .map((header, idx) => (
                  <React.Fragment key={idx}>
                    <tr>
                      <th
                        colSpan={3}
                        style={{ border: "1px solid rgb(229, 231, 235)" }}
                        className="py-1.5"
                      >
                        {header}
                      </th>
                    </tr>
                    <tr>
                      {product.variants.map((v) => (
                        <td
                          key={v.id}
                          style={{ border: "1px solid rgb(229, 231, 235)" }}
                          className="py-1.5"
                        >
                          {v.specsTablesValues[idx + 6]}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
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
                alt={`${capitalizeFirst(heatCarrierAdj.nom)} воздушный агрегат ${product.shortName}`}
                title={`Агрегат ${product.shortName} ${heatCarrierAdj.nom}`}
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
                title={`${capitalizeFirst(heatCarrierAdj.nom)} отопительный агрегат СТД-300`}
                alt={`Воздушно-отопительный агрегат ${product.shortName} ${heatCarrierAdj.nom}`}
                fill
              />
            </div>
          </div>
        )}
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

      <section className="mb-10">
        <ProductSubheader
          text={`Габаритные размеры агрегатов ${product.shortName} ${heatCarrierAdj.gen}`}
        />
        <Image
          src={product.drawing}
          title={`${capitalizeFirst(heatCarrierAdj.nom)} агрегат ${product.shortName} габаритные размеры`}
          alt={`Отопительный агрегат ${product.model} технические характеристики`}
          width={968}
          height={1}
          className="mb-5"
        />
        <table className="mx-auto w-full max-w-200">
          <thead>
            <tr>
              <th colSpan={4} className="py-1">
                Габаритные размеры, мм
              </th>
            </tr>
            <tr>
              <th className="w-1/4 py-1">Агрегат</th>
              <th className="w-1/4 py-1">L</th>
              <th className="w-1/4 py-1">B</th>
              <th className="w-1/4 py-1">H</th>
            </tr>
          </thead>
          <tbody>
            {[
              `СТД-300 (${product.variants[0].calorifier})`,
              `СТД-300 (${product.variants[1].calorifier})`,
            ].map((agregat, idx) => (
              <tr key={agregat}>
                <td className="px-1.5 text-left">{agregat}</td>
                {product.variants[idx].sizeTableValues.map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <LinkButtonsBlock buttons={linkButtons} />
    </div>
  );
}
