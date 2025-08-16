import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";
import SimilarProductLink from "./similarProductLink";
import STDSpecsTable from "./STDSpecsTable";
import Image from "next/image";
import TableAndCatalogLinks from "./tableAndCatalogLinks";
import { productData } from "@/data/products";
import { capitalizeFirst } from "@/lib/utils";

export default function AVOPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);
  const oppositeHeatCarrier =
    product.heatCarrier === "water" ? "steam" : "water";
  const oppositeHeatCarrierAdj = getHeatCarrierAdj(oppositeHeatCarrier);
  const name = `Воздушно-отопительный агрегат ${product.shortName} ${heatCarrierAdj.nom} ТУ 4864-003-55613706-02`;

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

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-12 grid grid-cols-3 gap-5">
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
            />
          );
        })}
      </div>
      <div className="mb-5 flex gap-10">
        <div>
          <ProductSubheader text={name} />
          <ProductParagraph>
            Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
            {product.calorifier}:
          </ProductParagraph>
          <ul className="mb-4 text-lg">
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
        <div className="shrink-0 space-y-2">
          <p className="font-bold">
            {capitalizeFirst(oppositeHeatCarrierAdj.plu)} агрегаты АВО ХЛ
          </p>
          <SimilarProductLink id={relatedProduct.id}>
            АВО ХЛ {oppositeHeatCarrierAdj.plu}
          </SimilarProductLink>
        </div>
      </div>

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
        text={`Технические характеристики ${product.shortName} ${heatCarrierAdj.pluGen}`}
      />
      <STDSpecsTable
        rows={product.variants}
        getRowValues={(variant) => variant.specsTableValues}
        headers={
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>
                Производительность по воздуху, м<sup>3</sup>/ч
              </th>
              <th>Производительность по теплу, кВт</th>
              <th>Габариты, мм (длина - ширина - высота)</th>
              <th>Масса, кг</th>
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
        className="mb-10"
        rows={product.variants}
        getRowValues={(variant) => variant.componentsTableValues}
        headers={
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>Комплектуемый осевой вентилятор</th>
              <th>Комплектуемый калорифер</th>
              <th>
                Площадь поверхности нагрева, м<sup>2</sup>
              </th>
              <th>dy, мм</th>
            </tr>
          </thead>
        }
      />

      <TableAndCatalogLinks
        tableURL="avo-tvv-kp"
        tableLinkText={`Водяные и паровые агрегаты ${product.shortName}`}
        catalogURL="#"
      />
    </div>
  );
}
