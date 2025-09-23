import productData from "@/data/products.json";

import Image from "next/image";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";
import { sortProducts } from "@/lib/utils";
import React from "react";

const equipmentType = {
  sfo: {
    nom: "электрокалорифер",
    gen: "электрокалорифера",
    pluGen: "электрокалориферов",
  },
  sfotc: {
    nom: "электрокалориферная установка",
    gen: "установки",
    pluGen: "электрокалориферных установок",
  },
  shuk: {
    nom: "шкаф ШУК",
    gen: "шкафа управления",
    pluGen: "шкафов ШУК",
  },
};

//TODO unite into one object
const tableLinkUrl = {
  sfo: "elektronagrevateli",
  sfotc: "teploventilyatory",
  shuk: "shkafy-upravleniya",
};
const catalogLinkUrl = {
  sfo: "Electrokalorifer_SFO_katalog_2025.pdf",
  sfotc: "Electroustanovka_SFOTC_katalog_2025.pdf",
  shuk: "Electroshkaf_SHUK_katalog_2025.pdf",
};
const tableLinkText = {
  sfo: "Электрокалориферы СФО - технические характеристики",
  sfotc: "Электрокалориферные установки СФОЦ - характеристики",
  shuk: "Шкафы управления калорифером - характеристики",
};
const catalogLinkText = {
  sfo: "Скачать каталог электрокалориферов СФО",
  sfotc: "Скачать каталог электрических установок СФОЦ",
  shuk: "Скачать каталог шкафов управления калорифером",
};

const tableLabels = {
  sfo: [
    "Номинальная мощность одного нагревателя, кВт",
    "Напряжение питающей сети, В ",
    "Напряжение на нагревателе, В",
    "Частота сети, Гц",
    "Число фаз",
    "Тип ТЭНов",
    "Количество электрических секций",
    "Схема соединений нагревателей в секции",
    "Количество нагревателей, общее, шт.",
    "Количество нагревателей, секция, шт.",
    "Количество нагревателей, группа секции, шт.",
    "Установленная мощность, общая, кВт",
    "Установленная мощность, секция, кВт",
    "Установленная мощность, группа секции, кВт",
    "Производительность по воздуху, м3/ч, не менее",
    "Расчетный ток линии электрокалорифера, А",
    "Расчетный ток одной секции электрокалорифера, А",
    "Силовой кабель от сети, минимальное сечение медной жилы кабеля, мм2",
    "Кабель на секции, минимальное сечение медной жилы на каждую фазу секции, мм2",
    "Внешние габаритные размеры, мм",
    "Масса нагревательного блока, кг",
  ],
  sfotc: [
    "Напряжение питающей сети, В",
    "Частота питающей сети, Гц",
    "Число фаз питающей сети",
    "Напряжение на нагревателе, В",
    "Тип ТЭНов",
    "Схема соединения нагревателей",
    "Установленная мощность электрокалорифера, кВт",
    "Количество электрических секций",
    "Мощность одной секции электрокалорифера, кВт",
    "Производительность по воздуху, м3/час",
    "Аэродинамическое сопротивление калорифера, не более, Па",
    "Давление, развиваемое вентилятором, Па",
    "Перепад t входящего / выходящего воздуха, °С",
    "Номер комплектуемого вентилятора ВР 85-77 (ВЦ 4-75)",
    "Двигатель вентилятора, кВт",
    "об/мин",
    "Расчетный ток линии электрокалорифера, А",
    "Расчетный ток одной секции электрокалорифера, А",
    "Расчетный ток линии электродвигателя вентилятора, А",
    "Пусковые токи электродвигателя, А",
    "Расчетный ток магистрали, питающей установку, А",
    "Силовой кабель от сети, минимальное сечение медной жилы кабеля, мм2",
    "Кабель на секции, минимальное сечение медной жилы на каждую фазу секции, мм2",
    "Кабель на электродвигатель, минимальное сечение медной жилы кабеля, мм2",
    "Внешние габаритные размеры, мм",
    "Масса агрегата в сборе, кг",
  ],
  shuk: [
    "Напряжение питающей сети, В",
    "Частота питающей сети, Гц",
    "Напряжение цепи управления, В",
    "Мощность электродвигателя, кВт",
    "Внешние габаритные размеры, мм",
    "Масса шкафа, кг",
    "Корпус металлический",
    "Автоматический выключатель ВА 47-29 1Р 10А",
    "Арматура светосигнальная (красная)",
    "Арматура светосигнальная (зеленая)",
    "Реле тепловое РТИ (РТН) 5.5 - 8А",
    "Пускатель КМИ (КМН) 9А 220-230В",
    "kmi_to_change",
    "Реле температурное ТРМ 11-01 (11-11)",
    "Реле ветровое с микрокнопкой КМ-1",
    "Мощность электрокалорифера, общая, кВт",
    "Мощность одной секции электрокалорифера, кВт",
    "Мощность электродвигателя вентилятора, кВт",
    "Расчетный ток линии электрокалорифера, А",
    "Расчетный ток одной секции электрокалорифера, А",
    "Расчетный ток линии электродвигателя вентилятора, А",
    "Пусковые токи электродвигателя, А",
    "Расчетный ток магистрали, питающей установку, А",
    "Силовой кабель от сети, минимальное сечение медной жилы кабеля, мм2",
    "Кабель на секции, минимальное сечение медной жилы на каждую фазу секции, мм2",
    "Кабель на электродвигатель, минимальное сечение медной жилы кабеля, мм2",
    "Провода для подключения температурного и ветрового реле, сечение, мм2",
  ],
};

