"use client";

import * as React from "react";

import { Product, SelectedProduct } from "@/types";

import { productData } from "@/data/products";
import { categoryTree } from "@/data/categories";

import { sortProducts } from "@/lib/utils";

import { Check, X } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/ui/input";

interface ProductMultiSelectProps {
  selectedProducts: SelectedProduct[];
  setSelectedProducts: (selectedProducts: SelectedProduct[]) => void;
  setProductAmount?: (id: string, amount: number) => void;
}

export function ProductMultiSelect({
  selectedProducts,
  setSelectedProducts,
  setProductAmount,
}: ProductMultiSelectProps) {
  // Group products by main category slug
  const mainCategories = categoryTree.map((cat) => ({
    slug: cat.slug,
    title: cat.menuTitle || cat.title,
  }));

  const productDataByMainCategory: Record<string, Product[]> = {};
  for (const category of mainCategories) {
    productDataByMainCategory[category.slug] = productData
      .filter((p) => p.categories.includes(category.slug))
      .sort((a, b) => sortProducts(a.name, b.name));
  }

  const selectedProductData = selectedProducts.map((selProd) =>
    productData.find((prodData) => selProd.id === prodData.id),
  );

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="unstyled"
            type="button"
            className="hover:border-ring hover:ring-ring/50 w-full max-w-full justify-start overflow-hidden border text-ellipsis whitespace-nowrap hover:ring-[3px]"
          >
            {selectedProductData.length === 0
              ? "Выберите товары"
              : selectedProductData.length <= 3
                ? selectedProductData
                    .map((selProdData) => selProdData.name)
                    .join(", ")
                : `${selectedProductData
                    .slice(0, 3)
                    .map((selProdData) => selProdData.name)
                    .join(", ")} и ещё ${selectedProductData.length - 3}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Поиск товара..." />
            <CommandList>
              <CommandEmpty>Товар не найден</CommandEmpty>
              {mainCategories.map((cat) =>
                productDataByMainCategory[cat.slug].length > 0 ? (
                  <CommandGroup
                    key={cat.slug}
                    heading={cat.title}
                    className="[&_[cmdk-group-heading]]:text-foreground"
                  >
                    {productDataByMainCategory[cat.slug].map((prodData) => (
                      <CommandItem
                        key={prodData.id}
                        onSelect={() => {
                          const exists = selectedProducts.find(
                            (selProd) => selProd.id === prodData.id,
                          );
                          if (exists) {
                            setSelectedProducts(
                              selectedProducts.filter(
                                (selProd) => selProd.id !== prodData.id,
                              ),
                            );
                          } else {
                            setSelectedProducts([
                              ...selectedProducts,
                              { id: prodData.id, amount: 1 },
                            ]);
                          }
                        }}
                        data-selected={selectedProducts.some(
                          (selProd) => selProd.id === prodData.id,
                        )}
                      >
                        {prodData.name}
                        {selectedProducts.some(
                          (selProd) => selProd.id === prodData.id,
                        ) && (
                          <Check className="ml-auto size-4 text-black opacity-50" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null,
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Chips for selected products */}
      <div className="mt-2 flex flex-col gap-2">
        {selectedProductData.map((selProdData) => {
          // map data products to selected product
          const selectedProduct = selectedProducts.find(
            (selProd) => selProd.id === selProdData.id,
          );

          const price = selProdData.price;
          const amount = selectedProduct?.amount ?? 1;
          const total = price * amount;

          return (
            <div key={selProdData.id} className="flex items-center gap-4">
              <div className="bg-accent flex max-w-fit items-center gap-5 rounded px-3 py-1.5 text-sm">
                {selProdData.name}
                <NumberInput
                  className={{
                    root: "bg-white",
                    button: "rounded-xs hover:bg-gray-200",
                    input: "",
                  }}
                  value={selectedProduct.amount}
                  disabled={selectedProduct.amount === 1}
                  decrease={(e) => {
                    e.preventDefault();
                    if (selectedProduct.amount > 1) {
                      setProductAmount(
                        selectedProduct.id,
                        selectedProduct.amount - 1,
                      );
                    }
                  }}
                  increase={(e) => {
                    e.preventDefault();
                    setProductAmount(
                      selectedProduct.id,
                      selectedProduct.amount + 1,
                    );
                  }}
                  change={(e) => {
                    const newAmount = Number(e.target.value);
                    if (newAmount >= 1)
                      setProductAmount(selectedProduct.id, newAmount);
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedProducts(
                      selectedProducts.filter(
                        (selProd) => selProd.id !== selProdData.id,
                      ),
                    )
                  }
                  aria-label="Удалить"
                >
                  <X className="size-4" />
                </button>
              </div>

              <p>{total.toLocaleString("ru-RU")} руб.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
