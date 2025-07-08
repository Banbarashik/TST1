import { productData } from "@/data/products";

import type { Metadata } from "next";

import KPVSProductPage from "@/components/catalog/KPVSProductPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  return {
    title: product?.metadata?.title,
    description: product?.metadata?.description,
    keywords: product?.metadata?.keywords,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  if (!product) return <div>Товар не найден</div>;

  if (product.categories.includes("kpvs"))
    return <KPVSProductPage product={product} />;
}
