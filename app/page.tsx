"use client";

import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative">
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
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide flex gap-4">
            <div className="w-64 h-64 bg-gray-400 shrink-0">TST Logo</div>
            <p className="text-2xl text-gray-700">
              ЗАО Т.С.Т. (с 16.01.2015 ООО Т.С.Т.) – предприятие-изготовитель
              промышленного вентиляционно-отопительного оборудования, ведущее
              свою производственную деятельность с 2001 года.
            </p>
          </div>
          <div className="keen-slider__slide flex gap-4">
            <div className="w-64 h-64 bg-gray-400 shrink-0">Kalorifer</div>
            <p className="text-2xl text-gray-700">
              Воздухонагревательные установки, оребренные теплообменники,
              воздушно-отопительные агрегаты изготовления ООО Т.С.Т. – это
              безопасное и простое в обслуживании, устойчивое к плохим условиям
              эксплуатации, надежное и способное исправно работать в течение
              многих лет нагревательное оборудование.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
