import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export default function TableAndCatalogLinks({
  tableURL,
  tableLinkText,
  catalogURL,
  catalogLinkText = "Скачать каталог PDF",
  className,
}: {
  tableURL: string;
  tableLinkText: string;
  catalogURL?: string;
  catalogLinkText?: string;
  className?: string;
} & React.ComponentProps<"a">) {
  return (
    <div className="flex h-12 w-full gap-6">
      <Button
        className={cn(
          "text-md h-full flex-1/2 bg-gray-300 font-semibold text-black",
          className,
        )}
      >
        <Link href={tableURL}>{tableLinkText}</Link>
      </Button>
      {catalogURL && (
        <Button
          className={cn(
            "text-md h-full flex-1/2 bg-gray-300 font-semibold text-black",
            className,
          )}
        >
          <Link href={catalogURL} target="_blank">
            {catalogLinkText}
          </Link>
        </Button>
      )}
    </div>
  );
}
