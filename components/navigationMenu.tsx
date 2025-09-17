"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="flex">
      <Link
        href="/kalorifery-voda"
        className="btn-flip btn-flip-p w-min"
        data-back="Сертификаты"
        data-front="Продукция"
      />
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
        className="btn-flip btn-flip-p w-min"
        data-back="Прайс лист"
        data-front="Контакты"
      />
    </div>
  );
}
