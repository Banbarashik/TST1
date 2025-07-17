import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";
import ProductParagraph from "./productParagraph";

export default function STDPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants.map(function (variant) {
        const name = `Воздушно-отопительный агрегат ${variant.model}`;

        return (
          <div key={variant.id} className="mb-6 flex items-start gap-4">
            <ProductCard product={{ ...variant, img: product.img, name }} />
            <div>
              <ProductSubheader text={name} />
              <ProductParagraph>
                Теплоотдающие элементы {heatCarrierAdj.gen} калорифера{" "}
                {variant.calorifier}:
              </ProductParagraph>
              <ul className="mb-4 text-lg">
                <li>
                  - электросварные прямошовные трубки {variant.tubeSize} мм по
                  ГОСТ 10704-91
                </li>
                <li>
                  - цельнотянутые бесшовные трубки {variant.tubeSize} мм по ГОСТ
                  8734-75 с алюминиевым (АД1 ТУ 1-8-267-99) накатным оребрением
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
