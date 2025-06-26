import Link from "next/link";
import Image from "next/image";

import Hero from "@/components/hero";
import ContactForm from "@/components/contactForm";
import Catalog from "@/components/catalog";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-8xl mx-auto px-12">
        <Catalog />
      </div>

      {/* CONTACT FORM SECTION START */}
      <div className="relative flex w-full items-center justify-center gap-20 overflow-hidden pt-32 pb-32">
        <Image
          src="/img/hero/IMG_20190423_090922.jpg"
          alt="Contact background"
          fill
          className="scale-110 object-cover blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-white/40" /> {/* FOG */}
        <div className="z-10 flex w-full items-center justify-center gap-20 px-12">
          <div className="max-w-xl text-center">
            <p className="mb-4 text-5xl font-bold">Есть вопросы?</p>
            <p className="mb-2 text-2xl">
              Оставьте заявку через форму, и мы свяжемся <br /> с вами в
              ближайшее время.
            </p>
            <p className="text-2xl">
              <span>Или воспользуйтесь </span>
              <Link href="" className="text-primary">
                онлайн-инструментами расчета-подбора калориферов.
              </Link>
            </p>
          </div>
          <ContactForm outOfContext />
        </div>
      </div>
      {/* CONTACT FORM SECTION END */}
    </>
  );
}
