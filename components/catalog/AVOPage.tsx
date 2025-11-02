import productData from "@/data/products.json";

import React from "react";
import Image from "next/image";

import { capitalizeFirst } from "@/lib/utils";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";

import ProductCard from "@/components/catalog/productCard";
import LinkButtonsBlock from "@/components/linkButtonsBlock";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";

const tableHeaders = {
  water: [
    "Наименование агрегата АВО ХЛ",
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
    "Наименование агрегата АВО ХЛ",
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

export default function AVOPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);
  const oppositeHeatCarrier =
    product.heatCarrier === "water" ? "steam" : "water";
  const oppositeHeatCarrierAdj = getHeatCarrierAdj(oppositeHeatCarrier);

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

  const relatedProduct = productData.find(
    (p) =>
      p.categories.includes("avo") && p.heatCarrier === oppositeHeatCarrier,
  );

  const linkButtons = [
    {
      name: `${heatCarrierAdj.plu} агрегаты АВО ХЛ`,
      url: "/avo-tvv-kp",
      openNewTab: false,
    },
    {
      name: `Каталог ${heatCarrierAdj.pluGen} агрегатов АВО ХЛ`,
      url: "/documents/Agregat_AVO-HL_katalog_2025.pdf",
      openNewTab: true,
    },
  ];

  return (
    <div className="@container w-full lg:overflow-x-auto">
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-8 flex gap-5 overflow-x-auto md:grid md:grid-cols-3 lg:gap-0 xl:gap-5">
        {product.variants.map(function (variant) {
          return (
            <ProductCard
              key={variant.id}
              isLink={false}
              product={{
                ...variant,
                airPower: variant.airPower,
                img: product.img,
              }}
              className="max-w-64 md:max-w-none md:px-4"
            />
          );
        })}
      </div>
      <div className="mb-5 flex flex-col justify-between md:flex-row lg:flex-col xl:flex-row">
        <div>
          <h2 className="text-xl">
            Воздушно-отопительный агрегат {product.shortName}{" "}
            {heatCarrierAdj.nom}.
          </h2>
          <p className="mb-3 text-xl">ТУ 4864-003-55613706-02</p>
          <ProductParagraph>
            Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
            {product.calorifier}:
          </ProductParagraph>
          <ul className="mb-4 text-[17px]">
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
        <div className="ml-px shrink-0 space-y-2">
          <p className="font-bold">
            {capitalizeFirst(oppositeHeatCarrierAdj.plu)} агрегаты АВО ХЛ
          </p>
          <SimilarProductLink id={relatedProduct.id} fullWidth={false}>
            АВО ХЛ {oppositeHeatCarrierAdj.plu}
          </SimilarProductLink>
        </div>
      </div>

      <section className="mb-4">
        <ProductSubheader
          text={`Технические характеристики агрегатов АВО ХЛ ${heatCarrierAdj.pluGen}`}
        />
        <div className="mb-6 flex flex-col sm:flex-row sm:gap-6 md:gap-10 lg:gap-6 xl:gap-24">
          <table
            className="basis-full"
            style={{ border: "1px solid rgb(229, 231, 235)" }}
          >
            <tbody>
              {tableHeaders[product.heatCarrier]
                .slice(0, 6)
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
                          {v.specsTableValues[idx]}
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
              {tableHeaders[product.heatCarrier].slice(6).map((header, idx) => (
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
                        {v.specsTableValues[idx + 6]}
                      </td>
                    ))}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
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
              alt={`Агрегат воздушного отопления ${product.shortName} ${heatCarrierAdj.nom}`}
              title={`${capitalizeFirst(heatCarrierAdj.nom)} отопительный агрегат ${product.shortName}`}
              fill
            />
          </div>
        </div>
      </section>

      <ProductSubheader
        text={`Таблица расчета и подбора ${heatCarrierAdj?.pluGen} агрегатов ${product.shortName}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные воздушно-отопительных агрегатов{" "}
        {product.shortName} (на базе четырехрядного {heatCarrierAdj.gen}{" "}
        калорифера {product.calorifier}) производства ООО Т.С.Т. Выбрав в
        верхней части таблицы подходящий вам график теплоносителя, можно
        ознакомиться с основными теплотехническими показателями:{" "}
        {tableIndicators[product.heatCarrier]}.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title={`Таблица расчета и подбора ${heatCarrierAdj?.gen} агрегата ${product.shortName}`}
        className="mb-1 h-65 w-full"
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего{" "}
        {tableEquipment[product.heatCarrier]} оборудования.
      </ProductParagraph>

      <ProductSubheader
        text={`Габаритные размеры агрегатов ${product.shortName} ${heatCarrierAdj.pluGen}`}
      />
      <Image
        src={product.drawing}
        alt={`${heatCarrierAdj.nom} агрегат ${product.shortName} габаритные размеры`}
        title={`Отопительный агрегат ${product.model} технические характеристики`}
        width={968}
        height={1}
        className="mb-4"
      />
      <table className="mx-auto mb-10 w-full max-w-200">
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
          {["АВО 3-55", "АВО 4-95", "АВО 7-165"].map((agregat, idx) => (
            <tr key={agregat}>
              <td className="px-1.5 text-left">{agregat}</td>
              {product.variants[idx].sizeTableValues.map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <LinkButtonsBlock buttons={linkButtons} />
    </div>
  );
}
