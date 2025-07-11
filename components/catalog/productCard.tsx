"use client";

import Link from "next/link";
import Image from "next/image";

import type { Product, ProductVariant } from "@/types";

import { Button } from "@/components/ui/button";
import ProductRequestControls from "@/components/catalog/productRequestControls";

export default function ProductCard({
  product,
  isLink = true,
}: {
  product: Product | ProductVariant;
  isLink?: boolean;
}) {
  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;

  return (
    <div className="flex shrink-0 flex-col rounded-lg border p-4 transition hover:shadow-md">
      {isLink ? (
        <Link href={`/${product.id}`}>
          <Image
            src={product.img?.url ? product.img.url : product.img}
            alt={product.img?.alt ? product.img.alt : product.name}
            title={product.img?.title ? product.img.title : product.name}
            width={300}
            height={300}
          />
          <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
        </Link>
      ) : (
        <>
          <Image
            src={product.img ?? ""}
            alt={product.name}
            width={300}
            height={300}
          />
          <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
        </>
      )}
      <div className="mb-4">
        <p>
          Характеристики: {product.airPower} м<sup>3</sup>/ч;{" "}
          {product.heatPower && product.heatPower + " кВт"}
        </p>
        {product.variants && (
          <p>
            {product.variants?.map((variant) => variant.heatPower).join(", ")}{" "}
            кВт
          </p>
        )}
        {product.price && (
          <p className="text-gray-600">
            {product.price.toLocaleString("ru-RU")} руб. с НДС
          </p>
        )}
      </div>
      {hasVariants ? (
        <div className="mt-2 flex items-center justify-between">
          <Button asChild className="ml-auto bg-[#6c51a2] hover:bg-[#8b68d2]">
            <Link href={`/${product.id}`}>Подобрать</Link>
          </Button>
        </div>
      ) : (
        <ProductRequestControls product={product} className="mt-auto" />
      )}
    </div>
  );
}
