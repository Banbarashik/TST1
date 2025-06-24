"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { categoryTree } from "@/data/categories";
import { useMemo } from "react";

type CategoryNode = {
  label: string;
  slug: string;
  children?: CategoryNode[];
};

/**
 * Recursively finds all slugs that should be expanded:
 * - all parent categories
 * - the active category itself (if it has children)
 */
function findOpenAccordions(
  nodes: CategoryNode[],
  targetSlug: string,
  path: string[] = [],
): string[] {
  for (const node of nodes) {
    const currentPath = [...path, node.slug];

    if (node.slug === targetSlug) {
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
          <Accordion.Item
            value={node.slug}
            key={node.slug}
            className="overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="group relative w-full cursor-pointer text-left"
                style={{ paddingLeft }}
              >
                <Link
                  href={`/catalog/${node.slug}`}
                  className={`${isActive ? "bg-accent font-bold" : "hover:text-primary"} block w-full rounded-sm p-3`}
                >
                  {node.label}
                </Link>
                <ChevronDown
                  size={48}
                  className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90 p-3 group-data-[state=open]:rotate-0"
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pl-2 data-[state=closed]:hidden">
              <RecursiveAccordion
                nodes={node.children!}
                currentSlug={currentSlug}
                level={level + 1}
              />
            </Accordion.Content>
          </Accordion.Item>
        ) : (
          <div key={node.slug}>
            <Link
              href={`/catalog/${node.slug}`}
              className={`${isActive ? "bg-accent font-bold" : "hover:text-primary"} block w-full rounded-sm p-3`}
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
  const pathname = usePathname(); // e.g. /catalog/ksk-2-1
  const currentSlug = pathname.split("/").pop() ?? "";

  const defaultOpenItems = useMemo(() => {
    return findOpenAccordions(categoryTree, currentSlug);
  }, [currentSlug]);

  return (
    <aside className="w-64 pr-4">
      <h2 className="mb-4 text-xl font-bold">Categories</h2>
      <Accordion.Root
        type="multiple"
        defaultValue={defaultOpenItems}
        className="space-y-1"
      >
        <RecursiveAccordion nodes={categoryTree} currentSlug={currentSlug} />
      </Accordion.Root>
    </aside>
  );
}
