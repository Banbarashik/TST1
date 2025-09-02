import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-start gap-3">
      <Image
        src="/img/logo.png"
        alt="Логотип ООО 'ТСТ'"
        width={70}
        height={0}
      />
      <div className="font-semibold text-[#5e2129]">
        <p>Предприятие ООО Т.С.Т.</p>
        <p>Производство отопительного оборудования</p>
      </div>
    </div>
  );
}
