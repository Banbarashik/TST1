import { productData } from "@/data/products";

import React from "react";
import type { Metadata } from "next";

import { sortProducts } from "@/lib/utils";

import ProductParagraph from "@/components/catalog/productParagraph";
import ProductSubheader from "@/components/catalog/productSubheader";
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
      <section className="mb-4">
        <ProductParagraph>
          ЗАО «Т.С.Т.» — предприятие-производитель, специализирующееся на
          выпуске воздушно-отопительного оборудования и работающее на рынке
          климатической продукции с 2001 года. Основное направление деятельности
          организации — изготовление водяных, паровых, электрических калориферов
          и отопительных агрегатов, воздухонагревательных установок.
        </ProductParagraph>
        <ProductParagraph>
          За годы производственной деятельности налажено деловое сотрудничество
          и установлены прочные торгово-экономические связи с предприятиями
          металлургической, горнодобывающей, химической,
          топливно-энергетической, авиационной, машиностроительной
          промышленности, фабриками и хозяйствами агропромышленного комплекса.
        </ProductParagraph>
        <ProductParagraph>
          Широкий модельный ряд калориферов производства ЗАО «Т.С.Т.», только в
          стандартном исполнении насчитывающий 440 типоразмеров, позволяет
          решить вопрос с быстрым и качественным обогревом промышленных
          комплексов любой площади, поспособствует выполнению задач, связанных с
          созданием технологического тепла для производственных процессов.
        </ProductParagraph>
        <ProductParagraph>
          Серийно изготавливаются воздухонагреватели с увеличенным диаметром
          несущих трубок, а также воздушно-отопительные агрегаты на базе таких
          теплообменников. Данное оборудование находит применение на рудных и
          угольных шахтах Заполярья, Дальнего Востока, Урала и Сибири, где их
          эксплуатация происходит в условиях низких температурных режимов.
        </ProductParagraph>
        <ProductParagraph>
          Технический отдел предприятия принимает заказы на изготовление
          калориферов нестандартных габаритных размеров по опросному листу. С
          помощью онлайн-калькулятора можно произвести быстрый подбор приточных
          водяных и паровых моделей, получить данные для выбора сопутствующего
          вентиляционного, насосно-смесительного оборудования и
          пароконденсатного оборудования.
        </ProductParagraph>
      </section>

      <div className="flex flex-col items-center gap-8">
        <h2 className="text-center text-2xl font-bold uppercase">
          Цена/прайс-лист калориферов
        </h2>
        <div className="w-full max-w-6xl">
          <Heading
            lvl={2}
            text="Приточные калориферы - водяные КПВС и паровые КППС"
          />
          <table className="mb-6 w-full">
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
              tableURL="/catalog/ksk"
              tableLinkText="Калориферы КСк"
              catalogURL=""
              catalogLinkText="Калориферы КПСк"
            />
            <TableAndCatalogLinks
              tableURL=""
              tableLinkText="Скачать каталог КСк"
              catalogURL=""
              catalogLinkText="Скачать каталог КПСк"
            />
          </div>
        </div>

        <div className="w-full max-w-6xl">
          <Heading
            lvl={2}
            text="Приточные калориферы - водяные КПВУ и паровые КППУ"
          />
          <table className="mb-6 w-full">
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
              tableURL="/catalog/ksk"
              tableLinkText="Калориферы КСк"
              catalogURL=""
              catalogLinkText="Калориферы КПСк"
            />
            <TableAndCatalogLinks
              tableURL=""
              tableLinkText="Скачать каталог КСк"
              catalogURL=""
              catalogLinkText="Скачать каталог КПСк"
            />
          </div>
        </div>

        <div className="w-full max-w-6xl">
          <Heading lvl={2} text="Калориферы водяные КСк и паровые КПСк" />
          <table className="mb-6 w-full">
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
              catalogURL=""
              catalogLinkText="Калориферы КПСк"
            />
            <TableAndCatalogLinks
              tableURL=""
              tableLinkText="Скачать каталог КСк"
              catalogURL=""
              catalogLinkText="Скачать каталог КПСк"
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Наименование калорифера</th>
              <th>Цена с учетом НДС</th>
              <th>Наименование калорифера</th>
              <th>Цена с учетом НДС</th>
            </tr>
          </thead>
          <tbody>
            {tvv3.map((p, i) => (
              <tr key={p.id}>
                <td>ТВВ КП 3{p.size < 10 ? "0" + p.size : p.size}</td>
                <td>{p.price}</td>
                <td>ТВВ КП 4{p.size < 10 ? "0" + p.size : p.size}</td>
                <td>{tvv4[i].price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Наименование агрегата</th>
              <th>Цена с учетом НДС</th>
              <th>Наименование агрегата</th>
              <th>Цена с учетом НДС</th>
            </tr>
          </thead>
          <tbody>
            {kfb3.map((p, i) => (
              <tr key={p.id}>
                <td>{p.shortName}</td>
                <td>{p.price}</td>
                <td>{kfb4[i].shortName}</td>
                <td>{kfb4[i].price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table>
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

        <table>
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

        <table>
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

        <div className="flex items-start gap-6">
          <table>
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
          <table>
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
          <table>
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
          <table>
            <thead>
              <th>Наименование агрегата</th>
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
    </div>
  );
}
