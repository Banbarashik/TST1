import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findCategoryBySlug(slug: string, nodes) {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children) {
      const found = findCategoryBySlug(slug, node.children);
      if (found) return found;
    }
  }
  return null;
}

export function sortProducts(a: string, b: string) {
  // Split into digit and non-digit parts
  const ax = [];
  const bx = [];
  a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""]);
    return "";
  });
  b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => {
    bx.push([$1 || Infinity, $2 || ""]);
    return "";
  });

  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    // Compare non-number parts
    if (an[1] !== bn[1]) return an[1].localeCompare(bn[1], "ru");
    // Compare number parts
    const anNum = Number(an[0]);
    const bnNum = Number(bn[0]);
    if (anNum !== bnNum) return anNum - bnNum;
  }
  return ax.length - bx.length;
}
