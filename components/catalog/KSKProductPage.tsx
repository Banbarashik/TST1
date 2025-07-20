import { productData } from "@/data/products";

import Image from "next/image";

import { sortProducts } from "@/lib/utils";
import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

const rowLabels: Record<number, string> = {
  2: "двухрядные",
  3: "трехрядные",
  4: "четырехрядные",
};
const categoryLabels: Record<string, string> = {
  ksk: "КСк",
  kpsk: "КПСк",
};

export default function KSKProductPage({ product }: { product: KSKProduct }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);

  const shortNameWithHyphen = product.shortName.replace(" ", "-");
  const shortNameWithoutHyphen = product.shortName.replace("-", " ");

  const isCalorifier = product.categories.includes("kalorifer");
  const isAgregat = product.categories.includes("agregaty");
  const isKFB = product.categories.includes("kfb");

  const categories = ["ksk", "kpsk", "tvv", "kp", "kfb", "ao2"];
  const category = categories.find((cat) => product.categories.includes(cat));
  const categoryLabel = categoryLabels[category];
  const exactCategory = product.categories.find((cat) =>
    [`${category}-2`, `${category}-3`, `${category}-4`].includes(cat),
  );

  const productsByCategory = productData
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => sortProducts(a.name, b.name));

  const productsByRows = productsByCategory.filter((p) =>
    p.categories.includes(exactCategory),
  );

  const productsBySize = productsByCategory.filter(
    (p) => p.size === product.size,
  );

  const rowsPluAdj = rowLabels[product.rows];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} isLink={false} />
        <div>
          <ProductSubheader
            text={`Калорифер ${product.model} ${product.climate}. ТУ 4863-002-55613706-02`}
          />
          <ProductParagraph>Теплоотдающие элементы: </ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>
              - электросварные прямошовные трубки {product.tubeSize} мм по ГОСТ
              10704-91
            </li>
            <li>
              - цельнотянутые бесшовные трубки {product.tubeSize} мм по ГОСТ
              8734-75 с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением
            </li>
          </ul>
          <div className="mb-4 flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Все калориферы данного типоразмера
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
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Стандартные {rowsPluAdj} типоразмеры
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {productsByRows.map((p) => (
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
        text={`Таблица расчета и подбора ${heatCarrierAdj?.gen} калорифера ${product.shortName}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные водяного калорифера{" "}
        {shortNameWithoutHyphen} производства ООО Т.С.Т. Выбрав в верхней части
        таблицы подходящий вам график теплоносителя, можно ознакомиться с
        основными теплотехническими показателями: температурой воздуха на
        выходе, гидравлическим и аэродинамическим сопротивлением, вырабатываемой
        мощностью.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title="Таблица рабочих параметров калорифера"
        className="mb-1 h-65 w-full"
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего
        вентиляционного и насосно-смесительного оборудования.
      </ProductParagraph>
      <ProductSubheader
        text={`Технические характеристики ${product.shortName} ${heatCarrierAdj?.gen}`}
      />
      <table className="mb-4">
        <thead>
          <tr>
            <th
              colSpan={4}
              className="pl-1 text-left"
              style={{ fontSize: "11pt" }}
            >
              Технические характеристики {heatCarrierAdj.gen} калорифера{" "}
              {product.shortName}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Производительность по воздуху, м<sup>3</sup>/ч
            </td>
            <td>Производительность по теплу, кВт</td>
            <td>
              Площадь поверхности теплообмена, м<sup>2</sup>
            </td>
            <td>Масса, кг</td>
          </tr>
          <tr>
            {product.specsTableValues.map((value, i) => (
              <td key={i} style={{ fontSize: "11pt" }}>
                {value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Image
        src={product.drawing}
        alt={`${heatCarrierAdj.nom} калорифер ${product.shortName} габаритные размеры`}
        title={`Калорифер ${product.shortName} ${heatCarrierAdj?.nom} технические характеристики`}
        width={968}
        height={1}
        className="mb-4"
      />
      <table className="mb-10">
        <thead>
          <tr>
            <th
              colSpan={9}
              className="pl-1 text-left"
              style={{ fontSize: "11pt" }}
            >
              Габаритные и присоединительные размеры калорифера{" "}
              {product.shortName} {heatCarrierAdj?.gen}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>L</td>
            <td>L 1</td>
            <td>L 2</td>
            <td>L 3</td>
            <td>H</td>
            <td>H 1</td>
            <td>H 2</td>
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
      <TableAndCatalogLinks
        tableURL="#"
        tableLinkText={`${heatCarrierAdj?.plu} калориферы ${categoryLabel}`}
        catalogURL="#"
      />
    </div>
  );
}
