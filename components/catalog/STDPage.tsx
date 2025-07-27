import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import { getRowsNumberAdj } from "@/lib/rowsNumberAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";
import SimilarProductLink from "./similarProductLink";
import Image from "next/image";
import STDSpecsTable from "./STDSpecsTable";
import TableAndCatalogLinks from "./tableAndCatalogLinks";
import { productData } from "@/data/products";

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

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants.map(function (variant) {
        const rowsNumberAdj = getRowsNumberAdj(variant.rows);

        const relatedProducts = product.categories.includes("std300")
          ? [
              {
                caption: `Агрегаты СТД-300 ХЛ ${heatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("std300-hl") &&
                    p.heatCarrier === product.heatCarrier,
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
                caption: `Агрегаты СТД-300 ${heatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("std300") &&
                    p.heatCarrier === product.heatCarrier,
                ),
              },
              {
                caption: `Агрегаты АВО ХЛ ${heatCarrierAdj.plu}`,
                products: productData.filter(
                  (p) =>
                    p.categories.includes("avo") &&
                    p.heatCarrier === product.heatCarrier,
                ),
              },
            ];

        return (
          <div
            key={variant.id}
            className="itemsagregat-ao2-3-ksk3-vozdushniy-vodyanoy-start mb-6 flex gap-4"
          >
            <ProductCard
              product={{
                ...variant,
                airPower: product.airPower,
              }}
            />
            <div>
              <ProductSubheader text={variant.name} />
              <ProductParagraph>
                Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
                {variant.calorifier}:
              </ProductParagraph>
              <ul className="mb-4 text-lg">
                <li>
                  - электросварные прямошовные трубки {variant.tubeSize} мм по
                  ГОСТ 10704-91
                </li>
                <li>
                  - цельнотянутые бесшовные трубки {variant.tubeSize} мм по ГОСТ
                  8734-75 с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением
                </li>
              </ul>
              {relatedProducts.map(function (p) {
                return (
                  <div key={p.caption} className="mb-4 flex flex-col gap-1">
                    <ProductParagraph className="font-bold">
                      {p.caption}
                    </ProductParagraph>
                    <ul className="flex flex-wrap gap-2">
                      {p.products.map((product) => (
                        <li key={product.id}>
                          <SimilarProductLink id={product.id}>
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

      <ProductSubheader
        text={`Таблица расчета и подбора ${heatCarrierAdj?.gen} агрегата ${product.shortName}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные воздушно-отопительного агрегата{" "}
        {product.shortName} (на базе трех и четырех рядного многоходового{" "}
        {heatCarrierAdj.gen} калорифера {product.calorifier}) производства ООО
        Т.С.Т. Выбрав в верхней части таблицы подходящий вам график
        теплоносителя, можно ознакомиться с основными теплотехническими
        показателями: {tableIndicators[product.heatCarrier]}.
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

      <ProductSubheader text={`Технические характеристики ${product.model}`} />
      <STDSpecsTable
        rows={product.variants}
        getRowValues={(variant) => variant.specsTablesValues}
        headers={
          <thead>
            <tr>
              <th rowSpan={2}>Наименование агрегата</th>
              <th colSpan={2}>Производительность</th>
              <th colSpan={3}>Габаритные размеры, мм</th>
              <th rowSpan={2} className="w-18">
                Масса, кг
              </th>
            </tr>
            <tr>
              <th>по воздуху, м³/ч</th>
              <th>по теплу, кВт</th>
              <th>L</th>
              <th>B</th>
              <th>H</th>
            </tr>
          </thead>
        }
      />
      <Image
        src={product.drawing}
        alt={`${heatCarrierAdj.nom} агрегат ${product.shortName} габаритные размеры`}
        title={`Отопительный агрегат ${product.model} технические характеристики`}
        width={968}
        height={1}
        className="mb-4"
      />
      <STDSpecsTable
        rows={product.variants}
        getRowValues={(variant) => variant.componentsTableValues}
        headers={
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>Комплектуемый осевой вентилятор</th>
              <th>Комплектуемый калорифер</th>
              <th>Площадь поверхности нагрева, м²</th>
              <th>Ду, мм</th>
            </tr>
          </thead>
        }
        className="mb-10"
      />
      <TableAndCatalogLinks
        tableURL={
          product.shortName === "СТД-300"
            ? "/std300-ksk-kpsk"
            : "/std300-tvv-kp"
        }
        tableLinkText={`Водяные и паровые агрегаты ${product.shortName}`}
        catalogURL="#"
      />
    </div>
  );
}
