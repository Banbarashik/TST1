import Heading from "@/components/general_pages/heading";
import ProductParagraph from "@/components/catalog/productParagraph";
import ProductLink from "@/components/general_pages/productLink";

export default function SpecsSection({ products, children }) {
  const { series, rows } = products[0];

  return (
    <section>
      <Heading
        lvl={3}
        text={`Технические характеристики калориферов ${series} ${rows}`}
      />
      <ProductParagraph>{children}</ProductParagraph>
      <ul className="flex flex-wrap gap-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductLink
              id={p.id}
              name={p.name}
              airPower={p.airPower}
              heatPower={p.heatPower}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
