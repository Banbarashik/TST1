"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductCard({ product }) {
  const { selected, add, remove, setAmount } = useProductSelection();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const selectedProduct = selected.find((item) => item.id === product.id);
  const isSelected = !!selectedProduct;

  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <div className="rounded-lg border p-4 transition hover:shadow-md">
        <Image src={product.img} alt={product.name} width={300} height={300} />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <Button
          type="button"
          variant={isMounted && isSelected ? "secondary" : "default"}
          className="mt-2"
          onClick={(e) => {
            e.preventDefault();
            if (!isMounted) return;
            isSelected ? remove(product.id) : add(product.id);
          }}
        >
          {isMounted && isSelected ? "Убрать из заявки" : "В заявку"}
        </Button>
        {/* Amount input, only if selected */}
        {isMounted && isSelected && (
          <div className="mt-2 flex items-center gap-2">
            <label htmlFor={`amount-${product.id}`} className="text-sm">
              Кол-во:
            </label>
            <div className="flex w-fit items-center rounded border">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="px-2"
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedProduct.amount > 1) {
                    setAmount(product.id, selectedProduct.amount - 1);
                  }
                }}
                aria-label="Уменьшить"
              >
                –
              </Button>
              <Input
                id={`amount-${product.id}`}
                type="number"
                min={1}
                value={selectedProduct.amount}
                onChange={(e) => {
                  const newAmount = Number(e.target.value);
                  if (newAmount >= 1) setAmount(product.id, newAmount);
                }}
                className="no-spinner w-12 border-0 text-center focus:ring-0"
                style={{ boxShadow: "none" }}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="px-2"
                onClick={(e) => {
                  e.preventDefault();
                  setAmount(product.id, selectedProduct.amount + 1);
                }}
                aria-label="Увеличить"
              >
                +
              </Button>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
