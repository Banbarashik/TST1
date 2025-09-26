"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

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

const FADE_MS = 250 as const; // длительность анимации (под один источник правды)
type MenuState = "closed" | "open" | "closing";
const gapPx = 19;

export default function MegaMenuDropdown({
  items,
  className,
}: MegaMenuDropdownProps) {
  const [menuState, setMenuState] = React.useState<MenuState>("closed");
  const open = menuState === "open";
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);

  // 2) Хэндлеры открытия/закрытия:
  function openMenu() {
    setMenuState("open");
  }
  function closeMenu() {
    // сначала переводим в "closing", потом скрываем окончательно
    setMenuState("closing");
    window.setTimeout(() => setMenuState("closed"), FADE_MS);
  }

  // Закрыть по Escape
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
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
      onMouseLeave={closeMenu}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) closeMenu();
      }}
    >
      {/* Триггер */}
      <Link
        href="#"
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={open}
        onMouseEnter={openMenu}
        onFocus={openMenu}
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
          "pointer-events-auto absolute left-1/2 z-50 grid w-5xl -translate-x-1/2 grid-cols-3 border-t border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
          // плавность
          "transition-opacity duration-[250ms] ease-out",
          // состояния:
          // closed: полностью спрятан и недоступен
          "data-[state=closed]:pointer-events-none data-[state=closed]:invisible data-[state=closed]:opacity-0",
          // open: видим и кликабелен
          "data-[state=open]:visible data-[state=open]:opacity-100",
          // closing: видим, но затухаем и игнорируем клики
          "data-[state=closing]:pointer-events-none data-[state=closing]:visible data-[state=closing]:opacity-0",
        )}
        style={{ top: `calc(100% + ${gapPx}px)` }}
        data-state={menuState}
      >
        {items.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="hover:text-primary-dark flex max-w-fit gap-4"
          >
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
