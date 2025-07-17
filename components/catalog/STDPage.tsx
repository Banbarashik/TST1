import ProductCard from "./productCard";

export default function STDPage({ product }) {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold uppercase">{product.name}</h1>
      {product.variants.map(function (variant) {
        return (
          <div key={variant.id} className="mb-6 flex items-start gap-4">
            <ProductCard
              product={{
                ...variant,
                img: product.img,
                name: `Воздушно-отопительный агрегат ${variant.model}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
