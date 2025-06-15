"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Test() {
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
                      <img src="#" alt="#" className="bg-gray-300 w-52 h-52" />
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
                <NavigationMenu.Item>
                  <NavigationMenu.Trigger>
                    Калориферы паровые
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    <div className="flex">
                      <img src="#" alt="#" className="bg-gray-300" />
                      <ul>
                        <li>
                          <NavigationMenu.Link>КПСк</NavigationMenu.Link>
                        </li>
                        <li>
                          <NavigationMenu.Link>КП</NavigationMenu.Link>
                        </li>
                        <li>
                          <NavigationMenu.Link>кфб п</NavigationMenu.Link>
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
