import productData from "@/data/products.json";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Калориферы приточные водяные",
  description:
    "Приточные водяные калориферы – производитель ООО Т.С.Т. Производство, характеристики, размеры, расчет, подбор, цена водяных калориферов для приточной вентиляции",
  keywords:
    "калорифер приточный водяной,калорифер водяной для приточной вентиляции,калорифер водяной для приточной установки,расчет водяного приточного калорифера,подбор приточного калорифера водяного,водяные приточные калориферы цена,приточный водяной калорифер купить,водяные приточные калориферы характеристики,приточные водяные калориферы размеры,водяная приточная установка",
};

export default function KaloriferyVodaPage() {
  const kpvs = productData
    .filter((p) => p.categories.includes("kpvs"))
    .sort((a, b) => sortProducts(a.name, b.name));
  const kpvu = productData
    .filter((p) => p.categories.includes("kpvu"))
    .sort((a, b) => sortProducts(a.name, b.name));

  return (
    <>
      <Heading lvl={1} text="Калориферы приточные КПВС и КПВУ" />

      <section>
        <Heading lvl={2} text="Производство приточных водяных калориферов" />
        <ProductParagraph>
          Приточные водяные калориферы производства предприятия ООО Т.С.Т.
          предназначены для создания и поддержания технологических параметров
          воздуха в системах воздушного отопления, вентиляции и
          кондиционирования, тепловых завесах, сушильных камерах. Нагрев или
          охлаждение воздуха происходит в процессе его конвективного
          взаимодействия с оребренной поверхностью теплообменных трубок при
          прохождении через сечение калорифера.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Характеристики приточных водяных калориферов" />
        <ProductParagraph className="mb-5">
          Водяные калориферы для приточных систем серии КПВС и КПВУ имеют
          квадратную форму с внутренними размерами нагревательного модуля от
          500х500 мм до 1500х1500 мм. Производительность по воздуху варьируется
          от 2000 до 25000 м<sup>3</sup>/час. Общая линейка калориферов КПВС и
          КПВУ насчитывает 48 номеров.
        </ProductParagraph>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-0 sm:overflow-x-auto 2xl:overflow-x-visible">
          <Image
            src="/img/general_pages/kalorifer_pritochnyi_vodianoi.png"
            alt="Расчет водяного приточного калорифера"
            title="Приточный водяной калорифер"
            width={484}
            height={1}
          />
          <Image
            src="/img/general_pages/kalorifer_vodianoi_pritochnyi.png"
            alt="Водяной калорифер для приточной вентиляции"
            title="Водяной калорифер для приточной установки"
            width={484}
            height={1}
          />
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Расчет и подбор приточных водяных калориферов" />
        <ProductParagraph>
          Выбрав номер калорифера с приближенным для выполнения вашей задачи
          объемом нагреваемого воздуха, в режиме онлайн можно произвести
          теплотехнический расчет. Водяные воздухонагреватели одного номера
          отличаются друг от друга количеством рядов теплопередающих трубок и
          вырабатываемой тепловой мощностью. Всего для подбора представлены 144
          модели.
        </ProductParagraph>
      </section>

      <section>
        <Heading
          lvl={2}
          text="Калькулятор подбора водяных приточных калориферов"
        />
        <ProductParagraph>
          Подбор с помощью онлайн калькулятора осуществляется следующим образом:
          1. вносятся данные по воздуху – производительность, температура на
          входе и требуемая на выходе; 2. выбирается вид теплоносителя, вода или
          концентрат гликолей, график теплоносителя; 3. в зависимости от
          показателей расчета делается выбор в пользу двух, трех или
          четырехрядной модели калорифера. При недостаточной или избыточный
          тепловой мощности следует перейти к последующему или предыдущему
          номеру водяного приточного воздухонагревателя.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={3} text="Приточные калориферы КПВС" className="mb-4" />
        <ProductLinks
          products={kpvs.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-6"
        />
        <ProductParagraph className="mb-3">
          Структура условного обозначения водяных приточных калориферов КПВС
          производства ООО «Т.С.Т.». Калорифер КПВС 822х822_3: КПВС – калорифер
          приточный водяной стандартный; 822 – внешняя длина калорифера, мм; 822
          – внешняя высота калорифера, мм; 3 - количество рядов теплопередающих
          элементов, стальные трубки диаметром 16 мм с накатным алюминиевым
          оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-voda-kpvs.html"
          title="Калориферы КПВС"
          className="mb-2 h-82 w-full"
        />
        <Image
          src="/img/general_pages/kalorifery_pritochnye_vodianye_kpvs_chertez.png"
          alt="Водяные приточные калориферы габаритные размеры"
          title="Водяные приточные калориферы КПВС размеры"
          width={968}
          height={1}
        />
      </section>

      <section className="mb-8">
        <Heading lvl={3} text="Приточные калориферы КПВУ" className="mb-4" />
        <ProductLinks
          products={kpvu.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-6"
        />
        <ProductParagraph className="mb-3">
          Структура условного обозначения водяных приточных калориферов КПВУ
          производства ООО «Т.С.Т.». Калорифер КПВУ 1390х1390_4: КПВУ –
          калорифер приточный водяной увеличенный; 1390 – внешняя длина
          калорифера, мм; 1390 – внешняя высота калорифера, мм; 4 - количество
          рядов теплопередающих элементов, стальные трубки диаметром 22 мм с
          накатным алюминиевым оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-voda-kpvu.html"
          title="Калориферы КПВУ"
          className="mb-2 h-76 w-full"
        />
        <Image
          src="/img/general_pages/kalorifery_pritochnye_vodianye_kpvu_chertez.png"
          alt="Водяные приточные калориферы технические характеристики"
          title="Водяные приточные калориферы КПВУ размеры"
          width={968}
          height={1}
        />
      </section>

      <TableAndCatalogLinks
        tableLinkOpenNewTab
        tableURL="/documents/Kalorifer_KPVS_KPVU_katalog_2025.pdf"
        tableLinkText="Скачать каталог приточных водяных калориферов"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист приточных водяных калориферов"
      />
    </>
  );
}
