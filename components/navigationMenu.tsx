"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="flex">
      <Link
        href="/kalorifery-voda"
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
