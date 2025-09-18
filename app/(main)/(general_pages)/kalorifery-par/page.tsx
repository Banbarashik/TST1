import productData from "@/data/products.json";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Калориферы приточные паровые",
  description:
    "Приточные паровые калориферы – производитель ООО Т.С.Т. Производство, характеристики, размеры, расчет, подбор, цена паровых калориферов для приточной вентиляции",
  keywords:
    "калорифер приточный паровой,калорифер паровой для приточной вентиляции,калорифер паровой для приточной установки,расчет парового приточного калорифера,подбор приточного калорифера парового,паровые приточные калориферы цена,приточный паровой калорифер купить,паровые приточные калориферы характеристики,приточные паровые калориферы размеры,паровая приточная установка",
};

export default function KaloriferyParPage() {
  const kpps = productData
    .filter((p) => p.categories.includes("kpps"))
    .sort((a, b) => sortProducts(a.name, b.name));
  const kppu = productData
    .filter((p) => p.categories.includes("kppu"))
    .sort((a, b) => sortProducts(a.name, b.name));

  return (
    <>
      <Heading lvl={1} text="Калориферы приточные КППС и КППУ" />

      <section>
        <Heading lvl={2} text="Производство приточных паровых калориферов" />
        <ProductParagraph>
          Приточные паровые калориферы производства предприятия ООО Т.С.Т.
          предназначены для создания и поддержания технологических параметров
          воздуха в системах воздушного отопления, вентиляции и
          кондиционирования, тепловых завесах, сушильных камерах. Процесс
          передачи теплоты происходит при прохождении воздушного потока через
          сечение калорифера и связан с изменением агрегатного состояния
          водяного пара. В результате взаимодействия с оребренной поверхностью
          теплообменных трубок воздух нагревается, а пар охлаждается и
          конденсируется.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Характеристики приточных паровых калориферов" />
        <ProductParagraph className="mb-5">
          Паровые калориферы для приточных систем серии КППС и КППУ имеют
          квадратную форму с внутренними размерами нагревательного модуля от
          500х500 мм до 1500х1500 мм. Производительность по воздуху варьируется
          от 2000 до 25000 м<sup>3</sup>/час. Общая линейка калориферов КППС и
          КППУ насчитывает 48 номеров.
        </ProductParagraph>
        <div className="flex">
          <Image
            src="/img/general_pages/kalorifer_pritochnyi_parovoi.png"
            alt="Расчет парового приточного калорифера"
            title="Приточный паровой калорифер"
            width={484}
            height={1}
          />
          <Image
            src="/img/general_pages/kalorifer_parovoi_pritochnyi.png"
            alt="Паровой калорифер для приточной вентиляции"
            title="Паровой калорифер для приточной установки"
            width={484}
            height={1}
          />
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Расчет и подбор приточных паровых калориферов" />
        <ProductParagraph>
          Выбрав номер калорифера с приближенным для выполнения вашей задачи
          объемом нагреваемого воздуха, в режиме онлайн можно произвести
          теплотехнический расчет. Паровые воздухонагреватели одного номера
          отличаются друг от друга количеством рядов теплопередающих трубок и
          вырабатываемой тепловой мощностью. Всего для подбора представлены 144
          модели.
        </ProductParagraph>
      </section>

      <section>
        <Heading
          lvl={2}
          text="Калькулятор подбора паровых приточных калориферов"
        />
        <ProductParagraph>
          Подбор с помощью онлайн калькулятора осуществляется следующим образом:
          1. вносятся данные по воздуху – производительность, температура на
          входе и требуемая на выходе; 2. выбирается давление пара; 3. в
          зависимости от показателей расчета делается выбор в пользу двух, трех
          или четырехрядной модели калорифера. При недостаточной или избыточный
          тепловой мощности следует перейти к последующему или предыдущему
          номеру парового приточного воздухонагревателя.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={3} text="Приточные калориферы КППС" className="mb-4" />
        <ProductLinks
          products={kpps.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-6"
        />
        <ProductParagraph className="mb-3">
          Структура условного обозначения паровых приточных калориферов КППС
          производства ООО «Т.С.Т.». Калорифер КППС 1530х1530_2: КППС –
          калорифер приточный паровой стандартный; 1530 – внешняя ширина
          калорифера, мм; 1530 – внешняя высота калорифера, мм; 2 - количество
          рядов теплопередающих элементов, стальные трубки диаметром 16 мм с
          накатным алюминиевым оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-par-kpps.html"
          title="Калориферы КППС"
          className="mb-2 h-82 w-full"
        />
        <Image
          src="/img/general_pages/kalorifery_pritochnye_parovye_kpps_chertez.png"
          alt="Паровые приточные калориферы габаритные размеры"
          title="Паровые приточные калориферы КППС размеры"
          width={968}
          height={1}
        />
      </section>

      <section className="mb-8">
        <Heading lvl={3} text="Приточные калориферы КППУ" className="mb-4" />
        <ProductLinks
          products={kppu.map((p) => ({ ...p, name: p.shortName }))}
          className="mb-6"
        />
        <ProductParagraph className="mb-3">
          Структура условного обозначения паровых приточных калориферов КППУ
          производства ООО «Т.С.Т.». Калорифер КППУ 981х981_3: КППУ – калорифер
          приточный паровой увеличенный; 981 – внешняя ширина калорифера, мм;
          981 – внешняя высота калорифера, мм; 3 - количество рядов
          теплопередающих элементов, стальные трубки диаметром 22 мм с накатным
          алюминиевым оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-par-kppu.html"
          title="Калориферы КППУ"
          className="mb-2 h-76 w-full"
        />
        <Image
          src="/img/general_pages/kalorifery_pritochnye_parovye_kppu_chertez.png"
          alt="Паровые приточные калориферы технические характеристики"
          title="Паровые приточные калориферы КППУ размеры"
          width={968}
          height={1}
        />
      </section>

      <TableAndCatalogLinks
        tableLinkOpenNewTab
        tableURL="/documents/Kalorifer_KPPS_KPPU_katalog_2025.pdf"
        tableLinkText="Скачать каталог приточных паровых калориферов"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист приточных паровых калориферов"
      />
    </>
  );
}
