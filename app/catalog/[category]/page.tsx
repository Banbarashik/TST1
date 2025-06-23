import { products } from "@/data/products";

import Image from "next/image";
import Link from "next/link";

// const categories = ["all", "kalorifer", "vodyanoy kalorifer"];

export default async function Catalog({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.categories.includes(category));

  console.log(filteredProducts);
}
