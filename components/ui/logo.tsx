import Link from "next/link";
import Image from "next/image";

export default function Logo({ place }: { place: "header" | "footer" }) {
  return (
    <>
      {place === "header" && (
        <Link
          href="/"
          className="flex shrink-0 items-center justify-start gap-3"
        >
          <Image
            src="/img/logo_header.png"
            alt="Логотип ООО 'ТСТ'"
            width={68}
            height={68}
          />
          <div className="text-primary-darker 3xl:block mt-3 hidden space-y-0.5 font-serif font-semibold md:block lg:hidden">
            <p className="text-[17px]">Предприятие ООО Т.С.Т.</p>
            <p className="">Отопительное оборудование</p>
          </div>
        </Link>
      )}
      {place === "footer" && (
        <Link
          href="/"
          className="relative flex size-16 shrink-0 items-center justify-start gap-3 opacity-90"
        >
          <Image src="/img/logo_footer.png" alt="Логотип ООО 'ТСТ'" fill />
        </Link>
      )}
    </>
  );
}
