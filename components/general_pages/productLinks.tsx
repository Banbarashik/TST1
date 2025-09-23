import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export default function ProductLinks({
  products,
  gridTemplateCols,
  className,
}: {
  gridTemplateCols: string;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-5 gap-y-6 lg:gap-x-3 xl:gap-x-5",
        gridTemplateCols,
        className,
      )}
    >
      {products.map((p) => (
        //TODO temporary fix, think of how to use 'id' in case one of product variants has been passed
        <li key={p.name}>
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
          <span className="text-xs sm:text-sm">{name}</span>
          <span className="text-sm">
            {airPower} м<sup>3</sup>/ч{heatPower ? `; ${heatPower} кВт` : ""}
          </span>
        </div>
      </Link>
    </Button>
  );
}
