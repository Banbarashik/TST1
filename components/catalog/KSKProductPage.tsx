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
  2: {
    plu: "двухрядные",
    gen: "двухрядного",
  },
  3: {
    plu: "трехрядные",
    gen: "трехрядного",
  },
  4: { plu: "четырехрядные", gen: "четырехрядного" },
};
const categoryLabels: Record<string, string> = {
  ksk: "КСк",
  kpsk: "КПСк",
};
const tableEquipment: Record<string, string> = {
  water: "насосно-смесительного",
  steam: "пароконденсатного",
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

  const productsByCategory = productData
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => sortProducts(a.name, b.name));
  const productsByRows = productsByCategory.filter(
    (p) => p.rows === product.rows,
  );
  const productsBySize = productsByCategory.filter(
    (p) => p.size === product.size,
  );

  const rowsAdj = rowLabels[product.rows];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} isLink={false} />
        <div>
          <ProductSubheader
            text={`${isCalorifier ? "Калорифер" : "Воздушно-отопительный агрегат"} ${product.model}${product.climate ? ` ${product.climate}` : ""}. ТУ 4863-002-55613706-02`}
          />
          <ProductParagraph>
            {isCalorifier
              ? "Теплоотдающие элементы:"
              : `Теплоотдающие элементы ${heatCarrierAdj.gen} калорифера ${product.calorifier}:`}{" "}
          </ProductParagraph>
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
              {isCalorifier ? "Все калориферы" : "Агрегаты"} данного типоразмера
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
              {isCalorifier ? "Стандартные" : "Все"} {rowsAdj.plu} типоразмеры
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
        text={`Таблица расчета и подбора ${heatCarrierAdj?.gen} ${isCalorifier ? "калорифера" : "агрегата"} ${isCalorifier ? product.shortName : product.model}`}
      />
      <ProductParagraph className="mb-3">
        Ниже представлены расчетные данные {heatCarrierAdj?.gen}{" "}
        {isCalorifier
          ? `калорифера ${shortNameWithoutHyphen}`
          : `агрегата ${product.shortName} (на базе ${rowsAdj.gen} ${heatCarrierAdj.gen} калорифера ${product.calorifier.replace(/[0-9]/g, "")})`}{" "}
        производства ООО Т.С.Т. Выбрав в верхней части таблицы подходящий вам
        график теплоносителя, можно ознакомиться с основными теплотехническими
        показателями: температурой воздуха на выходе,
        {isCalorifier &&
          product.heatCarrier === "water" &&
          " гидравлическим и аэродинамическим сопротивлением"}
        {!isCalorifier &&
          product.heatCarrier === "water" &&
          " сопротивлением по воде и расходом теплоносителя"}
        {isCalorifier &&
          product.heatCarrier === "steam" &&
          " аэродинамическим сопротивлением"}
        , вырабатываемой мощностью
        {product.heatCarrier === "steam" && " и расходом пара"}.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title={`Таблица рабочих параметров ${isCalorifier ? "калорифера" : "агрегата"}`}
        className="mb-1 h-65 w-full"
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего
        {isCalorifier && " вентиляционного"} и{" "}
        {tableEquipment[product.heatCarrier]} оборудования.
      </ProductParagraph>
      <ProductSubheader
        text={`Технические характеристики ${isCalorifier ? `${product.shortName} ${heatCarrierAdj?.gen}` : `${product.model}`}`}
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
        alt={`${heatCarrierAdj.nom} ${isCalorifier ? `калорифер ${product.shortName}` : `агрегат ${product.model}`} габаритные размеры`}
        title={`${isCalorifier ? `Калорифер ${product.shortName} ${heatCarrierAdj?.nom}` : `Отопительный агрегат ${product.model}`} технические характеристики`}
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
