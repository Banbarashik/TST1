import productData from "@/data/products.json";

import type { NextConfig } from "next";

const pritochnyeKaloriferyRedirects = productData
  .filter(
    (p) =>
      p.categories.includes("pritochny-vodiany-kalorifery") ||
      p.categories.includes("pritochny-parovy-kalorifery"),
  )
  .map(function (p) {
    let source;

    if (p.categories.includes("kpvs"))
      source = `kalorifer-ksk-${p.size}-${p.size}`;
    if (p.categories.includes("kpvu"))
      source = `kalorifer-tvv-${p.size}-${p.size}`;
    if (p.categories.includes("kpps"))
      source = `kalorifer-kpsk-${p.size}-${p.size}`;
    if (p.categories.includes("kppu"))
      source = `kalorifer-kp-${p.size}-${p.size}`;

    return {
      source: `/${source}`,
      destination: `/${p.id}`,
      permanent: true,
    };
  });

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  async redirects() {
    return [
      ...pritochnyeKaloriferyRedirects,
      {
        source: "/:slug((?!legacy/).+).html", // named param :slug with negative lookahead
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/otopitel'nye-agregaty",
        destination: "/otopitelnye-agregaty",
        permanent: true,
      },
      {
        source: "/raschet-online-vodianyh-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: false,
      },
      {
        source: "/raschet-online-parovyh-kaloriferov",
        destination: "/kalorifery-par",
        permanent: false,
      },
      {
        source: "/raschet-online-elektricheskih-kaloriferov",
        destination: "/elektronagrevateli",
        permanent: false,
      },
      {
        source: "/raschet-podbor-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: false,
      },
      {
        source: "/koefficient-teploperedachi-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: false,
      },
      {
        source: "/gidravlicheskoe-soprotivlenie-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: false,
      },
      {
        source: "/podbor-raschet-kaloriferov",
        destination: "/kalorifery-par",
        permanent: false,
      },
      {
        source: "/koefficient-teploperedachi-parovyh-kaloriferov",
        destination: "/kalorifery-par",
        permanent: false,
      },
      {
        source: "/komplektatciia-kaloriferov",
        destination: "/",
        permanent: false,
      },
      {
        source: "/zamena-kaloriferov",
        destination: "/",
        permanent: false,
      },
      {
        source: "/kalorifery-kfb-kfs",
        destination: "/kalorifery-kfb",
        permanent: false,
      },
      {
        source: "/kalorifery-kms-kmb",
        destination: "/kalorifery-kfb-a",
        permanent: false,
      },
      {
        source: "/files/Agregaty_otopitelnye_AO2_katalog_2020.pdf",
        destination: "/documents/Agregat_AO2_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Agregaty_otopitelnye_AVO_katalog_2020.pdf",
        destination: "/documents/Agregat_AVO-HL_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Agregaty_otopitelnye_STD-300_katalog_2020.pdf",
        destination: "/documents/Agregat_STD-300_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Agregaty_otopitelnye_STD-300-HL_katalog_2020.pdf",
        destination: "/documents/Agregat_STD-300-HL_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Elektrokalorifernye_ustanovki_SFOTC_katalog_2019.pdf",
        destination: "/documents/Electroustanovka_SFOTC_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Elektrokalorifery_SFO_katalog_2019.pdf",
        destination: "/documents/Electrokalorifer_SFO_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_KFB-a_katalog_2020.pdf",
        destination: "/documents/Kalorifer_KFB_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_parovye_KP_katalog_2020.pdf",
        destination: "/documents/Kalorifer_KP_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_parovye_KPSk_katalog_2020.pdf",
        destination: "/documents/Kalorifer_KPSK_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_pritochnye_parovye_katalog_2021.pdf",
        destination: "/documents/Kalorifer_KPPS_KPPU_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_pritochnye_vodianye_katalog_2021.pdf",
        destination: "/documents/Kalorifer_KPVS_KPVU_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_vodianye_KSk_katalog_2020.pdf",
        destination: "/documents/Kalorifer_KSK_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Kalorifery_vodianye_TVV_katalog_2020.pdf",
        destination: "/documents/Kalorifer_TVV_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Shkafy_upravleniia_kaloriferom_SHUK_katalog_2019.pdf",
        destination: "/documents/Electroshkaf_SHUK_katalog_2025.pdf",
        permanent: true,
      },
      {
        source: "/files/Teny_orebrennye_TENR_katalog_2019.pdf",
        destination: "/documents/Electroten_TENR_katalog_2025.pdf",
        permanent: true,
      },
      {
        source:
          "/files/Vozdushno_otopitel-noe_oborudovanie_zao-ooo-tst_prais-list_2020.pdf",
        destination: "/documents/Price_list_zao_tst_2025.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
