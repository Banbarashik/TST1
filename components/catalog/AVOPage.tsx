import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";
import SimilarProductLink from "./similarProductLink";

export default function AVOPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);
  const name = `Воздушно-отопительный агрегат ${product.shortName} ${heatCarrierAdj.nom} ТУ 4864-003-55613706-02`;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      <div className="mb-12 grid grid-cols-3 gap-5">
        {product.variants.map(function (variant) {
          return (
            <ProductCard
              key={variant.id}
              isLink={false}
              product={{
                ...variant,
                airPower: variant.airPower,
                img: product.img,
              }}
            />
          );
        })}
      </div>
      <div className="flex">
        <div>
          <ProductSubheader text={name} />
          <ProductParagraph>
            Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
            {product.calorifier}:
          </ProductParagraph>
          <ul className="mb-4 text-lg">
            <li>
              - электросварные прямошовные трубки {product.tubeSize} мм по ГОСТ
              10704-91
            </li>
            <li>
              - цельнотянутые бесшовные трубки {product.tubeSize} мм по ГОСТ
              8734-75 с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением
            </li>
          </ul>
        </div>
        <div>
          {product.relatedProducts.map(function (p) {
            return (
              <div key={p.caption} className="mb-4 flex flex-col gap-1">
                <ProductParagraph className="font-bold">
                  {p.caption}
                </ProductParagraph>
                <ul className="flex flex-wrap gap-2">
                  {p.links.map((link) => (
                    <li key={link.slug}>
                      <SimilarProductLink id={link.slug}>
                        {link.text}
                      </SimilarProductLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
