import ProductCard from "./productCard";
import ProductSubheader from "./productSubheader";

export default function STDPage({ product }) {
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
