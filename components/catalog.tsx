import Link from "next/link";
import Image from "next/image";
//
const productCategories = [
  {
    name: "Водяные и паровые приточные калориферы. Онлайн калькулятор подбора",
    description:
      "Водяное и паровое воздушное отопление выступает как система отопления промышленных зданий нагретым воздухом: приточным, рециркуляционным или смешанным. В первом случае, отопление осуществляется в комбинации с общеобменной вентиляцией. В качестве нагревательных приборов выступают приточные водовоздушные и паровоздушные калориферы.",
    items: [
      {
        name: "Водяные калориферы КПВС и КПВУ",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kpvs-kpvu.png",
      },
      {
        name: "Паровые калориферы КППС и КППУ",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kpps-kppu.png",
      },
    ],
  },
  {
    name: "Калориферы и отопительные агрегаты воздушного отопления",
    description:
      "Рециркуляционный нагрев агрегатами воздушного отопления применяется при отсутствии приточной вентиляции либо незначительном объеме подаваемого в производственные цеха воздуха. Смешанная система представляет собой нагрев калориферами наружного и подмешиваемого к нему внутреннего воздуха - так называемая частичная рециркуляция.",
    items: [
      {
        name: "Калориферы КСК",
        url: "",
        img: "/img/home/zao_tst_kalorifery_ksk.png",
      },
      {
        name: "Калориферы КПСК",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kpsk.png",
      },
      {
        name: "Агрегаты АО2",
        url: "",
        img: "/img/home/zao_tst_agregaty_ao2.png",
      },
      {
        name: "Агрегаты СТД-300",
        url: "",
        img: "/img/home/zao_tst_agregaty_std-300.png",
      },
    ],
  },
  {
    name: "Воздухонагреватели для низких температурных режимов",
    description:
      "Производство сопутствующего воздушно-отопительного оборудования, в том числе для эксплуатации в условиях крайне низких температур – основное направление деятельности предприятия ООО Т.С.Т. с 2001 года. Помимо воздушного отопления производственных и иных помещений теплообменное оборудование нашего предприятия применяется с целью обеспечения технологических процессов в различных отраслях промышленности.",
    items: [
      {
        name: "Калориферы ТВВ",
        url: "",
        img: "/img/home/zao_tst_kalorifery_tvv.png",
      },
      {
        name: "Калориферы КП",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kp.png",
      },
      {
        name: "Агрегаты АВО ХЛ",
        url: "",
        img: "/img/home/zao_tst_agregaty_avo.png",
      },
      {
        name: "Агрегаты СТД-300 ХЛ",
        url: "",
        img: "/img/home/zao_tst_agregaty_std-300-hl.png",
      },
    ],
  },
  {
    name: "Калориферы для комплектации воздухонагревательных секций",
    description:
      "Компонуемые в блоки водяные и паровые воздухонагреватели используются для подогрева воздуха - идущего на сушку и вентилирование сельскохозяйственных материалов, обработку древесины, проветривания горных выработок, создания и поддержания температурного режима покрасочных камер. На страницах сайта мы постарались предоставить наиболее полную информацию по всему спектру выпускаемой продукции, включая теплотехнические характеристики, расчет и подбор, рабочие параметры эксплуатации.",
    items: [
      {
        name: "Калориферы КФБ-А ХЛ водяные",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kfb-m.png",
      },
      {
        name: "Калориферы КФБ-А ХЛ паровые",
        url: "",
        img: "/img/home/zao_tst_kalorifery_kfb-p.png",
      },
    ],
  },
  {
    name: "Электронагревательное оборудование воздушного отопления",
    description:
      "Электрическое воздушное отопление целесообразно в помещениях, где нет подведенной тепловой сети и ее монтаж не представляется возможным. Электровоздушные установки и калориферы достаточно автономны в работе и для их подключения не требуется развернутых коммуникаций.",
    items: [
      {
        name: "Установки СФОЦ",
        url: "",
        img: "/img/home/zao_tst_ustanovki_sfotc.png",
      },
      {
        name: "Калориферы СФО",
        url: "",
        img: "/img/home/zao_tst_elektrokalorifery_sfo.png",
      },
      {
        name: "Шкафы управления",
        url: "",
        img: "/img/home/zao_tst_shkafy_shuk.png",
      },
      {
        name: "ТЭНы оребренные",
        url: "",
        img: "/img/home/zao_tst_teny.png",
      },
    ],
  },
];

export default function Catalog() {
  return (
    <ul className="flex flex-col items-center gap-10">
      {productCategories.map(function (category) {
        return (
          <li key={category.name} className="flex w-full flex-col">
            <h2 className="text-2xl font-bold uppercase">{category.name}</h2>
            <ul className="mt-6 mb-6 flex gap-12">
              {category.items.map(function (product) {
                return (
                  <li key={product.name} className="w-full">
                    <Link
                      href={product.url}
                      className="hover:text-primary bg-card text-card-foreground flex flex-col items-center gap-4 rounded-xl border px-10 pt-5 pb-5 shadow-sm"
                    >
                      <Image
                        src={product.img}
                        alt={product.name}
                        width={750}
                        height={750}
                      />
                      <p className="font-bold tracking-wide uppercase">
                        {product.name}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p>{category.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
