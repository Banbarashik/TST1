import { productData } from "@/data/products";

import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Table from "@/components/ui/table";
import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

const sizeRegex = /\d+-(\d+)/;
const rowsRegex = /-(\d+)$/;
const rowLabels: Record<number, string> = {
  2: "двухрядные",
  3: "трехрядные",
  4: "четырехрядные",
};

export default function KSKProductPage({ product }: { product: KSKProduct }) {
  const category = product.categories.includes("ksk")
    ? "ksk"
    : product.categories.includes("kpsk")
      ? "kpsk"
      : "";
  const exactCategory = product.categories.find((cat) =>
    [`${category}-2`, `${category}-3`, `${category}-4`].includes(cat),
  );

  const productsByCategory = productData
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => sortProducts(a.name, b.name));

  const productsByRows = productsByCategory.filter((p) =>
    p.categories.includes(exactCategory),
  );

  const [, size] = product.shortName.match(sizeRegex);
  const productsBySize = productsByCategory.filter(function (p) {
    const [, pSize] = p.id.match(sizeRegex)!;
    return size === pSize;
  });

  const [, rows] = exactCategory.match(rowsRegex);
  const rowsPluAdj = rowLabels[rows] || "";

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} isLink={false} />
        <div>
          <ProductSubheader
            text={`Калорифер ${product.shortName} 02 ХЛ3. ТУ 4863-002-55613706-02`}
          />
          <ProductParagraph>Теплоотдающие элементы: </ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>
              - электросварные прямошовные трубки 16х1.5 мм по ГОСТ 10704-91
            </li>
            <li>
              - цельнотянутые бесшовные трубки 16х1.5 мм по ГОСТ 8734-75 с
              алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением
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
      <ProductSubheader text={product.headers[1]} />
      <ProductParagraph className="mb-3">
        {product.textContent[5]}
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title="Таблица рабочих параметров калорифера"
        className="mb-3 h-65 w-full"
      />
      <ProductSubheader text={product.headers[2]} />
      <Table tableData={product.tableData[0]} className="mb-4" />
      <Image
        src={product.drawing.url}
        alt={product.drawing.alt}
        title={product.drawing.title}
        width={968}
        height={1}
        className="mb-4"
      />
      <Table tableData={product.tableData[1]} className="mb-10" />
      <TableAndCatalogLinks
        tableURL="#"
        tableLinkText="Водяные калориферы КСк"
        catalogURL="#"
      />
    </div>
  );
}
