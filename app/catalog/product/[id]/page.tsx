"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useProductSelection } from "@/context/ProductSelectionContext";
import { productData } from "@/data/products";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

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
      <Image src={product.img} alt={product.name} width={400} height={400} />
      {product.variants && product.variants.length > 0 ? (
        <div className="my-4">
          <div className="flex flex-col gap-2">
            {
              <Select
                value={selectedVariantId}
                onValueChange={setSelectedVariantId}
              >
                <SelectTrigger className="data-[placeholder]:text-black">
                  <SelectValue placeholder="Выберите вариант" />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {`${variant.name} (${variant.price.toLocaleString("ru-RU")} руб. с НДС)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button
              onClick={handleAddOrRemove}
              disabled={!selectedVariantId}
              variant={isMounted && isSelected ? "secondary" : "default"}
            >
              {isMounted && isSelected ? "Убрать из заявки" : "В заявку"}
            </Button>
            {isMounted && isSelected && (
              <NumberInput
                value={selectedProduct.amount}
                disabled={selectedProduct.amount === 1}
                decrease={(e) => {
                  e.preventDefault();
                  if (selectedProduct.amount > 1) {
                    setAmount(currentId, selectedProduct.amount - 1);
                  }
                }}
                increase={(e) => {
                  e.preventDefault();
                  setAmount(currentId, selectedProduct.amount + 1);
                }}
                change={(e) => {
                  const newAmount = Number(e.target.value);
                  if (newAmount >= 1) setAmount(currentId, newAmount);
                }}
              />
            )}
          </div>
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
      )}
    </div>
  );
}
