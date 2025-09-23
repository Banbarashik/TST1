import productData from "@/data/products.json";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Калориферы водяные КСк",
  description:
    "Калориферы КСк водяные – производитель ООО Т.С.Т. Производство, технические характеристики, габаритные размеры, производительность, цена водяных калориферов КСк",
  keywords:
    "калорифер кск,калорифер водяной кск,калориферы кск технические характеристики,калорифер кск мощность,калориферы кск габаритные размеры,купить калориферы кск,калориферы кск цена,калорифер кск 2,калорифер кск 3,калорифер кск 4",
};

export default function KaloriferyKSKPage() {
  const products = productData
    .filter((p) => p.categories.includes("ksk"))
    .sort((a, b) => sortProducts(a.name, b.name));
  const ksk2 = products.filter((p) => p.rows === 2);
  const ksk3 = products.filter((p) => p.rows === 3);
  const ksk4 = products.filter((p) => p.rows === 4);

  return (
    <>
      <Heading lvl={1} text="Калориферы КСк водяные" />

      <section>
        <Heading lvl={2} text="Производство и назначение калориферов КСк" />
        <ProductParagraph>
          Калориферы водяные КСк производства ООО Т.С.Т. – поверхностные
          рекуперативные теплообменники, предназначенные для нагрева внешнего,
          смешанного или рециркуляционного воздуха в системах кондиционирования,
          вентиляции и воздушного отопления. В качестве теплоносителя выступает
          горячая или перегретая вода с температурой до 180°С и давлением до 1.2
          МПа. Передача теплоты от воды к воздуху происходит с помощью процесса
          теплопередачи.
        </ProductParagraph>
        <ProductParagraph className="mb-5">
          Производство калориферов КСк осуществляется согласно ТУ
          4863-002-55613706-02 с проведением обязательных приемо-сдаточных
          испытаний и проверкой каждого водяного воздухонагревателя на
          герметичность и прочность.
        </ProductParagraph>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0">
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/general_pages/kalorifer_vodianoi_ksk_komplektatciia.png"
              alt="Производство калориферов КСк"
              title="Калорифер КСк водяной"
              fill
            />
          </div>
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/general_pages/kalorifer_vodianoi_ksk.png"
              alt="Конструкция водяного калорифера КСк"
              title="Калорифер КСк"
              fill
            />
          </div>
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Конструкция калориферов КСк" />
        <ProductParagraph>
          Конструктивно калорифер КСк представляет собой металлический модуль
          прямоугольного сечения с теплоотдающими элементами{" "}
          <span className="text-primary-dark">(1)</span>. Монолитность каркаса
          обеспечивается двумя трубными решетками{" "}
          <span className="text-primary-dark">(2)</span>, изготовленными из
          листовой стали толщиной 4 мм и коллекторами с разделительными
          перегородками <span className="text-primary-dark">(3)</span>, которые
          выполняют функцию распределения и направления потока используемого
          теплоносителя.
        </ProductParagraph>
        <ProductParagraph>
          Жесткость и прочностность конструкции гарантируется сварным
          соединением, связывающим воедино все элементы гидравлического тракта
          многоходового воздухонагревателя КСк. Для подачи и отвода воды
          предназначены патрубки <span className="text-primary-dark">(4)</span>.
          Съемные боковые щитки <span className="text-primary-dark">(5)</span>{" "}
          крепятся с помощью болтового соединения к торцам трубных решеток. Для
          соединения водяного калорифера КСк со смежным оборудованием
          вентиляционно-отопительной системы, по периметру решеток и щитков
          пробиваются монтажные отверстия{" "}
          <span className="text-primary-dark">(6)</span>.
        </ProductParagraph>
        <ProductParagraph>
          Водовоздушные биметаллические калориферы КСк эксплуатируются с
          горизонтальным расположением теплообменных элементов, которые могут
          быть изготовлены в двух вариантах: на базе стальных электросварных
          прямошовных по ГОСТ 10704 или цельнотянутых бесшовных по ГОСТ 8734
          несущих трубок диаметром 16х1.5 мм и алюминиевого спирально-накатного
          оребрения номинальным диаметром 39 мм.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Технические характеристики калориферов КСк" />
        <ProductParagraph>
          Калориферы водяные серии КСк изготавливаются в трех вариантах: КСк2 –
          малая модель, по глубине прохода воздуха состоит из двух рядов; КСк3 –
          средняя модель, имеет трехрядное исполнение; КСк4 – большая модель,
          включает четыре ряда. Увеличение количества рядов теплообменных трубок
          предполагает собой нагрев входящего воздуха на большую разницу
          температур.
        </ProductParagraph>
        <ProductParagraph>
          Водяные воздухонагреватели любой рядности состоят из двенадцати
          типоразмеров, каждому из которых присваивается свой порядковый номер.
          Калориферы одного номера КСк2, КСк3 и КСк4 имеют одинаковые габаритные
          размеры и производительность по воздуху, но разную тепловую мощность.
          Диапазон производительности по воздуху и теплу, в зависимости от
          модели и номера водяного калорифера серии КСк, варьируется от 2000 до
          25000 м<sup>3</sup>/час, от 29 до 665 кВт.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={3} text="Технические характеристики калориферов КСк 2" />
        <ProductParagraph className="mb-4">
          Калориферы КСк 2 водяные изготавливаются с двумя рядами теплоотдающих
          элементов. Применяются для нагрева воздуха на небольшую разницу
          температур. Низкое аэродинамическое сопротивление.
        </ProductParagraph>
        <ProductLinks products={ksk2} className="mb-3" />
      </section>

      <section>
        <Heading lvl={3} text="Технические характеристики калориферов КСк 3" />
        <ProductParagraph className="mb-4">
          Калориферы КСк 3 изготавливаются с тремя рядами теплоотдающих
          элементов. Наиболее экономичный вариант с хорошими теплотехническими
          характеристиками. Повышенное гидравлическое сопротивление.
        </ProductParagraph>
        <ProductLinks products={ksk3} className="mb-3" />
      </section>

      <section>
        <Heading lvl={3} text="Технические характеристики калориферов КСк 4" />
        <ProductParagraph className="mb-4">
          Калориферы КСк 4 изготавливаются с четырьмя рядами теплоотдающих
          элементов. Наибольшая тепловая мощность, качественный обогрев с
          высокой разницей температуры воздуха на входе и выходе из калорифера.
          Увеличенное аэродинамическое сопротивление.
        </ProductParagraph>
        <ProductLinks products={ksk4} className="mb-3" />
      </section>

      <section className="mb-4">
        <Heading
          lvl={2}
          text="Габаритные размеры калориферов КСк"
          className="mb-3"
        />
        <Image
          src="/img/general_pages/kalorifery_ksk_gabaritnye_razmery.png"
          alt="Технические характеристики калориферов КСк"
          title="Габаритные размеры калориферов КСк водяных"
          width={968}
          height={1}
          className="mb-3"
        />
        <iframe
          src="/legacy/table-kalorifery-ksk.html"
          className="h-105 w-full"
        />
        <ProductParagraph>
          Структура условного обозначения водяных калориферов КСк производства
          ООО «Т.С.Т.». Калорифер КСк 4-10-02 ХЛ3 (ТУ 4863-002-55613706-02): КСк
          - калорифер спирально-катанный; 4 - количество рядов теплообменных
          элементов; 10 - типоразмер воздухонагревателя; 02 - конструктивное
          исполнение; ХЛ - климатическое исполнение; 3 - категория размещения.
        </ProductParagraph>
      </section>

      <TableAndCatalogLinks
        tableLinkOpenNewTab
        tableURL="/documents/Kalorifer_KSK_katalog_2025.pdf"
        tableLinkText="Скачать каталог водяных калориферов КСк"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист калориферов КСк"
      />
    </>
  );
}
