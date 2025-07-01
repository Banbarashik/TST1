"use client";
import { productData } from "@/data/products";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";
import ProductCard from "@/components/catalog/productCard";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const product = productData.find((p) => p.id === id);
  const { selected, add, remove, setAmount } = useProductSelection();

  if (!product) return <div>Товар не найден</div>;

  const selectedProduct = selected.find((item) => item.id === product.id);
  const isSelected = !!selectedProduct;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddOrRemove = () => {
    if (!isMounted) return;
    isSelected ? remove(product.id) : add(product.id);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants && product.variants.length > 0 ? (
        <div>
          <div className="mb-20 grid grid-cols-3 gap-5">
            {product.variants.map(function (variant) {
              return (
                <ProductCard
                  key={variant.id}
                  isVariant
                  product={{
                    ...variant,
                    airPower: product.airPower,
                    img: product.img,
                  }}
                />
              );
            })}
          </div>

          <iframe
            src={product.calculator}
            title="Калькулятор калорифера"
            style={{
              width: "100%",
              height: "800px", // adjust height as needed
              border: "none",
            }}
          />
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
