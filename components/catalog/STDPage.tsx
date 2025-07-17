import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";
import SimilarProductLink from "./similarProductLink";

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
        показателями: температурой воздуха на выходе, сопротивлением по воде и
        расходом теплоносителя, вырабатываемой мощностью.
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title={`Таблица расчета и подбора ${heatCarrierAdj?.gen} агрегата ${product.shortName}`}
        className="mb-1 h-65 w-full"
      />
      <ProductParagraph className="mb-4">
        Табличные данные можно использовать при подборе сопутствующего
        насосно-смесительного оборудования.
      </ProductParagraph>
      <ProductSubheader text={`Технические характеристики ${product.model}`} />

      <div className="single-table-wrap">
        <table className="single-table">
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
          <tbody>
            {product.variants.map((variant, rowIdx, arr) => (
              <tr key={variant.id}>
                {variant.specsTableValues.map((value, colIdx) => {
                  // Only render the cell if it's the first occurrence in a group
                  if (
                    rowIdx === 0 ||
                    arr[rowIdx - 1].specsTableValues[colIdx] !== value
                  ) {
                    const rowSpan = getRowSpan(
                      variant.specsTableValues,
                      arr.slice(rowIdx),
                      colIdx,
                    );
                    return (
                      <td key={colIdx} rowSpan={rowSpan}>
                        {value}
                      </td>
                    );
                  }
                  // Otherwise, skip rendering this cell
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getRowSpan(values, variants, colIdx) {
  // Count how many consecutive variants have the same value at colIdx
  let span = 1;
  for (let i = 1; i < variants.length; i++) {
    if (variants[i].specsTableValues[colIdx] === values[colIdx]) {
      span++;
    } else {
      break;
    }
  }
  return span > 1 ? span : undefined;
}
