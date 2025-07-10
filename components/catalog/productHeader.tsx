import Link from "next/link";

import type { PritochnyProduct, Product } from "@/types";

export default function ProductHeader({
  product,
}: {
  product: Product | PritochnyProduct;
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
