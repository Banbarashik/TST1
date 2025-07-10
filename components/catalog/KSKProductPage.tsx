import { productData } from "@/data/products";

import { sortProducts } from "@/lib/utils";

import ProductCard from "@/components/catalog/productCard";
import ProductHeader from "@/components/catalog/productHeader";
import ProductSubheader from "@/components/catalog/productSubheader";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import Table from "@/components/ui/table";
import Image from "next/image";
import TableAndCatalogLinks from "./tableAndCatalogLinks";

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
      <ProductHeader product={product} />
      <div className="flex items-start">
        <ProductCard product={product} />
        <div>
          <p>{product.textContent[0]}</p>
          <ul>
            <li>{product.textContent[1]}</li>
            <li>{product.textContent[2]}</li>
          </ul>
          <div className="flex">
            <p>{product.textContent[3]}</p>
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
          <div className="flex flex-col">
            <p>{product.textContent[4]}</p>
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
      <p>{product.textContent[5]}</p>
      {/* PLACE FOR TABLE WITH TABS */}
      <ProductSubheader text={product.headers[1]} />
      <Table tableData={product.tableData[0]} />
      <Image
        src={product.drawing}
        alt={product.name}
        width={968}
        height={1}
        className="mb-10"
      />
      <Table tableData={product.tableData[1]} />
      <TableAndCatalogLinks
        tableURL="#"
        tableLinkText="Водяные калориферы КСк"
        catalogURL="#"
      />
    </div>
  );
}
