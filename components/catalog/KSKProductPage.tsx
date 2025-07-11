import { productData } from "@/data/products";

import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Table from "@/components/ui/table";
import ProductCard from "@/components/catalog/productCard";
import ProductHeader from "@/components/catalog/productHeader";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

const sizeRegex = /ksk-\d+-(\d+)$/;
const shortNameRegex = /КСк \d+-\d+/;

export default function KSKProductPage({ product }: { product: KSKProduct }) {
  const category = product.categories.find((cat: string) =>
    ["ksk-2", "ksk-3", "ksk-4"].includes(cat),
  );
  const KSKProducts = productData.filter((p) => p.categories.includes("ksk"));

  const [, thisProductsize] = product.id.match(sizeRegex);
  const sameSizeProducts = KSKProducts.filter(function (product) {
    const [, anotherProductSize] = product.id.match(sizeRegex)!;
    return thisProductsize === anotherProductSize;
  })
    .sort((a, b) => sortProducts(a.name, b.name))
    .map((p) => ({
      id: p.id,
      shortName: p.name.match(shortNameRegex)![0],
    }));

  const sameNumOfRowsProducts = KSKProducts.filter((p) =>
    p.categories.includes(category),
  )
    .sort((a, b) => sortProducts(a.name, b.name))
    .map((p) => ({
      id: p.id,
      shortName: p.name.match(shortNameRegex)![0],
    }));

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} />
        <div>
          <ProductSubheader text={product.headers[0]} />
          <ProductParagraph>{product.textContent[0]}</ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>{product.textContent[1]}</li>
            <li>{product.textContent[2]}</li>
          </ul>
          <div className="mb-4 flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              {product.textContent[3]}
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {sameSizeProducts.map(({ id, shortName }) => (
                <li key={id}>
                  <SimilarProductLink id={id} isActive={id === product.id}>
                    {shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              {product.textContent[4]}
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {sameNumOfRowsProducts.map(({ id, shortName }) => (
                <li key={id}>
                  <SimilarProductLink id={id} isActive={id === product.id}>
                    {shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductSubheader text={product.headers[0]} />
      <ProductParagraph className="mb-3">
        {product.textContent[5]}
      </ProductParagraph>
      <iframe
        src={product.tableWithTabs}
        title="Таблица рабочих параметров калорифера"
        className="mb-3 h-65 w-full"
      />
      <ProductSubheader text={product.headers[1]} />
      <Table tableData={product.tableData[0]} className="mb-4" />
      <Image
        src={product.drawing}
        alt={product.name}
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
