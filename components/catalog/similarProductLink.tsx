import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SimilarProductLink({
  id,
  isActive = false,
  children,
}: {
  id: string;
  isActive?: Boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      className={isActive && "bg-accent-background"}
      variant="outline"
      asChild
    >
      <Link href={`/${id}`}>{children}</Link>
    </Button>
  );
}
