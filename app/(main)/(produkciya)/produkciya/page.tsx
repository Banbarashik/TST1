import type { Metadata } from "next";
import Image from "next/image";

import CategoryCards from "@/components/categoryCards";
import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Производство промышленного воздушно-отопительного оборудования",
  description:
    "Промышленное воздушно-отопительное оборудование от предприятия-производителя Т.С.Т. Продажа калориферов, отопительных агрегатов, воздухонагревательных установок",
  keywords:
    "промышленное воздушно отопительное оборудование,промышленные агрегаты воздушного отопления,производитель промышленных калориферов,промышленные калориферы цена,промышленные калориферы расчет и подбор,промышленные водяные калориферы,промышленные паровые калориферы,промышленные отопительные агрегаты,промышленные электрокалориферы,промышленные калориферы купить",
};

const produkciyaCategories = [
  {
    name: "Калориферы",
    url: "/kalorifery",
    img: "/img/produkciya/kalorifery.png",
  },
  {
    name: "Отопительные агрегаты",
    url: "/otopitelnye-agregaty",
    img: "/img/produkciya/otopitelnye_agregaty.png",
  },
  {
    name: "Воздухонагревательные установки",
    url: "/vozduchonagrevatelnye-ustanovki",
    img: "/img/produkciya/vozduchonagrevatelnye_ustanovki.png",
  },
];

export default function ProdukciyaPage() {
  return (
    <article className="space-y-6">
      <Heading lvl={1} text="Промышленное воздушно-отопительное оборудование" />
      <ProductParagraph>
        Машиностроительное предприятие по производству промышленного
        воздушно-отопительного оборудования ЗАО «Т.С.Т.» образовано в 2001 году.
        За двадцать пять лет профессиональной деятельности накоплен большой опыт
        по разработке, изготовлению и поставки теплообменной продукции для
        различных отраслей экономики.
      </ProductParagraph>

      <section className="space-y-4">
        <Heading lvl={2} text="Продукция" />
        <ProductParagraph>
          Основная специализация нашего предприятия – выпуск водяных и паровых
          калориферов, осуществляющих нагрев воздуха для создания и поддержания
          оптимального микроклимата помещений и технологических процессов. Общая
          серийная линейка стандартных воздухонагревателей насчитывает более
          четырехсот моделей, что предоставляет возможность решить задачи,
          связанные с быстрым и качественным обогревом объектов любой площади.
        </ProductParagraph>
        <CategoryCards
          categories={produkciyaCategories}
          containerGap="xl:gap-2"
          cardClassName="2xl:text-sm xl:px-6"
        />
        <ProductParagraph>
          На производственных площадях предприятия изготавливаются водяные и
          паровые воздушно-отопительные агрегаты с широким спектром
          производительности, электрические воздухонагревательные установки и
          комплектующие к этому теплообменному оборудованию. В 2002 году
          спроектирована и запущена в работу серия теплообменников и агрегатов
          для эксплуатации в условиях пониженных температур.
        </ProductParagraph>
        <Carousel
          opts={{ loop: true }}
          className="relative mx-6 border-2 border-[#ccc] shadow-[0px,1px,0,3px,#bdbdbd_2px,4px,6px,3px,#dbdbdb]"
        >
          <CarouselContent className="h-126">
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/1.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/2.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/3.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/4.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/5.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/6.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/7.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/8.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/9.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/10.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/11.png" alt="" fill />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image src="/img/produkciya/gallery/12.png" alt="" fill />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <ProductParagraph>
          На страницах сайта организации представлены подробные теплотехнические
          характеристики промышленной климатической продукции, программы для
          быстрого подбора приточных калориферов. Специалистами нашего
          предприятия осуществляется техническое сопровождение.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Сертификаты" className="mb-4" />
        <div className="mx-auto flex w-full flex-col gap-6 sm:max-w-fit xl:max-w-none xl:flex-row">
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link
              href="/documents/Sertificat_kalorifery.pdf"
              target="_blank"
              className=""
            >
              Калориферы
            </Link>
          </Button>
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link
              href="/documents/Sertificat_agregaty.pdf"
              target="_blank"
              className=""
            >
              Отопительные агрегаты
            </Link>
          </Button>
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link
              href="/documents/Sertificat_ustanovki.pdf"
              target="_blank"
              className=""
            >
              Воздухонагревательные установки
            </Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
