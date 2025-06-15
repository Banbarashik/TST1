"use client";

import { useState } from "react";
import Link from "next/link";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

const productCategories = [
  {
    category: "voda",
    items: [{ name: "КСк", url: "", img: "img/nav_menu/ksk.svg" }],
  },
  {
    category: "par",
    items: [{ name: "КПСк", url: "", img: "img/nav_menu/kpsk.svg" }],
  },
];
const products = productCategories.flatMap((category) => category.items);

export default function Test() {
  const [activeProductId, setActiveProductId] = useState("");
  const activeProduct = products.find(
    (product) => product.name === activeProductId
  );

  return (
    <NavigationMenu.Root className="w-48">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Продукция</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            {/* submenu */}
            <NavigationMenu.Sub className="bg-amber-300">
              <NavigationMenu.List>
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>
                    Калориферы водяные
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-0 left-full bg-pink-200 p-3 w-max">
                    <div className="flex">
                      <img
                        src={activeProduct?.img}
                        alt="#"
                        className="bg-gray-300 w-52 h-52"
                      />
                      <ul className="flex flex-col gap-6">
                        <li>
                          <NavigationMenu.Link>КСк</NavigationMenu.Link>
                        </li>
                        <li>
                          <NavigationMenu.Link>ТВВ</NavigationMenu.Link>
                        </li>
                        <li>
                          <NavigationMenu.Link>кфб в</NavigationMenu.Link>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

function ListItem(product) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link href={product.url}>{product.name}</Link>
      </NavigationMenu.Link>
    </li>
  );
}
