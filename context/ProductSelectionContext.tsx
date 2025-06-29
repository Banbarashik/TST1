"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { FORM_STORAGE_KEY } from "@/constants";

import { SelectedProduct } from "@/types";

type ProductSelectionContextType = {
  selected: SelectedProduct[];
  add: (id: string, amount?: number) => void;
  remove: (id: string) => void;
  setAmount: (id: string, amount: number) => void;
  clear: () => void;
  set: (items: SelectedProduct[]) => void;
};

const ProductSelectionContext = createContext<
  ProductSelectionContextType | undefined
>(undefined);

export function ProductSelectionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Hydrate from localStorage on mount
  const [selected, setSelected] = useState<SelectedProduct[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
      return [];
    }
  });

  // 2. Update localStorage whenever selected changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({ ...parsed, products: selected }),
      );
    } catch {}
  }, [selected]);

  const add = (id: string, amount = 1) =>
    setSelected((prev) =>
      prev.some((item) => item.id === id) ? prev : [...prev, { id, amount }],
    );
  const remove = (id: string) =>
    setSelected((prev) => prev.filter((item) => item.id !== id));
  const setAmount = (id: string, amount: number) =>
    setSelected((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item)),
    );
  const clear = () => setSelected([]);
  const set = (items: SelectedProduct[]) => setSelected(items);

  return (
    <ProductSelectionContext.Provider
      value={{ selected, add, remove, setAmount, clear, set }}
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
