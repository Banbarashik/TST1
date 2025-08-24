import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProductLinks({ products }) {
  return (
    <ul className="mb-6 grid grid-cols-5 gap-x-5 gap-y-6">
      {products.map((p) => (
        <li key={p.id}>
          <ProductLink product={p} />
        </li>
      ))}
    </ul>
  );
}

function ProductLink({ product }) {
  const { id, name, airPower, heatPower } = product;

  return (
    <Button
      className="flex flex-col items-center bg-[#e5eaeb]"
      variant="outline"
      size="content"
      asChild
    >
      <Link href={id}>
        <div className="flex flex-col items-center gap-0.5">
          <span>{name}</span>
          <span className="text-sm">
            {airPower} м<sup>3</sup>/ч{heatPower ? `; ${heatPower} кВт` : ""}
          </span>
        </div>
      </Link>
    </Button>
  );
}
