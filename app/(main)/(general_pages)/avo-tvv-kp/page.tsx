import { productData } from "@/data/products";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Воздушно-отопительные агрегаты АВО ХЛ",
  description:
    "Агрегаты АВО – производитель ООО Т.С.Т. Производство, технические характеристики, цена водяных и паровых отопительных агрегатов для холодного климата АВО ХЛ",
  keywords:
    "агрегат аво,агрегат аво хл,водяной агрегат аво,паровой агрегат аво,агрегаты аво производитель,отопительный агрегат для сушки материалов,отопительный агрегат для зерносушилки,агрегат воздушно-отопительный для сельскохозяйственных помещений,агрегат отопительный для животноводческих ферм,отопительный агрегат для птицеводческих комплексов",
};

export default function AgregatyAVO() {
  const products = productData
    .filter((p) => p.categories.includes("avo"))
    .sort((a, b) => sortProducts(a.name, b.name));
  const avoTvv = products.find((p) => p.heatCarrier === "water");
  const avoKp = products.find((p) => p.heatCarrier === "steam");
  const avoTvvVariants = avoTvv.variants.map((p) => ({ ...p, id: avoTvv.id }));
  const avoKpVariants = avoKp.variants.map((p) => ({ ...p, id: avoKp.id }));

  return (
    <>
      <Heading lvl={1} text="Отопительные агрегаты АВО ХЛ" />

      <section>
        <Heading lvl={2} text="Производство и назначение агрегатов АВО ХЛ" />
        <ProductParagraph>
          Агрегаты АВО ХЛ предназначены для воздушного отопления помещений в
          зданиях различного назначения, поддержания оптимального микроклимата
          животноводческих и птицеводческих комплексов, создания
          технологического тепла для сушки изделий и материалов, подогрева
          воздуха для обслуживания промышленного оборудования, производственных
          установок и линий.
        </ProductParagraph>
        <ProductParagraph className="mb-5">
          Производство отопительных агрегатов серии АВО ХЛ осуществляется
          согласно ТУ 4864-003-55613706-02 с проведением обязательных
          приемо-сдаточных испытаний и проверкой каждого комплектуемого
          воздухоподогревателя на герметичность и прочность.
        </ProductParagraph>
        <div className="flex">
          <Image
            src="/img/general_pages/agregat_vozdushno-otopitelnyi_avo_komplektatciia.png"
            alt="Воздушно-отопительный агрегат"
            title="Воздушно-отопительный агрегат АВО ХЛ"
            width={484}
            height={1}
          />
          <Image
            src="/img/general_pages/agregat_vozdushno-otopitelnyi_avo.png"
            alt="Производство отопительных агрегатов АВО"
            title="Конструкция отопительного агрегата АВО ХЛ"
            width={484}
            height={1}
          />
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Конструкция агрегата АВО ХЛ" />
        <ProductParagraph>
          Воздушно-отопительный агрегат АВО ХЛ состоит из следующих основных
          частей:
          <ul>
            <li>
              • осевого вентилятора ВО-06-300{" "}
              <span className="text-primary-dark">(1)</span>, служащего для
              подачи воздуха в агрегат;
            </li>
            <li>
              • диффузора <span className="text-primary-dark">(2)</span> или
              переходника между вентилятором и калорифером;
            </li>
            <li>
              • теплообменного модуля ТВВ или КП{" "}
              <span className="text-primary-dark">(3)</span>, используемого для
              подогрева нагнетаемого воздуха;
            </li>
            <li>
              • поворотных жалюзи <span className="text-primary-dark">(4)</span>
              , установленных для изменения направления и распределения
              воздушного потока;
            </li>
            <li>
              • общей сварной рамы{" "}
              <span className="text-primary-dark">(5)</span>, предназначенной
              для установки агрегата в рабочем положении.
            </li>
          </ul>
        </ProductParagraph>
        <ProductParagraph>
          В зависимости от используемого теплоносителя агрегаты АВО ХЛ
          комплектуются водяным ТВВ или паровым КП калорифером. Применение в
          этих воздухонагревателях теплопередающих трубок диаметром 22 мм
          предоставляет ряд преимуществ: меньшее гидравлическое сопротивление,
          более длительный срок службы и сохранение высоких теплотехнических
          характеристик, возможность работы с загрязненным теплоносителем и
          воздухом при низкой отрицательной температуре. Увеличенный шаг
          оребрения внешней поверхности биметаллических элементов способствует
          снижению интенсивности забивания межреберного и межтрубного
          пространства пылью и грязью.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Принцип работы агрегатов АВО ХЛ" />
        <ProductParagraph>
          Принцип работы воздушно-отопительного агрегата АВО ХЛ основан на
          передаче тепловой энергии от первичного теплоносителя, имеющего более
          высокую температуру, нагреваемой среде с меньшей температурой.
          Первичным теплоносителем может выступать горячая вода или сухой
          насыщенный пар, поступающие в комплектуемый к агрегату калорифер от
          автономного источника или внешней тепловой сети. Вторичным
          теплоносителем – воздух, забираемый установленным вентилятором из
          помещения и проходящий через сечение калорифера.
        </ProductParagraph>
        <ProductParagraph>
          Взаимодействуя с оребренной поверхностью теплоотдающих элементов, по
          которым проходит вода или пар, воздух нагревается и целенаправленным
          потоком подается в обслуживаемую рабочую зону. С помощью жалюзи
          горячая воздушная струя фиксируется в нужном направлении. Отдав
          избыток теплоты и охладившись до температуры помещения, воздушный
          поток смешивается с окружающим воздухом и возвращается для повторного
          нагревания.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Подбор агрегатов АВО ХЛ" />
        <ProductParagraph>
          Подбор отопительных агрегатов АВО ХЛ под конкретную задачу, будь то
          воздушное отопление помещения или технологический нагрев для обработки
          промышленных и сушки сельскохозяйственных материалов, осуществляется с
          учетом их аэродинамических и теплотехнических показателей. Диапазон
          производительности по воздуху агрегатов АВО ХЛ варьируется от 2800 до
          10500 кубических метров в час, температура воздушного потока – от 20
          до 140 градусов. Агрегаты могут комплектоваться двумя последовательно
          установленными калориферами, изготавливаться с осевым вентилятором во
          взрывозащищенном исполнении.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Технические характеристики АВО ХЛ" />
        <ProductParagraph>
          Воздушно-отопительные агрегаты серии АВО ХЛ изготавливаются в двух
          вариантах: на базе водяного ТВВ4 и парового КП4 калорифера с
          теплообменными электросварными или бесшовными трубками диаметром
          22х1.5 мм и алюминиевого спирально-накатного оребрения номинальным
          диаметром 41 мм.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={3} text="Технические характеристики АВО ХЛ водяных" />
        <ProductParagraph className="mb-3">
          Агрегаты АВО ХЛ водяные в комплектации с многоходовым четырехрядным
          калорифером ТВВ выпускаются трех типоразмеров с тепловой мощностью от
          50 до 166 кВт.
        </ProductParagraph>

        <table className="mb-3 w-full">
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>Комплектуемый вентилятор</th>
              <th className="w-32 px-2">
                Производительность по воздуху, м<sup>3</sup>/ч
              </th>
              <th className="w-32 px-2">Производительность по теплу, кВт</th>
              <th>
                Габариты, мм{" "}
                <span className="block">(длина - ширина - высота)</span>
              </th>
              <th>Масса, кг</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 text-left">АВО 3-55-01 (ТВВ4)</td>
              <td className="px-1 text-left">
                ВО-06-300-4 (0.25 кВт / 1500 об. мин.)
              </td>
              <td>2800</td>
              <td>49</td>
              <td>840 х 710 х 620</td>
              <td>91</td>
            </tr>
            <tr>
              <td className="px-1 text-left">АВО 4-95-01 (ТВВ4)</td>
              <td className="px-1 text-left">
                ВО-06-300-5 (0.37 кВт / 1500 об. мин.)
              </td>
              <td>5000</td>
              <td>92</td>
              <td>865 х 920 х 830</td>
              <td>144</td>
            </tr>
            <tr>
              <td className="px-1 text-left">АВО 7-165-01 (ТВВ4)</td>
              <td className="px-1 text-left">
                ВО-06-300-6.3 (1.1 кВт / 1500 об. мин.)
              </td>
              <td>10500</td>
              <td>170</td>
              <td>1025 х 1050 х 1000</td>
              <td>194</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between">
          <Image
            src="/img/general_pages/agregaty_vozdushno_otopitelnye_avo_vodianye_gabaritnye_razmery.png"
            alt="Технические характеристики водяных агрегатов АВО ХЛ"
            title="Габаритные размеры водяных воздушных агрегатов АВО ХЛ"
            width={644}
            height={1}
          />
          <ProductLinks
            products={avoTvvVariants}
            className="flex flex-col justify-center"
          />
        </div>
      </section>

      <section className="mb-4">
        <Heading lvl={3} text="Технические характеристики АВО ХЛ паровых" />
        <ProductParagraph className="mb-3">
          Агрегаты АВО ХЛ паровые в комплектации с одноходовым четырехрядным
          калорифером ТВВ выпускаются трех типоразмеров с тепловой мощностью от
          49 до 170 кВт.
        </ProductParagraph>

        <table className="mb-3 w-full">
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>Комплектуемый вентилятор</th>
              <th className="w-32 px-2">
                Производительность по воздуху, м<sup>3</sup>/ч
              </th>
              <th className="w-32 px-2">Производительность по теплу, кВт</th>
              <th>
                Габариты, мм{" "}
                <span className="block">(длина - ширина - высота)</span>
              </th>
              <th>Масса, кг</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 text-left">АВО 3-55-01 (КП4)</td>
              <td className="px-1 text-left">
                ВО-06-300-4 (0.25 кВт / 1500 об. мин.)
              </td>
              <td>2800</td>
              <td>50</td>
              <td>840 х 575 х 790</td>
              <td>91</td>
            </tr>
            <tr>
              <td className="px-1 text-left">АВО 4-95-01 (КП4)</td>
              <td className="px-1 text-left">
                ВО-06-300-5 (0.37 кВт / 1500 об. мин.)
              </td>
              <td>5000</td>
              <td>91</td>
              <td>865 х 785 х 1000</td>
              <td>144</td>
            </tr>
            <tr>
              <td className="px-1 text-left">АВО 7-165-01 (КП4)</td>
              <td className="px-1 text-left">
                ВО-06-300-6.3 (1.1 кВт / 1500 об. мин.)
              </td>
              <td>10500</td>
              <td>166</td>
              <td>1025 х 920 х 1135</td>
              <td>194</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between">
          <Image
            src="/img/general_pages/agregaty_vozdushno_otopitelnye_avo_parovye_gabaritnye_razmery.png"
            alt="Технические характеристики паровых агрегатов АВО ХЛ"
            title="Габаритные размеры паровых воздушных агрегатов АВО ХЛ"
            width={644}
            height={1}
          />
          <ProductLinks
            products={avoKpVariants}
            className="flex flex-col justify-center"
          />
        </div>
        <ProductParagraph>
          Структура условного обозначения агрегатов АВО ХЛ производства ООО
          «Т.С.Т.». Агрегат АВО 7-165-01 КП4 ХЛ (ТУ 4864-003-55613706-02): АВО –
          агрегат воздушно-отопительный; 7 – типоразмер агрегата; 165 –
          номинальная тепловая мощность; 01 - конструктивное исполнение; КП4 –
          модель комплектуемого парового или водяного калорифера; ХЛ -
          климатическое исполнение.
        </ProductParagraph>
      </section>

      <TableAndCatalogLinks
        tableLinkOpenNewTab
        tableURL="/documents/Agregat_AVO-HL_katalog_2025.pdf"
        tableLinkText="Скачать каталог воздушно-отопительных агрегатов АВО ХЛ"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист воздушных агрегатов АВО ХЛ"
      />
    </>
  );
}
