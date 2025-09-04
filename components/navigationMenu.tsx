"use client";

import Link from "next/link";

export default function NavigationMenu() {
  return (
    <div className="flex h-full items-center">
      <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
      </div>
      <div className="btn btn-three w-50">
        <div className="flex flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col py-4">
          <span>Калькулятор подбора</span>
          <span>водяных калориферов</span>
        </div>
        <div className="flex flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
      </div>
      {/*      <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
      </div> */}

      <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
      </div>
      <div className="btn btn-three w-51">
        <div className="flex flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col py-4">
          <span>Калькулятор подбора</span>
          <span>паровых калориферов</span>
        </div>
        <div className="flex flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
      </div>
      {/*  <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
      </div> */}

      <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
      </div>
      <div className="btn btn-three w-30">
        <div className="flex flex-col">
          <span className="h-px bg-[#BDBDBD]"></span>
          <span className="h-px bg-[#F2F2F2]"></span>
        </div>
        <div className="flex flex-col py-4">
          <span>Контакты</span>
          <span>Прайс-лист</span>
        </div>
        <div className="flex flex-col">
          <span className="h-px bg-[#F2F2F2]"></span>
          <span className="h-px bg-[#BDBDBD]"></span>
        </div>
      </div>
      <div className="h-[82px]">
        <span className="inline-block h-full w-px bg-[#F2F2F2]"></span>
        <span className="inline-block h-full w-px bg-[#BDBDBD]"></span>
      </div>
    </div>
  );
}
