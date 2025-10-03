import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import CategoryCards from "@/components/categoryCards";
import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";

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
          className="relative mx-10 border-2 border-[#ccc] shadow-[0px,1px,0,3px,#bdbdbd_2px,4px,6px,3px,#dbdbdb] 2xl:mx-6"
        >
          <CarouselContent className="aspect-2/1">
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/1. kalorifery.png"
                alt="Калориферы водяные"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/2. kalorifery_blok.png"
                alt="Паровые калориферы"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/3. kalorifery_flantcy.png"
                alt="Калориферы с фланцами"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/4. agregaty_gruz.png"
                alt="Отопительные агрегаты"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/5. kalorifery_nestandart.png"
                alt="Установка парового калорифера"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/6. kalorifery_blok.png"
                alt="Секция паровых калориферов"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/7. electrokalorifery_sbor.png"
                alt="Электрокалориферы"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/8. kalorifery_flantcy.png"
                alt="Водяные калориферы с фланцами"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/9. ustanovki_gruz.png"
                alt="Электрокалориферные установки"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/10. kalorifery_sbor.png"
                alt="Водяные воздухонагреватели"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/11. kalorifery_nestandart.png"
                alt="Промышленный калорифер"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/12. kalorifery_blok.png"
                alt="Установка паровых калориферов"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/13. kalorifery_gruz.png"
                alt="Калориферы биметаллические"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/14. kalorifery_blok.png"
                alt="Секция водяных калориферов"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/15. kalorifery_nestandart.png"
                alt="Паровой воздухонагреватель"
                fill
              />
            </CarouselItem>
            <CarouselItem className="relative cursor-grab">
              <Image
                src="/img/produkciya/gallery/16. kalorifery_sbor.png"
                alt="Калориферы водяные промышленные"
                fill
              />
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

        <Heading lvl={3} text="Приобретение продукции" />
        <ProductParagraph>
          Для покупки воздушно-отопительного оборудования вы можете заполнить
          форму обратной связи на сайте, позвонить по указанным контактным
          телефонам, отправить в адрес нашего предприятия заявку на электронную
          почту. В запросе следует указать модель, номер и количество требуемых
          калориферов, отопительных агрегатов, воздухонагревательных установок.
          Актуальные розничные цены на всю номенклатуру выпускаемого нами
          оборудования выложены в карточках отдельных товаров и на странице
          Контакты Прайс. В выставленном коммерческом предложении или счете
          будут представлены стоимость, наличие, сроки изготовления и условия
          поставки.
        </ProductParagraph>

        <Heading lvl={3} text="Оплата продукции" />
        <ProductParagraph>
          Покупка воздушно-отопительного оборудования совершается на основании
          счета на оплату. Условия оплаты продукции согласовываются с каждым
          покупателем и могут включать в себя как полную, так и частичную
          предоплату для запуска необходимого вам оборудования в производство.
          Заключаются договора на долгосрочное сотрудничество с возможностью
          частичной или полной постоплатой за изготовленный и поставленный
          товар.
        </ProductParagraph>

        <Heading lvl={3} text="Поставка продукции" />
        <ProductParagraph>
          Отправка приобретенного воздушно-отопительного оборудования
          осуществляется на условиях самовывоза со склада завода. По
          согласованию возможна доставка продукции до местных терминалов
          транспортных компаний для последующей межтерминальной перевозки в
          регион грузополучателя. Поставка промышленного оборудования может
          также выполняться собственным автотранспортом нашего предприятия.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Сертификаты" className="mb-4" />
        {/* TODO create an array the links will be build off  */}
        <div className="mx-auto flex w-full flex-col items-center gap-6 sm:max-w-fit xl:max-w-none xl:flex-row">
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link href="/documents/Sertificat_kalorifery.pdf" target="_blank">
              Калориферы
            </Link>
          </Button>
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link href="/documents/Sertificat_agregaty.pdf" target="_blank">
              Отопительные агрегаты
            </Link>
          </Button>
          <Button
            asChild
            className="text-md h-full flex-1/2 bg-gray-300 text-center font-semibold whitespace-normal text-black 2xl:whitespace-nowrap"
          >
            <Link href="/documents/Sertificat_ustanovki.pdf" target="_blank">
              Воздухонагревательные установки
            </Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
