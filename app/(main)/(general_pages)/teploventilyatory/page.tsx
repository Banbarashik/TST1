import { productData } from "@/data/products";

import type { Metadata } from "next";
import Image from "next/image";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLinks from "@/components/general_pages/productLinks";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export const metadata: Metadata = {
  title: "Электрокалориферные установки СФОЦ. Производство",
  description:
    "Электрокалориферные установки СФОЦ - производитель ООО Т.С.Т. Производство, характеристики, размеры, мощность, электросхемы подключения, цена электрокалориферных установок ЭКОЦ",
  keywords:
    "электрокалориферные установки сфоц,электрокалориферные установки экоц,электрические установки сфоц,цена установок сфоц,купить электрокалориферную установку экоц,технические характеристики установок сфоц,габаритные размеры установок сфоц,электросхемы установок сфоц,подсоединение электрокалориферных установок экоц,производитель электрокалориферных установок сфоц",
};

export default function UstanovkiSFOTC() {
  const products = productData
    .filter((p) => p.categories.includes("sfotc"))
    .sort((a, b) => sortProducts(a.name, b.name));

  return (
    <>
      <Heading lvl={1} text="Электрокалориферные установки СФОЦ" />

      <section>
        <Heading lvl={2} text="Назначение электрокалориферных установок СФОЦ" />
        <ProductParagraph className="mb-5">
          Электрокалориферные установки СФОЦ выпускаются в качестве автономного
          оборудования, совмещающего в себе функции отопления и вентиляции и
          предназначены для теплоснабжения зданий промышленного,
          сельскохозяйственного, общественного и коммунального назначения,
          подогрева воздуха для технологических процессов. Производство
          электрокалориферных установок СФОЦ осуществляется согласно ТУ
          3442-005-55613706-02.
        </ProductParagraph>
        <div className="flex">
          <Image
            src="/img/general_pages/elektrokalorifernaia_ustanovka_sfotc_komplektatciia.png"
            alt="Электрическая приточная установка СФОЦ"
            title="Электрокалориферная установка СФОЦ"
            width={484}
            height={1}
          />
          <Image
            src="/img/general_pages/elektrokalorifernaia_ustanovka_sfotc_proizvodstvo.png"
            alt="Производство электрокалориферных установок СФОЦ"
            title="Конструкция электрокалориферной установки СФОЦ"
            width={484}
            height={1}
          />
        </div>
      </section>

      <section>
        <Heading lvl={2} text="Конструкция установок СФОЦ" />
        <ProductParagraph>
          Конструктивно электрокалориферная приточная установка СФОЦ
          представляет собой единый воздушно-отопительный блок, основные
          элементы которого – электрический калорифер{" "}
          <span className="text-primary-dark">(1)</span> и радиальный вентилятор
          низкого давления <span className="text-primary-dark">(2)</span> с
          электродвигателем смонтированы на общей сварной раме{" "}
          <span className="text-primary-dark">(3)</span>. Вентилятор правого или
          левого вращения устанавливается на виброизоляторы{" "}
          <span className="text-primary-dark">(4)</span> и соединяется с
          калорифером конфузором <span className="text-primary-dark">(5)</span>{" "}
          через мягкую вставку <span className="text-primary-dark">(6)</span>.
          Конфузор обеспечивает соединение прямоугольного сечения
          воздухонагревателя с круглым сечением входного патрубка вентилятора.
          Мягкая вставка и виброизоляторы выполняют роль антивибрационных
          устройств.
        </ProductParagraph>
        <ProductParagraph>
          Электрокалорифер СФО, комплектуемый к установке, представляет собой
          модуль прямоугольного сечения, внутри которого в качестве
          нагревательных элементов применены стальные трубчатые
          электронагреватели ТЭНы с накатным алюминиевым оребрением. Мощность
          каждого ТЭНа составляет 2.5 кВт. Выводы ТЭНов размещаются в коробках,
          которые закрываются боковыми крышками. Для более равномерного обдува
          ТЭНов, электрический калорифер расположен со стороны всасывания
          вентилятора.
        </ProductParagraph>
        <ProductParagraph>
          Шкаф управления калорифером ШУК комплектуется к установке по запросу.
          Для контроля и ограничения температуры на поверхности алюминиевого
          оребрения ТЭНа устанавливается температурное реле ТРМ-11. В случае
          превышения температуры тэна выше допустимых 190°С, происходит
          размыкание контакта реле, разрывается цепь управления и отключаются
          все секции нагревательных элементов.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Принцип работы установок СФОЦ" />
        <ProductParagraph>
          Принцип работы электрокалориферных установок заключается в следующем.
          Забираемый извне холодный воздух после прохода через оребренные тэны
          электрокалорифера нагревается и подается центробежным вентилятором в
          систему воздуховодов. Соединение с вентиляционной сетью осуществляется
          через выходной фланец. Технические и аэродинамические характеристики
          установленного вентилятора должны соответствовать условной линии
          характеристики сети.
        </ProductParagraph>
      </section>

      <section>
        <Heading lvl={2} text="Технические характеристики установок СФОЦ" />
        <ProductParagraph className="mb-4">
          Электрокалориферные установки СФОЦ подразделяются на семь
          типоразмеров. Номинальный диапазон производительности по воздуху
          установок варьируется от 1000 до 12000 м3/час, тепловая мощность - от
          16 до 250 кВт.
        </ProductParagraph>
        <ProductLinks
          products={products.map((p) => ({
            ...p,
            name: `Установка ${p.shortName}`,
          }))}
        />
      </section>

      <section className="mb-4">
        <Heading lvl={2} text="Габаритные размеры установок СФОЦ" />

        <table className="mb-2 w-full">
          <colgroup>
            <col span={2} />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th
                colSpan={2}
                style={{ fontSize: "11pt" }}
                className="first-two-cols uppercase"
              >
                Модель установки
              </th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-16</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-25</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-40</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-60</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-100</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-160</th>
              <th style={{ fontSize: "11pt" }}>СФОЦ-250</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="first-two-cols w-80">
                Установленная мощность, кВт
              </td>
              <td>15</td>
              <td>22.5</td>
              <td>45</td>
              <td>67.5</td>
              <td>90</td>
              <td>157.5</td>
              <td>247.5</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Число электрических секций
              </td>
              <td>2</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Мощность одной секции, кВт
              </td>
              <td>7.5</td>
              <td>7.5</td>
              <td>15</td>
              <td>22.5</td>
              <td>30</td>
              <td>52.5</td>
              <td>82.5</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Номинальная производительность по воздуху, м³/ч
              </td>
              <td>1000</td>
              <td>2000</td>
              <td>3000</td>
              <td>4000</td>
              <td>6000</td>
              <td>8000</td>
              <td>12000</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Рабочий интервал производительности, м³/ч
              </td>
              <td>400-1100</td>
              <td>800-2100</td>
              <td>1700-4400</td>
              <td>2200-5700</td>
              <td>3400-8800</td>
              <td>4400-11500</td>
              <td>6800-17800</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Перепад t входящего / выходящего воздуха, °С
              </td>
              <td>30</td>
              <td>40</td>
              <td>50</td>
              <td>55</td>
              <td>60</td>
              <td>65</td>
              <td>70</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Аэродинамическое сопротивление, не более, Па
              </td>
              <td>150</td>
              <td>200</td>
              <td>200</td>
              <td>250</td>
              <td>250</td>
              <td>250</td>
              <td>300</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Давление, развиваемое вентилятором, Па
              </td>
              <td>190-100</td>
              <td>300-160</td>
              <td>510-270</td>
              <td>350-190</td>
              <td>830-450</td>
              <td>570-310</td>
              <td>1350-730</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Номер вентилятора ВЦ 4-75 (ВР 85-77)
              </td>
              <td>2.5</td>
              <td>3.15</td>
              <td>4</td>
              <td>5</td>
              <td>5</td>
              <td>6.3</td>
              <td>6.3</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Двигатель вентилятора, кВт
              </td>
              <td>0.25</td>
              <td>0.25</td>
              <td>0.75</td>
              <td>0.75</td>
              <td>2.2</td>
              <td>2.2</td>
              <td>7.5</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                об/мин
              </td>
              <td>1500</td>
              <td>1500</td>
              <td>1500</td>
              <td>1000</td>
              <td>1500</td>
              <td>1000</td>
              <td>1500</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Напряжение питающей сети, В
              </td>
              <td colSpan={7}>380</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Частота питающей сети, Гц
              </td>
              <td colSpan={7}>50</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Напряжение на нагревателе, В
              </td>
              <td colSpan={7}>220</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Схема соединений нагревателей в секции
              </td>
              <td colSpan={7}>Y</td>
            </tr>
            <tr>
              <td colSpan={2} className="first-two-cols">
                Масса агрегата в сборе, кг
              </td>
              <td>68</td>
              <td>79</td>
              <td>107</td>
              <td>159</td>
              <td>172</td>
              <td>256</td>
              <td>370</td>
            </tr>
            <tr>
              <td rowSpan={3} width="299px">
                Габаритные размеры, мм
              </td>
              <td className="first-two-cols" width="34px">
                L
              </td>
              <td>1180</td>
              <td>1240</td>
              <td>1370</td>
              <td>1505</td>
              <td>1505</td>
              <td>1730</td>
              <td>2380</td>
            </tr>
            <tr>
              <td className="first-two-cols">B</td>
              <td>720</td>
              <td>720</td>
              <td>788</td>
              <td>918</td>
              <td>918</td>
              <td>1150</td>
              <td>1150</td>
            </tr>
            <tr>
              <td className="first-two-cols">H</td>
              <td>642</td>
              <td>763</td>
              <td>926</td>
              <td>1135</td>
              <td>1135</td>
              <td>1430</td>
              <td>1755</td>
            </tr>
          </tbody>
        </table>

        <Image
          src="/img/general_pages/elektrokalorifernaia_ustanovka_sfotc_chertezh.png"
          alt="Характеристики электрокалориферных установок СФОЦ"
          title="Габаритные размеры установок СФОЦ"
          width={774}
          height={1}
          className="mx-auto mb-2"
        />
        <ProductParagraph>
          Структура условного обозначения электрокалориферных установок СФОЦ
          производства ООО «Т.С.Т.». Электрокалориферная установка СФОЦ - Р/ И2
          УХЛ4 (ТУ 3442-004-55613706-02): СФО – тип комплектуемого
          электрокалорифера; Ц - тип комплектуемого вентилятора; Р - мощность,
          кВт; И2 - порядковый номер исполнения; УХЛ4 - климатическое исполнение
          и категория размещения.
        </ProductParagraph>
      </section>

      <TableAndCatalogLinks
        target="_blank"
        tableURL="/documents/Electroustanovka_SFOTC_katalog_2025.pdf"
        tableLinkText="Скачать каталог электрокалориферных установок СФОЦ"
        catalogURL="/documents/Price_list_zao_tst_2025.pdf"
        catalogLinkText="Скачать прайс-лист электрокалориферных установок СФОЦ"
      />
    </>
  );
}
