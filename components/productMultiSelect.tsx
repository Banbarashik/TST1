"use client";

import * as React from "react";

import { Product, SelectedProduct } from "@/types";

import productData from "@/data/products.json";
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

function flattenProducts(products: Product[]): Product[] {
  return products.flatMap((product) => {
    if (product.variants && product.variants.length > 0) {
      // Each variant should inherit main product's categories (and other shared fields if needed)
      return product.variants.map((variant) => ({
        ...variant,
        categories: product.categories,
      }));
    }
    return product;
  });
}

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
  const flatProductData = flattenProducts(productData);

  // Group products by main category slug
  const mainCategories = categoryTree.map((category) => ({
    slug: category.slug,
    title: category.menuTitle || category.title,
  }));

  const productDataByMainCategory: Record<string, Product[]> = {};
  for (const category of mainCategories) {
    productDataByMainCategory[category.slug] = flatProductData
      .filter((prodData) => prodData.categories.includes(category.slug))
      .sort((prodDataA, prodDataB) =>
        sortProducts(prodDataA.name, prodDataB.name),
      );
  }

  // map product data to selected products
  const selectedProductData = selectedProducts.map((selProd) =>
    flatProductData.find((prodData) => selProd.id === prodData.id),
  );

  function handleSelectProduct(id: string) {
    const exists = selectedProducts.find((selProd) => selProd.id === id);
    if (exists) {
      setSelectedProducts(
        selectedProducts.filter((selProd) => selProd.id !== id),
      );
    } else {
      setSelectedProducts([...selectedProducts, { id, amount: 1 }]);
    }
  }

  function handleDecreaseProductAmount(id: string, curAmount: number) {
    if (curAmount > 1) setProductAmount(id, curAmount - 1);
  }

  function handleIncreaseProductAmount(id: string, curAmount: number) {
    setProductAmount(id, curAmount + 1);
  }

  function handleChangeProductAmount(id: string, newAmount: number) {
    if (newAmount >= 1) setProductAmount(id, newAmount);
  }

  function handleRemoveSelectedProduct(id: string) {
    const updatedSelectedProducts = selectedProducts.filter(
      (selProd) => selProd.id !== id,
    );

    setSelectedProducts(updatedSelectedProducts);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="unstyled"
            type="button"
            className="hover:border-ring hover:ring-ring/50 flex w-full max-w-131 justify-start border hover:ring-[3px]"
          >
            <span className="truncate">
              {selectedProductData.length === 0
                ? "Выберите товары"
                : selectedProductData
                    .map((selProdData) => selProdData.name)
                    .join(", ")}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Поиск товара..." />
            <CommandList onWheel={(e) => e.stopPropagation()}>
              <CommandEmpty>Товар не найден</CommandEmpty>
              {mainCategories.map((category) =>
                productDataByMainCategory[category.slug].length > 0 ? (
                  <CommandGroup
                    key={category.slug}
                    heading={category.title}
                    className="[&_[cmdk-group-heading]]:text-foreground cursor-default"
                  >
                    {productDataByMainCategory[category.slug].map(
                      (prodData) => (
                        <CommandItem
                          className="cursor-pointer"
                          key={prodData.id}
                          onSelect={() => handleSelectProduct(prodData.id)}
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
                      ),
                    )}
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
              <div className="bg-accent flex w-full items-center gap-5 rounded px-3 py-1.5 text-sm lg:w-3/4">
                {selProdData.name}
                <NumberInput
                  className={{
                    root: "ml-auto bg-white",
                    button: "rounded-xs hover:bg-gray-200",
                    input: "",
                  }}
                  value={selectedProduct.amount}
                  disabled={selectedProduct.amount === 1}
                  decrease={() => {
                    handleDecreaseProductAmount(
                      selectedProduct?.id,
                      selectedProduct?.amount,
                    );
                  }}
                  increase={() => {
                    handleIncreaseProductAmount(
                      selectedProduct?.id,
                      selectedProduct?.amount,
                    );
                  }}
                  change={(e) => {
                    handleChangeProductAmount(
                      selectedProduct?.id,
                      Number(e.target.value),
                    );
                  }}
                />
                <Button
                  className="hover:bg-primary hover:text-primary-foreground px-1"
                  variant="unstyled"
                  size="content"
                  type="button"
                  onClick={() => handleRemoveSelectedProduct(selProdData.id)}
                  aria-label="Удалить"
                >
                  <X className="size-5" />
                </Button>
              </div>

              <p>{total.toLocaleString("ru-RU")} руб.</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
