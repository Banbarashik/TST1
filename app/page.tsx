import Link from "next/link";

import Hero from "@/components/hero";
import ContactForm from "@/components/contactForm";
import Catalog from "@/components/catalog";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-8xl px-12 mx-auto">
        <Catalog />
        <div className="flex justify-center items-center gap-20 mb-32">
          <div className="text-center">
            <p className="text-4xl mb-4 font-bold">Есть вопросы?</p>
            <p className="text-xl mb-2">
              Оставьте заявку через форму справа, и мы свяжемся с вами в самое
              ближайшее время.
            </p>
            <p className="text-xl">
              <span>Или воспользуйтесь нашими </span>
              <Link href="" className="text-primary">
                онлайн-инструментами расчета-подбора калориферов.
              </Link>
            </p>
          </div>
          <ContactForm />
        </div>
        div
      </div>
    </>
  );
}
