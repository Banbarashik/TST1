import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ProductLink({ id, name, airPower, heatPower }) {
  return (
    <Button
      className="bg-accent-background flex flex-col items-center"
      variant="outline"
      size="content"
      asChild
    >
      <Link href={id}>
        <span>{name}</span>
        <span>
          {airPower} м<sup>3</sup>/ч; {heatPower} кВт
        </span>
      </Link>
    </Button>
  );
}
