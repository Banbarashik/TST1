"use client";

import { useState } from "react";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const productCategories = [
  {
    name: "Калориферы водяные",
    items: [
      { name: "КСк", url: "", img: "img/nav_menu/ksk.svg" },
      { name: "ТВВ", url: "", img: "img/nav_menu/tvv.svg" },
    ],
  },
  {
    name: "Калориферы паровые",
    items: [{ name: "КПСк", url: "", img: "img/nav_menu/kpsk.svg" }],
  },
];

export default function Test() {
  const [activeCategoryName, setActiveCategoryName] = useState<string | null>(
    null
  );
  const [activeProductName, setActiveProductName] = useState<string | null>(
    null
  );

  // Find the active category and product
  const activeCategory = productCategories.find(
    (c) => c.name === activeCategoryName
  );
  const activeProduct =
    activeCategory?.items.find((p) => p.name === activeProductName) ||
    activeCategory?.items[0];

  // Reset when menu closes
  const handleMenuChange = (value: string | undefined) => {
    if (!value) {
      setActiveCategoryName(null);
      setActiveProductName(null);
    }
  };

  return (
    <NavigationMenu.Root className="w-48" onValueChange={handleMenuChange}>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Продукция</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Sub className="bg-amber-300">
              <NavigationMenu.List>
                {productCategories.map((category) => (
                  <NavigationMenu.Item key={category.name}>
                    <NavigationMenu.Trigger
                      onMouseEnter={() => {
                        setActiveCategoryName(category.name);
                        setActiveProductName(category.items[0]?.name ?? null);
                      }}
                    >
                      {category.name}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content className="absolute top-0 left-full bg-pink-200 p-3 w-max">
                      <div className="flex">
                        <ul className="flex flex-col gap-6">
                          {category.items.map((product) => (
                            <ListItem
                              product={product}
                              onMouseEnter={() =>
                                setActiveProductName(product.name)
                              }
                              key={product.name}
                            />
                          ))}
                        </ul>
                        <img
                          src={activeProduct?.img}
                          alt="#"
                          className="bg-gray-300 w-52 h-52"
                        />
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

function ListItem({ product, onMouseEnter }) {
  return (
    <li onMouseEnter={onMouseEnter}>
      <NavigationMenu.Link asChild>
        <Link href={product.url}>{product.name}</Link>
      </NavigationMenu.Link>
    </li>
  );
}
