import { productData } from "@/data/products";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";

export const metadata: Metadata = {
  title: "Калориферы приточной установки паровые",
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
      <Heading lvl={1} text="Калориферы приточные паровые" />

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
        <ProductParagraph>
          Паровые калориферы для приточных систем серии КППС и КППУ имеют
          квадратную форму с внутренними размерами нагревательного модуля от
          500х500 мм до 1500х1500 мм. Производительность по воздуху варьируется
          от 2000 до 25000 м3/час. Общая линейка калориферов КППС и КППУ
          насчитывает 48 номеров.
        </ProductParagraph>
        <div className="flex flex-col gap-20">
          <div className="flex">
            <Image
              src="/img/general_pages/agregat_otopitelnyi_vodianoy_ao2_komplektatciia.png"
              alt="Расчет парового приточного калорифера"
              title="Приточный паровой калорифер"
              width={484}
              height={1}
            />
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_vodianoy_ao2.png"
              alt="Паровой калорифер для приточной вентиляции"
              title="Паровой калорифер для приточной установки"
              width={484}
              height={1}
            />
          </div>
          <div className="flex">
            <Image
              src="/img/general_pages/agregat_otopitelnyi_parovoy_ao2_komplektatciia.png"
              alt="Расчет парового приточного калорифера"
              title="Приточный паровой калорифер"
              width={484}
              height={1}
            />
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_parovoy_ao2.png"
              alt="Паровой калорифер для приточной вентиляции"
              title="Паровой калорифер для приточной установки"
              width={484}
              height={1}
            />
          </div>
          <div className="flex">
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_avo_komplektatciia.png"
              alt="Расчет парового приточного калорифера"
              title="Приточный паровой калорифер"
              width={484}
              height={1}
            />
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_avo.png"
              alt="Паровой калорифер для приточной вентиляции"
              title="Паровой калорифер для приточной установки"
              width={484}
              height={1}
            />
          </div>
          <div className="flex">
            <Image
              src="/img/general_pages/agregat_otopitelnyi_vodianoy_std-300_komplektatciia.png"
              alt="Расчет парового приточного калорифера"
              title="Приточный паровой калорифер"
              width={484}
              height={1}
            />
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_vodianoy_std-300.png"
              alt="Паровой калорифер для приточной вентиляции"
              title="Паровой калорифер для приточной установки"
              width={484}
              height={1}
            />
          </div>
          <div className="flex">
            <Image
              src="/img/general_pages/agregat_otopitelnyi_parovoy_std-300_komplektatciia.png"
              alt="Расчет парового приточного калорифера"
              title="Приточный паровой калорифер"
              width={484}
              height={1}
            />
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_parovoy_std-300.png"
              alt="Паровой калорифер для приточной вентиляции"
              title="Паровой калорифер для приточной установки"
              width={484}
              height={1}
            />
          </div>
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
        <Heading lvl={3} text="Приточные калориферы КППС" />
        <ProductLinks
          products={kpps.map((p) => ({ ...p, name: p.shortName }))}
        />
        <ProductParagraph>
          Структура условного обозначения паровых приточных калориферов КППУ
          производства ООО «Т.С.Т.». Калорифер КППУ 981х981_3: КПВС – калорифер
          приточный паровой увеличенный; 981 – внешняя ширина калорифера, мм;
          981 – внешняя высота калорифера, мм; 3 - количество рядов
          теплопередающих элементов, стальные трубки диаметром 22 мм с накатным
          алюминиевым оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-par-kpps.html"
          title="Калориферы КППС"
          className="h-82 w-full"
        />
        <Image
          src="/img/general_pages/kalorifery_pritochnye_parovye_chertez.png"
          alt="Паровые приточные калориферы характеристики"
          title="Паровые приточные калориферы размеры"
          width={968}
          height={1}
        />
      </section>

      <section>
        <Heading lvl={3} text="Приточные калориферы КППУ" />
        <ProductLinks
          products={kppu.map((p) => ({ ...p, name: p.shortName }))}
        />
        <ProductParagraph>
          Структура условного обозначения паровых приточных калориферов КППУ
          производства ООО «Т.С.Т.». Калорифер КППУ 981х981_3: КПВС – калорифер
          приточный паровой увеличенный; 981 – внешняя ширина калорифера, мм;
          981 – внешняя высота калорифера, мм; 3 - количество рядов
          теплопередающих элементов, стальные трубки диаметром 22 мм с накатным
          алюминиевым оребрением.
        </ProductParagraph>
        <iframe
          src="/legacy/table-kalorifery-par-kppu.html"
          title="Калориферы КППУ"
          className="h-76 w-full"
        />
      </section>
    </>
  );
}
