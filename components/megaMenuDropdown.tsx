"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // если нет — замени на свою util-функцию или убери

/**
 * Отдельный компонент мегаменю: триггер + выпадающее содержимое.
 * Ничего НЕ оборачивает в <NavigationMenuList> — вставляй его как обычный пункт в свой header.
 * Открывается по hover и по фокусу, закрывается по уходу курсора/фокуса и по Escape.
 */
export type MegaItem = {
  title: string;
  sub?: string;
  href: string;
  img?: string;
  imgAlt?: string;
};

interface MegaMenuDropdownProps {
  label?: string; // текст триггера
  items: MegaItem[];
  className?: string; // классы для контейнера пункта меню (обёртка)
  triggerClassName?: string; // классы для ссылки-триггера
  gapPx?: number; // зазор между кнопкой и подменю (в пикселях)
}

export default function MegaMenuDropdown({
  label = "Продукция",
  items,
  className,
  triggerClassName,
  gapPx = 12,
}: MegaMenuDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);

  // Закрыть по Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {/* Триггер */}
      <Link
        href="#"
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={open}
        className={cn(
          "inline-block py-2 font-extrabold text-zinc-800 transition-colors hover:text-[#1f3b8a] focus-visible:text-[#1f3b8a]",
          triggerClassName,
        )}
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onClick={(e) => e.preventDefault()}
      >
        {label}
      </Link>

      {/* "Мост" наведения: прозрачная полоска в зазоре, чтобы курсор не покидал корневой контейнер */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute top-full right-0 left-0 z-40",
          open
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible",
        )}
        style={{ height: open ? gapPx : 0 }}
      />

      {/* Контент мегаменю */}
      <div
        className={cn(
          "pointer-events-auto absolute left-1/2 z-50 w-screen -translate-x-1/2 border-t border-black/5 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-opacity transition-transform duration-250 ease-out motion-safe:transition-opacity motion-safe:transition-transform motion-reduce:transition-none",
          "data-[state=closed]:invisible data-[state=closed]:-translate-y-2 data-[state=closed]:opacity-0",
          "data-[state=open]:visible data-[state=open]:translate-y-0 data-[state=open]:opacity-100",
        )}
        style={{ top: `calc(100% + ${gapPx}px)` }}
        data-state={open ? "open" : "closed"}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-6">
          <div className="grid grid-cols-4 gap-x-12 gap-y-7 max-lg:grid-cols-2">
            {items.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="grid grid-cols-[56px_1fr] items-start gap-3 rounded-2xl p-2 text-left no-underline transition-all outline-none hover:bg-[#f3f6ff] hover:shadow-inner focus-visible:bg-[#f3f6ff]"
              >
                {p.img ? (
                  // Для простоты — <img>. Можно заменить на next/image при необходимости.
                  <img
                    src={p.img}
                    alt={p.imgAlt ?? p.title}
                    className="h-14 w-14 object-contain select-none"
                    width={56}
                    height={56}
                  />
                ) : (
                  <span className="h-14 w-14 rounded-lg bg-zinc-100" />
                )}
                <span className="block">
                  <span className="mb-1 block text-[15px] leading-snug font-extrabold text-zinc-900">
                    {p.title}
                  </span>
                  {p.sub && (
                    <span className="block text-sm leading-snug text-zinc-500">
                      {p.sub}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
Использование:

// в вашем Header рядом с другими пунктами меню
import MegaMenuDropdown, { type MegaItem } from "@/components/MegaMenuDropdown";

const items: MegaItem[] = [
  { title: "Тягодутьевые машины", sub: "Вентиляторы, дымососы", href: "/catalog/tyagodut", img: "/img/tm.png" },
  { title: "Теплообменное оборудование", sub: "Калориферы, теплообменники", href: "/catalog/heat-exchangers", img: "/img/to.png" },
  { title: "Отопительное оборудование", sub: "Водяные/паровые агрегаты", href: "/catalog/heating", img: "/img/oo.png" },
  { title: "Комплектующие к вентиляторам", sub: "Решётки, кожухи", href: "/catalog/fan-parts", img: "/img/kv.png" },
];

<ul className="flex items-center gap-12">
  <li><Link href="/about" className="font-extrabold">О компании</Link></li>
  <li>
    <MegaMenuDropdown label="Продукция" items={items} />
  </li>
  <li><Link href="/stock" className="font-extrabold">Наличие</Link></li>
  ...
</ul>

— Компонент позиционирует панель относительно себя: обёртка <div> имеет className "relative" и dropdown рендерится как absolute left-1/2 w-screen -translate-x-1/2 top-full.
— Открытие/закрытие: hover/focus, уход мыши, blur и Escape.
— Для более жёсткого контроля можно внешне передавать open/setOpen — скажи, добавлю пропсы.
*/
