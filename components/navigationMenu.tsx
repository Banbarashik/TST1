// TODO check if there's code that is no longer needed

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
          className="flex w-full items-center justify-center gap-3 border border-[#bfbfbf] bg-[#dcdcdc] px-4 py-3 text-lg font-semibold"
          onClick={() => setOpen((o) => !o)}
        >
          <span>Меню</span>
          <ChevronDown
            className={`${open ? "rotate-180" : "rotate-0"} transition duration-200`}
          />
        </button>
        {open && (
          <div className="flex flex-col border-t bg-[#f3f3f3] shadow-md">
            <Accordion type="single" collapsible>
              <div className="grid grid-cols-2 border-b">
                <AccordionItem
                  value="produkciya-price"
                  className="contents border-0"
                >
                  <AccordionTrigger className="justify-evenly gap-0 rounded-none border border-[#dcdcdc] bg-[#e4e4e4] data-[state=open]:bg-[#ebebeb] max-[350px]:text-xs">
                    Продукция Прайс-лист
                  </AccordionTrigger>
                  <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down grid grid-cols-[repeat(2,1fr)] overflow-hidden px-0 pb-0 max-[350px]:text-xs">
                    <Link
                      href="/produkciya"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      Продукция
                    </Link>
                    <Link
                      href="/kontakty-prajs"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      Контакты Прайс-лист
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <div className="col-start-2 row-start-1 flex flex-1/2 border border-[#dcdcdc] bg-[#e4e4e4] py-4 data-[state=open]:bg-[#ebebeb]">
                  <ContactFormTrigger
                    hasCloseBtn
                    triggerBtnClassName="text-primary max-[350px]:text-xs w-full h-full"
                    amountClassName="absolute max-[350px]:text-[10px] border border-primary text-primary right-0 -translate-x-6 -translate-y-2 inline-flex size-4 items-center justify-center rounded-full text-[10px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 border-b">
                <AccordionItem value="water" className="contents border-0">
                  <Link
                    href="/catalog/vodiany-kalorifery"
                    className="col-span-1"
                  >
                    <AccordionTrigger className="justify-evenly gap-0 rounded-none border border-[#dcdcdc] bg-[#e4e4e4] data-[state=open]:bg-[#ebebeb] max-[350px]:text-xs">
                      Водяные калориферы
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down grid grid-cols-[repeat(2,1fr)] overflow-hidden px-0 pb-0 max-[350px]:text-xs">
                    <Link
                      href="/kalorifery-voda#anchor2"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      Калькулятор подбора
                    </Link>
                    <Link
                      href="/catalog/ksk"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КСк
                    </Link>
                    <Link
                      href="/catalog/kpvs"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КПВС
                    </Link>
                    <Link
                      href="/catalog/tvv"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      ТВВ
                    </Link>
                    <Link
                      href="/catalog/kpvu"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КПВУ
                    </Link>
                    <Link
                      href="/catalog/kfb-a-m"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КФБ-А М
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="steam" className="contents border-0">
                  <Link
                    href="/catalog/parovy-kalorifery"
                    className="col-span-1 [&:has(>h3[data-state=closed])]:col-start-2 [&:has(>h3[data-state=closed])]:row-start-1"
                  >
                    <AccordionTrigger className="justify-evenly gap-0 rounded-none border border-[#dcdcdc] bg-[#e4e4e4] data-[state=open]:bg-[#ebebeb] max-[350px]:text-xs">
                      Паровые калориферы
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down col-span-2 grid grid-cols-[repeat(2,1fr)] overflow-hidden px-0 pb-0 max-[350px]:text-xs">
                    <Link
                      href="/catalog/kpsk"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КПСк
                    </Link>
                    <Link
                      href="/kalorifery-par#anchor2"
                      className="block border border-[#efefef] px-4 py-3 hover:bg-gray-100"
                    >
                      Калькулятор подбора
                    </Link>
                    <Link
                      href="/catalog/kp"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КП
                    </Link>
                    <Link
                      href="/catalog/kpps"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КППС
                    </Link>
                    <Link
                      href="/catalog/kfb-a-p"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КФБ-А П
                    </Link>
                    <Link
                      href="/catalog/kppu"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      КППУ
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="grid grid-cols-2 border-b">
                <AccordionItem value="agregaty" className="contents border-0">
                  <Link href="/catalog/agregaty" className="col-span-1">
                    <AccordionTrigger className="justify-evenly gap-0 rounded-none border border-[#dcdcdc] bg-[#e4e4e4] data-[state=open]:bg-[#ebebeb] max-[350px]:text-xs">
                      Отопительные агрегаты
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down grid grid-cols-[repeat(2,1fr)] overflow-hidden px-0 pb-0 max-[350px]:text-xs">
                    <Link
                      href="/catalog/vodiany-agregaty"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      Водяные АО АВО СТД
                    </Link>
                    <Link
                      href="/catalog/parovy-agregaty"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      Паровые АО АВО СТД
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="electro" className="contents border-0">
                  <Link
                    href="/catalog/energonagrevatelynoe-oborudovanie"
                    className="col-span-1 [&:has(>h3[data-state=closed])]:col-start-2 [&:has(>h3[data-state=closed])]:row-start-1"
                  >
                    <AccordionTrigger className="justify-evenly gap-0 rounded-none border border-[#dcdcdc] bg-[#e4e4e4] data-[state=open]:bg-[#ebebeb] max-[350px]:text-xs">
                      Электронагреватели
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down col-span-2 grid grid-cols-[repeat(2,1fr)] overflow-hidden px-0 pb-0 max-[350px]:text-xs">
                    <Link
                      href="/catalog/shuk"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      ШУК
                    </Link>
                    <Link
                      href="/catalog/sfo"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      СФО
                    </Link>
                    <Link
                      href="/catalog/teny"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      ТЭНР
                    </Link>
                    <Link
                      href="/catalog/sfotc"
                      className="block border border-[#efefef] px-4 py-3"
                    >
                      СФОЦ
                    </Link>
                  </AccordionContent>
                </AccordionItem>
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
        className="flex flex-col justify-center border border-[#ccc] bg-[#e3e3e3] px-4 text-center text-sm text-(--primary-darker) uppercase shadow-[0px_1px_0_#bdbdbd,2px_4px_6px_#dbdbdb] transition-all duration-300 hover:border-[rgba(0,0,0,0.2)] hover:bg-[#d1d1d1] hover:text-[#8f6063] hover:shadow-[1px_1px_2px_rgba(255,255,255,0.95)] hover:text-shadow-[-1px_-1px_0_#b3b3b3] xl:text-[15px]"
      >
        <div>Продукция</div>
        <div>Сертификаты</div>
      </Link>
      <Link
        href="/kontakty-prajs"
        className="flex flex-col justify-center border border-[#ccc] bg-[#e3e3e3] px-4 text-center text-sm text-(--primary-darker) uppercase shadow-[0px_1px_0_#bdbdbd,2px_4px_6px_#dbdbdb] transition-all duration-300 hover:border-[rgba(0,0,0,0.2)] hover:bg-[#d1d1d1] hover:text-[#8f6063] hover:shadow-[1px_1px_2px_rgba(255,255,255,0.95)] hover:text-shadow-[-1px_-1px_0_#b3b3b3] xl:text-[15px]"
      >
        <div>Контакты</div>
        <div>Прайс-лист</div>
      </Link>
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
