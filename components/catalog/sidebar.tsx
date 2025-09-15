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

function RecursiveAccordion({
  nodes,
  currentSlug,
  openItems,
  level = 0,
}: {
  nodes;
  currentSlug: string;
  openItems: string[];
  level?: number;
}) {
  // Find if the active item is a leaf in this subtree
  /* const activeLeafSlug = nodes.find(
    (node) =>
      node.slug === currentSlug &&
      (!node.children || node.children.length === 0),
  )?.slug; */

  return (
    <>
      {nodes.map((node) => {
        const isActive = node.slug === currentSlug;
        const hasChildren = !!node.children?.length;
        const isParentActive =
          openItems.includes(node.slug) && !isActive && hasChildren;
        const paddingLeft = level ? `${level * 0.7 + 0.4}rem` : "0.8rem";

        // Only wrap the active item and its children if it has children
        if (isActive && hasChildren) {
          return (
            <div
              key={node.slug}
              className="mb-2 rounded-lg border-2"
              style={{
                marginLeft: paddingLeft,
                padding: "0.9rem 0.9rem 0.9rem 0.9rem",
              }}
            >
              <Accordion.Item value={node.slug} className="overflow-hidden">
                <Accordion.Header>
                  <Accordion.Trigger className="group relative w-full cursor-pointer text-left">
                    <Link
                      href={`/catalog/${node.slug}`}
                      className="relative block w-full rounded-sm bg-[#ffd77a] p-3 text-lg font-bold"
                    >
                      {node.menuTitle}
                    </Link>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pl-2 data-[state=closed]:hidden">
                  <RecursiveAccordion
                    nodes={node.children!}
                    currentSlug={currentSlug}
                    openItems={openItems}
                    level={level + 1}
                  />
                </Accordion.Content>
              </Accordion.Item>
            </div>
          );
        }

        // If the active item is a leaf, wrap its parent and its children (not recursively)
        const isParentOfActiveLeaf =
          hasChildren &&
          node.children.some(
            (child) =>
              child.slug === currentSlug &&
              (!child.children || child.children.length === 0),
          );

        if (isParentOfActiveLeaf) {
          return (
            <div
              key={node.slug}
              className="mb-2 rounded-lg border-2"
              style={{
                marginLeft: paddingLeft,
                padding: "0.9rem 0.9rem 0.9rem 0.9rem",
              }}
            >
              <Accordion.Item value={node.slug} className="overflow-hidden">
                <Accordion.Header>
                  <Accordion.Trigger className="group relative w-full cursor-pointer text-left">
                    <Link
                      href={`/catalog/${node.slug}`}
                      className="relative block w-full p-3 text-lg font-bold"
                    >
                      {node.menuTitle}
                      {isParentActive && (
                        <div className="bg-primary absolute top-0 left-0 h-1/2 w-[2px] translate-y-1/2" />
                      )}
                    </Link>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pl-2 data-[state=closed]:hidden">
                  {node.children.map((child) => {
                    const childIsActive = child.slug === currentSlug;
                    return (
                      <div key={child.slug}>
                        <Link
                          href={`/catalog/${child.slug}`}
                          className={`block w-full rounded-sm p-3 ${
                            childIsActive
                              ? "bg-[#ffd77a] font-bold"
                              : "hover:text-primary"
                          }`}
                          style={{ paddingLeft: "1.8rem" }}
                        >
                          {child.menuTitle}
                        </Link>
                      </div>
                    );
                  })}
                </Accordion.Content>
              </Accordion.Item>
            </div>
          );
        }

        // Default rendering for other nodes
        return hasChildren ? (
          <Accordion.Item
            value={node.slug}
            key={node.slug}
            className="overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group relative w-full cursor-pointer text-left">
                <Link
                  href={`/catalog/${node.slug}`}
                  className={`relative block w-full p-3 text-lg ${
                    isActive
                      ? "rounded-sm bg-[#ffd77a] font-bold"
                      : "hover:text-primary"
                  }`}
                  style={{ paddingLeft }}
                >
                  {node.menuTitle}
                  {isParentActive && (
                    <div className="bg-primary absolute top-0 left-0 h-1/2 w-[2px] translate-y-1/2" />
                  )}
                </Link>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="pl-2 data-[state=closed]:hidden">
              <RecursiveAccordion
                nodes={node.children!}
                currentSlug={currentSlug}
                openItems={openItems}
                level={level + 1}
              />
            </Accordion.Content>
          </Accordion.Item>
        ) : (
          <div key={node.slug}>
            <Link
              href={`/catalog/${node.slug}`}
              className={`block w-full rounded-sm p-3 ${
                isActive ? "bg-[#ffd77a] font-bold" : "hover:text-primary"
              }`}
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
    <aside className="w-78 shrink-0">
      {currentSlug === "" || currentSlug === "all" ? (
        <div className="w-80 rounded-xl border-2 p-2 [@media(min-height:920px)]:fixed">
          <Accordion.Root type="multiple" value={open} onValueChange={setOpen}>
            <RecursiveAccordion
              nodes={categoryTree}
              currentSlug={currentSlug}
              openItems={openItems}
            />
          </Accordion.Root>
        </div>
      ) : (
        <Accordion.Root
          type="multiple"
          value={open}
          onValueChange={setOpen}
          className="w-80 [@media(min-height:920px)]:fixed"
        >
          <RecursiveAccordion
            nodes={categoryTree}
            currentSlug={currentSlug}
            openItems={openItems}
          />
        </Accordion.Root>
      )}
    </aside>
  );
}
