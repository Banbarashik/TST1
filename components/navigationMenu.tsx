"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import MegaMenuDropdown from "./megaMenuDropdown";

const items = [
  {
    title: "Калориферы",
    href: "/",
    img: "/img/kalorifery/ksk/kalorifer_ksk_2-1_2-5.png",
  },
  {
    title: "Отопительные агрегаты",
    href: "/",
    img: "/img/agregaty/ao2-v/agregat_ao2-3_ao2-5_v.png",
  },
  {
    title: "Воздушнонагревательные установки",
    href: "/",
    img: "/img/elektro/elektrokalorifernaia_ustanovka_sfotc-16_sfotc-60.png",
  },
];

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
                  <Link href="/catalog/vodiany-kalorifery">
                    <AccordionTrigger className="justify-evenly gap-0">
                      Водяные калориферы
                    </AccordionTrigger>
                  </Link>
                  <AccordionContent>
                    <Link href="/kalorifery-voda" className="block px-4 py-3">
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
                      href="/kalorifery-par"
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

              <div className="flex">
                <Link
                  href="/kontakty-prajs"
                  className="flex-1/2 py-4 text-center text-sm"
                >
                  Прайс-лист Контакты
                </Link>
                <Link
                  href="#"
                  className="text-primary flex-1/2 py-4 text-center text-sm"
                >
                  Подать заявку
                </Link>
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
      <MegaMenuDropdown items={items} />
      <Link
        href="/kontakty-prajs"
        className="btn-flip btn-flip-p w-min text-sm xl:text-base"
        data-back="Прайс лист"
        data-front="Контакты"
      />
      <Link
        href="/kalorifery-voda"
        className="btn-flip w-min text-sm xl:text-base"
        data-back="Водяные калориферы"
        data-front="Калькулятор подбора"
      />
      <Link
        href="/kalorifery-par"
        className="btn-flip w-min text-sm xl:text-base"
        data-back="Паровые калориферы"
        data-front="Калькулятор подбора"
      />
    </div>
  );
}
