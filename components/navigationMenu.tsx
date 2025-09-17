"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function NavigationMenu({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [open, setOpen] = useState(false);

  if (variant === "mobile") {
    return (
      <div className="w-full">
        <button
          className="w-full bg-[#f8f8f8] px-4 py-3 text-lg font-semibold"
          onClick={() => setOpen((o) => !o)}
        >
          Меню
        </button>
        {open && (
          <div className="bg-background flex flex-col border-t shadow-lg">
            <Accordion type="single" collapsible>
              <AccordionItem value="water">
                <AccordionTrigger>Водяные калориферы</AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/kalorifery-voda"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Калькулятор подбора
                  </Link>
                  <Link
                    href="/kalorifery-voda/info"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Информация
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="steam">
                <AccordionTrigger>Паровые калориферы</AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/kalorifery-par"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Калькулятор подбора
                  </Link>
                  <Link
                    href="/kalorifery-par/info"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Информация
                  </Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contacts">
                <AccordionTrigger>Контакты / Прайс</AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/kontakty-prajs"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Контакты
                  </Link>
                  <Link
                    href="/kontakty-prajs/price"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Прайс
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    );
  }

  // Desktop menu
  return (
    <div className="flex">
      <Link
        href="/kalorifery-voda"
        className="btn-flip w-min"
        data-back="Водяные калориферы"
        data-front="Калькулятор подбора"
      />
      <Link
        href="/kalorifery-par"
        className="btn-flip w-min"
        data-back="Паровые калориферы"
        data-front="Калькулятор подбора"
      />
      <Link
        href="/kontakty-prajs"
        id="btn0"
        className="btn-flip w-max"
        data-back="Контакты"
        data-front="Прайс"
      />
    </div>
  );
}
