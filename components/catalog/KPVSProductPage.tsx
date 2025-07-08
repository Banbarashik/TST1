import Image from "next/image";
import Link from "next/link";

import type { KPVSProduct } from "@/types";

import ProductCard from "@/components/catalog/productCard";
import ProductRequestControls from "@/components/catalog/productRequestControls";
import { Button } from "@/components/ui/button";

export default function KPVSProductPage({ product }: { product: KPVSProduct }) {
  const {
    name,
    variants,
    prevProduct,
    nextProduct,
    airPower,
    img,
    textContent,
    headers,
    calculator,
    tableData,
  } = product;

  const [table] = tableData;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase">{name}</h1>
        <Link
          href="#"
          className="bg-accent rounded-md px-3 py-2 text-sm font-semibold"
        >
          Скачать 3D-модель
        </Link>
      </div>
      <p className="mb-6 text-lg">{textContent[0]}</p>
      {variants && variants.length > 0 ? (
        <div className="mb-12 grid grid-cols-3 gap-5">
          {variants.map(function (variant) {
            return (
              <ProductCard
                key={variant.id}
                isVariant
                product={{ ...variant, airPower, img }}
              />
            );
          })}
        </div>
      ) : (
        <ProductRequestControls product={product} />
      )}
      <h2 className="mb-4 text-2xl">{headers[0]}</h2>
      <p className="mb-2.5 text-lg">{textContent[1]}</p>
      <iframe
        src={calculator}
        title="Калькулятор калорифера"
        style={{
          width: "100%",
          height: "697px",
          border: "none",
        }}
        className="mb-0.5"
      />
      <p className="mb-10 text-lg">
        {textContent[2]}
        {nextProduct && (
          <Link
            href={nextProduct.slug}
            className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
          >
            {nextProduct.name}
          </Link>
        )}
        {textContent[3]}
        {prevProduct && (
          <Link
            href={prevProduct.slug}
            className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
          >
            {prevProduct.name}
          </Link>
        )}
      </p>
      <h2 className="mb-6 text-2xl">{headers[1]}</h2>
      <table className="single-table water-and-steam water-and-steam-inner mb-1">
        {table.caption && <caption>{table.caption}</caption>}
        <thead>
          {table.headers.map((row, i) => (
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
          {table.rows.map((row, i) => (
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
      {product.drawing && (
        <Image
          src={product.drawing}
          alt={product.name}
          width={968}
          height={1}
          className="mb-10"
        />
      )}

      <div className="flex h-12 w-full gap-6">
        <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
          <Link href="#">Приточные водяные калориферы</Link>
        </Button>
        <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
          <Link href="#">Скачать каталог PDF</Link>
        </Button>
      </div>

      <Button
        size="xl"
        className="fixed bottom-[200px] left-[100px] cursor-pointer bg-[#574184] hover:bg-[#7e5ebd]"
      >
        Задать вопрос
      </Button>
    </div>
  );
}
