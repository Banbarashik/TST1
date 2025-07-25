import { productData } from "@/data/products";

import Image from "next/image";

import { sortProducts } from "@/lib/utils";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

const oborudovanie = {
  sfo: "электрокалориферов",
  sfotc: "электрокалориферных установок",
  shuk: "шкафов ШУК",
};

const tableLabels = [
  "Номинальная мощность одного нагревателя, кВт",
  "Напряжение питающей сети, В ",
  "Напряжение на нагревателе, В",
  "Частота сети, Гц",
  "Число фаз",
  "Тип ТЭНов",
  "Количество электрических секций",
  "Схема соединений нагревателей в секции",
  "Количество нагревателей, общее, шт.",
  "Количество нагревателей, секция, шт.",
  "Количество нагревателей, группа секции, шт.",
  "Установленная мощность, общая, кВт",
  "Установленная мощность, секция, кВт",
  "Установленная мощность, группа секции, кВт",
  "Производительность по воздуху, м3/ч, не менее",
  "Расчетный ток линии электрокалорифера, А",
  "Расчетный ток одной секции электрокалорифера, А",
  "Силовой кабель от сети, минимальное сечение медной жилы кабеля, мм2",
  "Кабель на секции, минимальное сечение медной жилы на каждую фазу секции, мм2",
  "Внешние габаритные размеры, мм",
  "Масса нагревательного блока, кг",
];

export default function ElectroEquipmentPage({ product }) {
  const preciseCategories = ["sfo", "sfotc", "shuk"];
  const preciseCategory = preciseCategories.find((cat) =>
    product.categories.includes(cat),
  );

  const productsByCategory = productData.filter((p) =>
    p.categories.includes("energonagrevatelynoe-oborudovanie"),
  );
  const productsByPreciseCategory = productsByCategory.filter((p) =>
    p.categories.includes(preciseCategory),
  );
  const productsBySize = productsByCategory.filter(
    (p) => p.id !== product.id && p.size === product.size,
  );

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} isLink={false} />
        <div>
          <ProductSubheader text={`${product.name}. ТУ 3442-004-55613706-02`} />
          <ProductParagraph>Теплоотдающие элементы:</ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>
              - трубчатые электронагреватели Р-54А-13/2.5о220 с алюминиевым (АД1
              ТУ 1-8-267-99) накатным оребрением
            </li>
          </ul>
          <div className="mb-4 flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Все типоразмеры {oborudovanie[preciseCategory]}
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {productsByPreciseCategory.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {p.shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Сопутствующее оборудование
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {productsBySize.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {p.shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ProductSubheader
        text={`Технические характеристики ${product.shortName}`}
      />
      <table className="mx-auto w-176">
        <tbody>
          {tableLabels.map((label, i) => (
            <tr>
              <td className="py-1 pl-1 text-left">{label}</td>
              <td>{product.specsTableValues[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
