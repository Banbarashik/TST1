import { productData } from "@/data/products";

import type { Metadata } from "next";

import { getProductTypeForms } from "@/lib/productType";

import PritochnyProductPage from "@/components/catalog/pritochnyProductPage";
import KSKProductPage from "@/components/catalog/KSKProductPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>;
}): Promise<Metadata> {
  const { productId } = await params;
  const product = productData.find((p) => p.id === productId);

  if (!product) return {};

  const type = getProductTypeForms(product.categories);
  const shortNameWithoutHyphen = product.shortName.replace("-", " ");

  if (
    product.categories.includes("ksk") ||
    product.categories.includes("kpsk")
  ) {
    return {
      title: `Калорифер ${type.nom} ${product.shortName}`,
      description: `Калорифер ${product.shortName} ${type.nom} - производитель предприятие ООО Т.С.Т. Производство, характеристики, размеры, мощность, вес, расчет и цена калорифера ${product.shortName} 02 ХЛ3`,
      keywords: `калорифер ${product.shortName},калорифер ${product.shortName} 02 хл3,калорифер ${shortNameWithoutHyphen} ${type.nom},калорифер ${shortNameWithoutHyphen} технические характеристики,калорифер ${shortNameWithoutHyphen} габаритные размеры,купить калорифер ${product.shortName},калорифер ${shortNameWithoutHyphen} цена,калорифер ${shortNameWithoutHyphen} производительность,калорифер ${shortNameWithoutHyphen} масса,кск ${shortNameWithoutHyphen}`,
    };
  }
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
