import { productData } from "@/data/products";

import type { Metadata } from "next";
import Image from "next/image";

import ProductCard from "@/components/catalog/productCard";
import ProductRequestControls from "@/components/catalog/productRequestControls";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = productData.find((p) => p.id === id);

  return {
    title: product?.metadata.title,
    description: product?.metadata.description,
    keywords: product?.metadata.keywords,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = productData.find((p) => p.id === id);

  if (!product) return <div>Товар не найден</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
        <Link
          href="#"
          className="text-md bg-accent rounded-lg p-3 font-semibold"
        >
          Скачать 3D-модель
        </Link>
      </div>
      <p className="mb-10 text-lg">{product.textContent?.[0]}</p>

      {product.variants && product.variants.length > 0 ? (
        <div className="mb-16 grid grid-cols-3 gap-5">
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
        <ProductRequestControls product={product} />
      )}

      <h2 className="mb-6 text-2xl">{product.headers?.[0]}</h2>
      <p className="mb-10 text-lg">{product.textContent?.[1]}</p>
      <iframe
        src={product.calculator}
        title="Калькулятор калорифера"
        style={{
          width: "100%",
          height: "690px", // adjust height as needed
          border: "none",
        }}
        className="mb-16"
      />
      <h2 className="mb-6 text-2xl">{product.headers?.[1]}</h2>
      {product.drawing && (
        <Image
          src={product.drawing}
          alt={product.name}
          width={968}
          height={1}
          className="mb-10"
        />
      )}
      {product.tableData && (
        <table className="single-table water-and-steam water-and-steam-inner mb-10">
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
      <p className="text-lg">{product.textContent?.[2]}</p>
    </div>
  );
}
