"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    title: ["25 лет на рынке", "воздушно-отопительного оборудования"],
    text: "",
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
  {
    title: [""],
    text: `Производим безопасное и простое в обслуживании нагревательное оборудование,
		устойчивое к плохим условиям эксплуатации, надежное и способное исправно работать
		в течение многих лет`,
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
  {
    title: ["Тепло там, где есть наша продукция"],
    text: "",
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [],
  );

  return (
    <header className="relative w-screen">
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="keen-slider__slide relative flex h-126 w-screen cursor-grab items-center justify-center overflow-hidden"
          >
            <Image
              src={slide.img}
              alt=""
              fill
              className="h-full w-full scale-110 object-cover blur-sm"
              priority
              aria-hidden="true"
            />
            {/* Overlay for darkening */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Centered Text */}
            <div
              className={`${
                idx === 2 ? "max-w-6xl" : "max-w-5xl"
              } relative z-10 mx-auto px-4 text-center text-white`}
            >
              {slide.title.map((t) => (
                <p key={t} className="text-6xl font-bold drop-shadow-lg">
                  {t}
                </p>
              ))}
              {/* <h2 className="text-6xl font-bold drop-shadow-lg mb-10">
                {slide.title}
              </h2> */}
              <p className="mb-10 text-lg font-bold drop-shadow md:text-2xl">
                {slide.text}
              </p>
              <Button size="xl" className="font-bold" asChild>
                <Link href={slide.url}>Каталог</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Circles for slider navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-4 w-4 rounded-full border-2 border-white transition ${currentSlide === idx ? "bg-white" : "bg-white/40"} focus:outline-none`}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            type="button"
          />
        ))}
      </div>
    </header>
  );
}
