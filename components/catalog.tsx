import Link from "next/link";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const productCategories = [
  {
    name: "Электрические установки СФОЦ, калориферы СФО, шкафы управления, ТЭНЫ",
    url: "",
    tip: [
      `Если в отапливаемом помещении нет подведенной теплоцентрали, а ее монтаж не
    представляется возможным, тогда имеет смысл использовать в качестве энергоносителя
    - электричество, а в качестве отопительных устройств - электрокалориферные установки
    в сборе – центробежный радиальный вентилятор и электрический калорифер. Эти агрегаты
    достаточно автономны и для их эксплуатации не требуется развернутых коммуникаций.`,
    ],
    items: [
      {
        name: "Установки СФОЦ",
        url: "",
        img: "/img/catalog/Установки-СФОЦ.png",
      },
      {
        name: "Калориферы СФО",
        url: "",
        img: "/img/catalog/Калориферы-СФО.png",
      },
      {
        name: "Шкафы управления",
        url: "",
        img: "/img/catalog/Шкафы-управления.png",
      },
      {
        name: "ТЭНы оребренные",
        url: "",
        img: "/img/catalog/ТЭНы-оребренные.png",
      },
    ],
  },
  {
    name: "Калориферы и отопительные агрегаты",
    url: "",
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
    items: [
      {
        name: "Калориферы КСК",
        url: "",
        img: "/img/catalog/Калориферы-КСк.png",
      },
      {
        name: "Калориферы КПСК",
        url: "",
        img: "/img/catalog/Калориферы-КПСк.png",
      },
      {
        name: "Агрегаты АО2",
        url: "",
        img: "/img/catalog/Агрегаты-АО2.png",
      },
      {
        name: "Агрегаты СТД-300",
        url: "",
        img: "/img/catalog/Агрегаты-СТД-300.png",
      },
    ],
  },
];

export default function Catalog() {
  return (
    <div className="my-32">
      <p className="text-4xl mb-10 font-bold">Каталог</p>
      <ul className="flex flex-col items-center gap-12">
        {productCategories.map(function (category) {
          return (
            <li key={category.name} className="w-full">
              <Link href="#" className="text-2xl">
                {category.name}
              </Link>
              <Tooltip>
                <TooltipContent className="w-4xl text-lg flex flex-col gap-2">
                  {category.tip.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </TooltipContent>
                <TooltipTrigger className="bg-amber-300 rounded-full w-6 h-6 border">
                  <div>?</div>
                </TooltipTrigger>
              </Tooltip>

              <ul className="flex gap-12 mt-6">
                {category.items.map(function (product) {
                  return (
                    <li key={product.name}>
                      <Link
                        href={product.url}
                        className="bg-card text-card-foreground flex flex-col gap-4 px-10 pt-5 pb-3 rounded-xl border shadow-sm items-center"
                      >
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={250}
                          height={250}
                        />
                        <p className="font-bold uppercase">{product.name}</p>
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
  );
}
