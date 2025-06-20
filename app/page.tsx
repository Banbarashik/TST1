import Link from "next/link";
import Image from "next/image";

import Hero from "@/components/hero";
import ContactForm from "@/components/contactForm";
import Catalog from "@/components/catalog";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-8xl px-12 mx-auto">
        <Catalog />
      </div>

      {/* CONTACT FORM SECTION START */}
      <div className="relative w-full flex justify-center items-center gap-20 pb-32 pt-32 overflow-hidden">
        <Image
          src="/img/hero/IMG_20190423_090922.jpg"
          alt="Contact background"
          fill
          className="object-cover z-0"
          priority
        />
        <div className="z-10 flex justify-center items-center gap-20 w-full px-12">
          <div className="text-center max-w-3xl">
            <p className="text-4xl mb-4 font-bold">Есть вопросы?</p>
            <p className="text-xl mb-2">
              Оставьте заявку через форму, и мы свяжемся с вами в ближайшее
              время.
            </p>
            <p className="text-xl">
              <span>Или воспользуйтесь </span>
              <Link href="" className="text-primary">
                онлайн-инструментами расчета-подбора калориферов.
              </Link>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
      {/* CONTACT FORM SECTION END */}
    </>
  );
}
