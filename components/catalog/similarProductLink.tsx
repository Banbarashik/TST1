import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function SimilarProductLink({
  id,
  isActive = false,
  fullWidth = true,
  children,
}: {
  id: string;
  isActive?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      asChild
      className={`${isActive ? "outline-primary" : ""} ${fullWidth ? "w-full" : ""}`}
    >
      <Link href={`/${id}`}>{children}</Link>
    </Button>
  );
}