export default function ElectroEquipmentPage({ product }) {
  const preciseCategories = ["sfo", "sfotc", "shuk"];
  const preciseCategory = preciseCategories.find((cat) =>
    product.categories.includes(cat),
  );

  const isSFO = preciseCategory === "sfo";
  const isSFOTC = preciseCategory === "sfotc";
  const isSHUK = preciseCategory === "shuk";

  const productsByCategory = productData.filter((p) =>
    p.categories.includes("energonagrevatelynoe-oborudovanie"),
  );
  const productsByPreciseCategory = productsByCategory.filter((p) =>
    p.categories.includes(preciseCategory),
  );
  const productsBySize = productsByCategory
    .filter((p) => p.id !== product.id && p.size === product.size)
    .sort((a, b) => sortProducts(a.shortName, b.shortName));

  const productName = isSFOTC
    ? `Электрокалориферная установка ${product.shortName}`
    : isSHUK
      ? `Шкаф управления калорифером ${product.shortName}`
      : product.name;

  return (
    <div className="lg:overflow-x-auto">
      <h1 className="mb-8 text-2xl font-bold uppercase">{productName}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard product={product} isLink={false} />
        <div>
          <div className="mb-3 text-xl">
            <h2>{productName}.</h2>
            {!isSHUK && <p>ТУ 3442-004-55613706-02</p>}
          </div>
          {isSHUK ? (
            <>
              Шкаф управления калорифером ШУК обеспечивает:
              <ul className="mb-4">
                <li>
                  - невозможность включения секций электрических нагревателей
                  при не включенном вентиляторе;
                </li>
                <li>
                  - отключение электродвигателя вентилятора при токовых
                  перегрузках и заклинивании ротора;
                </li>
                <li>
                  - отключение секций электрокалорифера при аварийном отключении
                  электродвигателя вентилятора;
                </li>
                <li>
                  - отключение всех секций при срабатывании термовыключателя
                  защиты ТЭНов от аварийного перегрева.
                </li>
              </ul>
            </>
          ) : (
            <>
              <ProductParagraph>
                Теплоотдающие элементы {isSFOTC && "калорифера СФО"}:
              </ProductParagraph>
              <ul className="mb-4 text-[17px]">
                <li>- трубчатые электронагреватели Р-54А-13/2.5о220</li>
                <li>с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением</li>
              </ul>
            </>
          )}
          <div className="mb-4 flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Все типоразмеры {equipmentType[preciseCategory].pluGen}
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {productsByPreciseCategory.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {p.shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <ProductParagraph className="font-bold">
              Сопутствующее оборудование
            </ProductParagraph>
            <ul className="flex flex-wrap gap-2">
              {productsBySize.map((p) => (
                <li key={p.id}>
                  <SimilarProductLink id={p.id} isActive={p.id === product.id}>
                    {p.shortName}
                  </SimilarProductLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductSubheader
        text={`Технические характеристики ${equipmentType[preciseCategory].gen} ${product.shortName}`}
      />
      <ProductParagraph className="mb-3">
        В таблице приведены основные технические характеристики и справочные
        данные по комплектующим для запуска {isSFO && "электрокалорифера"}
        {isSFOTC && "электрокалориферной установки"}
        {isSHUK && "шкафа управления калорифером"} {product.shortName} в работу.
      </ProductParagraph>

      <div className="mb-6 w-full overflow-x-auto">
        <table className="mx-auto w-176">
          <tbody>
            {tableLabels[preciseCategory].map((label, i) => (
              <React.Fragment key={label}>
                <tr>
                  <td className="py-1 pl-1 text-left">
                    {isSHUK && label === "kmi_to_change"
                      ? `Пускатель КМИ (КМН) ${product.kmi}А 220-230В`
                      : label}
                  </td>
                  <td>{product.specsTableValues[i]}</td>
                </tr>
                {isSHUK &&
                  label === "kmi_to_change" &&
                  product.size === 250 && (
                    <tr>
                      <td className="py-1 pl-1 text-left">
                        Пускатель ПМ 12160150 160А 220-230В
                      </td>
                      <td>3</td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {(isSHUK || isSFO) && (
        <ProductSubheader
          text={`Чертеж и электрическая схема подключения ${equipmentType[preciseCategory].gen} ${product.shortName}`}
        />
      )}
      {isSFO && (
        <>
          <ProductParagraph className="mb-2">
            Ниже представлены чертеж с габаритными размерами и электрическая
            схема подключения электрокалорифера {product.shortName}.
          </ProductParagraph>
          <div className="mb-10 flex w-full flex-col gap-3 sm:flex-row sm:gap-0">
            <div
              className="relative w-full"
              style={{
                aspectRatio: `${product.drawing.width} / ${product.drawing.height}`,
              }}
            >
              <Image
                src={product.drawing.url}
                alt={`${productName} габаритные размеры`}
                title={`${product.shortName} габаритные размеры`}
                fill
              />
            </div>
            <div
              className="relative w-full"
              style={{
                aspectRatio: `${product.scheme.width} / ${product.scheme.height}`,
              }}
            >
              <Image
                src={product.scheme.url}
                alt={`${equipmentType[preciseCategory].nom} ${product.series} ${product.size} электрическая схема подключения`}
                title={`${equipmentType[preciseCategory].nom} ${product.altSeries} ${product.size} электрическая схема подключения`}
                fill
              />
            </div>
          </div>
        </>
      )}
      {isSFOTC && (
        <div className="mb-10 space-y-3">
          <ProductSubheader
            text={`Габаритные размеры установки ${product.shortName}`}
          />
          <ProductParagraph>
            На чертеже представлены основные габаритные размеры
            электрокалориферной установки {product.shortName}: длина, ширина и
            высота воздухонагревателя по внешнему контуру.
          </ProductParagraph>
          <Image
            src={product.drawing}
            alt={`${productName} габаритные размеры`}
            title={`${product.shortName} габаритные размеры`}
            width={776}
            height={1}
            className="mx-auto"
          />
          <ProductSubheader
            text={`Электрическая схема подключения установки ${product.shortName}`}
          />
          <ProductParagraph>
            Подключение электрокалориферной установки {product.shortName} к
            питающей сети осуществляется согласно электрической схеме.
          </ProductParagraph>
          <Image
            src={product.scheme}
            alt={`${equipmentType[preciseCategory].nom} ${product.series} ${product.size} электрическая схема подключения`}
            title={`${equipmentType[preciseCategory].nom} ${product.altSeries} ${product.size} электрическая схема подключения`}
            width={678}
            height={1}
            className="mx-auto"
          />
        </div>
      )}
      {isSHUK && (
        <>
          <p>
            Структура условного обозначения в принципиальной схеме{" "}
            {product.shortName}: {product.specsTableLegend}
          </p>
          <div className="mb-10 flex">
            <Image
              src={product.drawing}
              alt={`${productName} габаритные размеры`}
              title={`Шкаф ${product.shortName} габаритные размеры`}
              width={322}
              height={1}
            />
            <Image
              src={product.scheme}
              alt={`Шкаф ${product.size} электрическая схема подключения`}
              title={`Шкаф ${product.size} электрическая схема подключения`}
              width={645}
              height={1}
            />
          </div>
        </>
      )}
      <TableAndCatalogLinks
        tableURL={"/" + tableLinkUrl[preciseCategory]}
        tableLinkText={tableLinkText[preciseCategory]}
        catalogURL={"/documents/" + catalogLinkUrl[preciseCategory]}
        catalogLinkText={catalogLinkText[preciseCategory]}
      />
    </div>
  );
}
