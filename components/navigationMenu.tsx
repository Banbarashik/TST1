"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (variant === "mobile") {
    return (
      <div className="w-full" ref={menuRef}>
        <button
          className="w-full bg-[#f8f8f8] px-4 py-3 text-lg font-semibold"
          onClick={() => setOpen((o) => !o)}
        >
          Меню
        </button>
        {open && (
          <div className="bg-background flex flex-col border-t shadow-lg">
            <Accordion type="single" collapsible>
              <div className="flex border-b">
                <AccordionItem value="water" className="flex-1/2 border-0">
                  <AccordionTrigger className="justify-evenly gap-0">
                    Водяные калориферы
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link href="/kalorifery-voda" className="block px-4 py-2">
                      Калькулятор подбора
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КПВС
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КПВУ
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КСк
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      ТВВ
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КФБ-А М
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steam" className="flex-1/2 border-0">
                  <AccordionTrigger className="justify-evenly gap-0">
                    Паровые калориферы
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/kalorifery-par"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Калькулятор подбора
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КППС
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КППУ
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КПСк
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КП
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      КФБ-А П
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="flex border-b">
                <AccordionItem value="agregaty" className="flex-1/2 border-0">
                  <AccordionTrigger className="justify-evenly gap-0">
                    Отопительные агрегаты
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      Водяные АО АВО СТД
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      Паровые АО АВО СТД
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="electro" className="flex-1/2 border-0">
                  <AccordionTrigger className="justify-evenly gap-0">
                    Электронагреватели
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      СФО
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      СФОЦ
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      ШУК
                    </Link>
                    <Link
                      href="/kalorifery-voda/info"
                      className="block px-4 py-2"
                    >
                      ТЭНР
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <Link href="#" className="block py-4 text-center">
                Прайс-лист Контакты
              </Link>
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
