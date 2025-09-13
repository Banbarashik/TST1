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
          <div className="text-primary-darker mt-3 space-y-0.5 font-semibold">
            <p>Предприятие ООО Т.С.Т.</p>
            <p>Отопительное оборудование</p>
          </div>
        </Link>
      )}
      {place === "footer" && (
        <Link
          href="/"
          className="flex shrink-0 items-center justify-start gap-3 opacity-90 sm:size-12 2xl:size-15"
        >
          <Image
            src="/img/logo_footer.png"
            alt="Логотип ООО 'ТСТ'"
            width={58}
            height={58}
          />
        </Link>
      )}
    </>
  );
}
