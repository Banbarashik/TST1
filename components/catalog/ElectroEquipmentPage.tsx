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
          </div>
        </div>
      </div>
    </div>
  );
}
