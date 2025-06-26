"use client";

import React, { createContext, useContext, useState } from "react";

type ProductSelectionContextType = {
  selected: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  set: (ids: string[]) => void;
};

const ProductSelectionContext = createContext<
  ProductSelectionContextType | undefined
>(undefined);

export function ProductSelectionProvider({ children }) {
  const [selected, setSelected] = useState<string[]>([]);

  const add = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const remove = (id: string) =>
    setSelected((prev) => prev.filter((pid) => pid !== id));
  const clear = () => setSelected([]);
  const set = (ids: string[]) => setSelected(ids);

  return (
    <ProductSelectionContext.Provider
      value={{ selected, add, remove, clear, set }}
    >
      {children}
    </ProductSelectionContext.Provider>
  );
}

export function useProductSelection() {
  const ctx = useContext(ProductSelectionContext);
  if (!ctx)
    throw new Error(
      "useProductSelection must be used within ProductSelectionProvider",
    );
  return ctx;
}
