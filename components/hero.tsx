"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    // title: "25 лет на рынке вентиляционно-отопительного оборудования",
    title: ["25 лет на рынке", "вентиляционно-отопительного оборудования"],
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
    []
  );

  return (
    <header className="relative w-screen">
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
            <div
              className={`${
                idx === 2 ? "max-w-6xl" : "max-w-5xl"
              } relative z-10 text-center text-white mx-auto px-4`}
            >
              {slide.title.map((t) => (
                <p key={t} className="text-6xl font-bold drop-shadow-lg">
                  {t}
                </p>
              ))}
              {/* <h2 className="text-6xl font-bold drop-shadow-lg mb-10">
                {slide.title}
              </h2> */}
              <p className="text-lg md:text-2xl drop-shadow mb-10 font-bold">
                {slide.text}
              </p>
              <Button className="text-xl px-8 h-14 font-bold" asChild>
                <Link href={slide.url}>Каталог</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Circles for slider navigation */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full border-2 border-white transition
							${currentSlide === idx ? "bg-white" : "bg-white/40"}
							focus:outline-none`}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            type="button"
          />
        ))}
      </div>
    </header>
  );
}
