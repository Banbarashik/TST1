import { productData } from "@/data/products";

import React from "react";
import type { Metadata } from "next";

import { sortProducts } from "@/lib/utils";

import ProductParagraph from "@/components/catalog/productParagraph";
import Heading from "@/components/general_pages/heading";
import TableAndCatalogLinks from "@/components/catalog/tableAndCatalogLinks";

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
  const avoTvvVariants = avoTvv.variants.map((p) => ({ ...p, id: avoTvv.id }));

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
    <div className="max-w-8xl mx-auto w-full px-12 py-14">
      <div className="space-y-5">
        <Heading
          lvl={1}
          text="Цена/прайс-лист воздушно-отопительного оборудования"
        />
        <ProductParagraph className="mb-7">
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
        <h2 className="text-center text-2xl font-bold uppercase">
          Цена/прайс-лист калориферов
        </h2>
        <ProductParagraph>
          Широкий модельный ряд калориферов производства ЗАО «Т.С.Т.», только в
          стандартном исполнении насчитывающий 440 типоразмеров, позволяет
          решить вопрос с быстрым и качественным обогревом промышленных
          комплексов любой площади, поспособствует выполнению задач, связанных с
          созданием технологического тепла для производственных процессов.
        </ProductParagraph>
      </div>

      <div>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-6">
            <Heading
              lvl={2}
              text="Приточные калориферы - водяные КПВС и паровые КППС"
            />
            <table className="w-full">
              <thead className="uppercase">
                <tr>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {kpps2.map((p, i) => (
                  <tr key={p.id}>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВС КППС {p.size}х{p.size}_{p.rows}
                    </td>
                    <td>{p.price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВС КППС {kpps3[i].size}х{kpps3[i].size}_{kpps3[i].rows}
                    </td>
                    <td>{kpps3[i].price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВС КППС {kpps4[i].size}х{kpps4[i].size}_{kpps4[i].rows}
                    </td>
                    <td>{kpps4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/kpvs"
                tableLinkText="Калориферы КПВС"
                catalogURL="/catalog/kpps"
                catalogLinkText="Калориферы КППС"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_KPVS_KPVU_katalog_2025.pdf"
                tableLinkText="Скачать каталог КПВС"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KPPS_KPPU_katalog_2025.pdf"
                catalogLinkText="Скачать каталог КППС"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
          <div className="space-y-6">
            <Heading
              lvl={2}
              text="Приточные калориферы - водяные КПВУ и паровые КППУ"
            />
            <table className="w-full">
              <thead className="uppercase">
                <tr>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {kpvu2.map((p, i) => (
                  <tr key={p.id}>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВУ КППУ {p.size}х{p.size}_{p.rows}
                    </td>
                    <td>{p.price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВУ КППУ {kpvu3[i].size}х{kpvu3[i].size}_{kpvu3[i].rows}
                    </td>
                    <td>{kpvu3[i].price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КПВУ КППУ {kpvu4[i].size}х{kpvu4[i].size}_{kpvu4[i].rows}
                    </td>
                    <td>{kpvu4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/kpvu"
                tableLinkText="Калориферы КПВУ"
                catalogURL="/catalog/kppu"
                catalogLinkText="Калориферы КППУ"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_KPVS_KPVU_katalog_2025.pdf"
                tableLinkText="Скачать каталог КПВУ"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KPPS_KPPU_katalog_2025.pdf"
                catalogLinkText="Скачать каталог КППУ"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
          <div className="space-y-6">
            <Heading lvl={2} text="Калориферы водяные КСк и паровые КПСк" />
            <table className="w-full">
              <thead>
                <tr className="uppercase">
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="py-1.5">Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {ksk2.map((p, i) => (
                  <tr key={p.id}>
                    <td className="py-0.75 pl-1.5 text-left">
                      КСк КПСк 2-{p.size}
                    </td>
                    <td>{p.price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КСк КПСк 3-{ksk3[i].size}
                    </td>
                    <td>{ksk3[i].price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      КСк КПСк 4-{ksk4[i].size}
                    </td>
                    <td>{ksk4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/ksk"
                tableLinkText="Калориферы КСк"
                catalogURL="/catalog/kpsk"
                catalogLinkText="Калориферы КПСк"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_KSK_katalog_2025.pdf"
                tableLinkText="Скачать каталог КСк"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KPSK_katalog_2025.pdf"
                catalogLinkText="Скачать каталог КПСк"
                buttonClassName="bg-gray-200"
              />
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
          <div className="space-y-6">
            <Heading lvl={2} text="Калориферы водяные ТВВ и паровые КП" />
            <table className="w-full max-w-3xl">
              <thead>
                <tr className="uppercase">
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="px-1 py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="px-1 py-1.5">Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {tvv3.map((p, i) => (
                  <tr key={p.id}>
                    <td className="py-0.75 pl-1.5 text-left">
                      ТВВ КП 3{p.size < 10 ? "0" + p.size : p.size}
                    </td>
                    <td>{p.price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      ТВВ КП 4{p.size < 10 ? "0" + p.size : p.size}
                    </td>
                    <td>{tvv4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/tvv"
                tableLinkText="Калориферы ТВВ"
                catalogURL="/catalog/kp"
                catalogLinkText="Калориферы КП"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_TVV_katalog_2025.pdf"
                tableLinkText="Скачать каталог ТВВ"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KP_katalog_2025.pdf"
                catalogLinkText="Скачать каталог КП"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
          <div className="space-y-6">
            <Heading lvl={2} text="Калориферы водяные и паровые КФБ-А" />
            <table className="w-full max-w-3xl">
              <thead>
                <tr className="uppercase">
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="px-1 py-1.5">Цена с учетом НДС</th>
                  <th className="py-1.5">Наименование калорифера</th>
                  <th className="px-1 py-1.5">Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {kfb3.map((p, i) => (
                  <tr key={p.id}>
                    <td className="py-0.75 pl-1.5 text-left">{p.shortName}</td>
                    <td>{p.price}</td>
                    <td className="py-0.75 pl-1.5 text-left">
                      {kfb4[i].shortName}
                    </td>
                    <td>{kfb4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-start gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/kfb-a-m"
                tableLinkText="Калориферы КФБ-А водяные"
                catalogURL="/catalog/kfb-a-p"
                catalogLinkText="Калориферы КФБ-А паровые"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <div className="flex-1/2">
                <TableAndCatalogLinks
                  tableURL="/documents/Kalorifer_KFB_katalog_2025.pdf"
                  tableLinkText="Скачать каталог калориферов КФБ-А"
                  tableLinkOpenNewTab={true}
                  buttonClassName="bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <ProductParagraph className="mx-auto max-w-6xl">
          В таблицах представлена цена на калориферы всех моделей с несущими
          электросварными трубками 16х1.5 и 22х1.5 мм. Цены калориферов на базе
          бесшовных цельнотянутых трубок уточняйте по запросу.
        </ProductParagraph>

        <h2 className="text-center text-2xl font-bold uppercase">
          Цена/прайс-лист отопительных агрегатов
        </h2>

        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-6">
            <Heading lvl={2} text="Агрегаты АО2 водяные и паровые" />
            <table className="w-full max-w-3xl">
              <thead>
                <tr>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                {ao2v3.map((p, i) => (
                  <tr key={p.id}>
                    <td>{p.shortName} (КСК3 КПСК3)</td>
                    <td>{p.price}</td>
                    <td>{ao2v4[i].shortName} (КСК4 КПСК4)</td>
                    <td>{ao2v4[i].price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-start gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/kfb-a-m"
                tableLinkText="Агрегаты АО2 водяные"
                catalogURL="/catalog/kfb-a-p"
                catalogLinkText="Агрегаты АО2 паровые"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <div className="flex-1/2">
                <TableAndCatalogLinks
                  tableURL="/documents/Kalorifer_KFB_katalog_2025.pdf"
                  tableLinkText="Скачать каталог агрегатов АО2"
                  tableLinkOpenNewTab={true}
                  buttonClassName="bg-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Heading lvl={2} text="Агрегаты АВО ХЛ водяные и паровые" />
            <table className="w-full">
              <thead>
                <tr>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {avoTvvVariants.map((p) => (
                    <React.Fragment key={p.id}>
                      <td>{p.shortName} (ТВВ4 КП4)</td>
                      <td>{p.price}</td>
                    </React.Fragment>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="flex justify-start gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/kfb-a-m"
                tableLinkText="Агрегаты АВО ХЛ водяные"
                catalogURL="/catalog/kfb-a-p"
                catalogLinkText="Агрегаты АВО ХЛ паровые"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <div className="flex-1/2">
                <TableAndCatalogLinks
                  tableURL="/documents/Kalorifer_KFB_katalog_2025.pdf"
                  tableLinkText="Скачать каталог агрегатов АВО ХЛ"
                  tableLinkOpenNewTab={true}
                  buttonClassName="bg-gray-200"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Heading lvl={2} text="Агрегаты СТД-300 водяные и паровые" />
            <table className="w-full max-w-3xl">
              <thead>
                <tr>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                  <th>Наименование агрегата</th>
                  <th>Цена с учетом НДС</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {std300.map((p) => (
                    <React.Fragment key={p.id}>
                      <td>
                        СТД 300 (КСК{p.rows} КПСК{p.rows})
                      </td>
                      <td>{p.price}</td>
                    </React.Fragment>
                  ))}
                </tr>
                <tr>
                  {std300hl.map((p) => (
                    <React.Fragment key={p.id}>
                      <td>
                        СТД 300 (КСК{p.rows} КПСК{p.rows})
                      </td>
                      <td>{p.price}</td>
                    </React.Fragment>
                  ))}
                </tr>
              </tbody>
            </table>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/tvv"
                tableLinkText="Агрегаты СТД-300 в"
                catalogURL="/catalog/kp"
                catalogLinkText="Агрегаты СТД-300 п"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_TVV_katalog_2025.pdf"
                tableLinkText="Скачать каталог СТД-300"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KP_katalog_2025.pdf"
                catalogLinkText="Скачать каталог СТД-300 ХЛ"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
        </div>

        <ProductParagraph className="mx-auto max-w-6xl">
          В таблицах представлена цена на калориферы всех моделей с несущими
          электросварными трубками 16х1.5 и 22х1.5 мм. Цены калориферов на базе
          бесшовных цельнотянутых трубок уточняйте по запросу.
        </ProductParagraph>

        <h2 className="text-center text-2xl font-bold uppercase">
          Цена/Прайс-лист электронагревательного оборудования
        </h2>

        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-6">
            <div className="flex gap-16">
              <div className="w-full">
                <Heading lvl={2} text="Электрокалориферы СФО" />
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Наименование электрокалорифера</th>
                      <th>Цена с учетом НДС</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sfo.map((p) => (
                      <tr key={p.id}>
                        <td>{p.shortName}</td>
                        <td>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full">
                <Heading lvl={2} text="Электрокалориферные установки СФОЦ" />
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Наименование установки</th>
                      <th>Цена с учетом НДС</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sfotc.map((p) => (
                      <tr key={p.id}>
                        <td>{p.shortName}</td>
                        <td>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/tvv"
                tableLinkText="Электрокалориферы СФО"
                catalogURL="/catalog/kp"
                catalogLinkText="Установки СФОЦ"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_TVV_katalog_2025.pdf"
                tableLinkText="Скачать каталог СФО"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KP_katalog_2025.pdf"
                catalogLinkText="Скачать каталог СФОЦ"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-16">
              <div className="w-full">
                <Heading lvl={2} text="Шкафы управления калорифером ШУК" />
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Наименование шкафа управления</th>
                      <th>Цена с учетом НДС</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shuk.map((p) => (
                      <tr key={p.id}>
                        <td>{p.shortName}</td>
                        <td>{p.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full">
                <Heading lvl={2} text="Оребренные ТЭНы" />
                <table className="w-full">
                  <thead>
                    <th>Наименование трубчатого электронагревателя</th>
                    <th>Цена с учетом НДС</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{teny.model}</td>
                      <td>{teny.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-16">
              <TableAndCatalogLinks
                tableURL="/catalog/tvv"
                tableLinkText="Шкафы управления ШУК"
                catalogURL="/catalog/kp"
                catalogLinkText="Оребренные ТЭНы"
                catalogOpenNewTab={false}
                buttonClassName="bg-gray-200"
              />
              <TableAndCatalogLinks
                tableURL="/documents/Kalorifer_TVV_katalog_2025.pdf"
                tableLinkText="Скачать каталог ШУК"
                tableLinkOpenNewTab
                catalogURL="/documents/Kalorifer_KP_katalog_2025.pdf"
                catalogLinkText="Скачать каталог ТЭНР"
                buttonClassName="bg-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <ProductParagraph>
          Технический отдел предприятия принимает заказы на изготовление
          калориферов нестандартных габаритных размеров по опросному листу. С
          помощью онлайн-калькулятора можно произвести быстрый подбор приточных
          водяных и паровых моделей, получить данные для выбора сопутствующего
          вентиляционного, насосно-смесительного оборудования и
          пароконденсатного оборудования.
        </ProductParagraph>
        <h2 className="text-2xl font-bold uppercase">Контакты</h2>

        <table className="mx-auto w-full max-w-5xl">
          <tr>
            <th colSpan={4}>ПОЛНОЕ НАИМЕНОВАНИЕ</th>
            <td colSpan={4}>
              Общество с ограниченной ответственностью «Т.С.Т.»
            </td>
          </tr>
          <tr>
            <th colSpan={4}>СОКРАЩЕННОЕ НАИМЕНОВАНИЕ</th>
            <td colSpan={4}>ООО «Т.С.Т.»</td>
          </tr>
          <tr>
            <th colSpan={4}>ЮРИДИЧЕСКИЙ АДРЕС</th>
            <td colSpan={4}>
              630108, Новосибирск г., Широкая ул., здание 1А, офис 207/1
            </td>
          </tr>
          <tr>
            <th colSpan={4}>ПОЧТОВЫЙ АДРЕС</th>
            <td colSpan={4}>
              652710, Кемеровская обл., Киселевск г., Юргинская ул., дом № 1
            </td>
          </tr>
          <tr>
            <th>ИНН</th>
            <th>КПП</th>
            <th>ОКПО</th>
            <th>ОГРН</th>
            <td>5404002676</td>
            <td>540401001</td>
            <td>55613706</td>
            <td>1155476002483</td>
          </tr>
          <tr>
            <th colSpan={4}>БИК</th>
            <td colSpan={2}>Филиал «Центральный» Банка ВТБ ПАО г. Москва</td>
            <td colSpan={2}>
              Кемеровское отделение № 8615 ПАО Сбербанк г. Кемерово
            </td>
          </tr>
          <tr>
            <th colSpan={4}>РАСЧЕТНЫЙ СЧЕТ</th>
            <td colSpan={2}>301 018 101 4525 00 004 11</td>
            <td colSpan={2}>301 018 102 0000 00 006 12</td>
          </tr>
          <tr>
            <th colSpan={4}>БАНК</th>
            <td colSpan={4}>
              28.25 Производство промышленного и холодильного оборудования
            </td>
          </tr>
          <tr>
            <th colSpan={4}>КОРРЕСПОНДЕНТСКИЙ СЧЕТ</th>
            <td colSpan={4}>8 (38 46) 68-23-24</td>
          </tr>
          <tr>
            <th colSpan={4}>ОКВЭД</th>
            <td colSpan={4}>zao_tst@mail.ru</td>
          </tr>
          <tr>
            <th colSpan={4}>ТЕЛЕФОН/ФАКС</th>
            <td colSpan={4}>https://zao-tst.ru</td>
          </tr>
          <tr>
            <th colSpan={4}>E-MAIL</th>
            <td colSpan={4}>zao_tst@mail.ru</td>
          </tr>
          <tr>
            <th colSpan={4}>ВЕБ-САЙТ</th>
            <td colSpan={4}>https://zao-tst.ru</td>
          </tr>
          <tr>
            <th colSpan={4}>ТЕХНИЧЕСКИЕ ВОПРОСЫ</th>
            <td colSpan={2}>8-961-737-83-14</td>
            <td colSpan={2}>Киляков Вадим Анатольевич</td>
          </tr>
          <tr>
            <th colSpan={4}>ОТДЕЛ ПРОДАЖ</th>
            <td colSpan={2}>8-904-968-14-88</td>
            <td colSpan={2}>Семенова Татьяна Владимировна</td>
          </tr>
        </table>

        <ProductParagraph>
          В 2015 году, в связи с внесением поправок в Гражданский Кодекс РФ,
          принято решение о реорганизации Закрытого акционерного общества
          «Т.С.Т.» в форме преобразования в Общество с ограниченной
          ответственностью «Т.С.Т.». ООО «Т.С.Т.» становится полным
          правопреемником по всем правам и обязанностям ЗАО «Т.С.Т.».
        </ProductParagraph>
      </div>
    </div>
  );
}
