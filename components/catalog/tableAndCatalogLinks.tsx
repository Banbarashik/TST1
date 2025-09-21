// TODO rework the component

import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export default function TableAndCatalogLinks({
  tableURL,
  tableLinkText,
  tableLinkOpenNewTab = false,
  catalogURL,
  catalogLinkText = "Скачать каталог PDF",
  catalogOpenNewTab = true,
  buttonClassName,
}: {
  tableURL: string;
  tableLinkText: string;
  tableLinkOpenNewTab?: boolean;
  catalogURL?: string;
  catalogLinkText?: string;
  catalogOpenNewTab?: boolean;
  buttonClassName?: string;
}) {
  return (
    <div className="mx-auto flex w-full flex-col gap-6 sm:max-w-fit xl:max-w-none xl:flex-row">
      <Button
        asChild
        className={cn(
          "text-md h-full flex-1/2 bg-gray-300 font-semibold text-black",
          buttonClassName,
        )}
      >
        <Link
          href={tableURL}
          target={tableLinkOpenNewTab ? "_blank" : "_self"}
          className="text-center"
          style={{ textWrap: "wrap" }}
        >
          {tableLinkText}
        </Link>
      </Button>
      {catalogURL && (
        <Button
          asChild
          className={cn(
            "text-md h-full flex-1/2 bg-gray-300 font-semibold text-black",
            buttonClassName,
          )}
        >
          <Link
            href={catalogURL}
            target={catalogOpenNewTab ? "_blank" : "_self"}
            className="text-center"
            style={{ textWrap: "wrap" }}
          >
            {catalogLinkText}
          </Link>
        </Button>
      )}
    </div>
  );
}
