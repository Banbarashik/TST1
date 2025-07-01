"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";

export default function ProductCard({ product }) {
  const { selected, add, remove, setAmount } = useProductSelection();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedProduct = selected.find((item) => item.id === product.id);
  const isSelected = !!selectedProduct;

  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;

  return (
    <div className="rounded-lg border p-4 transition hover:shadow-md">
      <Link href={`product/${product.id}`} key={product.id}>
        <Image src={product.img} alt={product.name} width={300} height={300} />
        <h2 className="mb-1 text-lg font-semibold">{product.name}</h2>
      </Link>
      <p className="mb-1">
        Характеристики: {product.airPower} м<sup>3</sup>/ч; {product.heatPower}{" "}
        кВт
      </p>
      {product.price && (
        <p className="text-gray-600">{product.price} руб. с НДС</p>
      )}
      <div className="mt-2 flex items-center justify-between">
        {hasVariants ? (
          <Button asChild>
            <Link href={`product/${product.id}`}>В заявку</Link>
          </Button>
        ) : (
          <Button
            type="button"
            variant={isMounted && isSelected ? "secondary" : "default"}
            onClick={(e) => {
              e.preventDefault();
              if (!isMounted) return;
              isSelected ? remove(product.id) : add(product.id);
            }}
          >
            {isMounted && isSelected ? "Убрать из заявки" : "В заявку"}
          </Button>
        )}
        {/* Amount input, only if selected */}
        {isMounted && isSelected && (
          <NumberInput
            value={selectedProduct.amount}
            disabled={selectedProduct.amount === 1}
            decrease={(e) => {
              e.preventDefault();
              if (selectedProduct.amount > 1) {
                setAmount(product.id, selectedProduct.amount - 1);
              }
            }}
            increase={(e) => {
              e.preventDefault();
              setAmount(product.id, selectedProduct.amount + 1);
            }}
            change={(e) => {
              const newAmount = Number(e.target.value);
              if (newAmount >= 1) setAmount(product.id, newAmount);
            }}
          />
        )}
      </div>
    </div>
  );
}
