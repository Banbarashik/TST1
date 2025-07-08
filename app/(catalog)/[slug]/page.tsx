import { notFound } from "next/navigation";

import { resolveSlug } from "@/lib/resolveSlug";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const resolved = resolveSlug(slug);
  console.log(resolved);

  if (!resolved) return notFound();
}
