import Link from "next/link";

import type { KPVSKPVUProduct, Product } from "@/types";

export default function ProductHeader({
  product,
}: {
  product: Product | KPVSKPVUProduct;
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
      <Link
        href="#"
        className="bg-accent rounded-md px-3 py-2 text-sm font-semibold"
      >
        Скачать 3D-модель
      </Link>
    </div>
  );
}
