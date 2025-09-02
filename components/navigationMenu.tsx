"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

const productCategories = [
  {
    name: "Калориферы водяные",
    items: [
      { name: "КСк", url: "", img: "/img/nav_menu/ksk.jpg" },
      { name: "ТВВ", url: "", img: "/img/nav_menu/tvv.jpg" },
      { name: "КФБ м", url: "", img: "/img/nav_menu/kfb_m.jpg" },
      { name: "АО+ вода", url: "", img: "/img/nav_menu/ao+_voda.jpg" },
    ],
  },
  {
    name: "Калориферы паровые",
    items: [
      { name: "КПСк", url: "", img: "/img/nav_menu/kpsk.svg" },
      { name: "КП", url: "", img: "/" },
      { name: "КФБ п", url: "", img: "/" },
      { name: "АО+ пар", url: "", img: "/" },
    ],
  },
  {
    name: "Электрические нагреватели",
    items: [
      { name: "Электрокалориферы СФО", url: "", img: "/" },
      { name: "Электрокалориферные установки СФОЦ", url: "", img: "/" },
      { name: "Шкафы управления калориферами ШУК", url: "", img: "/" },
      { name: "ТЭНы оребренные", url: "", img: "/" },
    ],
  },
  {
    name: "Отопительные агрегаты",
    items: [
      { name: "АО2", url: "", img: "/" },
      { name: "СТД 300", url: "", img: "/" },
      { name: "АВО хл", url: "", img: "/" },
      { name: "СТД 300 хл", url: "", img: "/" },
    ],
  },
];

export default function NavigationMenu() {
  const [activeCategoryName, setActiveCategoryName] = useState<string | null>(
    null,
  );
  const [activeProductName, setActiveProductName] = useState<string | null>(
    null,
  );

  // Find the active category and product
  const activeCategory = productCategories.find(
    (c) => c.name === activeCategoryName,
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
      <NavigationMenuPrimitive.List className="flex items-center gap-4 text-[17px] font-semibold">
        {/* <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Trigger className="hover:bg-accent rounded-md p-2">
            Продукция
          </NavigationMenuPrimitive.Trigger>
          <NavigationMenuPrimitive.Content className="bg-background mt-2 overflow-hidden rounded-md">
            <NavigationMenuPrimitive.Sub>
              <NavigationMenuPrimitive.Viewport className="absolute right-full h-full" />
              <NavigationMenuPrimitive.List className="flex w-max flex-col">
                {productCategories.map((category) => (
                  <NavigationMenuPrimitive.Item key={category.name}>
                    <NavigationMenuPrimitive.Trigger
                      className="hover:bg-accent data-[state=open]:bg-accent w-full p-3"
                      onMouseEnter={() => {
                        setActiveCategoryName(category.name);
                        setActiveProductName(category.items[0]?.name ?? null);
                      }}
                    >
                      {category.name}
                    </NavigationMenuPrimitive.Trigger>
                    <NavigationMenuPrimitive.Content className="bg-background absolute top-0 right-full mr-1 w-max rounded-md p-3">
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
                        <Image
                          src={activeProduct?.img || "/"}
                          alt="#"
                          width={208}
                          height={208}
                          className="bg-gray-300"
                        />
                      </div>
                    </NavigationMenuPrimitive.Content>
                  </NavigationMenuPrimitive.Item>
                ))}
              </NavigationMenuPrimitive.List>
            </NavigationMenuPrimitive.Sub>
          </NavigationMenuPrimitive.Content>
        </NavigationMenuPrimitive.Item> */}
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link asChild>
            <Link
              href="/kalorifery-voda"
              className="hover:bg-accent flex flex-col items-center rounded-md p-2"
            >
              <span>Калькулятор подбора</span> <span>водяных калориферов</span>
            </Link>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link asChild>
            <Link
              href="/kalorifery-par"
              className="hover:bg-accent flex flex-col items-center rounded-md p-2"
            >
              <span>Калькулятор подбора</span> <span>паровых калориферов</span>
            </Link>
          </NavigationMenuPrimitive.Link>
        </NavigationMenuPrimitive.Item>
        <NavigationMenuPrimitive.Item>
          <NavigationMenuPrimitive.Link asChild>
            <Link
              href="/kontakty-prajs"
              className="hover:bg-accent flex flex-col items-center rounded-md p-2"
            >
              <span>Контакты</span>
              <span>Прайс-лист</span>
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
        <Link href={product.url} className="hover:bg-accent rounded-md p-2">
          {product.name}
        </Link>
      </NavigationMenuPrimitive.Link>
    </li>
  );
}
