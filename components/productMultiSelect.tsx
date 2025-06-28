"use client";

import * as React from "react";

import {
  SelectedProduct,
  useProductSelection,
} from "@/context/ProductSelectionContext";
import { products } from "@/data/products";
import { categoryTree } from "@/data/categories";

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

type Product = (typeof products)[number];

interface ProductMultiSelectProps {
  value: SelectedProduct[];
  onChange: (items: SelectedProduct[]) => void;
}

export function ProductMultiSelect({
  value,
  onChange,
}: ProductMultiSelectProps) {
  const { setAmount } = useProductSelection();

  // Group products by main category slug
  const mainCategories = categoryTree.map((cat) => ({
    slug: cat.slug,
    title: cat.menuTitle || cat.title,
  }));

  const productsByMainCategory: Record<string, Product[]> = {};
  for (const cat of mainCategories) {
    productsByMainCategory[cat.slug] = products.filter((p) =>
      p.categories.includes(cat.slug),
    );
  }

  const selectedProducts = value.map((selectedProduct) =>
    products.find((product) => selectedProduct.id === product.id),
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
            {selectedProducts.length === 0
              ? "Выберите товары"
              : selectedProducts.length <= 3
                ? selectedProducts.map((p) => p.name).join(", ")
                : `${selectedProducts
                    .slice(0, 3)
                    .map((p) => p.name)
                    .join(", ")} и ещё ${selectedProducts.length - 3}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Поиск товара..." />
            <CommandList>
              <CommandEmpty>Товар не найден</CommandEmpty>
              {mainCategories.map((cat) =>
                productsByMainCategory[cat.slug].length > 0 ? (
                  <CommandGroup
                    key={cat.slug}
                    heading={cat.title}
                    className="[&_[cmdk-group-heading]]:text-foreground"
                  >
                    {productsByMainCategory[cat.slug].map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => {
                          const exists = value.find(
                            (item) => item.id === product.id,
                          );
                          console.log(value);
                          if (exists) {
                            onChange(
                              value.filter((item) => item.id !== product.id),
                            );
                          } else {
                            onChange([...value, { id: product.id, amount: 1 }]);
                          }
                        }}
                        data-selected={value.some((v) => v.id === product.id)}
                      >
                        {product.name}
                        {value.some((v) => v.id === product.id) && (
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
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedProducts.map((selectedProduct) => {
          // Find the amount for this product
          const selected = value.find((item) => item.id === selectedProduct.id);
          return (
            <span
              key={selectedProduct.id}
              className="bg-accent flex items-center gap-5 rounded px-3 py-1.5 text-sm"
            >
              {selectedProduct.name}
              <NumberInput
                className={{
                  root: "bg-white",
                  button: "rounded-xs hover:bg-gray-200",
                  input: "",
                }}
                value={selected.amount}
                disabled={selected.amount === 1}
                decrease={(e) => {
                  e.preventDefault();
                  if (selected.amount > 1) {
                    setAmount(selected.id, selected.amount - 1);
                  }
                }}
                increase={(e) => {
                  e.preventDefault();
                  setAmount(selected.id, selected.amount + 1);
                }}
                change={(e) => {
                  const newAmount = Number(e.target.value);
                  if (newAmount >= 1) setAmount(selected.id, newAmount);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  onChange(
                    value.filter(
                      (product) => product.id !== selectedProduct.id,
                    ),
                  )
                }
                aria-label="Удалить"
              >
                <X className="size-4" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
