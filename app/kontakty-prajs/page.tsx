import productData from "@/data/products.json";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { sortProducts } from "@/lib/utils";

import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";
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
    <div className="3xl:px-0 mx-auto w-full max-w-[84rem] space-y-6 px-3 py-14 lg:px-6 xl:px-10">
      <div className="space-y-5">
        <Heading
          lvl={1}
          text="Цена/прайс-лист воздушно-отопительного оборудования"
        />

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
          <h2 className="self-center text-2xl font-bold uppercase">
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
          <h3 className="mb-2 hidden text-center text-xl uppercase sm:block">
            ПРИТОЧНЫЕ ВОДЯНЫЕ И ПАРОВЫЕ КАЛОРИФЕРЫ
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 py-0.75 text-left">
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
                <Button className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                  ПРИТОЧНЫЕ ВОДЯНЫЕ КАЛОРИФЕРЫ
                </Button>
                <Button className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                  КАТАЛОГ КАЛОРИФЕРОВ КПВС КПВУ
                </Button>
              </div>
            </div>
            <div className="flex basis-full flex-col gap-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
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
                <Button className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                  ПРИТОЧНЫЕ паровые КАЛОРИФЕРЫ
                </Button>
                <Button className="rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                  КАТАЛОГ КАЛОРИФЕРОВ КППС КППУ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ksk-kpsk tables */}
        <div>
          <h3 className="mb-2 hidden text-center text-xl uppercase sm:block">
            КАЛОРИФЕРЫ ВОДЯНЫЕ КСК И ПАРОВЫЕ КПСК
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 text-left">
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
                <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase">
                  КАЛОРИФЕРЫ КСК
                </Button>
                <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase">
                  КАТАЛОГ КСК
                </Button>
              </div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 text-left">
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
                <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase">
                  КАЛОРИФЕРЫ КПСК
                </Button>
                <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 px-2.5 text-black uppercase">
                  КАТАЛОГ КПСК
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
          <h3 className="mb-2 hidden text-center text-xl uppercase sm:block">
            КАЛОРИФЕРЫ ДЛЯ НИЗКИХ ТЕМПЕРАТУР
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 text-left">
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
                  <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                    КАЛОРИФЕРЫ ТВВ
                  </Button>
                  <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                    КАЛОРИФЕРЫ КП
                  </Button>
                </div>
                <div className="flex basis-full flex-col gap-2">
                  <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                    КАТАЛОГ ТВВ
                  </Button>
                  <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
                    КАТАЛОГ КП
                  </Button>
                </div>
              </div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 text-left">{p.shortName}</td>
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
            <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
              КАЛОРИФЕРЫ КФБ-А М
            </Button>
            <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
              КАЛОРИФЕРЫ КФБ-А П
            </Button>
            <Button className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase">
              КАТАЛОГ КФБ-А
            </Button>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-6xl">
        В таблицах представлена цена калориферов всех моделей с несущими
        электросварными трубками диаметром 16х1.5 и 22х1.5 мм. Цены калориферов
        на базе бесшовных цельнотянутых трубок уточняйте по запросу.
      </p>

      <h2 className="text-center text-2xl font-bold uppercase">
        Цена/прайс-лист отопительных агрегатов
      </h2>

      <div className="mx-auto max-w-6xl space-y-10">
        {/* tvv-kp-kfb tables */}
        <div className="space-y-2">
          <h3 className="mb-2 hidden text-center text-xl uppercase sm:block">
            ОТОПИТЕЛЬНЫЕ АГРЕГАТЫ ВОДЯНЫЕ И ПАРОВЫЕ
          </h3>
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
                АГРЕГАТЫ АО 2 ВОДЯНЫЕ И ПАРОВЫЕ
              </h3>
              <table className="w-full">
                <thead className="uppercase">
                  <tr>
                    <th className="px-1 py-1 text-left">АГРЕГАТЫ АО 2</th>
                    <th colSpan={2}>Цена с учетом НДС</th>
                  </tr>
                  <tr>
                    <th className="px-1 py-1 text-right">КАЛОРИФЕР</th>
                    <th>3 РЯДА</th>
                    <th>4 РЯДА</th>
                  </tr>
                </thead>
                <tbody>
                  {ao2v3.map((p, idx) => (
                    <tr>
                      <td className="px-1 py-1 text-left">{p.shortName} В П</td>
                      <td>{p.price}</td>
                      <td>{ao2v4[idx].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2"></div>
            </div>

            <div className="basis-full space-y-2">
              <h3 className="text-xl uppercase sm:hidden">
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
                    <tr>
                      <td className="px-1 py-1 text-left">{p.shortName}</td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                  <tr className="h-[29px]">
                    <td colSpan={2} />
                  </tr>
                  <tr>
                    <th className="px-1 py-1 text-left">АГРЕГАТЫ СТД-300</th>
                    <th className="px-1">ЦЕНА С УЧЕТОМ НДС</th>
                  </tr>
                  {std300.map((p) => (
                    <tr>
                      <td className="px-1 py-1 text-left">
                        СТД-300 В{p.rows} П{p.rows}
                      </td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                  {std300hl.map((p) => (
                    <tr>
                      <td className="px-1 py-1 text-left">
                        СТД-300 ХЛ В{p.rows} П{p.rows}
                      </td>
                      <td>{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row md:items-stretch"></div>
        </div>
      </div>

      <p className="mx-auto max-w-6xl">
        В таблицах представлена цена отопительных агрегатов всех моделей с
        комплектуемыми калориферами на базе несущих электросварных трубок
        диаметром 16х1.5 и 22х1.5 мм. Цены агрегатов с калориферами,
        изготовленными с бесшовными трубками, уточняйте по запросу.
      </p>

      <h2 className="text-center text-2xl font-bold uppercase">
        Цена/Прайс-лист электронагревательного оборудования
      </h2>

      <div className="space-y-6">
        <ProductParagraph>
          Технический отдел предприятия принимает заказы на изготовление
          калориферов нестандартных габаритных размеров по опросному листу. С
          помощью онлайн-калькулятора можно произвести быстрый подбор приточных
          водяных и паровых моделей, получить данные для выбора сопутствующего
          вентиляционного, насосно-смесительного оборудования и
          пароконденсатного оборудования.
        </ProductParagraph>
        <h2 className="text-center text-2xl font-bold uppercase">
          Контактные данные/реквизиты
        </h2>

        <table className="mx-auto mb-4 w-full max-w-6xl">
          <tbody>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ПОЛНОЕ НАИМЕНОВАНИЕ
              </th>
              <td colSpan={4}>
                Общество с ограниченной ответственностью «Т.С.Т.»
              </td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                СОКРАЩЕННОЕ НАИМЕНОВАНИЕ
              </th>
              <td colSpan={4}>ООО «Т.С.Т.»</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ЮРИДИЧЕСКИЙ АДРЕС
              </th>
              <td colSpan={4}>
                630108, Новосибирск г., Широкая ул., здание 1А, офис 207/1
              </td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ПОЧТОВЫЙ АДРЕС
              </th>
              <td colSpan={4}>
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
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                БИК
              </th>
              <td colSpan={2}>044525411</td>
              <td colSpan={2}>043207612</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                РАСЧЕТНЫЙ СЧЕТ
              </th>
              <td colSpan={2}>407 028 105 1307 00 000 31</td>
              <td colSpan={2}>407 028 100 2621 01 023 57</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                БАНК
              </th>
              <td colSpan={2}>Филиал «Центральный» Банка ВТБ ПАО г. Москва</td>
              <td colSpan={2}>
                Кемеровское отделение № 8615 ПАО Сбербанк г. Кемерово
              </td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                КОРРЕСПОНДЕНТСКИЙ СЧЕТ
              </th>
              <td colSpan={2}>301 018 101 4525 00 004 11</td>
              <td colSpan={2}>301 018 102 0000 00 006 12</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ОКВЭД
              </th>
              <td colSpan={4}>
                28.25 Производство промышленного и холодильного оборудования
              </td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ТЕЛЕФОН/ФАКС
              </th>
              <td colSpan={4}>8 (38 46) 68-23-24</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                E-MAIL
              </th>
              <td colSpan={4}>zao_tst@mail.ru</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ВЕБ-САЙТ
              </th>
              <td colSpan={4}>https://zao-tst.ru</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ТЕХНИЧЕСКИЕ ВОПРОСЫ
              </th>
              <td colSpan={2}>8-961-737-83-14</td>
              <td colSpan={2}>Киляков Вадим Анатольевич</td>
            </tr>
            <tr className="text-sm">
              <th colSpan={4} className="py-0.75" style={{ fontSize: "14px" }}>
                ОТДЕЛ ПРОДАЖ
              </th>
              <td colSpan={2}>8-904-968-14-88</td>
              <td colSpan={2}>Семенова Татьяна Владимировна</td>
            </tr>
          </tbody>
        </table>

        <p className="mx-auto max-w-6xl">
          В 2015 году, в связи с внесением поправок в Гражданский Кодекс РФ,
          принято решение о реорганизации Закрытого акционерного общества
          «Т.С.Т.» в форме преобразования в Общество с ограниченной
          ответственностью «Т.С.Т.». ООО «Т.С.Т.» становится полным
          правопреемником по всем правам и обязанностям ЗАО «Т.С.Т.».
        </p>
      </div>
    </div>
  );
}
