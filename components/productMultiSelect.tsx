"use client";

import * as React from "react";
import { products } from "@/data/products";
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
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  const selectedProducts = products.filter((p) => value.includes(p.id));

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className="w-full justify-start"
          >
            {selectedProducts.length === 0
              ? "Выберите товары"
              : selectedProducts.map((p) => p.name).join(", ")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Поиск товара..." />
            <CommandList>
              <CommandEmpty>Товар не найден</CommandEmpty>
              {products.map((product) => (
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
                  className={value.includes(product.id) ? "bg-accent" : ""}
                >
                  {product.name}
                  {value.includes(product.id) && (
                    <X className="ml-auto size-4 opacity-50" />
                  )}
                </CommandItem>
              ))}
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
