import type { Category } from "@/types";

export const categoryTree: Category[] = [
  {
    title: "Водяные калориферы",
    menuTitle: "Водяные калориферы",
    slug: "vodiany-kalorifery",
    children: [
      {
        title: "Приточные водяные калориферы",
        menuTitle: "Приточные водяные калориферы",
        slug: "pritochny-vodiany-kalorifery",
        children: [
          {
            title: "Приточные калориферы КПВС",
            menuTitle: "Приточные калориферы КПВС",
            slug: "kpvs",
          },
          {
            title: "Приточные калориферы КПВУ",
            menuTitle: "Приточные калориферы КПВУ",
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
            menuTitle: "Двухрядные",
            slug: "ksk-2",
          },
          {
            title: "Трехрядные калориферы КСк",
            menuTitle: "Трехрядные",
            slug: "ksk-3",
          },
          {
            title: "Четырехрядные калориферы КСк",
            menuTitle: "Четырехрядные",
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
            menuTitle: "Трехрядные",
            slug: "tvv-3",
          },
          {
            title: "Четырехрядные калориферы ТВВ",
            menuTitle: "Четырехрядные",
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
            menuTitle: "Трехрядные",
            slug: "kfb-a3-m",
          },
          {
            title: "Четырехрядные калориферы КФБ-А М",
            menuTitle: "Четырехрядные",
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
        menuTitle: "Приточные паровые калориферы",
        slug: "pritochny-parovy-kalorifery",
        children: [
          {
            title: "Приточные калориферы КППУ",
            menuTitle: "Приточные калориферы КППУ",
            slug: "kppu",
          },
          {
            title: "Приточные калориферы КППС",
            menuTitle: "Приточные калориферы КППС",
            slug: "kpps",
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
            menuTitle: "Двухрядные",
            slug: "kpsk-2",
          },
          {
            title: "Трехрядные калориферы КПСк",
            menuTitle: "Трехрядные",
            slug: "kpsk-3",
          },
          {
            title: "Четырехрядные калориферы КПСк",
            menuTitle: "Четырехрядные",
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
            menuTitle: "Трехрядные",
            slug: "kp-3",
          },
          {
            title: "Четырехрядные калориферы КП",
            menuTitle: "Четырехрядные",
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
            menuTitle: "Трехрядные",
            slug: "kfb-a3-p",
          },
          {
            title: "Четырехрядные калориферы КФБ-А",
            menuTitle: "Четырехрядные",
            slug: "kfb-a4-p",
          },
        ],
      },
    ],
  },
  {
    title: "Воздушно-отопительные агрегаты",
    menuTitle: "Воздушно-отопительные агрегаты",
    slug: "agregaty",
    children: [
      {
        title: "Водяные отопительные агрегаты",
        menuTitle: "Водяные отопительные агрегаты",
        slug: "vodiany-agregaty",
        children: [
          {
            title: "Агрегаты отопительные АО2",
            menuTitle: "АО2",
            slug: "ao2-v",
          },
          {
            title: "Агрегаты отопительные АВО ХЛ",
            menuTitle: "АВО ХЛ",
            slug: "avo-tvv",
          },
          {
            title: "Агрегаты отопительные СТД-300 ХЛ",
            menuTitle: "СТД-300 ХЛ",
            slug: "std300-v",
          },
        ],
      },
      {
        title: "Паровые отопительные агрегаты",
        menuTitle: "Паровые отопительные агрегаты",
        slug: "parovy-agregaty",
        children: [
          {
            title: "Агрегаты отопительные АО2",
            menuTitle: "АО2",
            slug: "ao2-p",
          },
          {
            title: "Агрегаты отопительные АВО ХЛ",
            menuTitle: "АВО ХЛ",
            slug: "avo-kp",
          },
          {
            title: "Агрегаты отопительные СТД-300 ХЛ",
            menuTitle: "СТД-300 ХЛ",
            slug: "std300-p",
          },
        ],
      },
    ],
  },
];
