import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const productCategories = [
  {
    name: "Калориферы и отопительные агрегаты",
    tip: [
      `Принцип водяного и парового воздушного отопления состоит в следующем.
      Берется первичный теплоноситель - горячая вода или пар (исходя из той магистральной
      инфраструктуры, которая уже есть в помещении или здании). Это на порядок уменьшает
      расходы по подведению коммуникаций. Затем выбирается нагревательное оборудование.`,
      `Водяной или паровой теплообменник (если его эксплуатация будет осуществляться в
      составе отопительно-вентиляционной системы для нагрева приточного воздуха), либо
      автономная воздушно обогревательная установка в комплексе – осевой вентилятор и калорифер
      (для рециркуляционного нагрева воздуха). С помощью выбранного первичного носителя
      происходит нагрев теплонесущих элементов - оребренных алюминием трубок воздухонагревателя.
      Под действием вентилятора теплый воздух целенаправленным потоком прогревает всю
      площадь отапливаемого здания.`,
    ],
    url: "",
    items: [
      {
        name: "Калориферы КСК",
        url: "",
        img: "",
      },
      {
        name: "Калориферы КПСК",
        url: "",
        img: "",
      },
      {
        name: "Агрегаты АО2",
        url: "",
        img: "",
      },
      {
        name: "Агрегаты СТД-300",
        url: "",
        img: "",
      },
    ],
  },
];

export default function () {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-32">
        <p className="text-4xl">Каталог</p>
        <ul className="flex items-center gap-2">
          {productCategories.map(function (category) {
            return (
              <li className="w-full">
                <Link href="#" className="text-2xl">
                  {category.name}
                </Link>
                <Tooltip>
                  <TooltipContent className="w-4xl text-lg flex flex-col gap-2">
                    {category.tip.map((t) => (
                      <p>{t}</p>
                    ))}
                  </TooltipContent>
                  <TooltipTrigger className="bg-amber-300 rounded-full w-6 h-6 border">
                    <div>?</div>
                  </TooltipTrigger>
                </Tooltip>

                <ul className="flex gap-2.5">
                  {category.items.map(function (product) {
                    return (
                      <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
                        <Link href={product.url}>
                          <div className="bg-gray-300 aspect-square" />
                          <p className="font-bold uppercase text-center">
                            {product.name}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
