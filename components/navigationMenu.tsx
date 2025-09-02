"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="flex h-full items-center">
      <Link
        href="/kalorifery-voda"
        className="hover:bg-accent flex h-full flex-col items-center justify-center px-4 font-bold"
      >
        <span>Калькулятор подбора</span>
        <span>водяных калориферов</span>
      </Link>
      <span className="h-full w-px bg-gray-400"></span>
      <Link
        href="/kalorifery-par"
        className="hover:bg-accent flex h-full flex-col items-center justify-center px-4 font-bold"
      >
        <span>Калькулятор подбора</span>
        <span>паровых калориферов</span>
      </Link>
      <span className="h-full w-px bg-gray-400"></span>
      <Link
        href="/kontakty-prajs"
        className="hover:bg-accent flex h-full flex-col items-center justify-center px-4 font-bold"
      >
        <span>Контакты</span>
        <span>Прайс-лист</span>
      </Link>
    </div>
  );
}
