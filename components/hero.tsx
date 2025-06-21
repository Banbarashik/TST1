"use client";

import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "25 лет на рынке вентиляционно-отопительного оборудования",
    text: "",
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
  {
    title: "",
    text: `Производим безопасное и простое в обслуживании нагревательное оборудование,
    устойчивое к плохим условиям эксплуатации, надежное и способное исправно работать
    в течение многих лет`,
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
  {
    title: "Тепло там, где есть наша продукция",
    text: "",
    img: "/img/hero/IMG_20190319_130001.jpg",
    url: "",
  },
];

export default function Hero() {
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true }, []);

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
            <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl drop-shadow mb-4">
                {slide.text}
              </p>
              <Button className="text-3xl px-8 h-14" asChild>
                <Link href={slide.url}>Каталог</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
