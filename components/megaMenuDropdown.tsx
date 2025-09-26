"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Отдельныsй компонент мегаменю: триггер + выпадающее содержимое.
 * Открывается по hover и по фокусу, закрывается по уходу курсора/фокуса и по Escape.
 */
export type MegaItem = {
  title: string;
  href: string;
  img: string;
};

interface MegaMenuDropdownProps {
  items: MegaItem[];
  className?: string; // классы для контейнера пункта меню (обёртка)
}

const gapPx = 30;

export default function MegaMenuDropdown({
  items,
  className,
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
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onClick={(e) => e.preventDefault()}
        className="btn-flip btn-flip-p w-min text-sm xl:text-base"
        data-back="Сертификаты"
        data-front="Продукция"
      />

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
          "pointer-events-auto absolute left-1/2 z-50 grid w-5xl -translate-x-1/2 grid-cols-3 border-t border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-opacity duration-400 ease-out",
          "data-[state=closed]:invisible data-[state=closed]:opacity-0",
          "data-[state=open]:visible data-[state=open]:opacity-100",
        )}
        style={{ top: `calc(100% + ${gapPx}px)` }}
        data-state={open ? "open" : "closed"}
      >
        {items.map((p) => (
          <Link key={p.title} href={p.href} className="flex max-w-fit gap-4">
            <Image src={p.img} alt={p.title} width={80} height={80} />
            <div className="mt-2 font-semibold">{p.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* — Компонент позиционирует панель относительно себя: обёртка <div> имеет className "relative" и dropdown рендерится как absolute left-1/2 w-screen -translate-x-1/2 top-full.
— Открытие/закрытие: hover/focus, уход мыши, blur и Escape. */
