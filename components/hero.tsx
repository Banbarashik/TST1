"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

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
              <p className="text-lg md:text-2xl drop-shadow">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
