"use client";

import { categoryTree } from "@/data/categories";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import * as Accordion from "@radix-ui/react-accordion";

/**
 * Recursively finds all slugs that should be expanded:
 * - all parent categories
 * - the active category itself (if it has children)
 */
function findOpenAccordions(
  nodes,
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

// Define background colors for each level (add more if needed)
const levelBgColors = [
  "bg-yellow-400", // main categories
  "bg-yellow-300", // subcategories
  "bg-yellow-200", // subsubcategories
  "bg-yellow-200", // etc.
];

function RecursiveAccordion({
  nodes,
  currentSlug,
  level = 0,
}: {
  nodes;
  currentSlug: string;
  level?: number;
}) {
  // Pick color based on level, fallback to lightest if deeper
  const bgColor =
    levelBgColors[level] || levelBgColors[levelBgColors.length - 1];

  return (
    <>
      {nodes.map((node, idx) => {
        const isActive = node.slug === currentSlug;
        const hasChildren = !!node.children?.length;
        const paddingLeft =
          level === 0 ? "padding-left: 1rem" : `${level * 0.7 + 0.5}rem`;
        const isLast = idx === nodes.length - 1;

        return hasChildren ? (
          <Accordion.Item
            value={node.slug}
            key={node.slug}
            className="mb-1 overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className={`group relative w-full cursor-pointer rounded-sm text-left ${bgColor}`}
              >
                <Link
                  href={`/catalog/${node.slug}`}
                  className={`${isActive ? "bg-accent font-bold" : "hover:text-primary"} block w-full rounded-sm p-3 text-lg`}
                  style={{ paddingLeft }}
                >
                  {node.menuTitle}
                </Link>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="mt-1 data-[state=closed]:hidden">
              <RecursiveAccordion
                nodes={node.children!}
                currentSlug={currentSlug}
                level={level + 1}
              />
            </Accordion.Content>
          </Accordion.Item>
        ) : (
          <div
            key={node.slug}
            className={`${bgColor} ${isLast ? "mb-0" : "mb-1"} rounded-sm`}
          >
            <Link
              href={`/catalog/${node.slug}`}
              className={`${isActive ? "bg-accent font-bold" : "hover:text-primary"} block w-full rounded-sm p-3`}
              style={{ paddingLeft }}
            >
              {node.menuTitle}
            </Link>
          </div>
        );
      })}
    </>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const currentSlug =
    pathParts[0] === "catalog" && pathParts.length > 1
      ? pathParts[pathParts.length - 1]
      : "";

  // Compute open items for the current slug
  const openItems = useMemo(
    () => findOpenAccordions(categoryTree, currentSlug),
    [currentSlug],
  );

  // Controlled state for Accordion
  const [open, setOpen] = useState<string[]>(openItems);

  // Update open state when currentSlug changes
  useEffect(() => {
    setOpen(openItems);
  }, [openItems]);

  return (
    <aside className="w-68 shrink-0">
      <Accordion.Root
        type="multiple"
        value={open}
        onValueChange={setOpen}
        className="fixed w-64"
      >
        <RecursiveAccordion nodes={categoryTree} currentSlug={currentSlug} />
      </Accordion.Root>
    </aside>
  );
}
