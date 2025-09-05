"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="text-primary-darker flex h-full items-center gap-1.5 pb-1.5 text-[15px]">
      <Link
        href="/kalorifery-voda"
        className="btn-3 flex h-[93%] items-center px-5"
      >
        <div className="flex flex-col items-center">
          <span>Калькулятор подбора</span>
          <span>водяных калориферов</span>
        </div>
      </Link>

      <Link
        href="/kalorifery-voda"
        className="btn-3 flex h-[93%] items-center px-5"
      >
        <div className="flex flex-col items-center">
          <span>Калькулятор подбора</span>
          <span>паровых калориферов</span>
        </div>
      </Link>

      <Link
        href="/kalorifery-voda"
        className="btn-3 flex h-[93%] items-center px-5"
      >
        <div className="flex flex-col items-center">
          <span>Контакты</span>
          <span>Прайс-лист</span>
        </div>
      </Link>
    </div>
  );
}
