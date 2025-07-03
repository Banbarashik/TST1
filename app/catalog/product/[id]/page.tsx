"use client";
import { productData } from "@/data/products";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

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
      <p>{product.textContent?.[0]}</p>

      {product.variants && product.variants.length > 0 ? (
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

      <h2>{product.headers?.[0]}</h2>
      <p>{product.textContent?.[1]}</p>
      <iframe
        src={product.calculator}
        title="Калькулятор калорифера"
        style={{
          width: "100%",
          height: "800px", // adjust height as needed
          border: "none",
        }}
      />
      <h2>{product.headers?.[1]}</h2>
      {product.drawing && (
        <Image
          src={product.drawing}
          alt={product.name}
          width={968}
          height={1}
        />
      )}
      {product.tableData && (
        <table className="single-table water-and-steam water-and-steam-inner">
          {product.tableData.caption && (
            <caption>{product.tableData.caption}</caption>
          )}
          <thead>
            {product.tableData.headers.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <th
                    key={j}
                    rowSpan={cell.rowspan}
                    colSpan={cell.colspan}
                    className={cell.className}
                    style={cell.style}
                  >
                    {cell.content}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {product.tableData.rows.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <td
                    key={j}
                    rowSpan={cell.rowspan}
                    colSpan={cell.colspan}
                    className={cell.className}
                    style={cell.style}
                  >
                    {cell.content}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {product.textContent?.[2]}
    </div>
  );
}
