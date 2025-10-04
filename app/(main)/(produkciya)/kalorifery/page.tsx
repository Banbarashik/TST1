import type { Metadata } from "next";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CategoryCards from "@/components/categoryCards";

/* function CategoryCards({
  categories,
  containerGap = "gap-x-2 gap-y-4",
  cardClassName = "",
}) {
  return (
    <ul
      className={`grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(0,max-content))] ${containerGap}`}
    >
      {categories.map((cat) => (
        <CategoryCard key={cat.name} category={cat} className={cardClassName} />
      ))}
    </ul>
  );
}

function CategoryCard({ category, className }) {
  return (
    <li>
      <Link
        href={category.url}
        className={cn(
          "hover:text-primary bg-card text-card-foreground flex h-full flex-col items-center justify-between gap-4 rounded-xl border px-2 pt-5 pb-5 text-center shadow-sm sm:text-[13px] md:px-4 md:text-center md:text-[13px] lg:px-4 lg:text-sm xl:px-10 2xl:text-base",
          className,
        )}
      >
        <Image
          src={category.img}
          alt={category.name}
          width={750}
          height={750}
        />
        <p className="font-bold tracking-wide uppercase">{category.name}</p>
      </Link>
    </li>
  );
} */

export const metadata: Metadata = {
  title: "Калориферы. Производство",
  description:
    "Калориферы – производитель ООО Т.С.Т. Производство водяных и паровых промышленных калориферов для воздушного отопления и технологического нагрева",
  keywords:
    "калорифер,производство калориферов,промышленный калорифер,производство промышленных калориферов,калориферы производитель,калорифер цена,калорифер купить,калорифер водяной,калорифер паровой,каталог калориферов",
};

const kaloriferyCategories = [
  [
    {
      name: "Калориферы КПВС КПВУ",
      url: "/kalorifery-voda",
      img: "/img/produkciya/kalorifery/kalorifer_kpvs_kpvu.png",
    },
    {
      name: "Калориферы КППС КППУ",
      url: "/kalorifery-par",
      img: "/img/produkciya/kalorifery/kalorifer_kpps_kppu.png",
    },
    {
      name: "Калориферы КСк",
      url: "/kalorifery-ksk",
      img: "/img/produkciya/kalorifery/kalorifer_ksk.png",
    },
    {
      name: "Калориферы КПСк",
      url: "/kalorifery-kpsk",
      img: "/img/produkciya/kalorifery/kalorifer_kpsk.png",
    },
  ],
  [
    {
      name: "Калориферы ТВВ",
      url: "/kalorifery-tvv",
      img: "/img/produkciya/kalorifery/kalorifer_tvv.png",
    },
    {
      name: "Калориферы КП",
      url: "/kalorifery-kp",
      img: "/img/produkciya/kalorifery/kalorifer_kp.png",
    },
    {
      name: "Калориферы КФБ М",
      url: "/kalorifery-kfb-a",
      img: "/img/produkciya/kalorifery/kalorifer_kfb-m.png",
    },
    {
      name: "Калориферы КФБ П",
      url: "/kalorifery-kfb",
      img: "/img/produkciya/kalorifery/kalorifer_kfb-p.png",
    },
  ],
];

