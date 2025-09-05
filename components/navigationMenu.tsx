"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="text-primary-darker flex h-full items-center">
      <Link
        href="/kalorifery-voda"
        className="btn relative flex h-full items-center px-5"
      >
        <div className="absolute left-0 h-full">
          <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
          <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        </div>
        <div className="absolute top-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col items-center">
          <span>Калькулятор подбора</span>
          <span>водяных калориферов</span>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
      </Link>

      <Link
        href="/kalorifery-voda"
        className="btn relative flex h-full items-center px-5"
      >
        <div className="absolute left-0 h-full">
          <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
          <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        </div>
        <div className="absolute top-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col items-center">
          <span>Калькулятор подбора</span>
          <span>паровых калориферов</span>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
      </Link>

      <Link
        href="/kalorifery-voda"
        className="btn relative flex h-full items-center px-5"
      >
        <div className="absolute left-0 h-full">
          <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
          <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        </div>
        <div className="absolute top-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col items-center">
          <span>Контакты</span>
          <span>Прайс-лист</span>
        </div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
        <div className="absolute right-0 h-full">
          <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
          <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        </div>
      </Link>
    </div>
  );
}
