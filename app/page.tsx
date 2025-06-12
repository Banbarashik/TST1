"use client";

import { useState } from "react";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      key: "tst-logo",
      content: (
        <>
          <div className="w-64 h-64 bg-gray-300 shrink-0">TST Logo</div>
          <div className="text-2xl text-gray-700">
            <p className="text-3xl">
              25 лет на рынке вентиляционно-отопительного оборудования
            </p>
            <p>
              За это время мы установили деловое сотрудничество и прочные
              хозяйственные связи с предприятиями металлургической,
              топливно-энергетической, авиационной, машиностроительной,
              угольной, нефтегазовой, алмазной и алюминиевой промышленности, а
              также агропромышленного комплекса практически всех регионов нашей
              страны, Беларуси и Казахстана.
            </p>
          </div>
        </>
      ),
    },
    {
      key: "kalorifer",
      content: (
        <>
          <div className="w-64 h-64 bg-gray-300 shrink-0">Kalorifer</div>
          <p className="text-2xl text-gray-700">
            Продукция ООО Т.С.Т. – это безопасное и простое в обслуживании,
            устойчивое к плохим условиям эксплуатации, надежное и способное
            исправно работать в течение многих лет нагревательное оборудование.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute top-1/2 z-10 transform -translate-y-1/2 -translate-x-full text-gray-400"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-24 h-24" />
        </button>
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 translate-x-full text-gray-400"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-24 h-24" />
        </button>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide) => (
            <div key={slide.key} className="keen-slider__slide flex gap-20">
              {slide.content}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-4 h-4 rounded-full border-2 border-gray-400 transition-colors ${
                currentSlide === idx
                  ? "bg-gray-700 border-gray-700"
                  : "bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div>
        <p className="text-4xl">Каталог</p>
        <Link href="#" className="text-2xl">
          Калориферы и отопительные агрегаты
        </Link>
        <ul className="flex gap-2.5">
          <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
            <Link href="#">
              <div className="bg-gray-300 aspect-square" />
              <p className="font-bold uppercase text-center">Калориферы КСК</p>
            </Link>
          </li>
          <li className="box-border w-full border shadow-[3px_3px_5px_0px_rgb(128,128,128)] border-[rgb(128,128,128)] px-1 pt-1">
            <Link href="#">
              <div className="bg-gray-300 aspect-square" />
              <p className="font-bold uppercase text-center">Калориферы КПСК</p>
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
  );
}
