import Link from "next/link";
import Image from "next/image";

import { Tooltip, TooltipContent } from "@/components/ui/tooltip";

const productCategories = [
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
        img: "/img/catalog/photo_2025-06-24_19-01-31.jpg",
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
    name: "Калориферы и отопительные агрегаты для низких температурных режимов",
    url: "",
    tip: [
      `ООО Т.С.Т. специализируется также на выпуске тепловентиляционного оборудования,
      эксплуатация которого проходит в условиях низких температурных режимов. Широкое применение
      данная продукция находит на предприятиях горнодобывающей промышленности Кемеровской области,
      Красноярского края, Хакасии.`,
      `Воздухонагреватели, с увеличенным диаметром несущей трубы для прохода теплоносителя, а также
      воздушные отопительные агрегаты на базе таких теплообменников, уже не один год служат для
      проветривания и обогрева подземных выработок многочисленных шахт и рудников северных районов
      страны, Дальнего Востока, Западной и Восточной Сибири.`,
    ],
    items: [
      {
        name: "Калориферы ТВВ ХЛ",
        url: "",
        img: "/img/catalog/Калориферы-ТВВ-хл.png",
      },
      {
        name: "Калориферы КП ХЛ",
        url: "",
        img: "/img/catalog/Калориферы-КП-хл.png",
      },
      {
        name: "Агрегаты АВО ХЛ",
        url: "",
        img: "/img/catalog/Агрегаты-АВО-хл.png",
      },
      {
        name: "Агрегаты СТД-300 ХЛ",
        url: "",
        img: "/img/catalog/Агрегаты-СТД-300-хл.png",
      },
    ],
  },
  {
    name: "Калориферы для комплектации воздухонагревательных секций",
    url: "",
    tip: [
      `Широкая линейка оборудования для вентиляции и отопления производства ООО Т.С.Т. позволит
      решить вопрос с быстрым и качественным обогревом помещений любой площади. Диапазон
      производительности по нагреваемому воздуху, в практике применения и эксплуатации нашей
      продукции, варьировался от 1500 м³/ч для небольших подсобных помещений - до 2000000 м³/ч в
      компоновке воздухонагревательных установок для подогрева воздуха, подаваемого в шахту.`,
    ],
    items: [
      {
        name: "Калориферы КФБ-А ХЛ водяные",
        url: "",
        img: "/img/catalog/Калориферы-КФБ-хл-водяные.png",
      },
      {
        name: "Калориферы КФБ-А ХЛ паровые",
        url: "",
        img: "/img/catalog/Калориферы-КФБ-хл-паровые.png",
      },
    ],
  },
];

export default function Catalog() {
  return (
    <div className="my-24">
      <ul className="flex flex-col items-center gap-16">
        {productCategories.map(function (category) {
          return (
            <li key={category.name} className="flex w-full flex-col">
              <p className="text-2xl font-bold uppercase">{category.name}</p>
              <Tooltip>
                <TooltipContent className="flex w-4xl flex-col gap-2 text-lg">
                  {category.tip.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </TooltipContent>
                {/* <TooltipTrigger className="bg-amber-300 rounded-full w-6 h-6 border">
                  <div>?</div>
                </TooltipTrigger> */}
              </Tooltip>

              <ul className="mt-6 flex gap-12">
                {category.items.map(function (product) {
                  return (
                    <li key={product.name} className="w-full">
                      <Link
                        href={product.url}
                        className="hover:text-primary bg-card text-card-foreground flex flex-col items-center gap-4 rounded-xl border px-10 pt-5 pb-5 shadow-sm"
                      >
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={750}
                          height={750}
                        />
                        <p className="font-bold tracking-wide uppercase">
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
  );
}
