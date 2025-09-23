import productData from "@/data/products.json";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Воздушно-отопительные агрегаты водяные",
  description:
    "Агрегаты АО 2 водяные – производитель ООО Т.С.Т. Производство, характеристики, размеры, производительность, цена водяных воздушно-отопительных агрегатов АО 2",
  keywords:
    "агрегат отопительный,агрегат воздушный,агрегат воздушно-отопительный,агрегат ао 2 водяной,отопительный агрегат ао 2 водяной,агрегаты ао 2 характеристики,агрегаты ао 2 габаритные размеры,агрегат ао 2 цена,купить агрегаты ао 2,агрегаты ао 2 производитель",
};

export default function AgregatyAO2V() {
  const products = productData
    .filter((p) => p.categories.includes("ao2-v"))
    .sort((a, b) => sortProducts(a.name, b.name));
  const ao2v3 = products.filter((p) => p.rows === 3);
  const ao2v4 = products.filter((p) => p.rows === 4);

  return (
    <>
      <Heading lvl={1} text="Агрегаты отопительные водяные" />

      <section>
        <Heading
          lvl={2}
          text="Производство и назначение агрегатов АО2 водяных"
        />
        <ProductParagraph>
          Воздушно-отопительные водяные агрегаты АО2 производства ООО Т.С.Т.
          предназначены для нагрева и поддержания заданной температуры воздуха
          во внутренних помещениях зданий промышленного, сельскохозяйственного и
          бытового назначения. Водяные агрегаты имеют различную
          производительность и тепловую мощность и могут применяться в качестве
          основного, дополнительного или резервного источника тепла во всех
          помещениях, где допускается местная рециркуляция нагретого воздуха.
        </ProductParagraph>
        <ProductParagraph className="mb-5">
          Производство отопительных агрегатов серии АО2 осуществляется согласно
          ТУ 4864-003-55613706-02 с проведением обязательных приемо-сдаточных
          испытаний и проверкой каждого комплектуемого водяного
          воздухонагревателя на герметичность и прочность.
        </ProductParagraph>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0">
          <div className="relative aspect-16/10 w-full">
            <Image
              src="/img/general_pages/agregat_otopitelnyi_vodianoy_ao2_komplektatciia.png"
              alt="Водяной отопительный агрегат"
              title="Воздушно-отопительный агрегат АО 2 водяной"
              fill
            />
          </div>
          <div className="relative aspect-16/10 w-full">
            <Image
              src="/img/general_pages/agregat_vozdushno-otopitelnyi_vodianoy_ao2.png"
              alt="Производство водяных отопительных агрегатов АО 2"
              title="Конструкция водяного отопительного агрегата АО 2"
              fill
            />
          </div>
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Конструкция водяного агрегата АО2" />
        <ProductParagraph>
          Конструктивно водовоздушный агрегат АО2 водяной представляет собой
          единый сборный блок, состоящий из следующих основных комплектуемых
          элементов:
          <ul>
            <li>
              • осевого вентилятора ВО-06-300{" "}
              <span className="text-primary-dark">(1)</span>, служащего для
              подачи воздуха в агрегат;
            </li>
            <li>
              • воздушного диффузора{" "}
              <span className="text-primary-dark">(2)</span> между вентилятором
              и калорифером;
            </li>
            <li>
              • калорифера водяного типа КСк{" "}
              <span className="text-primary-dark">(3)</span> для подогрева
              нагнетаемого воздуха;
            </li>
            <li>
              • поворотных жалюзи <span className="text-primary-dark">(4)</span>
              , используемых для изменения направления и распределения
              воздушного потока в горизонтальной плоскости;
            </li>
            <li>
              • общей сварной рамы{" "}
              <span className="text-primary-dark">(5)</span>, предназначенной
              для установки агрегата в рабочем положении.
            </li>
          </ul>
        </ProductParagraph>
        <ProductParagraph>
          Комплектуемые к агрегатам калориферы КСк3 или КСк4 устанавливаются c
          горизонтальным расположением нагревательных элементов, патрубки для
          подсоединения теплоносителя располагаются сбоку. Теплоотдающие
          элементы изготавливаются из электросварных или бесшовных трубок
          диаметром 16х1.5 мм со спирально-накатным оребрением. Водяные
          калориферы всей линейки агрегатов АО2 имеют квадратное сечение с
          тенденцией в сторону увеличения площади нагрева каждой последующей
          модели.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Принцип работы водяных агрегатов АО2" />
        <ProductParagraph>
          Принцип работы водяного рециркуляционно-отопительного агрегата АО2
          основан на передаче тепловой энергии от первичного теплоносителя,
          имеющего более высокую температуру, нагреваемой среде с меньшей
          температурой. Первичным теплоносителем выступает горячая вода,
          поступающая в комплектуемый к агрегату калорифер от автономного
          источника или внешней тепловой сети. Вторичным теплоносителем –
          воздух, забираемый установленным вентилятором из помещения и
          проходящий через сечение водяного калорифера.
        </ProductParagraph>
        <ProductParagraph>
          Взаимодействуя с оребренной поверхностью теплоотдающих элементов, по
          которым циркулирует горячая вода, воздух нагревается и
          целенаправленным потоком подается в обслуживаемую рабочую зону. С
          помощью жалюзи горячая воздушная струя фиксируется в нужном
          направлении. Отдав избыток теплоты и охладившись до температуры
          помещения, воздушный поток смешивается с окружающим воздухом и
          возвращается для повторного нагревания.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Подбор и установка водяных агрегатов АО2" />
        <ProductParagraph>
          Длина, ширина и объем зоны обслуживания одним водяным агрегатом
          принимается по аэродинамическим и тепловым характеристикам выбранной
          модели. Равномерность прогрева по площади и высоте достигается
          активным перемешиванием воздуха и высокой кратностью воздухообмена. В
          связи с этим, в отапливаемом помещении рекомендуется устанавливать не
          менее двух рециркуляционно-отопительных водяных агрегатов АО2. При
          правильной их расстановке и способе подачи нагретого воздуха в рабочую
          зону распределение тепловой энергии будет более ровным, без резких
          температурных контрастов. Тогда как, эксплуатация одной, пусть и
          равнозначной по мощности модели, может привести к перегреванию
          отдельной части помещения и недогреву других обслуживаемых участков.
          При многорядном размещении водовоздушных агрегатов рекомендуется
          применять встречную подачу воздуха.
        </ProductParagraph>
        <ProductParagraph>
          Для эффективного использования водяных отопительных агрегатов их
          суммарная тепловая мощность должна соответствовать тепловым потерям
          обслуживаемого помещения с прибавкой повышающего коэффициента от 10 до
          25 процентов. Предпочтительной схемой организации воздушного отопления
          является подача агрегатами горячего воздуха сверху вниз, наклонными
          струями под углом 35 градусов по отношению к горизонту. Этим способом
          обеспечивается максимальная дальнобойность нагретого потока и его
          устойчивость в нижней рабочей зоне.
        </ProductParagraph>
        <ProductParagraph>
          Окончательный выбор в пользу той или иной модели, количества агрегатов
          и схемы их расстановки осуществляется с учетом безопасности выполнения
          монтажных работ, подключения и технического обслуживания водовоздушных
          установок. В летний период, используя холодную воду, рециркуляционные
          агрегаты АО2 производства ООО Т.С.Т. можно применять для охлаждения и
          проветривания воздуха.
        </ProductParagraph>
      </section>

      <section>
        <Heading
          lvl={2}
          text="Технические характеристики водяных агрегатов АО2"
        />
        <ProductParagraph className="mb-4">
          Воздушно-отопительные водяные агрегаты серии АО2 подразделяются на
          восемь типоразмеров, каждый из которых изготавливается в двух
          вариантах – с трехрядным и четырехрядным многоходовым теплообменником.
        </ProductParagraph>
        <ProductLinks
          products={ao2v3}
          className="mb-8"
          gridTemplateCols="grid-cols-[repeat(auto-fill,minmax(150px,max-content))]"
        />
        <ProductLinks
          products={ao2v4}
          gridTemplateCols="grid-cols-[repeat(auto-fill,minmax(150px,max-content))]"
        />
      </section>

      <section className="mb-4">
        <Heading
          lvl={2}
          text="Габаритные размеры водяных агрегатов АО2"
          className="mb-3"
        />
        <Image
          src="/img/general_pages/agregat_otopitelnyi_vodianoy_ao2_gabaritnye_razmery.png"
          alt="Технические характеристики водяных агрегатов АО2"
          title="Габаритные размеры водяных агрегатов АО2"
          width={968}
          height={1}
          className="mb-3"
        />

        <div className="mb-2 w-full overflow-x-auto">
          <table className="w-full min-w-231 xl:min-w-auto">
            <thead>
              <tr>
                <th rowSpan={2} className="w-32">
                  Наименование агрегата
                </th>
                <th colSpan={2}>Производительность</th>
                <th colSpan={3}>Габариты, мм</th>
                <th rowSpan={2}>Масса, кг</th>
                <th rowSpan={2} className="w-68">
                  Площадь поверхности теплообмена, м²
                </th>
                <th rowSpan={2}>Ду, мм</th>
              </tr>
              <tr>
                <th>по воздуху, м³/ч</th>
                <th>по теплу, кВт</th>
                <th>L</th>
                <th>B</th>
                <th>H</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-1 text-left">АО 2-3 (КСк3)</td>
                <td rowSpan={2}>3000</td>
                <td>35</td>
                <td rowSpan={2}>800</td>
                <td rowSpan={2}>710</td>
                <td rowSpan={2}>620</td>
                <td>77</td>
                <td>12.9</td>
                <td rowSpan={2}>32</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-3 (КСк4)</td>
                <td>40</td>
                <td>83</td>
                <td>17.0</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-4 (КСк3)</td>
                <td rowSpan={2}>4000</td>
                <td>42</td>
                <td rowSpan={2}>800</td>
                <td rowSpan={2}>750</td>
                <td rowSpan={2}>665</td>
                <td>83</td>
                <td>15.2</td>
                <td rowSpan={2}>32</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-4 (КСк4)</td>
                <td>49</td>
                <td>90</td>
                <td>20.0</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-5 (КСк3)</td>
                <td rowSpan={2}>5000</td>
                <td>63</td>
                <td rowSpan={2}>825</td>
                <td rowSpan={2}>835</td>
                <td rowSpan={2}>750</td>
                <td>98</td>
                <td>20.3</td>
                <td rowSpan={2}>32</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-5 (КСк4)</td>
                <td>74</td>
                <td>108</td>
                <td>26.7</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-6.3 (КСк3)</td>
                <td rowSpan={2}>6300</td>
                <td>82</td>
                <td rowSpan={2}>985</td>
                <td rowSpan={2}>920</td>
                <td rowSpan={2}>865</td>
                <td>128</td>
                <td>26.1</td>
                <td rowSpan={2}>32</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-6.3 (КСк4)</td>
                <td>97</td>
                <td>142</td>
                <td>34.4</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-10 (КСк3)</td>
                <td rowSpan={2}>10000</td>
                <td>115</td>
                <td rowSpan={2}>985</td>
                <td rowSpan={2}>960</td>
                <td rowSpan={2}>905</td>
                <td>139</td>
                <td>29.3</td>
                <td rowSpan={2}>32</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-10 (КСк4)</td>
                <td>138</td>
                <td>154</td>
                <td>38.7</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-15 (КСк3)</td>
                <td rowSpan={2}>15000</td>
                <td>156</td>
                <td rowSpan={2}>985</td>
                <td rowSpan={2}>1085</td>
                <td rowSpan={2}>1040</td>
                <td>166</td>
                <td>39.9</td>
                <td rowSpan={2}>50</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-15 (КСк4)</td>
                <td>186</td>
                <td>186</td>
                <td>52.8</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-20 (КСк3)</td>
                <td rowSpan={2}>20000</td>
                <td>225</td>
                <td rowSpan={2}>1075</td>
                <td rowSpan={2}>1210</td>
                <td rowSpan={2}>1170</td>
                <td>240</td>
                <td>52.2</td>
                <td rowSpan={2}>50</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-20 (КСк4)</td>
                <td>271</td>
                <td>268</td>
                <td>69.2</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-25 (КСк3)</td>
                <td rowSpan={2}>25000</td>
                <td>281</td>
                <td rowSpan={2}>1075</td>
                <td rowSpan={2}>1335</td>
                <td rowSpan={2}>1295</td>
                <td>269</td>
                <td>66.2</td>
                <td rowSpan={2}>50</td>
              </tr>
              <tr>
                <td className="px-1 text-left">АО 2-25 (КСк4)</td>
                <td>336</td>
                <td>303</td>
                <td>87.7</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ProductParagraph>
          Структура условного обозначения водяных агрегатов серии АО2
          производства ООО «Т.С.Т.». Агрегат АО 2-10 КСк4 (ТУ
          4864-003-55613706-02): АО – агрегат отопительный; 2 – модификация
          воздушно-отопительного агрегата; 10 - типоразмер агрегата; КСк4 –
          модель и рядность комплектуемого водяного калорифера.
        </ProductParagraph>
      </section>

      <TableAndCatalogLinks
        tableLinkOpenNewTab
        tableURL="/documents/Agregat_AO2_katalog_2025.pdf"
        tableLinkText="Скачать каталог водяных отопительных агрегатов АО2"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист водяных воздушных агрегатов АО2"
      />
    </>
  );
}
