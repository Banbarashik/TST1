import Image from "next/image";
import Link from "next/link";

import type { PritochnyProduct } from "@/types";

import ProductCard from "@/components/catalog/productCard";
import ProductRequestControls from "@/components/catalog/productRequestControls";
import ProductHeader from "@/components/catalog/productHeader";
import ProductSubheader from "@/components/catalog/productSubheader";
import ProductParagraph from "@/components/catalog/productParagraph";
import { Button } from "@/components/ui/button";
import Table from "@/components/ui/table";
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
    tableData,
  } = product;

  const [table] = tableData;

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
        фронтальном сечении: оптимальная 3-5 кг/м2•с, допустимая 1.5-8 кг/м2•с.
        {typeKey === "vodiany-kalorifery" &&
          "Скорость теплоносителя в трубках: оптимальная 0.2-0.5 м/с, допустимая - 0.12-1.2 м/с."}
      </ProductParagraph>
      <iframe
        src={calculator}
        title="Калькулятор калорифера"
        style={{
          width: "100%",
          height: "697px",
          border: "none",
        }}
        className="mb-0.5"
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
      <Table
        tableData={table}
        className="single-table water-and-steam water-and-steam-inner mb-1"
      />
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
