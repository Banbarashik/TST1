import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TableAndCatalogLinks({
  tableURL,
  tableLinkText,
  catalogURL,
  catalogLinkText = "Скачать каталог PDF",
  ...props
}: {
  tableURL: string;
  tableLinkText: string;
  catalogURL: string;
  catalogLinkText?: string;
} & React.ComponentProps<"a">) {
  return (
    <div className="flex h-12 w-full gap-6">
      <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
        <Link {...props} href={tableURL}>
          {tableLinkText}
        </Link>
      </Button>
      <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
        <Link {...props} href={catalogURL}>
          {catalogLinkText}
        </Link>
      </Button>
    </div>
  );
}
