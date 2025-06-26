"use client";

import Link from "next/link";
import Image from "next/image";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  const { selected, add, remove } = useProductSelection();
  const isSelected = selected.includes(product.id);

  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <div className="rounded-lg border p-4 transition hover:shadow-md">
        <Image src={product.img} alt={product.name} width={300} height={300} />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <Button
          type="button"
          variant={isSelected ? "secondary" : "default"}
          className="mt-2"
          onClick={(e) => {
            e.preventDefault();
            isSelected ? remove(product.id) : add(product.id);
          }}
        >
          {isSelected ? "Убрать из заявки" : "В заявку"}
        </Button>
      </div>
    </Link>
  );
}
