"use client";

import { useState } from "react";
import { useProductSelection } from "@/context/ProductSelectionContext";
import { productData } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function ProductPage({ params }) {
  const { id } = params;
  const product = productData.find((p) => p.id === id);
  const { add } = useProductSelection();

  if (!product) return <div>Товар не найден</div>;

  // If product has variants, let user select one
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants?.[0]?.id || "",
  );

  const handleAdd = () => {
    add(selectedVariantId || product.id);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      {/* ...other product info... */}
      {product.variants && product.variants.length > 0 ? (
        <div className="my-4">
          <div className="mb-2 font-semibold">Выберите вариант:</div>
          <div className="flex flex-col gap-2">
            {product.variants.map((variant) => (
              <label key={variant.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="variant"
                  value={variant.id}
                  checked={selectedVariantId === variant.id}
                  onChange={() => setSelectedVariantId(variant.id)}
                />
                {variant.name}
              </label>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={handleAdd}
            disabled={!selectedVariantId}
          >
            В заявку
          </Button>
        </div>
      ) : (
        <Button className="mt-4" onClick={() => add(product.id)}>
          В заявку
        </Button>
      )}
    </div>
  );
}
