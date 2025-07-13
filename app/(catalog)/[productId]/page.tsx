import { productData } from "@/data/products";

import type { Metadata } from "next";

import PritochnyProductPage from "@/components/catalog/pritochnyProductPage";
import KSKProductPage from "@/components/catalog/KSKProductPage";

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

  if (
    product.categories.includes("pritochny-vodiany-kalorifery") ||
    product.categories.includes("pritochny-parovy-kalorifery")
  )
    return <PritochnyProductPage product={product} />;

  if (product.categories.includes("ksk") || product.categories.includes("kpsk"))
    return <KSKProductPage product={product} />;
}
