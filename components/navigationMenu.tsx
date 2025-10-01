"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ContactFormTrigger from "./contactFormTrigger";

export default function NavigationMenu({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  // navigationMenu.tsx
  // ...
  useEffect(() => {
    if (!open) return;

    const onDocPointerDown = (event: PointerEvent) => {
      const path = (event.composedPath && event.composedPath()) || [];

      const isInsideMenu = menuRef.current
        ? path.includes(menuRef.current)
        : false;

      // Любой узел с data-menu-ignore-close="true" — безопасная зона
      const isSafeZone = path.some(
        (el) => (el as HTMLElement)?.dataset?.menuIgnoreClose === "true",
      );

      if (!isInsideMenu && !isSafeZone) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);
  // ...

  if (variant === "mobile") {
    return (
      <div className="w-full" ref={menuRef}>
        <button
          className="flex w-full items-center justify-center gap-3 bg-[#cdd5d8] px-4 py-3 text-lg font-semibold shadow-lg"
          onClick={() => setOpen((o) => !o)}
        >
          <span>Меню</span>
          <ChevronDown
            className={`${open ? "rotate-180" : "rotate-0"} transition duration-200`}
          />
        </button>
        {open && (
          <div className="flex flex-col border-t bg-[#e9f6fa] shadow-lg">
            <Accordion type="single" collapsible>
              <div className="flex border-b">
                <AccordionItem value="water" className="flex-1/2 border-0">
                  <Link href="/catalog/vodiany-kalorifery">
                    <AccordionTrigger className="justify-evenly gap-0">
                      Водяные калориферы
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent>
                    <Link
                      href="/kalorifery-voda#anchor2"
                      className="block px-4 py-3"
                    >
                      Калькулятор подбора
                    </Link>
                    <Link href="/catalog/kpvs" className="block px-4 py-3">
                      КПВС
                    </Link>
                    <Link href="/catalog/kpvu" className="block px-4 py-3">
                      КПВУ
                    </Link>
                    <Link href="/catalog/ksk" className="block px-4 py-3">
                      КСк
                    </Link>
                    <Link href="/catalog/tvv" className="block px-4 py-3">
                      ТВВ
                    </Link>
                    <Link href="/catalog/kfb-a-m" className="block px-4 py-3">
                      КФБ-А М
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steam" className="flex-1/2 border-0">
                  <Link href="/catalog/parovy-kalorifery">
                    <AccordionTrigger className="justify-evenly gap-0">
                      Паровые калориферы
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent>
                    <Link
                      href="/kalorifery-par#anchor2"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      Калькулятор подбора
                    </Link>
                    <Link href="/catalog/kpps" className="block px-4 py-3">
                      КППС
                    </Link>
                    <Link href="/catalog/kppu" className="block px-4 py-3">
                      КППУ
                    </Link>
                    <Link href="/catalog/kpsk" className="block px-4 py-3">
                      КПСк
                    </Link>
                    <Link href="/catalog/kp" className="block px-4 py-3">
                      КП
                    </Link>
                    <Link href="/catalog/kfb-a-p" className="block px-4 py-3">
                      КФБ-А П
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="flex border-b">
                <AccordionItem value="agregaty" className="flex-1/2 border-0">
                  <Link href="/catalog/agregaty">
                    <AccordionTrigger className="justify-evenly gap-0">
                      Отопительные агрегаты
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent>
                    <Link
                      href="/catalog/vodiany-agregaty"
                      className="block px-4 py-3"
                    >
                      Водяные АО АВО СТД
                    </Link>
                    <Link
                      href="/catalog/parovy-agregaty"
                      className="block px-4 py-3"
                    >
                      Паровые АО АВО СТД
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="electro" className="flex-1/2 border-0">
                  <Link href="/catalog/energonagrevatelynoe-oborudovanie">
                    <AccordionTrigger className="justify-evenly gap-0">
                      Электронагреватели
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent>
                    <Link href="/catalog/sfo" className="block px-4 py-3">
                      СФО
                    </Link>
                    <Link href="/catalog/sfotc" className="block px-4 py-3">
                      СФОЦ
                    </Link>
                    <Link href="/catalog/shuk" className="block px-4 py-3">
                      ШУК
                    </Link>
                    <Link href="/catalog/teny" className="block px-4 py-3">
                      ТЭНР
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="flex items-start">
                <AccordionItem
                  value="produkciya-price"
                  className="flex-1/2 border-0"
                >
                  <AccordionTrigger className="justify-evenly gap-0">
                    Продукция Прайс-лист
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link href="/produkciya" className="block px-4 py-3">
                      Продукция
                    </Link>
                    <Link href="/kontakty-prajs" className="block px-4 py-3">
                      Контакты Прайс-лист
                    </Link>
                  </AccordionContent>
                  {/* <Link
                    href="/kontakty-prajs"
                    className="flex-1/2 py-4 text-center text-sm"
                  ></Link> */}
                </AccordionItem>
                <div className="flex flex-1/2 py-4">
                  <ContactFormTrigger
                    hasCloseBtn
                    triggerBtnClassName="text-primary w-full h-full"
                    amountClassName="absolute border border-primary text-primary right-0 -translate-x-6 -translate-y-2 inline-flex size-4 items-center justify-center rounded-full text-[10px]"
                  />
                </div>
              </div>
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
        href="/produkciya"
        className="btn-flip btn-flip-p w-min text-sm xl:text-base"
        data-back="Сертификаты"
        data-front="Продукция"
      />
      <Link
        href="/kontakty-prajs"
        className="btn-flip btn-flip-p w-min text-sm xl:text-base"
        data-back="Прайс лист"
        data-front="Контакты"
      />
      <Link
        href="/kalorifery-voda#anchor1"
        className="btn-flip w-min text-sm xl:text-base"
        data-back="Водяные калориферы"
        data-front="Калькулятор подбора"
      />
      <Link
        href="/kalorifery-par#anchor1"
        className="btn-flip w-min text-sm xl:text-base"
        data-back="Паровые калориферы"
        data-front="Калькулятор подбора"
      />
    </div>
  );
}
