import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto">
        {/* Catalog */}
        <div>
          <p className="text-4xl">Каталог</p>
          <div className="flex items-center gap-2">
            <Link href="#" className="text-2xl">
              Калориферы и отопительные агрегаты
            </Link>
            <Tooltip>
              <TooltipContent className="w-4xl text-lg flex flex-col gap-2">
                <p>
                  Принцип водяного и парового воздушного отопления состоит в
                  следующем. Берется первичный теплоноситель - горячая вода или
                  пар (исходя из той магистральной инфраструктуры, которая уже
                  есть в помещении или здании). Это на порядок уменьшает расходы
                  по подведению коммуникаций. Затем выбирается нагревательное
                  оборудование.
                </p>
                <p>
                  Водяной или паровой теплообменник (если его эксплуатация будет
                  осуществляться в составе отопительно-вентиляционной системы
                  для нагрева приточного воздуха), либо автономная воздушно
                  обогревательная установка в комплексе – осевой вентилятор и
                  калорифер (для рециркуляционного нагрева воздуха). С помощью
                  выбранного первичного носителя происходит нагрев теплонесущих
                  элементов - оребренных алюминием трубок воздухонагревателя.
                  Под действием вентилятора теплый воздух целенаправленным
                  потоком прогревает всю площадь отапливаемого здания.
                </p>
              </TooltipContent>
              <TooltipTrigger className="bg-amber-300 rounded-full w-6 h-6 border">
                <p>?</p>
              </TooltipTrigger>
            </Tooltip>
          </div>
          <ul className="flex gap-2.5">
            <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
              <Link href="#">
                <div className="bg-gray-300 aspect-square" />
                <p className="font-bold uppercase text-center">
                  Калориферы КСК
                </p>
              </Link>
            </li>
            <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
              <Link href="#">
                <div className="bg-gray-300 aspect-square" />
                <p className="font-bold uppercase text-center">
                  Калориферы КПСК
                </p>
              </Link>
            </li>
            <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
              <Link href="#">
                <div className="bg-gray-300 aspect-square" />
                <p className="font-bold uppercase text-center">Агрегаты АО2</p>
              </Link>
            </li>
            <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
              <Link href="#">
                <div className="bg-gray-300 aspect-square" />
                <p className="font-bold uppercase text-center">
                  Агрегаты СТД-300
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
