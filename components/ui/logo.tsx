import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-start gap-3">
      <Image
        src="/img/logo.png"
        alt="Логотип ООО 'ТСТ'"
        width={68}
        height={0}
      />
      <div className="text-primary-darker space-y-0.5 font-semibold">
        <p>Предприятие ООО Т.С.Т.</p>
        <p className="text-sm opacity-86">
          Производство отопительного оборудования
        </p>
      </div>
    </div>
  );
}
