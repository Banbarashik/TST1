import productData from "@/data/products.json";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import LinkButtonsBlock from "@/components/linkButtonsBlock";

export const metadata: Metadata = {
  title: "Калориферы водяные ТВВ",
  description:
    "Калориферы ТВВ водяные – производитель ООО Т.С.Т. Производство, технические характеристики, мощность, цена водяных воздухонагревателей для холодного климата ВНВ",
  keywords:
    "калорифер твв,калориферы твв цена,калориферы твв технические характеристики,воздухонагреватели для холодного климата водяные,калориферы водяные для низких температурных режимов,калорифер внв,калорифер внв водяной,воздухонагреватель внв 113,воздухонагреватель внв 113 22 хл,воздухонагреватели внв 113 купить",
};

const products = productData
  .filter((p) => p.categories.includes("tvv"))
  .sort((a, b) => sortProducts(a.name, b.name));
const tvv3 = products.filter((p) => p.rows === 3);
const tvv4 = products.filter((p) => p.rows === 4);

const linkButtons = [
  {
    name: "Каталог водяных калориферов ТВВ",
    url: "/documents/Kalorifer_TVV_katalog_2025.pdf",
    openNewTab: true,
  },
  {
    name: "Прайс-лист калориферов ТВВ",
    url: "/documents/Price_list_zao_tst_2025.pdf",
    openNewTab: true,
  },
];

export default function KaloriferyTVVPage() {
  return (
    <>
      <Heading lvl={1} text="Калориферы ТВВ водяные" />

      <section>
        <Heading lvl={2} text="Производство и назначение калориферов ТВВ" />
        <ProductParagraph>
          Калориферы водяные ТВВ производства ООО Т.С.Т. – поверхностные
          водовоздушные теплообменники для холодного климата с увеличенным
          сечением несущих трубок, предназначенные для нагрева внешнего,
          смешанного или рециркуляционного воздуха в системах кондиционирования,
          вентиляции, воздушного отопления и сушильных камерах. В качестве
          теплоносителя выступает горячая или перегретая вода с температурой до
          180°С и давлением до 1.2 МПа.
        </ProductParagraph>
        <ProductParagraph className="mb-5">
          Производство калориферов ТВВ осуществляется согласно ТУ
          4863-002-55613706-02 с проведением обязательных приемо-сдаточных
          испытаний и проверкой каждого водяного воздухонагревателя на
          герметичность и прочность.
        </ProductParagraph>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0">
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/general_pages/kalorifer_vodianoi_tvv_komplektatciia.png"
              alt="Производство водяных калориферов ТВВ"
              title="Калорифер ТВВ водяной"
              fill
            />
          </div>
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/general_pages/kalorifer_vodianoi_tvv.png"
              alt="Водяной воздухонагреватель ВНВ 113"
              title="Калорифер ТВВ"
              fill
            />
          </div>
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Конструкция калориферов ТВВ" />
        <ProductParagraph>
          Конструктивно калорифер ТВВ представляет собой металлический модуль
          прямоугольной формы, включающий в себя группу теплопередающих
          элементов <span className="text-primary-dark">(1)</span>,
          расположенных несколькими рядами в шахматной компоновке относительно
          направления воздушного потока. Монолитность каркаса обеспечивается
          двумя трубными решетками{" "}
          <span className="text-primary-dark">(2)</span>, изготовленными из
          листовой стали толщиной 4 мм и коллекторами{" "}
          <span className="text-primary-dark">(3)</span> с разделительными
          перегородками. Данное разделение позволяет повысить скорость движения
          воды и, соответственно теплоотдачу воздухонагревателя без увеличения
          объема теплоносителя.
        </ProductParagraph>
        <ProductParagraph>
          Жесткость и прочностность конструкции гарантируется сварным
          соединением, связывающим воедино все элементы гидравлического тракта
          многоходового воздухонагревателя ТВВ. Для подачи и отвода
          теплоносителя предназначены патрубки{" "}
          <span className="text-primary-dark">(4)</span>. Съемные боковые щитки{" "}
          <span className="text-primary-dark">(5)</span> крепятся с помощью
          болтового соединения к торцам трубных решеток. Для соединения водяного
          калорифера ТВВ со смежным оборудованием вентиляционно-отопительной
          системы, по периметру решеток и щитков пробиваются монтажные отверстия{" "}
          <span className="text-primary-dark">(6)</span>.
        </ProductParagraph>
        <ProductParagraph>
          Водовоздушные биметаллические калориферы ТВВ эксплуатируются с
          горизонтальным расположением теплообменных элементов, которые могут
          быть изготовлены в двух вариантах: на базе стальных электросварных
          прямошовных по ГОСТ 10704 или цельнотянутых бесшовных по ГОСТ 8734
          несущих трубок диаметром 22х1.5 мм и алюминиевого спирально-накатного
          оребрения номинальным диаметром 41 мм. Увеличенная по сравнению с
          другими моделями водяных калориферов площадь сечения для прохода
          теплоносителя способствует более длительному сохранению
          эксплуатационных характеристик воздухонагревателя, уменьшению
          возможности его заморозки.
        </ProductParagraph>
      </section>

      <section id="anchor1">
        <Heading lvl={2} text="Технические характеристики калориферов ТВВ" />
        <ProductParagraph className="mb-4">
          Калориферы водяные серии ТВВ изготавливаются в двух вариантах: ТВВ 3 –
          трехрядная модель и ТВВ 4 – четырехрядный теплообменник. Увеличение
          количества рядов предполагает собой нагрев входящего воздуха на
          большую разницу температур.
        </ProductParagraph>
        <ProductLinks
          products={tvv3.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-4"
          gridTemplateCols="grid-cols-[repeat(auto-fill,minmax(130px,max-content))]"
        />
        <ProductParagraph className="mb-4">
          Водяные воздухонагреватели любой рядности состоят из семи
          типоразмеров, каждому из которых присваивается свой порядковый номер.
          Калориферы одного номера ТВВ3 и ТВВ4 имеют одинаковые длину и высоту,
          а также производительность по воздуху, но разную тепловую мощность.
          Диапазон производительности по воздуху и теплу, в зависимости от
          модели и номера водяного калорифера серии ТВВ, варьируется от 2500 до
          25000 м<sup>3</sup>/час, от 55 до 725 кВт.
        </ProductParagraph>
        <ProductLinks
          products={tvv4.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-3"
          gridTemplateCols="grid-cols-[repeat(auto-fill,minmax(130px,max-content))]"
        />
      </section>

      <section className="mb-4">
        <Heading lvl={2} text="Габаритные размеры калориферов ТВВ" />
        <Image
          src="/img/general_pages/kalorifery_tvv_gabaritnye_razmery.png"
          alt="Габаритные размеры воздухонагревателей ВНВ 113"
          title="Габаритные размеры водяных калориферов ТВВ"
          width={968}
          height={1}
          className="mb-3"
        />
        <iframe
          src="/legacy/table-kalorifery-tvv.html"
          className="h-74 w-full"
        />
        <ProductParagraph>
          Структура условного обозначения водяных калориферов ТВВ производства
          ООО «Т.С.Т.». Калорифер ТВВ 409-02 ХЛ3 (ТУ 4863-002-55613706-02): ТВВ
          – теплообменник воздушный водяной; 4 - количество рядов теплообменных
          элементов; 09 - типоразмер воздухонагревателя; 02 - конструктивное
          исполнение; ХЛ - климатическое исполнение; 3 - категория размещения.
        </ProductParagraph>
      </section>

      <LinkButtonsBlock buttons={linkButtons} />
    </>
  );
}
