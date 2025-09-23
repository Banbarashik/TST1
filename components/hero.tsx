"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

const slides = [
  {
    title: ["25 лет на рынке", "воздушно-отопительного оборудования"],
    text: "",
    img: {
      url: "/img/hero/slide1.png",
      alt: "Агрегаты воздушного отопления",
    },
    imgClass: "object-cover",
    titleClass: "md:text-[50px] lg:text-6xl sm:text-4xl text-2xl",
  },
  {
    title: [""],
    text: `Производим безопасное и простое в обслуживании нагревательное оборудование,
		устойчивое к плохим условиям эксплуатации, надежное и способное исправно работать
		в течение многих лет`,
    img: {
      url: "/img/hero/slide2.png",
      alt: "Калориферы воздушного отопления",
    },
    imgClass: "object-cover",
    textClass: "text-xl",
  },
  {
    title: ["Тепло там, где есть наша продукция"],
    text: "",
    img: {
      url: "/img/hero/slide3.png",
      alt: "Воздушное отопление производственного помещения",
    },
    imgClass: "object-cover sm:object-fill",
    titleClass: "md:text-[40px] lg:text-5xl sm:text-3xl text-2xl",
  },
];

export default function Hero() {
  const [emblaApi, setEmblaApi] = React.useState<any>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <header className="relative">
      <Carousel opts={{ loop: true }} className="w-full" setApi={setEmblaApi}>
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem
              key={idx}
              className="relative flex h-126 cursor-grab items-center justify-center overflow-hidden"
            >
              <Image
                src={slide.img.url}
                alt={slide.img.alt}
                fill
                className={`${slide.imgClass}`}
                priority
                aria-hidden="true"
              />
              {/* Overlay for darkening */}
              <div className="absolute inset-0 bg-black/10" />
              {/* Text */}
              <div
                className={`${
                  idx === 2 ? "max-w-6xl" : "max-w-5xl"
                } relative z-10 mx-auto space-y-10 px-4 text-center text-white`}
              >
                <div className="relative">
                  {idx === 0 && (
                    <span className="absolute -top-10 right-20 -bottom-10 left-20 -z-10 bg-gray-700 opacity-30 blur-[60px]"></span>
                  )}
                  {idx === 2 && (
                    <span className="absolute -top-10 -right-20 -bottom-10 -left-20 -z-10 bg-black opacity-30 blur-[40px]"></span>
                  )}
                  {slide.title.map((t) => (
                    <p
                      key={t}
                      className={`font-bold text-shadow-lg/50 ${slide.titleClass}`}
                    >
                      {t}
                    </p>
                  ))}
                </div>
                {slide.text && (
                  <p className="text-lg font-bold drop-shadow text-shadow-md/30 md:text-[1.6rem]">
                    <span className="absolute -top-10 right-20 -bottom-10 left-20 -z-10 bg-gray-700 opacity-50 blur-[60px]"></span>
                    {slide.text}
                  </p>
                )}
                <Button size="xl" className="font-bold" asChild>
                  <Link href="/catalog">Каталог</Link>
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* Circles for slider navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`size-5 cursor-pointer rounded-full border-2 border-white transition ${
              currentSlide === idx ? "bg-white" : "bg-white/40"
            } focus:outline-none`}
            onClick={() => emblaApi?.scrollTo(idx)}
            type="button"
          />
        ))}
      </div>
    </header>
  );
}
