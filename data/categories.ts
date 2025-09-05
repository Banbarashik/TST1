import type { Category } from "@/types";

export const categoryTree: Category[] = [
  {
    title: "Водяные калориферы",
    menuTitle: "Водяные калориферы",
    slug: "vodiany-kalorifery",
    children: [
      {
        title: "Приточные водяные калориферы",
        menuTitle: "Приточные калориферы",
        slug: "pritochny-vodiany-kalorifery",
        children: [
          {
            title: "Приточные калориферы КПВС",
            menuTitle: "Калориферы КПВС",
            slug: "kpvs",
          },
          {
            title: "Приточные калориферы КПВУ",
            menuTitle: "Калориферы КПВУ",
            slug: "kpvu",
          },
        ],
      },
      {
        title: "Калориферы КСк",
        menuTitle: "Калориферы КСк",
        slug: "ksk",
        children: [
          {
            title: "Двухрядные калориферы КСк",
            menuTitle: "Двухрядные КСк2",
            slug: "ksk-2",
          },
          {
            title: "Трехрядные калориферы КСк",
            menuTitle: "Трехрядные КСк3",
            slug: "ksk-3",
          },
          {
            title: "Четырехрядные калориферы КСк",
            menuTitle: "Четырехрядные КСк4",
            slug: "ksk-4",
          },
        ],
      },
      {
        title: "Калориферы ТВВ",
        menuTitle: "Калориферы ТВВ",
        slug: "tvv",
        children: [
          {
            title: "Трехрядные калориферы ТВВ",
            menuTitle: "Трехрядные ТВВ3",
            slug: "tvv-3",
          },
          {
            title: "Четырехрядные калориферы ТВВ",
            menuTitle: "Четырехрядные ТВВ4",
            slug: "tvv-4",
          },
        ],
      },
      {
        title: "Калориферы КФБ-А М",
        menuTitle: "Калориферы КФБ-А М",
        slug: "kfb-a-m",
        children: [
          {
            title: "Трехрядные калориферы КФБ-А М",
            menuTitle: "Трехрядные КФБ-А3",
            slug: "kfb-a3-m",
          },
          {
            title: "Четырехрядные калориферы КФБ-А М",
            menuTitle: "Четырехрядные КФБ-А4",
            slug: "kfb-a4-m",
          },
        ],
      },
    ],
  },
  {
    title: "Паровые калориферы",
    menuTitle: "Паровые калориферы",
    slug: "parovy-kalorifery",
    children: [
      {
        title: "Приточные паровые калориферы",
        menuTitle: "Приточные калориферы",
        slug: "pritochny-parovy-kalorifery",
        children: [
          {
            title: "Приточные калориферы КППС",
            menuTitle: "Калориферы КППС",
            slug: "kpps",
          },
          {
            title: "Приточные калориферы КППУ",
            menuTitle: "Калориферы КППУ",
            slug: "kppu",
          },
        ],
      },
      {
        title: "Калориферы КПСк",
        menuTitle: "Калориферы КПСк",
        slug: "kpsk",
        children: [
          {
            title: "Двухрядные калориферы КПСк",
            menuTitle: "Двухрядные КПСк2",
            slug: "kpsk-2",
          },
          {
            title: "Трехрядные калориферы КПСк",
            menuTitle: "Трехрядные КПСк3",
            slug: "kpsk-3",
          },
          {
            title: "Четырехрядные калориферы КПСк",
            menuTitle: "Четырехрядные КПСк4",
            slug: "kpsk-4",
          },
        ],
      },
      {
        title: "Калориферы КП",
        menuTitle: "Калориферы КП",
        slug: "kp",
        children: [
          {
            title: "Трехрядные калориферы КП",
            menuTitle: "Трехрядные КП3",
            slug: "kp-3",
          },
          {
            title: "Четырехрядные калориферы КП",
            menuTitle: "Четырехрядные КП4",
            slug: "kp-4",
          },
        ],
      },
      {
        title: "Калориферы КФБ-А П",
        menuTitle: "Калориферы КФБ-А П",
        slug: "kfb-a-p",
        children: [
          {
            title: "Трехрядные калориферы КФБ-А",
            menuTitle: "Трехрядные КФБ-А3",
            slug: "kfb-a3-p",
          },
          {
            title: "Четырехрядные калориферы КФБ-А",
            menuTitle: "Четырехрядные КФБ-А4",
            slug: "kfb-a4-p",
          },
        ],
      },
    ],
  },
  {
    title: "Воздушно-отопительные агрегаты",
    menuTitle: "Отопительные агрегаты",
    slug: "agregaty",
    children: [
      {
        title: "Водяные отопительные агрегаты",
        menuTitle: "Водяные агрегаты",
        slug: "vodiany-agregaty",
        children: [
          {
            title: "Агрегаты отопительные АО2",
            menuTitle: "Агрегаты АО2",
            slug: "ao2-v",
          },
          {
            title: "Агрегаты отопительные АВО ХЛ",
            menuTitle: "Агрегаты АВО ХЛ",
            slug: "avo-tvv",
          },
          {
            title: "Агрегаты отопительные СТД-300 ХЛ",
            menuTitle: "Агрегаты СТД-300 ХЛ",
            slug: "std300-v",
          },
        ],
      },
      {
        title: "Паровые отопительные агрегаты",
        menuTitle: "Паровые агрегаты",
        slug: "parovy-agregaty",
        children: [
          {
            title: "Агрегаты отопительные АО2",
            menuTitle: "Агрегаты АО2",
            slug: "ao2-p",
          },
          {
            title: "Агрегаты отопительные АВО ХЛ",
            menuTitle: "Агрегаты АВО ХЛ",
            slug: "avo-kp",
          },
          {
            title: "Агрегаты отопительные СТД-300 ХЛ",
            menuTitle: "Агрегаты СТД-300 ХЛ",
            slug: "std300-p",
          },
        ],
      },
    ],
  },
  {
    title: "Электронагревательное оборудование",
    menuTitle: "Электронагреватели",
    slug: "energonagrevatelynoe-oborudovanie",
    children: [
      {
        title: "Электрокалориферы СФО",
        menuTitle: "Калориферы СФО",
        slug: "sfo",
      },
      {
        title: "Электрокалориферные установки СФОЦ",
        menuTitle: "Установки СФОЦ",
        slug: "sfotc",
      },
      {
        title: "Шкафы управления калориферами ШУК",
        menuTitle: "Шкафы управления ШУК",
        slug: "shuk",
      },
      {
        title: "ТЭНы оребренные",
        menuTitle: "ТЭНы оребренные",
        slug: "teny",
      },
    ],
  },
];
