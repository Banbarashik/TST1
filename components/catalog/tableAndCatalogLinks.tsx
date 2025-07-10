import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TableAndCatalogLinks({
  tableURL,
  tableLinkText,
  catalogURL,
}: {
  tableURL: string;
  tableLinkText: string;
  catalogURL: string;
}) {
  return (
    <div className="flex h-12 w-full gap-6">
      <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
        <Link href={tableURL}>{tableLinkText}</Link>
      </Button>
      <Button className="text-md h-full flex-1/2 bg-gray-300 font-semibold text-black">
        <Link href={catalogURL}>Скачать каталог PDF</Link>
      </Button>
    </div>
  );
}
