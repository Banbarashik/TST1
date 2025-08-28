import { productData } from "@/data/products";
import { sortProducts } from "@/lib/utils";

export default function ContactsAndPricesPage() {
  const sortedProducts = productData.sort((a, b) =>
    sortProducts(a.name, b.name),
  );

  const tvv = sortedProducts.filter((p) => p.categories.includes("tvv"));
  const tvv3 = tvv.filter((p) => p.rows === 3);
  const tvv4 = tvv.filter((p) => p.rows === 4);

  return (
    <>
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
              <td>ТВВ КП 4{p.size}</td>
              <td>{tvv4[i].price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
