"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    []
  );

  const slides = [
    {
      title: "25 лет на рынке вентиляционно-отопительного оборудования",
      text: "За это время мы установили деловое сотрудничество ...",
      img: "/img/hero/IMG_20190319_130001.jpg",
    },
    {
      title: "",
      text: `Продукция ООО Т.С.Т. – это безопасное и простое в обслуживании,
      устойчивое к плохим условиям эксплуатации, надежное и способное исправно
      работать в течение многих лет нагревательное оборудование.`,
      img: "/hero/tst-bg.jpg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-screen">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="keen-slider__slide cursor-grab relative w-screen h-126 flex items-center justify-center overflow-hidden"
            >
              <Image
                src={slide.img}
                alt=""
                fill
                className="object-cover w-full h-full blur-sm scale-110"
                priority
                aria-hidden="true"
              />
              {/* Overlay for darkening */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Centered Text */}
              <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl drop-shadow">{slide.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
