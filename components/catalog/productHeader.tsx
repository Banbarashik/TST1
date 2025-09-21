import Link from "next/link";

import type { SupplyCalorifier, Product } from "@/types";

export default function ProductHeader({
  product,
}: {
  product: Product | SupplyCalorifier;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h1 className="text-xl font-bold uppercase">{product.name}</h1>
      <Link
        href="#"
        className="bg-accent rounded-md px-3 py-2 text-sm font-semibold"
      >
        Скачать 3D-модель
      </Link>
    </div>
  );
}
