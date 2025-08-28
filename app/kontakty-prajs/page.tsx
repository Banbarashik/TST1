import { productData } from "@/data/products";
import { sortProducts } from "@/lib/utils";

export default function ContactsAndPricesPage() {
  const sortedProducts = productData.sort((a, b) =>
    sortProducts(a.name, b.name),
  );

  const tvv = sortedProducts.filter((p) => p.categories.includes("tvv"));
  const tvv3 = tvv.filter((p) => p.rows === 3);
  const tvv4 = tvv.filter((p) => p.rows === 4);

  const ksk = sortedProducts.filter((p) => p.categories.includes("ksk"));
  const ksk2 = ksk.filter((p) => p.rows === 2);
  const ksk3 = ksk.filter((p) => p.rows === 3);
  const ksk4 = ksk.filter((p) => p.rows === 4);

  const elektro = sortedProducts.filter((p) =>
    p.categories.includes("energonagrevatelynoe-oborudovanie"),
  );
  const sfo = elektro.filter((p) => p.categories.includes("sfo"));
  const sfotc = elektro.filter((p) => p.categories.includes("sfotc"));
  const shuk = elektro.filter((p) => p.categories.includes("shuk"));

  const avo = sortedProducts.filter((p) => p.categories.includes("avo"));
  const avoTvv = avo.find((p) => p.categories.includes("avo-tvv"));
  const avoKp = avo.find((p) => p.categories.includes("avo-kp"));
  const avoTvvVariants = avoTvv.variants.map((p) => ({ ...p, id: avoTvv.id }));
  const avoKpVariants = avoKp.variants.map((p) => ({ ...p, id: avoKp.id }));

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Наименование агрегата</td>
            <td>Цена с учетом НДС</td>
            <td>Наименование агрегата</td>
            <td>Цена с учетом НДС</td>
            <td>Наименование агрегата</td>
            <td>Цена с учетом НДС</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {avoTvvVariants.map((p, i) => (
              <>
                <td>{p.shortName} (ТВВ4 КП4)</td>
                <td>{p.price}</td>
              </>
            ))}
          </tr>
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
            <tr>
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
            <tr>
              <td>{p.shortName}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Наименование электрокалорифера</th>
            <th>Цена с учетом НДС</th>
          </tr>
        </thead>
        <tbody>
          {sfo.map((p) => (
            <tr>
              <td>{p.shortName}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <tr>
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
            <th>Наименование калорифера</th>
            <th>Цена с учетом НДС</th>
            <th>Наименование калорифера</th>
            <th>Цена с учетом НДС</th>
            <th>Наименование калорифера</th>
            <th>Цена с учетом НДС</th>
          </tr>
        </thead>
        <tbody>
          {ksk2.map((p, i) => (
            <tr>
              <td>КСк КПСк 2-{p.size}</td>
              <td>{p.price}</td>
              <td>КСк КПСк 3-{ksk3[i].size}</td>
              <td>{ksk3[i].price}</td>
              <td>КСк КПСк 4-{ksk4[i].size}</td>
              <td>{ksk4[i].price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
