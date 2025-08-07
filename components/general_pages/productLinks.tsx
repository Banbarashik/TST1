import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProductLinks({ products }) {
  return (
    <ul className="flex flex-wrap gap-4">
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
        <span>{name}</span>
        <span>
          {airPower} м<sup>3</sup>/ч{heatPower ? `; ${heatPower} кВт` : ""}
        </span>
      </Link>
    </Button>
  );
}
