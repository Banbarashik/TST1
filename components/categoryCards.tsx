import Image from "next/image";
import Link from "next/link";

export default function CategoryCards({ categories }) {
  return (
    <ul className="mt-6 mb-6 flex flex-wrap gap-2 sm:flex-nowrap sm:gap-2 md:gap-4 lg:gap-10 xl:gap-12">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.name}
          category={cat}
          className={`${categories.length === 2 ? "w-full" : "w-[48%]"} sm:w-full`}
        />
      ))}
    </ul>
  );
}

function CategoryCard({ category, className }) {
  return (
    <li className={className}>
      <Link
        href={category.url}
        className="hover:text-primary bg-card text-card-foreground flex h-full flex-col items-center gap-4 rounded-xl border px-2 pt-5 pb-5 text-center shadow-sm sm:text-[13px] md:px-4 md:text-center md:text-[13px] lg:h-auto lg:px-4 lg:text-sm xl:px-10 2xl:text-base"
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
