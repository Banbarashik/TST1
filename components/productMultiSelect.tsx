"use client";

import * as React from "react";
import { products } from "@/data/products";
import { categoryTree } from "@/data/categories";
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
import { Check, X } from "lucide-react";

type Product = (typeof products)[number];

interface ProductMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ProductMultiSelect({
  value,
  onChange,
}: ProductMultiSelectProps) {
  const [open, setOpen] = React.useState(false);

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

  const selectedProducts = products.filter((p) => value.includes(p.id));

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
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
                  <CommandGroup key={cat.slug} heading={cat.title}>
                    {productsByMainCategory[cat.slug].map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => {
                          if (value.includes(product.id)) {
                            onChange(value.filter((id) => id !== product.id));
                          } else {
                            onChange([...value, product.id]);
                          }
                        }}
                        data-selected={value.includes(product.id)}
                      >
                        {product.name}
                        {value.includes(product.id) && (
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
        {selectedProducts.map((product) => (
          <span
            key={product.id}
            className="bg-accent flex items-center rounded px-2 py-1 text-sm"
          >
            {product.name}
            <button
              type="button"
              className="ml-1"
              onClick={() => onChange(value.filter((id) => id !== product.id))}
              aria-label="Удалить"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
