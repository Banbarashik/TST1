import productData from "@/data/products.json";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { sortProducts } from "@/lib/utils";

import ProductParagraph from "@/components/catalog/productParagraph";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Прайс-лист воздушно-отопительного оборудования",
  description:
    "Прайс-лист воздушно-отопительного оборудования. Предприятие-производитель Т.С.Т. Цена водяных, паровых, электрических калориферов, агрегатов воздухонагревательных установок",
  keywords:
    "калорифер прайс лист,калорифер купить,калорифер цена,калорифер водяной цена,калорифер водяной купить,калорифер паровой цена,калорифер паровой купить,калорифер электрический цена,отопительный агрегат цена,агрегат отопительный купить",
};

export default function ContactsAndPricesPage() {
  const sortedProducts = productData.sort((a, b) =>
    sortProducts(a.name, b.name),
  );

  const kpps = sortedProducts.filter((p) => p.categories.includes("kpps"));
  const kppsVariants = kpps
    .map((p) => p.variants.map((variant) => ({ ...variant, size: p.size })))
    .flat();
  const kpps2 = kppsVariants.filter((p) => p.rows === 2);
  const kpps3 = kppsVariants.filter((p) => p.rows === 3);
  const kpps4 = kppsVariants.filter((p) => p.rows === 4);

  const kpvu = sortedProducts.filter((p) => p.categories.includes("kpvu"));
  const kpvuVariants = kpvu
    .map((p) => p.variants.map((variant) => ({ ...variant, size: p.size })))
    .flat();
  const kpvu2 = kpvuVariants.filter((p) => p.rows === 2);
  const kpvu3 = kpvuVariants.filter((p) => p.rows === 3);
  const kpvu4 = kpvuVariants.filter((p) => p.rows === 4);

  const ksk = sortedProducts.filter((p) => p.categories.includes("ksk"));
  const ksk2 = ksk.filter((p) => p.rows === 2);
  const ksk3 = ksk.filter((p) => p.rows === 3);
  const ksk4 = ksk.filter((p) => p.rows === 4);

  const tvv = sortedProducts.filter((p) => p.categories.includes("tvv"));
  const tvv3 = tvv.filter((p) => p.rows === 3);
  const tvv4 = tvv.filter((p) => p.rows === 4);

  const kfb = sortedProducts.filter((p) => p.categories.includes("kfb-a-m"));
  const kfb3 = kfb.filter((p) => p.rows === 3);
  const kfb4 = kfb.filter((p) => p.rows === 4);

  const ao2v = sortedProducts.filter((p) => p.categories.includes("ao2-v"));
  const ao2v3 = ao2v.filter((p) => p.rows === 3);
  const ao2v4 = ao2v.filter((p) => p.rows === 4);

  const avo = sortedProducts.filter((p) => p.categories.includes("avo"));
  const avoTvv = avo.find((p) => p.categories.includes("avo-tvv"));
  const avoTvvVariants = avoTvv.variants.map((p) => ({ ...p, id: p.id }));

  const std300 = sortedProducts.find((p) =>
    p.categories.includes("std300-v"),
  ).variants;
  const std300hl = sortedProducts.find((p) =>
    p.categories.includes("std300-hl"),
  ).variants;

  const elektro = sortedProducts.filter((p) =>
    p.categories.includes("energonagrevatelynoe-oborudovanie"),
  );
  const sfo = elektro.filter((p) => p.categories.includes("sfo"));
  const sfotc = elektro.filter((p) => p.categories.includes("sfotc"));
  const shuk = elektro.filter((p) => p.categories.includes("shuk"));
  const teny = elektro.find((p) => p.categories.includes("teny"));

  return (
    <main className="3xl:px-0 mx-auto w-full max-w-[84rem] space-y-6 px-2 pt-6 pb-14 sm:pt-14 lg:px-6 xl:px-10">
      <div className="space-y-5">
        <h1 className="text-lg font-bold uppercase sm:text-xl lg:text-[22px] xl:text-2xl">
          Цена/прайс-лист воздушно-отопительного оборудования
        </h1>

        <ProductParagraph className="mb-8">
          ЗАО «Т.С.Т.» — предприятие-производитель, специализирующееся на
          выпуске воздушно-отопительного оборудования и работающее на рынке
          климатической продукции с 2001 года. Основное направление деятельности
          организации — изготовление водяных, паровых, электрических калориферов
          и отопительных агрегатов, воздухонагревательных установок. За годы
          производственной деятельности налажено деловое сотрудничество и
          установлены прочные торгово-экономические связи с предприятиями
          металлургической, горнодобывающей, химической,
          топливно-энергетической, авиационной, машиностроительной
          промышленности, фабриками и хозяйствами агропромышленного комплекса.
        </ProductParagraph>

        <div className="flex flex-col gap-8">
          <Link
            href="/documents/Price_list_zao_tst_2025.pdf"
            className="button sm:w-60 sm:self-end"
            id="button-7"
            target="_blank"
          >
            <div id="dub-arrow">Скачать</div>
            <span>Прайс-лист</span>
          </Link>
          <h2 className="self-center font-bold uppercase sm:text-lg lg:text-xl xl:text-[22px]">
            Цена/прайс-лист калориферов
          </h2>
        </div>

        <ProductParagraph>
          Широкий модельный ряд калориферов производства ЗАО «Т.С.Т.», только в
          стандартном исполнении насчитывающий 440 типоразмеров, позволяет
          решить вопрос с быстрым и качественным обогревом промышленных
          комплексов любой площади, поспособствует выполнению задач, связанных с
          созданием технологического тепла для производственных процессов.
        </ProductParagraph>
      </div>

      <div className="mx-auto max-w-6xl space-y-10">
        {/* pritochnye tables */}
        <div>
          <h3 className="mb-2 hidden text-center text-lg uppercase sm:block sm:text-xl">
            ПРИТОЧНЫЕ ВОДЯНЫЕ И ПАРОВЫЕ КАЛОРИФЕРЫ
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                ПРИТОЧНЫЕ КАЛОРИФЕРЫ – ВОДЯНЫЕ КПВС И ПАРОВЫЕ КППС
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th className="px-1 py-1.5 text-left">Калориферы</th>
                    <th colSpan={3}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th className="px-1 py-1.5 text-right">Количество рядов</th>
                    <th>_2</th>
                    <th>_3</th>
                    <th>_4</th>
                  </tr>
                </thead>
                <tbody>
                  {kpps2.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="py-0.75 pr-0 pl-0.5 text-left">
                        КПВС КППС {p.size}x{p.size}
                      </td>
                      <td>{p.price}</td>
                      <td>{kpps3[idx].price}</td>
                      <td>{kpps4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col justify-start gap-2">
                <Button
                  asChild
                  className="rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link href="/catalog/pritochny-vodiany-kalorifery">
                    ПРИТОЧНЫЕ ВОДЯНЫЕ КАЛОРИФЕРЫ
                  </Link>
                </Button>
                <Button
                  asChild
                  className="rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link
                    target="_blank"
                    href="/documents/Kalorifer_KPVS_KPVU_katalog_2025.pdf"
                  >
                    КАТАЛОГ КАЛОРИФЕРОВ КПВС КПВУ
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex basis-full flex-col gap-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                ПРИТОЧНЫЕ КАЛОРИФЕРЫ – ВОДЯНЫЕ КПВУ И ПАРОВЫЕ КППУ
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th className="px-1 py-1.5 text-left">Калориферы</th>
                    <th colSpan={3}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th className="px-1 py-1.5 text-right">Количество рядов</th>
                    <th>_2</th>
                    <th>_3</th>
                    <th>_4</th>
                  </tr>
                </thead>
                <tbody>
                  {kpvu2.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">
                        КПВУ КППУ {p.size}x{p.size}
                      </td>
                      <td>{p.price}</td>
                      <td>{kpvu3[idx].price}</td>
                      <td>{kpvu4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-auto flex flex-col justify-start gap-2">
                <Button
                  asChild
                  className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                >
                  <Link href="/catalog/pritochny-parovy-kalorifery">
                    ПРИТОЧНЫЕ ПАРОВЫЕ КАЛОРИФЕРЫ
                  </Link>
                </Button>
                <Button
                  asChild
                  className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                >
                  <Link
                    target="_blank"
                    href="/documents/Kalorifer_KPPS_KPPU_katalog_2025.pdf"
                  >
                    КАТАЛОГ КАЛОРИФЕРОВ КППС КППУ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ksk-kpsk tables */}
        <div>
          <h3 className="mb-2 hidden text-center text-lg uppercase sm:block sm:text-xl">
            КАЛОРИФЕРЫ ВОДЯНЫЕ КСК И ПАРОВЫЕ КПСК
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                КАЛОРИФЕРЫ ВОДЯНЫЕ КСК
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={3} className="px-1 py-1.5 text-left">
                      Калориферы КСк
                    </th>
                    <th colSpan={3}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th colSpan={3} className="px-1 py-1.5 text-right">
                      Количество рядов
                    </th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                  </tr>
                </thead>
                <tbody>
                  {ksk2.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">
                        {p.rows}-{p.size}
                      </td>
                      <td className="px-1 text-left">
                        {ksk3[idx].rows}-{ksk3[idx].size}
                      </td>
                      <td className="px-1 text-left">
                        {ksk4[idx].rows}-{ksk4[idx].size}
                      </td>
                      <td>{p.price}</td>
                      <td>{ksk3[idx].price}</td>
                      <td>{ksk4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link href="/catalog/ksk">КАЛОРИФЕРЫ КСК</Link>
                </Button>
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link
                    target="_blank"
                    href="/documents/Kalorifer_KSK_katalog_2025.pdf"
                  >
                    КАТАЛОГ КСК
                  </Link>
                </Button>
              </div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                КАЛОРИФЕРЫ ПАРОВЫЕ КПСК
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={3} className="px-1 py-1.5 text-left">
                      Калориферы КПСк
                    </th>
                    <th colSpan={3}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th colSpan={3} className="px-1 py-1.5 text-right">
                      Количество рядов
                    </th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                  </tr>
                </thead>
                <tbody>
                  {ksk2.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">
                        {p.rows}-{p.size}
                      </td>
                      <td className="px-1 text-left">
                        {ksk3[idx].rows}-{ksk3[idx].size}
                      </td>
                      <td className="px-1 text-left">
                        {ksk4[idx].rows}-{ksk4[idx].size}
                      </td>
                      <td>{p.price}</td>
                      <td>{ksk3[idx].price}</td>
                      <td>{ksk4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link href="/catalog/kpsk">КАЛОРИФЕРЫ КПСК</Link>
                </Button>
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
                >
                  <Link
                    target="_blank"
                    href="/documents/Kalorifer_KPSK_katalog_2025.pdf"
                  >
                    КАТАЛОГ КПСК
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductParagraph>
        Серийно изготавливаются воздухонагреватели с увеличенным диаметром
        несущих трубок, а также воздушно-отопительные агрегаты на базе таких
        теплообменников. Данное оборудование находит применение на рудных и
        угольных шахтах Заполярья, Дальнего Востока, Урала и Сибири, где их
        эксплуатация происходит в условиях низких температурных режимов.
      </ProductParagraph>

      <div className="mx-auto max-w-6xl space-y-10">
        {/* tvv-kp-kfb tables */}
        <div className="space-y-2">
          <h3 className="mb-2 hidden text-center text-lg uppercase sm:block sm:text-xl">
            КАЛОРИФЕРЫ ДЛЯ НИЗКИХ ТЕМПЕРАТУР
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                КАЛОРИФЕРЫ ВОДЯНЫЕ ТВВ И ПАРОВЫЕ КП
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-left">
                      КАЛОРИФЕРЫ ТВВ КП
                    </th>
                    <th colSpan={2}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-right">
                      Количество рядов
                    </th>
                    <th>3</th>
                    <th>4</th>
                  </tr>
                </thead>
                <tbody>
                  {tvv3.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">
                        {p.rows}
                        {p.size < 10 ? "0" + p.size : p.size}
                      </td>
                      <td className="px-1 text-left">
                        {tvv4[idx].rows}
                        {tvv4[idx].size < 10
                          ? "0" + tvv4[idx].size
                          : tvv4[idx].size}
                      </td>
                      <td>{p.price}</td>
                      <td>{tvv4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2">
                <div className="flex basis-full flex-col gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                  >
                    <Link href="/catalog/tvv">КАЛОРИФЕРЫ ТВВ</Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                  >
                    <Link href="/catalog/kp">КАЛОРИФЕРЫ КП</Link>
                  </Button>
                </div>
                <div className="flex basis-full flex-col gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Kalorifer_TVV_katalog_2025.pdf"
                    >
                      КАТАЛОГ ТВВ
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Kalorifer_KP_katalog_2025.pdf"
                    >
                      КАТАЛОГ КП
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                КАЛОРИФЕРЫ ВОДЯНЫЕ И ПАРОВЫЕ КФБ-А
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-left">
                      КАЛОРИФЕРЫ
                    </th>
                    <th colSpan={2}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-right">
                      Количество рядов
                    </th>
                    <th>3</th>
                    <th>4</th>
                  </tr>
                </thead>
                <tbody>
                  {kfb3.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">{p.shortName}</td>
                      <td className="px-1 text-left">{kfb4[idx].shortName}</td>
                      <td>{p.price}</td>
                      <td>{kfb4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row md:items-stretch">
            <Button
              asChild
              className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
            >
              <Link href="/catalog/kfb-a-m">КАЛОРИФЕРЫ КФБ-А М</Link>
            </Button>
            <Button
              asChild
              className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
            >
              <Link href="/catalog/kfb-a-p">КАЛОРИФЕРЫ КФБ-А П</Link>
            </Button>
            <Button
              asChild
              className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
            >
              <Link
                target="_blank"
                href="/documents/Kalorifer_KFB_katalog_2025.pdf"
              >
                КАТАЛОГ КФБ-А
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-6xl">
        В таблицах представлена цена калориферов всех моделей с несущими
        электросварными трубками диаметром 16х1.5 и 22х1.5 мм. Цены калориферов
        на базе бесшовных цельнотянутых трубок уточняйте по запросу.
      </p>

      <h2 className="text-center font-bold uppercase sm:text-lg lg:text-xl xl:text-[22px]">
        Цена/прайс-лист отопительных агрегатов
      </h2>

      <div className="mx-auto max-w-6xl space-y-10">
        {/* ao2-avo-std tables */}
        <div className="space-y-2">
          <h3 className="mb-2 hidden text-center text-lg uppercase sm:block sm:text-xl">
            ОТОПИТЕЛЬНЫЕ АГРЕГАТЫ ВОДЯНЫЕ И ПАРОВЫЕ
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                АГРЕГАТЫ АО 2 ВОДЯНЫЕ И ПАРОВЫЕ
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th className="px-1 py-1 text-left">АГРЕГАТЫ АО 2</th>
                    <th colSpan={2}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <td className="px-1 py-1 text-right">КАЛОРИФЕР</td>
                    <th>3 РЯДА</th>
                    <th>4 РЯДА</th>
                  </tr>
                </thead>
                <tbody>
                  {ao2v3.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-1 text-left">{p.shortName} В П</td>
                      <td>{p.price}</td>
                      <td>{ao2v4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="space-y-2 sm:hidden">
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link href="/catalog/ao2-v">Агрегаты АО2 В</Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link href="/catalog/ao2-p">Агрегаты АО2 П</Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Agregat_AO2_katalog_2025.pdf"
                    >
                      КАТАЛОГ АО2
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link href="/catalog/avo-tvv">АГРЕГАТЫ АВО ХЛ</Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Agregat_STD-300_katalog_2025.pdf"
                    >
                      КАТАЛОГ СТД-300
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Agregat_AVO-HL_katalog_2025.pdf"
                    >
                      КАТАЛОГ АВО ХЛ
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                АГРЕГАТЫ АВО ХЛ СТД-300 ВОДЯНЫЕ И ПАРОВЫЕ
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th className="px-1 py-1 text-left">АГРЕГАТЫ АВО ХЛ</th>
                    <th>ЦЕНА С УЧЕТОМ НДС</th>
                  </tr>
                </thead>
                <tbody>
                  {avoTvvVariants.map((p) => (
                    <tr key={p.id}>
                      <td className="px-1 py-1 text-left">{p.shortName}</td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                  <tr className="h-[29px]">
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <td className="px-1 py-1 text-left">АГРЕГАТЫ СТД-300</td>
                    <th className="px-1">ЦЕНА С УЧЕТОМ НДС</th>
                  </tr>
                  {std300.map((p) => (
                    <tr key={p.id}>
                      <td className="px-1 py-1 text-left">
                        СТД-300 В{p.rows} П{p.rows}
                      </td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                  {std300hl.map((p) => (
                    <tr key={p.id}>
                      <td className="px-1 py-1 text-left">
                        СТД-300 ХЛ В{p.rows} П{p.rows}
                      </td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col space-y-2 sm:hidden">
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                >
                  <Link href="/catalog/std300-v">АГРЕГАТЫ СТД-300 В</Link>
                </Button>
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                >
                  <Link href="/catalog/std300-p">АГРЕГАТЫ СТД-300 П</Link>
                </Button>
                <Button
                  asChild
                  className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
                >
                  <Link
                    target="_blank"
                    href="/documents/Agregat_STD-300-HL_katalog_2025.pdf"
                  >
                    КАТАЛОГ СТД-300 ХЛ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden space-y-2 sm:block">
            <div className="flex gap-2">
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link href="/catalog/ao2-v">АГРЕГАТЫ АО2 В</Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link href="/catalog/ao2-p">АГРЕГАТЫ АО2 П</Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link href="/catalog/avo-tvv">АГРЕГАТЫ АВО ХЛ</Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link href="/catalog/std300-v">АГРЕГАТЫ СТД-300 В</Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link href="/catalog/std300-p">АГРЕГАТЫ СТД-300 П</Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link
                  target="_blank"
                  href="/documents/Agregat_AO2_katalog_2025.pdf"
                >
                  КАТАЛОГ АО2
                </Link>
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link
                  target="_blank"
                  href="/documents/Agregat_STD-300_katalog_2025.pdf"
                >
                  КАТАЛОГ СТД-300
                </Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link
                  target="_blank"
                  href="/documents/Agregat_STD-300-HL_katalog_2025.pdf"
                >
                  КАТАЛОГ СТД-300 ХЛ
                </Link>
              </Button>
              <Button
                asChild
                className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase"
              >
                <Link
                  target="_blank"
                  href="/documents/Agregat_AVO-HL_katalog_2025.pdf"
                >
                  КАТАЛОГ АВО ХЛ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-6xl">
        В таблицах представлена цена отопительных агрегатов всех моделей с
        комплектуемыми калориферами на базе несущих электросварных трубок
        диаметром 16х1.5 и 22х1.5 мм. Цены агрегатов с калориферами,
        изготовленными с бесшовными трубками, уточняйте по запросу.
      </p>

      <h2 className="text-center font-bold uppercase sm:text-lg lg:text-xl xl:text-[22px]">
        Цена/Прайс-лист электронагревательного оборудования
      </h2>

      <div className="mx-auto max-w-6xl space-y-10">
        {/* electro tables */}
        <div className="space-y-2">
          <h3 className="mb-2 hidden text-center text-lg uppercase sm:block sm:text-xl">
            Электронагревательное оборудование
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* sfo-sfotc table */}
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                Электрокалориферы СФО и установки СФОЦ
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-left">
                      КАЛОРИФЕРЫ СФО
                    </th>
                    <th colSpan={2} className="px-1 text-left">
                      УСТАНОВКИ СФОЦ
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={4} className="px-1 py-1.5">
                      Цена с учетом НДС
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sfo.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">{p.shortName}</td>
                      <td>{p.price}</td>
                      <td className="px-1 text-left">{sfotc[idx].shortName}</td>
                      <td>{sfotc[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link href="/catalog/sfo">КАЛОРИФЕРЫ СФО</Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link href="/catalog/sfotc">УСТАНОВКИ СФОЦ</Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Electrokalorifer_SFO_katalog_2025.pdf"
                    >
                      КАТАЛОГ СФО
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Electroustanovka_SFOTC_katalog_2025.pdf"
                    >
                      КАТАЛОГ СФОЦ
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* shuk-tenr table */}
            <div className="basis-full space-y-2">
              <h3 className="text-lg uppercase sm:hidden sm:text-xl">
                Шкафы управления ШУК и оребренные ТЭНы
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th colSpan={2} className="px-1 py-1.5 text-left">
                      ШКАФЫ ШУК
                    </th>
                    <th colSpan={2} className="px-1 text-left">
                      ТЭНР
                    </th>
                  </tr>
                  <tr>
                    <th colSpan={4} className="px-1 py-1.5">
                      Цена с учетом НДС
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shuk.map((p, idx) => (
                    <tr key={p.id}>
                      <td className="px-1 py-0.75 text-left">{p.shortName}</td>
                      <td>{p.price}</td>
                      <td className="px-1 text-left">
                        {idx === 0 && "ТЭН ОР."}
                      </td>
                      <td>{idx === 0 && teny.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link href="/catalog/shuk">ШКАФЫ ШУК</Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link href="/catalog/teny">ТЭНЫ ТЭНР</Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Electroshkaf_SHUK_katalog_2025.pdf"
                    >
                      КАТАЛОГ ШУК
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-1 text-black uppercase"
                  >
                    <Link
                      target="_blank"
                      href="/documents/Electroten_TENY_katalog_2025.pdf"
                    >
                      КАТАЛОГ ТЭНР
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <ProductParagraph>
          Технический отдел предприятия принимает заказы на изготовление
          калориферов нестандартных габаритных размеров по опросному листу. С
          помощью онлайн-калькулятора можно произвести быстрый подбор приточных
          водяных и паровых моделей, получить данные для выбора сопутствующего
          вентиляционного, насосно-смесительного оборудования и
          пароконденсатного оборудования.
        </ProductParagraph>
        <h2 className="text-center font-bold uppercase sm:text-lg lg:text-xl xl:text-[22px]">
          Контактные данные/реквизиты
        </h2>

        <div className="mb-4 w-full overflow-x-auto">
          <table className="mx-auto w-full max-w-6xl min-w-3xl md:min-w-auto">
            <tbody>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ПОЛНОЕ НАИМЕНОВАНИЕ
                </th>
                <td colSpan={4}>
                  Общество с ограниченной ответственностью «Т.С.Т.»
                </td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="px-1 py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  СОКРАЩЕННОЕ НАИМЕНОВАНИЕ
                </th>
                <td colSpan={4}>ООО «Т.С.Т.»</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ЮРИДИЧЕСКИЙ АДРЕС
                </th>
                <td colSpan={4} className="px-1">
                  630108, Новосибирск г., Широкая ул., здание 1А, офис 207/1
                </td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ПОЧТОВЫЙ АДРЕС
                </th>
                <td colSpan={4} className="px-1">
                  652710, Кемеровская обл., Киселевск г., Юргинская ул., дом № 1
                </td>
              </tr>
              <tr className="text-sm">
                <th>ИНН</th>
                <th>КПП</th>
                <th>ОКПО</th>
                <th>ОГРН</th>
                <td>5404002676</td>
                <td>540401001</td>
                <td>55613706</td>
                <td>1155476002483</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  БИК
                </th>
                <td colSpan={2}>044525411</td>
                <td colSpan={2}>043207612</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  РАСЧЕТНЫЙ СЧЕТ
                </th>
                <td colSpan={2}>407 028 105 1307 00 000 31</td>
                <td colSpan={2}>407 028 100 2621 01 023 57</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  БАНК
                </th>
                <td colSpan={2} className="px-1">
                  Филиал «Центральный» Банка ВТБ ПАО г. Москва
                </td>
                <td colSpan={2} className="px-1">
                  Кемеровское отделение № 8615 ПАО Сбербанк г. Кемерово
                </td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="px-1 py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  КОРРЕСПОНДЕНТСКИЙ СЧЕТ
                </th>
                <td colSpan={2}>301 018 101 4525 00 004 11</td>
                <td colSpan={2}>301 018 102 0000 00 006 12</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ОКВЭД
                </th>
                <td colSpan={4}>
                  28.25 Производство промышленного и холодильного оборудования
                </td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ТЕЛЕФОН/ФАКС
                </th>
                <td colSpan={4}>8 (38 46) 68-23-24</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  E-MAIL
                </th>
                <td colSpan={4}>zao_tst@mail.ru</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ВЕБ-САЙТ
                </th>
                <td colSpan={4}>https://zao-tst.ru</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ТЕХНИЧЕСКИЕ ВОПРОСЫ
                </th>
                <td colSpan={2}>8-961-737-83-14</td>
                <td colSpan={2}>Киляков Вадим Анатольевич</td>
              </tr>
              <tr className="text-sm">
                <th
                  colSpan={4}
                  className="py-0.75"
                  style={{ fontSize: "14px" }}
                >
                  ОТДЕЛ ПРОДАЖ
                </th>
                <td colSpan={2}>8-904-968-14-88</td>
                <td colSpan={2} className="px-1">
                  Семенова Татьяна Владимировна
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mx-auto max-w-6xl">
          В 2015 году, в связи с внесением поправок в Гражданский Кодекс РФ,
          принято решение о реорганизации Закрытого акционерного общества
          «Т.С.Т.» в форме преобразования в Общество с ограниченной
          ответственностью «Т.С.Т.». ООО «Т.С.Т.» становится полным
          правопреемником по всем правам и обязанностям ЗАО «Т.С.Т.».
        </p>
      </div>
    </main>
  );
}
