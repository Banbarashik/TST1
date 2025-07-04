"use client";

import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Product } from "@/types";

import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";

export default function ProductRequestControls({
  product,
}: {
  product: Product;
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
    <div className="mt-4 flex items-center gap-4">
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
