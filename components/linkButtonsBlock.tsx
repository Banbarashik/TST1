import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export default function LinkButtonsBlock({ buttons }) {
  const buttonsAmount = buttons.length;

  return (
    <div
      className={cn("flex flex-col gap-2", {
        "@2xl:flex-row": buttonsAmount === 2,
        "@3xl:flex-row": buttonsAmount === 3,
      })}
    >
      {buttons.map((btn) => (
        <Button
          key={btn.name}
          asChild
          className="shrink-1 basis-full rounded-none border border-[#723910] bg-gray-200 text-black uppercase"
        >
          <Link href={btn.url} target={btn.openNewTab ? "_blank" : "_self"}>
            {btn.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}