export default function KaloriferyPage() {
  return (
    <article className="flex flex-col space-y-6">
      <Heading lvl={1} text="Калориферы" />

      <section>
        <Heading lvl={2} text="Назначение калориферов" />
        <ProductParagraph>
          Калориферы – поверхностные теплообменники рекуперативного типа,
          предназначенные для нагревания воздуха в системах приточной вентиляции
          и воздушного отопления, создания технологического тепла для сушильных
          камер и производственных линий, рециркуляционного охлаждения жидкостей
          промышленного оборудования. В качестве первичного теплоносителя
          выступают горячая вода, концентрированные растворы гликолей, сухой
          насыщенный пар.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Производство калориферов" />
        <ProductParagraph>
          Производство калориферов – основное направление деятельности ООО
          Т.С.Т. На предприятии изготавливаются оребренные теплообменники
          следующих серий: КПВС, КПВУ, КСк, ТВВ, КФБ-А М, КППС, КППУ, КПСк, КП,
          КФБ-А П.
        </ProductParagraph>
      </section>

      <section className="space-y-4">
        <Heading lvl={2} text="Конструкция калориферов" />
        <ProductParagraph>
          Конструктивно калориферы представляют собой модуль квадратного или
          прямоугольного сечения с несколькими рядами теплообменных элементов
          определенной длины, соединенных автономным гидравлическим трактом.
          Нагревательные элементы на базовом уровне представляют собой круглые
          полые металлические трубки. Для увеличения площади теплообмена,
          интенсивности теплоотдачи и повышения коррозионной стойкости поверх
          стальных трубок накатывается алюминиевое оребрение.
        </ProductParagraph>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-10">
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/produkciya/kalorifery/kalorifer.png"
              alt="Калорифер водяной - конструкция"
              title="Калорифер водяной"
              fill
            />
          </div>
          <div className="relative aspect-24/17 w-full">
            <Image
              src="/img/produkciya/kalorifery/kalorifery_vodianye_parovye.png"
              alt="Калорифер паровой - конструкция"
              title="Калорифер паровой"
              fill
            />
          </div>
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Виды калориферов" />
        <ProductParagraph>
          Калориферы изготавливаются в одноходовом для пара и многоходовом для
          воды исполнении. В первом случае теплообменники устанавливаются в
          вертикальном положении, теплоноситель проходит по трубкам параллельно
          сверху вниз один раз. Принцип работы многоходовых моделей предполагает
          собой многократное последовательное движение теплоносителя; калориферы
          размещаются с горизонтальным расположением нагревательных элементов.
        </ProductParagraph>
      </section>

      {/* Секция "Типы калориферов" с подсекциями */}
      <section className="space-y-6">
        <Heading lvl={2} text="Типы калориферов" />
        <ProductParagraph>
          Калориферы каждой серийной группы классифицируют по номерам с
          соответствующими габаритами и производительностью по воздуху.
          Теплообменники одинаковых габаритных размеров подразделяются на
          двухрядные, трехрядные и четырехрядные модели. С увеличением
          количества рядов растет тепловая мощность воздухонагревателя и
          повышается аэродинамическое сопротивление.
        </ProductParagraph>
        <section>
          <Heading lvl={3} text="Приточные калориферы" />
          <ProductParagraph>
            Серийная линейка приточных водяных и паровых калориферов КПВС, КПВУ,
            КППС и КППУ насчитывает 288 моделей с небольшим шагом размерности и
            производительности каждого последующего номера. Широкий модельный
            ряд поможет подобрать калориферы под помещение любой площади – от
            небольших гаражей и мастерских до крупных заводских цехов и
            промышленных ангаров. Встроенный онлайн-калькулятор на разные виды
            теплоносителей позволит произвести наиболее точный выбор
            воздухонагревателя для поставленной задачи.
          </ProductParagraph>
        </section>
        <CategoryCards
          categories={kaloriferyCategories[0]}
          cardClassName="2xl:text-sm xl:px-3"
        />
        <section className="space-y-4">
          <Heading lvl={3} text="Стандартные калориферы" />
          <ProductParagraph>
            Водяные и паровые биметаллические калориферы серии КСк и КПСк
            выпускаются с несущими трубками диаметром 16 мм. Общий модельный ряд
            состоит из 72 типоразмеров с производительностью по воздуху от двух
            до двадцати пяти кубических метров в час.
          </ProductParagraph>
          <section>
            <Heading lvl={3} text="Калориферы для низких температур" />
            <ProductParagraph>
              При эксплуатации теплообменников в неблагоприятных условиях, с
              высокой степенью загрязненности теплоносителя и воздуха, низких
              температурных режимах рекомендуется остановить свой выбор на
              промышленных калориферах ТВВ И КП с несущими трубками увеличенного
              диаметра. К преимуществам их работы можно отнести снижение
              возможности зарастания внутренней полости воздухоподогревателя
              нерастворимыми отложениями и накипью, полного перекрытия сечения
              для прохода теплоносителя и последующего замораживания калорифера.
              Увеличенный шаг и толщина алюминиевого ребра способствует меньшему
              забиванию межреберного пространства теплоотдающих элементов грязью
              и пылью, уменьшению вероятности механической деформации
              нагревательных трубок в процессе транспортировки и эксплуатации.
            </ProductParagraph>
          </section>
          <CategoryCards
            categories={kaloriferyCategories[1]}
            cardClassName="2xl:text-sm xl:px-3"
          />
        </section>

        <section>
          <Heading lvl={3} text="Калориферы для шахт и рудников" />
          <ProductParagraph>
            Калориферы промышленные серии КФБ-А производства предприятия ООО
            Т.С.Т. - воздухонагреватели среднего размера, которые используют для
            перераспределения тепла пар и горячую воду. По габаритам и
            заложенному конструктиву теплообменники этой серии является наиболее
            подходящим вариантом для компоновки калориферных секций в районах с
            расчетной наружной температурой для холодного периода года ниже
            минус 30 градусов. Длительный срок службы с сохранением высоких
            теплотехнических характеристик способствует широкому применению
            данных воздухоподогревателей на многочисленных предприятиях
            горнодобывающей промышленности.
          </ProductParagraph>
        </section>
      </section>
    </article>
  );
}
