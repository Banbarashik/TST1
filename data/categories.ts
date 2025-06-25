export const categoryTree = [
  {
    title: "Водяные калориферы",
    menuTitle: "Водяные калориферы",
    slug: "vodiany-kalorifery",
    children: [
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
        menuTitle: "Калориферы ТВВ",
        slug: "tvv",
        children: [
          { menuTitle: "Трехрядные", slug: "tvv-3" },
          { menuTitle: "Четырехрядные", slug: "tvv-4" },
        ],
      },
    ],
  },
  {
    menuTitle: "Паровые калориферы",
    slug: "parovy-kalorifery",
    children: [
      {
        menuTitle: "Калориферы КПСк",
        slug: "kpsk",
        children: [
          { menuTitle: "Двухрядные", slug: "kpsk-2" },
          { menuTitle: "Трехрядные", slug: "kpsk-3" },
          { menuTitle: "Четырехрядные", slug: "kpsk-4" },
        ],
      },
    ],
  },
];
