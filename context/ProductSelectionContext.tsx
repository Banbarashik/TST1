"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const FORM_STORAGE_KEY = "contactFormData";

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
  // 1. Hydrate from localStorage on mount
  const [selected, setSelected] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.product) ? parsed.product : [];
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
        JSON.stringify({ ...parsed, product: selected }),
      );
    } catch {}
  }, [selected]);

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
