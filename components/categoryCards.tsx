import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function CategoryCards({
  categories,
  containerGap = "",
  textSize = "",
}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:gap-2 md:gap-4 lg:gap-10 xl:gap-12",
        containerGap,
      )}
    >
      {categories.map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat}
          siblingsAmount={categories.length}
          textSize={textSize}
        />
      ))}
    </ul>
  );
}

function CategoryCard({ category, siblingsAmount, textSize = "" }) {
  return (
    <li className={`sm:w-full ${siblingsAmount === 2 ? "w-full" : "w-[48%]"}`}>
      <Link
        href={category.url}
        className={cn(
          "hover:text-primary bg-card text-card-foreground flex h-full flex-col items-center justify-between gap-4 rounded-xl border px-2 pt-5 pb-5 text-center shadow-sm sm:text-[13px] md:px-4 md:text-center md:text-[13px] lg:px-4 lg:text-sm xl:px-10 2xl:text-base",
          textSize,
        )}
      >
        <Image
          src={category.img}
          alt={category.name}
          width={750}
          height={750}
        />
        <p className="font-bold tracking-wide uppercase">{category.name}</p>
      </Link>
    </li>
  );
}
