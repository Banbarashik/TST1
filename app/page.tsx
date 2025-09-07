// import Link from "next/link";
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
      <div className="max-w-8xl mx-auto my-24 px-12">
        <h1 className="mb-6 text-3xl font-bold uppercase">
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
      <div className="relative flex w-full items-center justify-center gap-20 overflow-hidden py-25">
        <Image
          src="/img/home/contact_form.png"
          alt="Contact background"
          fill
          className="scale-102 object-cover object-[30%_50%]"
          priority
        />
        {<div className="absolute inset-0 bg-white/40" />} {/* FOG */}
        <div className="z-10 flex w-full items-center justify-center gap-20 px-12">
          <div className="relative w-full max-w-xl shrink-0 text-center">
            <span className="absolute inset-0 -z-10 rounded-md bg-[#a6a6a6] opacity-100 blur-[90px]"></span>
            <p className="mb-4 text-5xl font-bold text-shadow-2xs text-shadow-[#b3b3b3]">
              Есть вопросы?
            </p>
            <p className="mb-2 text-2xl text-shadow-[#b3b3b3] text-shadow-xs">
              Оставьте заявку через форму, <br /> и мы свяжемся с вами в
              ближайшее время.
            </p>
          </div>
          <ContactForm outOfContext />
        </div>
      </div>
      {/* CONTACT FORM SECTION END */}
    </>
  );
}
