"use client";
import { productData } from "@/data/products";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useProductSelection } from "@/context/ProductSelectionContext";

import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";
import ProductCard from "@/components/catalog/productCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const product = productData.find((p) => p.id === id);
  const { selected, add, remove, setAmount } = useProductSelection();

  if (!product) return <div>Товар не найден</div>;

  const selectedProduct = selected.find((item) => item.id === product.id);
  const isSelected = !!selectedProduct;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddOrRemove = () => {
    if (!isMounted) return;
    isSelected ? remove(product.id) : add(product.id);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants && product.variants.length > 0 ? (
        <div>
          <div className="mb-20 grid grid-cols-3 gap-5">
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

          <iframe
            src={product.calculator}
            title="Калькулятор калорифера"
            style={{
              width: "100%",
              height: "800px", // adjust height as needed
              border: "none",
            }}
          />

          <Image
            src={product.drawing ?? ""}
            alt={product.name}
            width={968}
            height={1}
          />

          <table className="single-table water-and-steam water-and-steam-inner">
            <thead>
              <tr>
                <th rowSpan={2} className="performance">
                  Производительность
                  <br />
                  по воздуху, м<sup>3</sup>/час
                </th>
                <th colSpan={5} className="measurements">
                  Габаритные и <br /> присоединительные размеры, мм
                </th>
                <th colSpan={2} className="dy" style={{ fontSize: "11pt" }}>
                  dy
                </th>
                <th colSpan={3} className="area">
                  Площадь поверхности <br /> теплообмена, м<sup>2</sup>
                </th>
                <th colSpan={3} className="mass">
                  Масса, кг
                </th>
              </tr>
              <tr>
                <th className="small-cols">
                  L <br /> H
                </th>
                <th className="small-cols">
                  L1 <br /> H1
                </th>
                <th className="small-cols">
                  L2 <br /> H2
                </th>
                <th className="small-cols">L3</th>
                <th className="small-cols">C</th>
                <th className="small-cols" style={{ width: "40px" }}>
                  мм
                </th>
                <th
                  className="small-cols"
                  style={{ width: "40px", paddingTop: "5px" }}
                >
                  "
                </th>
                <th className="kal2">КСк2</th>
                <th className="kal2">КСк3</th>
                <th className="kal2">КСк4</th>
                <th className="kal2">КСк2</th>
                <th className="kal2">КСк3</th>
                <th className="kal2">КСк4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2500</td>
                <td>500</td>
                <td>548</td>
                <td>572</td>
                <td>637</td>
                <td>435</td>
                <td>32</td>
                <td>
                  1 <sup>1</sup>/<sub>4</sub>
                </td>
                <td>6.8</td>
                <td>10.4</td>
                <td>13.7</td>
                <td>31</td>
                <td>37</td>
                <td>43</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <Button
            onClick={handleAddOrRemove}
            variant={isMounted && isSelected ? "secondary" : "default"}
          >
            {isMounted && isSelected ? "Убрать из заявки" : "В заявку"}
          </Button>
          {isMounted && isSelected && (
            <NumberInput
              value={selectedProduct.amount}
              disabled={selectedProduct.amount === 1}
              decrease={() => {
                if (selectedProduct.amount > 1) {
                  setAmount(product.id, selectedProduct.amount - 1);
                }
              }}
              increase={() => setAmount(product.id, selectedProduct.amount + 1)}
              change={(e) => {
                const newAmount = Number(e.target.value);
                if (newAmount >= 1) setAmount(product.id, newAmount);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
