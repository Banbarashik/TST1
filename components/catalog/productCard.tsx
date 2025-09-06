"use client";

import Link from "next/link";
import Image from "next/image";

import type { Product, ProductVariant, SupplyCalorifier } from "@/types";

import { Button } from "@/components/ui/button";
import ProductRequestControls from "@/components/catalog/productRequestControls";

export default function ProductCard({
  product,
  isLink = true,
}: {
  product: Product | ProductVariant | SupplyCalorifier;
  isLink?: boolean;
}) {
  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;

  return (
    <div className="flex shrink-0 flex-col rounded-lg border p-4 transition hover:shadow-md">
      {isLink ? (
        <Link href={`/${product.id}`}>
          <Image
            //* temporary check, until 'img' prop is obj on all products
            src={product.img?.url ? product.img.url : product.img}
            alt={product.img?.alt ? product.img.alt : product.name}
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
        </Link>
      ) : (
        <>
          <Image
            //* temporary check, until 'img' prop is obj on all products
            src={product.img?.url ? product.img.url : product.img}
            alt={product.img?.alt ? product.img.alt : product.name}
            width={300}
            height={300}
          />
          <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
        </>
      )}
      <div className="mb-4">
        {product.heatPower && product.voltage && !product.airPower && (
          <p>
            Характеристики: {`${product.voltage} В; ${product.heatPower} кВт`}
          </p>
        )}
        {product.airPower && (
          <div>
            Характеристики: {product.airPower} м<sup>3</sup>/ч;{" "}
            <p>{product.heatPower && product.heatPower + " кВт"}</p>
          </div>
        )}
        {!product.airPower && hasVariants && (
          <div>
            <p>Характеристики:</p>
            {product.variants
              .map((variant) => variant.airPower)
              .join(", ", "")}{" "}
            м<sup>3</sup>/ч;
          </div>
        )}
        {hasVariants && (
          <p>
            {product.variants?.map((variant) => variant.heatPower).join(", ")}{" "}
            кВт
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
        <div className="mt-auto flex items-end justify-between">
          <ProductRequestControls product={product} className="mt-auto" />
          {product.price && (
            <p className="text-gray-600">
              {product.price.toLocaleString("ru-RU")} руб. с НДС
            </p>
          )}
        </div>
      )}
    </div>
  );
}
