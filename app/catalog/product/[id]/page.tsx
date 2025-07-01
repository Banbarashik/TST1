"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useProductSelection } from "@/context/ProductSelectionContext";
import { productData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";
import Image from "next/image";
import ProductCard from "@/components/catalog/productCard";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const product = productData.find((p) => p.id === id);
  const { selected, add, remove, setAmount } = useProductSelection();

  if (!product) return <div>Товар не найден</div>;

  // If product has variants, let user select one
  const [selectedVariantId, setSelectedVariantId] = useState("");

  // Determine which id is currently being worked with
  const currentId =
    product.variants && product.variants.length > 0
      ? selectedVariantId
      : product.id;

  // Find if this product/variant is already selected
  const selectedProduct = selected.find((item) => item.id === currentId);
  const isSelected = !!selectedProduct;

  // For SSR hydration safety (optional, as in ProductCard)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddOrRemove = () => {
    if (!isMounted) return;
    isSelected ? remove(currentId) : add(currentId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      {product.variants && product.variants.length > 0 ? (
        <div className="grid grid-cols-3 gap-5">
          {product.variants.map(function (variant) {
            return (
              <ProductCard
                product={{ ...variant, airPower: product.airPower }}
              />
            );
          })}
        </div>
      ) : (
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
      )}
    </div>
  );
}
