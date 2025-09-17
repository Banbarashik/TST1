"use client";

import Link from "next/link";
import { useState } from "react";

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
          className="w-full bg-[#E0E0E0] px-4 py-3 text-lg font-semibold"
          onClick={() => setOpen((o) => !o)}
        >
          Меню
        </button>
        {open && (
          <div className="flex flex-col border-t bg-white shadow-lg">
            <Link
              href="/kalorifery-voda"
              className="border-b px-4 py-3 hover:bg-gray-100"
            >
              Водяные калориферы
            </Link>
            <Link
              href="/kalorifery-par"
              className="border-b px-4 py-3 hover:bg-gray-100"
            >
              Паровые калориферы
            </Link>
            <Link
              href="/kontakty-prajs"
              className="px-4 py-3 hover:bg-gray-100"
            >
              Контакты / Прайс
            </Link>
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
