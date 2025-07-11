import Image from "next/image";
import Link from "next/link";

import type { PritochnyProduct } from "@/types";

import ProductCard from "@/components/catalog/productCard";
import ProductRequestControls from "@/components/catalog/productRequestControls";
import ProductHeader from "@/components/catalog/productHeader";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export default function PritochnyProductPage({
  product,
}: {
  product: PritochnyProduct;
}) {
  const {
    name,
    variants,
    prevProduct,
    nextProduct,
    airPower,
    img,
    drawing,
    textContent,
    headers,
    calculator,
    tableData,
  } = product;

  const [table] = tableData;

  return (
    <div>
      <ProductHeader product={product} />
      <ProductParagraph className="mb-6">{textContent[0]}</ProductParagraph>
      {variants && variants.length > 0 ? (
        <div className="mb-12 grid grid-cols-3 gap-5">
          {variants.map(function (variant) {
            return (
              <ProductCard
                key={variant.id}
                isLink={false}
                product={{ ...variant, airPower, img }}
              />
            );
          })}
        </div>
      ) : (
        <ProductRequestControls product={product} />
      )}
      <ProductSubheader text={headers[0]} />
      <ProductParagraph className="mb-2.5">{textContent[1]}</ProductParagraph>
      <iframe
        src={calculator}
        title="Калькулятор калорифера"
        style={{
          width: "100%",
          height: "697px",
          border: "none",
        }}
        className="mb-0.5"
      />
      <ProductParagraph className="mb-10">
        {textContent[2]}
        {nextProduct && (
          <Link
            href={nextProduct.slug}
            className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
          >
            {nextProduct.name}
          </Link>
        )}
        {textContent[3]}
        {prevProduct && (
          <Link
            href={prevProduct.slug}
            className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
          >
            {prevProduct.name}
          </Link>
        )}
      </ProductParagraph>
      <ProductSubheader text={headers[1]} />
      <Table
        tableData={table}
        className="single-table water-and-steam water-and-steam-inner mb-1"
      />
      {drawing && (
        <Image
          src={drawing}
          alt={name}
          width={968}
          height={1}
          className="mb-10"
        />
      )}
      <TableAndCatalogLinks
        tableURL="#"
        tableLinkText={
          product.categories.includes("pritochny-vodiany-kalorifery")
            ? "Приточные водяные калориферы"
            : "Приточные паровые калориферы"
        }
        catalogURL="#"
      />
      <Button
        size="xl"
        className="fixed bottom-[200px] left-[100px] cursor-pointer bg-[#574184] hover:bg-[#7e5ebd]"
      >
        Задать вопрос
      </Button>
    </div>
  );
}
