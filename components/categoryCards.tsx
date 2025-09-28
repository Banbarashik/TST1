import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function CategoryCards({
  categories,
  containerGap = "gap-x-2 gap-y-4",
  cardClassName = "",
}) {
  return (
    <ul
      className={`grid sm:grid-cols-[repeat(auto-fit,minmax(0,max-content))] ${containerGap}`}
    >
      {categories.map((cat) => (
        <CategoryCard key={cat.name} category={cat} className={cardClassName} />
      ))}
    </ul>
  );
}

function CategoryCard({ category, className }) {
  return (
    <li>
      <Link
        href={category.url}
        className={cn(
          "hover:text-primary bg-card text-card-foreground flex h-full flex-col items-center justify-between gap-4 rounded-xl border px-2 pt-5 pb-5 text-center shadow-sm sm:text-[13px] md:px-4 md:text-center md:text-[13px] lg:px-4 lg:text-sm xl:px-10 2xl:text-base",
          className,
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
