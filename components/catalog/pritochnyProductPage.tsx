import Image from "next/image";
import Link from "next/link";

import type { PritochnyProduct } from "@/types";

import ProductCard from "@/components/catalog/productCard";
import ProductRequestControls from "@/components/catalog/productRequestControls";
import ProductHeader from "@/components/catalog/productHeader";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import { Button } from "@/components/ui/button";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

export default function PritochnyProductPage({
  product,
}: {
  product: PritochnyProduct;
}) {
  const {
    name,
    shortName,
    variants,
    prevProduct,
    nextProduct,
    airPower,
    img,
    drawing,
    calculator,
  } = product;

  const typeForms = {
    "vodiany-kalorifery": {
      nom: "водяной", // именительный
      gen: "водяного", // родительный
      plu: "водяные", // множественное
    },
    "parovy-kalorifery": {
      nom: "паровой",
      gen: "парового",
      plu: "паровые", // множественное
    },
  };
  const typeKey = product.categories.includes("vodiany-kalorifery")
    ? "vodiany-kalorifery"
    : product.categories.includes("parovy-kalorifery")
      ? "parovy-kalorifery"
      : null;
  const type = typeKey ? typeForms[typeKey] : null;

  const shortNameWithHyphen = shortName?.replace(" ", "-");
  const [nameAbbrev] = shortName.match(/^[А-ЯA-Z]+/);

  const isWater = product.heatCarrier === "water";
  const isSteam = product.heatCarrier === "steam";

  return (
    <div>
      <ProductHeader product={product} />
      <ProductParagraph className="mb-6">
        Приточный {type?.nom} калорифер {shortNameWithHyphen} выпускается в
        двух, трех и четырех рядном исполнении. Номинальная производительность
        по воздуху – {airPower} метров кубических в час, тепловая мощность
        варьируется в зависимости от рядности калорифера {shortNameWithHyphen} и
        параметров эксплуатации.
      </ProductParagraph>
      {variants && variants.length > 0 ? (
        <div className="mb-12 grid grid-cols-3 gap-5">
          {variants.map(function (variant) {
            return (
              <ProductCard
                key={variant.id}
                isLink={false}
                product={{ ...variant, airPower, img }}
              />
            );
          })}
        </div>
      ) : (
        <ProductRequestControls product={product} />
      )}
      <ProductSubheader text={`Калькулятор подбора калорифера ${shortName}`} />
      <ProductParagraph className="mb-2.5">
        Синие поля обязательны для заполнения. Запас площади поверхности
        нагрева: оптимальный 10%, допустимый 0-20%. Массовая скорость воздуха в
        фронтальном сечении: оптимальная 3-5 кг/м2•с, допустимая 1.5-8 кг/м2•с.{" "}
        {typeKey === "vodiany-kalorifery" &&
          "Скорость теплоносителя в трубках: оптимальная 0.2-0.5 м/с, допустимая - 0.12-1.2 м/с."}
      </ProductParagraph>
      <iframe
        src={calculator}
        title="Калькулятор калорифера"
        className={`${isWater ? "h-174" : "h-124"} mb-0.5 w-full`}
      />
      <ProductParagraph className="mb-10">
        {nextProduct && (
          <>
            Если запас площади поверхности теплообмена не достаточен ни для
            одной модели {shortName} (двух, трех и четырех рядной) нужно перейти
            к следующему номеру {type?.gen} калорифера:{" "}
            <Link
              href={nextProduct.slug}
              className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
            >
              {nextProduct.name}
            </Link>
          </>
        )}
        {nextProduct && prevProduct && (
          <>
            {" "}
            При избыточном запасе следует рассмотреть меньший теплообменник:{" "}
            <Link
              href={prevProduct.slug}
              className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
            >
              {prevProduct.name}
            </Link>
          </>
        )}
        {!nextProduct && prevProduct && (
          <>
            Если запас площади поверхности теплообмена превышает допустимые
            значения для всех моделей {shortName} (двух, трех и четырех рядных)
            следует рассмотреть меньший теплообменник:{" "}
            <Link
              href={prevProduct.slug}
              className="text-primary-darker outline-primary-darker rounded-sm bg-gray-200 p-1.5 font-bold hover:outline"
            >
              {prevProduct.name}
            </Link>
          </>
        )}
      </ProductParagraph>
      <ProductSubheader text={`Технические характеристики ${shortName}`} />
      <table className="single-table water-and-steam water-and-steam-inner mb-1">
        <thead>
          <tr>
            <th rowSpan={2}>
              Производительность <br /> по воздуху, м<sup>3</sup>/час
            </th>
            <th colSpan={5}>
              Габаритные и <br /> присоединительные размеры, мм
            </th>
            <th colSpan={isWater ? 2 : 1} className="dy">
              dy
            </th>
            <th colSpan={3}>
              Площадь поверхности <br /> теплообмена, м<sup>2</sup>
            </th>
            <th colSpan={3} className="mass">
              Масса, кг
            </th>
          </tr>
          <tr>
            <th className="small-cols">
              {isWater && "L"}
              {isSteam && "H"}
              <br />
              {isWater && "H"}
              {isSteam && "B"}
            </th>
            <th className="small-cols">
              {isWater && "L1"}
              {isSteam && "H1"}
              <br />
              {isWater && "H1"}
              {isSteam && "B1"}
            </th>
            <th className="small-cols">
              {isWater && "L2"}
              {isSteam && "H2"}
              <br />
              {isWater && "H2"}
              {isSteam && "B2"}
            </th>
            <th className="small-cols">
              {isWater && "L3"}
              {isSteam && "H3"}
            </th>
            <th className="small-cols">C</th>
            <th className="small-cols w-10">мм</th>
            {isWater && <th className="small-cols w-10 pt-1">"</th>}
            <th className="kal2">{nameAbbrev}2</th>
            <th className="kal2">{nameAbbrev}3</th>
            <th className="kal2">{nameAbbrev}4</th>
            <th className="kal2">{nameAbbrev}2</th>
            <th className="kal2">{nameAbbrev}3</th>
            <th className="kal2">{nameAbbrev}4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {product.specsTableValues.map((value, i) => {
              const fractionMatch = String(value).match(
                /^(\d+)\s+(\d+)\/(\d+)$/,
              );
              if (fractionMatch) {
                const [, whole, numerator, denominator] = fractionMatch;
                return (
                  <td key={i}>
                    {whole} <sup>{numerator}</sup>/<sub>{denominator}</sub>
                  </td>
                );
              }

              return <td key={i}>{value}</td>;
            })}
          </tr>
        </tbody>
      </table>
      {drawing && (
        <Image
          src={drawing}
          alt={name}
          width={968}
          height={1}
          className="mb-10"
        />
      )}
      <TableAndCatalogLinks
        tableURL="#"
        tableLinkText={`Приточные ${type?.plu} калориферы`}
        catalogURL="#"
      />
      <Button
        size="xl"
        className="fixed bottom-[200px] left-[100px] cursor-pointer bg-[#574184] hover:bg-[#7e5ebd]"
      >
        Задать вопрос
      </Button>
    </div>
  );
}
