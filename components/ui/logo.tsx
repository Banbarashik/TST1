import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-start gap-3">
      <Image
        src="/img/logo15.png"
        alt="Логотип ООО 'ТСТ'"
        width={80}
        height={0}
      />
      <div className="font-semibold text-[#5e2129]">
        <p>ООО ТСТ</p>
        <p>Отопительное оборудование</p>
      </div>
    </div>
  );
}
