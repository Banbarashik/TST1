"use client";

import { useState } from "react";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

const productCategories = [
  {
    name: "Калориферы водяные",
    items: [
      { name: "КСк", url: "", img: "img/nav_menu/ksk.jpg" },
      { name: "ТВВ", url: "", img: "img/nav_menu/tvv.jpg" },
      { name: "КФБ м", url: "", img: "img/nav_menu/kfb_m.jpg" },
      { name: "АО+ вода", url: "", img: "img/nav_menu/ao+_voda.jpg" },
    ],
  },
  {
    name: "Калориферы паровые",
    items: [
      { name: "КПСк", url: "", img: "img/nav_menu/kpsk.svg" },
      { name: "КП", url: "", img: "#" },
      { name: "КФБ п", url: "", img: "#" },
      { name: "АО+ пар", url: "", img: "#" },
    ],
  },
  {
    name: "Электрические нагреватели",
    items: [
      { name: "Электрокалориферы СФО", url: "", img: "#" },
      { name: "Электрокалориферные установки СФОЦ", url: "", img: "#" },
      { name: "Шкафы управления калориферами ШУК", url: "", img: "#" },
      { name: "ТЭНы оребренные", url: "", img: "#" },
    ],
  },
  {
    name: "Отопительные агрегаты",
    items: [
      { name: "АО2", url: "", img: "#" },
      { name: "СТД 300", url: "", img: "#" },
      { name: "АВО хл", url: "", img: "#" },
      { name: "СТД 300 хл", url: "", img: "#" },
    ],
  },
];

export default function NavigationMenu() {
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
    <NavigationMenuPrimitive.Root
      className="relative z-50"
      onValueChange={handleMenuChange}
    >
      <NavigationMenuPrimitive.Viewport className="absolute top-full" />
      <NavigationMenuPrimitive.List className="text-xl font-semibold flex gap-6 items-center">
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger className="p-2 hover:bg-accent rounded-md">
            Продукция
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuPrimitive.Content className="mt-2 bg-background rounded-md overflow-hidden">
            <NavigationMenuPrimitive.Sub>
              <NavigationMenuPrimitive.Viewport className="absolute h-full right-0" />
              <NavigationMenuPrimitive.List className="flex flex-col w-max">
                {productCategories.map((category) => (
                  <NavigationMenuPrimitive.Item key={category.name}>
                    <NavigationMenuPrimitive.Trigger
                      className="p-3 w-full hover:bg-accent data-[state=open]:bg-accent"
                      onMouseEnter={() => {
                        setActiveCategoryName(category.name);
                        setActiveProductName(category.items[0]?.name ?? null);
                      }}
                    >
                      {category.name}
                    </NavigationMenuPrimitive.Trigger>
                    <NavigationMenuPrimitive.Content className="absolute top-0 left-full bg-background rounded-md p-3 w-max ml-1">
                      <div className="flex gap-12">
                        <ul className="flex flex-col gap-2">
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
                    </NavigationMenuPrimitive.Content>
                  </NavigationMenuPrimitive.Item>
                ))}
              </NavigationMenuPrimitive.List>
            </NavigationMenuPrimitive.Sub>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link asChild>
            <Link href="#" className="p-2 hover:bg-accent rounded-md">
              Расчет-подбор
            </Link>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link asChild>
            <Link href="#" className="p-2 hover:bg-accent rounded-md">
              Прайс-лист
            </Link>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
      </NavigationMenuPrimitive.List>
    </NavigationMenuPrimitive.Root>
  );
}

function ListItem({ product, onMouseEnter }) {
  return (
    <li onMouseEnter={onMouseEnter}>
      <NavigationMenuPrimitive.Link asChild>
        <Link href={product.url} className="p-2 hover:bg-accent rounded-md">
          {product.name}
        </Link>
      </NavigationMenuPrimitive.Link>
    </li>
  );
}
