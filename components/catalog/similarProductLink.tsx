import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SimilarProductLink({
  id,
  isActive = false,
  children,
}: {
  id: string;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      asChild
      className={isActive ? "outline-primary" : ""}
    >
      <Link href={`/${id}`}>{children}</Link>
    </Button>
  );
}
