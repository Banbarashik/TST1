"use client";

import { categoryTree } from "@/data/categories";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type CategoryNode = {
  label: string;
  slug: string;
  children?: CategoryNode[];
};

// 🔍 Recursively find parent slugs for the current category
function findOpenAccordions(
  nodes: CategoryNode[],
  targetSlug: string,
  path: string[] = []
): string[] {
  for (const node of nodes) {
    const currentPath = [...path, node.slug];

    if (node.slug === targetSlug) {
      // If current node is target and has children → include itself
      return node.children ? currentPath : path;
    }

    if (node.children) {
      const result = findOpenAccordions(node.children, targetSlug, currentPath);
      if (result.length > 0) return result;
    }
  }
  return [];
}

function RecursiveAccordion({
  nodes,
  currentSlug,
  level = 0,
}: {
  nodes: CategoryNode[];
  currentSlug: string;
  level?: number;
}) {
  return (
    <>
      {nodes.map((node) => {
        const isActive = node.slug === currentSlug;
        const hasChildren = !!node.children?.length;
        const paddingLeft = `${level * 1}rem`;

        return hasChildren ? (
          <AccordionItem
            value={node.slug}
            key={node.slug}
            className="overflow-hidden"
          >
            <AccordionTrigger
              className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-gray-100"
              style={{ paddingLeft }}
            >
              <Link
                href={`/catalog/${node.slug}`}
                className={`flex-1 text-sm ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {node.label}
              </Link>
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180"
                aria-hidden
              />
            </AccordionTrigger>
            <AccordionContent className="pl-2 data-[state=closed]:hidden">
              <RecursiveAccordion
                nodes={node.children!}
                currentSlug={currentSlug}
                level={level + 1}
              />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div key={node.slug}>
            <Link
              href={`/catalog/${node.slug}`}
              className={`block px-3 py-2 hover:bg-gray-100 text-sm ${
                isActive ? "text-blue-600 font-semibold bg-gray-100" : ""
              }`}
              style={{ paddingLeft }}
            >
              {node.label}
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname(); // e.g. /catalog/ksk
  const currentSlug = pathname.split("/").pop() ?? "";

  const defaultOpenItems = useMemo(() => {
    return findOpenAccordions(categoryTree, currentSlug);
  }, [currentSlug]);

  return (
    <aside className="w-64 pr-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <Accordion
        type="multiple"
        defaultValue={defaultOpenItems}
        className="space-y-1"
      >
        <RecursiveAccordion nodes={categoryTree} currentSlug={currentSlug} />
      </Accordion>
    </aside>
  );
}
