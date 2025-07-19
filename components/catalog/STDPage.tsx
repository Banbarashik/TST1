import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";
import SimilarProductLink from "./similarProductLink";
import Image from "next/image";
import STDSpecsTable from "./STDSpecsTable";
import TableAndCatalogLinks from "./tableAndCatalogLinks";

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
        const name = `Воздушно-отопительный агрегат ${variant.model}`;

        return (
          <div key={variant.id} className="mb-6 flex items-start gap-4">
            <ProductCard product={{ ...variant, img: product.img, name }} />
            <div>
              <ProductSubheader text={name} />
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
              {variant.relatedProducts.map(function (p) {
                return (
                  <div key={p.caption} className="mb-4 flex flex-col gap-1">
                    <ProductParagraph className="font-bold">
                      {p.caption}
                    </ProductParagraph>
                    <ul className="flex flex-wrap gap-2">
                      {p.links.map((link) => (
                        <li key={link.slug}>
                          <SimilarProductLink id={link.slug}>
                            {p.shortName}
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
        getRowValues={(variant) => variant.specsTablesValues[0]}
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
        getRowValues={(variant) => variant.specsTablesValues[1]}
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
