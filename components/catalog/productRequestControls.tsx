"use client";

import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import type { Product, ProductVariant } from "@/types";

import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";

export default function ProductRequestControls({
  product,
  ...props
}: React.ComponentProps<"div"> & {
  product: Product | ProductVariant;
}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { selected, add, remove, setAmount } = useProductSelection();

  const selectedProduct = selected.find((item) => item.id === product.id);
  const isSelected = !!selectedProduct;

  const handleAddOrRemove = () => {
    if (!isMounted) return;

    if (isSelected) remove(product.id);
    else add(product.id);
  };

  return (
    <div
      className={
        props.className + " flex items-center gap-4 sm:flex-col lg:flex-row"
      }
    >
      <Button
        onClick={handleAddOrRemove}
        variant={isMounted && isSelected ? "secondary" : "default"}
      >
        {isMounted && isSelected ? "Убрать из заявки" : "В заявку"}
      </Button>
      {isMounted && isSelected && (
        <NumberInput
          value={selectedProduct.amount}
          disabled={selectedProduct.amount === 1}
          decrease={() => {
            if (selectedProduct.amount > 1) {
              setAmount(product.id, selectedProduct.amount - 1);
            }
          }}
          increase={() => setAmount(product.id, selectedProduct.amount + 1)}
          change={(e) => {
            const newAmount = Number(e.target.value);
            if (newAmount >= 1) setAmount(product.id, newAmount);
          }}
        />
      )}
    </div>
  );
}
