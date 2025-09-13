"use client";

import Link from "next/link";

export default function NavigationMenu() {
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
