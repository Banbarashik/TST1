import Image from "next/image";
import type { Metadata } from "next";

import Hero from "@/components/hero";
import ContactForm from "@/components/contactForm";
import Catalog from "@/components/catalog";

export const metadata: Metadata = {
  title: "Предприятие-производитель воздушно-отопительного оборудования",
  description:
    "Предприятие Т.С.Т. - производитель воздушно-отопительного оборудования. Производство водяных, паровых и электрических калориферов, отопительных агрегатов воздушного отопления",
  keywords:
    "водяное воздушное отопление,паровое воздушное отопление,электрическое воздушное отопление,промышленное воздушное отопление,расчет воздушного отопления,воздушное отопление производственного помещения,агрегат воздушного отопления,калорифер воздушного отопления,воздухонагреватель воздушного отопления,калорифер для вентиляции",
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-8xl mx-auto px-12 pb-24 md:pt-11 lg:pt-16">
        <h1 className="font-bold uppercase md:mb-4 md:text-2xl lg:text-[26px] xl:text-[28px]">
          Производство воздушно-отопительного оборудования
        </h1>
        <p className="mb-10">
          Микроклимат производственных помещений характеризуется рядом факторов,
          среди которых температура и влажность воздуха, скорость его движения.
          В холодный период года, ввиду разницы температуры снаружи и внутри
          здания, теплопотери помещения через ограждающие конструкции очень
          значительны. В целях создания и поддержания комфортных тепловых
          условий для работы необходим обогрев промышленных корпусов с помощью
          отопительного оборудования.
        </p>
        <Catalog />
      </div>

      {/* CONTACT FORM SECTION START */}
      <div className="relative flex w-full items-center justify-center gap-20 overflow-hidden md:py-14 lg:py-25">
        <Image
          src="/img/home/contact_form.png"
          alt="Промышленное воздушное отопление"
          fill
          className="scale-102 object-cover object-[30%_50%]"
        />
        {<div className="absolute inset-0 bg-white/40" />} {/* FOG */}
        <div className="z-10 flex w-full items-center md:flex-col lg:flex-row lg:justify-evenly lg:gap-4 lg:px-6 xl:justify-center xl:gap-20 xl:px-12">
          <div className="relative text-center lg:w-max xl:w-full xl:max-w-xl xl:shrink-0">
            <span className="absolute inset-0 -z-10 rounded-md bg-[#a6a6a6] opacity-100 blur-[90px]"></span>
            <p className="font-bold text-shadow-2xs text-shadow-[#b3b3b3] md:mb-2 md:text-5xl lg:mb-4 lg:text-4xl xl:text-5xl">
              Есть вопросы?
            </p>
            <p className="text-shadow-[#b3b3b3] text-shadow-xs md:mb-6 md:text-2xl lg:mb-2 lg:text-xl xl:text-2xl">
              Оставьте заявку через форму, <br /> и мы свяжемся с вами в
              ближайшее время.
            </p>
          </div>
          <div className="max-w-xl">
            <ContactForm outOfContext />
          </div>
        </div>
      </div>
      {/* CONTACT FORM SECTION END */}
    </>
  );
}
