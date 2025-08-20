import { productData } from "@/data/products";

import Image from "next/image";

import ProductCard from "@/components/catalog/productCard";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import SimilarProductLink from "@/components/catalog/similarProductLink";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

const equipmentType = {
  sfo: {
    nom: "электрокалорифер",
    pluGen: "электрокалориферов",
  },
  sfotc: {
    nom: "электрокалориферная установка",
    pluGen: "электрокалориферных установок",
  },
  shuk: {
    nom: "шкаф ШУК",
    pluGen: "шкафов ШУК",
  },
};

const tableLinkText = {
  sfo: "Электрокалориферы СФО",
  sfotc: "Электрокалориферные установки СФОЦ",
  shuk: "Шкафы управления калорифером ШУК",
};

const tableLinkUrl = {
  sfo: "elektronagrevateli",
  sfotc: "teploventilyatory",
  shuk: "",
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
    "Пускатель КМИ (КМН) 40А 220-230В",
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

  // const isSFO = preciseCategory === "sfo";
  const isSFOTC = preciseCategory === "sfotc";
  const isSHUK = preciseCategory === "shuk";

  const productsByCategory = productData.filter((p) =>
    p.categories.includes("energonagrevatelynoe-oborudovanie"),
  );
  const productsByPreciseCategory = productsByCategory.filter((p) =>
    p.categories.includes(preciseCategory),
  );
  const productsBySize = productsByCategory.filter(
    (p) => p.id !== product.id && p.size === product.size,
  );

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-6 flex items-start gap-4">
        <ProductCard
          product={
            isSFOTC
              ? { ...product, name: `Установка ${product.shortName}` }
              : isSHUK
                ? { ...product, name: `Шкаф управления ${product.shortName}` }
                : product
          }
          isLink={false}
        />
        <div>
          <h2 className="text-xl">{product.name}.</h2>
          <p className="mb-3 text-xl">ТУ 3442-004-55613706-02</p>
          <ProductParagraph>Теплоотдающие элементы:</ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>- трубчатые электронагреватели Р-54А-13/2.5о220</li>
            <li>с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением</li>
          </ul>
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
        text={`Технические характеристики ${product.shortName}`}
      />
      <table className="mx-auto mb-6 w-176">
        <tbody>
          {tableLabels[preciseCategory].map((label, i) => (
            <tr key={label}>
              <td className="py-1 pl-1 text-left">{label}</td>
              <td>{product.specsTableValues[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductSubheader
        text={`Чертеж и электрическая схема подключения ${product.shortName}`}
      />

      {isSHUK && (
        <div className="mb-10 flex">
          <Image
            src={product.drawing}
            alt={`${product.name} габаритные размеры`}
            title={`Шкаф ${product.shortName} габаритные размеры`}
            width={322}
            height={1}
          />
          <Image
            src={product.scheme}
            alt={`${equipmentType[preciseCategory].nom} ${product.size} электрическая схема подключения`}
            title={`${equipmentType[preciseCategory].nom} ${product.size} электрическая схема подключения`}
            width={645}
            height={1}
          />
        </div>
      )}
      {isSFOTC && (
        <div className="mx-auto mb-10 w-fit space-y-3">
          <Image
            src={product.drawing}
            alt={`${product.name} габаритные размеры`}
            title={`${product.shortName} габаритные размеры`}
            width={645}
            height={1}
          />
          <Image
            src={product.scheme}
            alt={`${equipmentType[preciseCategory].nom} ${product.series} ${product.size} электрическая схема подключения`}
            title={`${equipmentType[preciseCategory].nom} ${product.altSeries} ${product.size} электрическая схема подключения`}
            width={645}
            height={1}
          />
        </div>
      )}
      {/* <div className="mb-10 flex">
        <Image
          src={product.drawing}
          alt={`${product.name} габаритные размеры`}
          title={`${preciseCategory === "shuk" ? `Шкаф ${product.shortName}` : product.shortName} габаритные размеры`}
          width={484}
          height={1}
        />
        <Image
          src={product.scheme}
          alt={`${equipmentType[preciseCategory].nom} ${preciseCategory === "shuk" ? "" : product.series} ${product.size} электрическая схема подключения`}
          title={`${equipmentType[preciseCategory].nom} ${preciseCategory === "shuk" ? "" : product.altSeries} ${product.size} электрическая схема подключения`}
          width={484}
          height={1}
        />
      </div> */}

      <TableAndCatalogLinks
        tableURL={tableLinkUrl[preciseCategory]}
        tableLinkText={tableLinkText[preciseCategory]}
        catalogURL="#"
      />
    </div>
  );
}
