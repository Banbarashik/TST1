import { getHeatCarrierAdj } from "@/lib/heatCarrierAdj";
import ProductCard from "./productCard";

export default function AVOPage({ product }) {
  const heatCarrierAdj = getHeatCarrierAdj(product.heatCarrier);

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
    </div>
  );
}
