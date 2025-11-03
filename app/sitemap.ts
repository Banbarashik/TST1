import { categoryTree } from "@/data/categories";
import productData from "@/data/products.json";

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants";

import { Category, Product } from "@/types";

const pathToImgFolder = `${SITE_URL}/img`;
const pathToImgFolders = {
  hero: `${pathToImgFolder}/hero`,
  home: `${pathToImgFolder}/home`,
  generalPages: `${pathToImgFolder}/general_pages`,
  produkciya: `${pathToImgFolder}/produkciya`,
};

function traverseCategories(
  nodes: Category[],
  depth = 0,
  basePriority = 1.0,
  step = 0.1,
  minPriority = 0.8,
): MetadataRoute.Sitemap {
  const priority = Math.max(
    minPriority,
    +(basePriority - depth * step).toFixed(1),
  );
  const out: MetadataRoute.Sitemap = [];

  for (const node of nodes) {
    out.push({
      url: `${SITE_URL}/catalog/${node.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
    });

    if (node.children?.length) {
      out.push(
        ...traverseCategories(
          node.children,
          depth + 1,
          basePriority,
          step,
          minPriority,
        ),
      );
    }
  }

  return out;
}

function traverseProducts(nodes: Product[]): MetadataRoute.Sitemap {
  return nodes.map(function (node) {
    let priority = 0.8;

    if (
      node.categories.includes("pritochny-vodiany-kalorifery") ||
      node.categories.includes("pritochny-parovy-kalorifery")
    ) {
      priority = 0.9;
    }

    const images = [];

    // TODO bring "scheme" and "drawing" properties to a unified structure
    if (node.img.url) images.push(`${SITE_URL}${node.img.url}`);
    if (node.frontView?.url) images.push(`${SITE_URL}${node.frontView.url}`);
    if (node.parts?.url) images.push(`${SITE_URL}${node.parts.url}`);

    if (node.drawing?.url) images.push(`${SITE_URL}${node.drawing.url}`);
    else if (node.drawing) images.push(`${SITE_URL}${node.drawing}`);

    if (node.scheme?.url) images.push(`${SITE_URL}${node.scheme.url}`);
    else if (node.scheme) images.push(`${SITE_URL}${node.scheme}`);

    return {
      url: `${SITE_URL}/${node.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      images,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const categoriesMap = traverseCategories(categoryTree);
  const productsMap = traverseProducts(productData);

  return [
    ...categoriesMap,
    ...productsMap,
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${pathToImgFolders.hero}/slide1.png`,
        `${pathToImgFolders.hero}/slide2.png`,
        `${pathToImgFolders.hero}/slide3.png`,
        `${pathToImgFolders.home}/contact_form.png`,
        `${pathToImgFolders.home}/zao_tst_agregaty_ao2.png`,
        `${pathToImgFolders.home}/zao_tst_agregaty_avo.png`,
        `${pathToImgFolders.home}/zao_tst_agregaty_std-300-hl.png`,
        `${pathToImgFolders.home}/zao_tst_agregaty_std-300.png`,
        `${pathToImgFolders.home}/zao_tst_elektrokalorifery_sfo.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kfb-m.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kfb-p.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kp.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kpps-kppu.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kpsk.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_kpvs-kpvu.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_ksk.png`,
        `${pathToImgFolders.home}/zao_tst_kalorifery_tvv.png`,
        `${pathToImgFolders.home}/zao_tst_shkafy_shuk.png`,
        `${pathToImgFolders.home}/zao_tst_teny.png`,
        `${pathToImgFolders.home}/zao_tst_ustanovki_sfotc.png`,
      ],
    },
    {
      url: `${SITE_URL}/kontakty-prajs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/personal-data`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.0,
    },
    {
      url: `${SITE_URL}/kalorifery-voda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_pritochnyi.png`,
        `${pathToImgFolders.generalPages}/kalorifer_pritochnyi_vodianoi.png`,
        `${pathToImgFolders.generalPages}/kalorifery_pritochnye_vodianye_kpvu_chertezh.png`,
        `${pathToImgFolders.generalPages}/kalorifery_pritochnye_vodianye_kpvs_chertezh.png`,
        `${pathToImgFolders.generalPages}/kalorifery_kpvu_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifery_kpvs_gabaritnye_razmery.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-par`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${pathToImgFolders.generalPages}kalorifery_kpps_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}kalorifer_pritochnyi_parovoi.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_pritochnyi.png`,
        `${pathToImgFolders.generalPages}/kalorifery_kppu_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifery_pritochnye_parovye_kppu_chertezh.png`,
        `${pathToImgFolders.generalPages}/kalorifery_pritochnye_parovye_kpps_chertezh.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-ksk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_ksk.png`,
        `${pathToImgFolders.generalPages}/kalorifery_ksk_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_ksk_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/kalorifery_kpsk_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kpsk_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kpsk.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-tvv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_tvv.png`,
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_tvv_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/kalorifery_tvv_gabaritnye_razmery.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/kalorifery_kp_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kp_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kp.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-kfb-a`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        `${pathToImgFolders.generalPages}/kalorifery_kfb_vodianye_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_kfb_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/kalorifer_vodianoi_kfb.png`,
        `${pathToImgFolders.generalPages}/kalorifery_vodianye_kfb_ustanovka.png`,
        `${pathToImgFolders.generalPages}/kalorifery_vodianye_kfb_blok.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery-kfb`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [
        `${pathToImgFolders.generalPages}/kalorifery_kfb_parovye_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kfb_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/kalorifer_parovoi_kfb.png`,
      ],
    },
    {
      url: `${SITE_URL}/ao2-ksk-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_vodianoy_ao2.png`,
        `${pathToImgFolders.generalPages}/agregat_otopitelnyi_vodianoy_ao2_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_vodianoy_ao2_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/ao2-kpsk-ksk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_parovoy_ao2.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_parovoy_ao2_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/agregat_otopitelnyi_parovoy_ao2_gabaritnye_razmery.png`,
      ],
    },
    {
      url: `${SITE_URL}/avo-tvv-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [
        `${pathToImgFolders.generalPages}/agregaty_vozdushno_otopitelnye_avo_vodianye_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/agregaty_vozdushno_otopitelnye_avo_parovye_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_avo_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/std300-ksk-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_vodianoy_std-300.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_std-300_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/std300-tvv-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [
        `${pathToImgFolders.generalPages}/agregat_otopitelnyi_parovoy_std-300_gabaritnye_razmery.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_parovoy_std-300.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_std-300_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/agregat_vozdushno-otopitelnyi_parovoy_std-300_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/elektronagrevateli`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.generalPages}/elektrokalorifery_sfo_proizvodstvo.png`,
        `${pathToImgFolders.generalPages}/elektrokalorifer_sfo_komplektatciia.png`,
        `${pathToImgFolders.generalPages}/elektrokalorifery_sfo_chertezh.png`,
      ],
    },
    {
      url: `${SITE_URL}/teploventilyatory`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [
        `${pathToImgFolders.generalPages}/elektrokalorifernaia_ustanovka_sfotc_chertezh.png`,
        `${pathToImgFolders.generalPages}/elektrokalorifernaia_ustanovka_sfotc_proizvodstvo.png`,
        `${pathToImgFolders.generalPages}/elektrokalorifernaia_ustanovka_sfotc_komplektatciia.png`,
      ],
    },
    {
      url: `${SITE_URL}/shkafy-upravleniya`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
      images: [
        `${pathToImgFolders.generalPages}/shkafy_upravleniya_kaloriferom.png`,
        `${pathToImgFolders.generalPages}/shkaf_upravleniya_kaloriferom_chertezh.png`,
      ],
    },
    {
      url: `${SITE_URL}/produkciya`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${pathToImgFolders.produkciya}/kalorifery.png`,
        `${pathToImgFolders.produkciya}/otopitelnye_agregaty.png`,
        `${pathToImgFolders.produkciya}/vozduchonagrevatelnye_ustanovki.png`,
        `${pathToImgFolders.produkciya}/gallery/1. kalorifery.png`,
        `${pathToImgFolders.produkciya}/gallery/2. kalorifery_blok.png`,
        `${pathToImgFolders.produkciya}/gallery/3. kalorifery_flantcy.png`,
        `${pathToImgFolders.produkciya}/gallery/4. agregaty_gruz.png`,
        `${pathToImgFolders.produkciya}/gallery/5. kalorifery_nestandart.png`,
        `${pathToImgFolders.produkciya}/gallery/7. electrokalorifery_sbor.png`,
        `${pathToImgFolders.produkciya}/gallery/8. kalorifery_flantcy.png`,
        `${pathToImgFolders.produkciya}/gallery/9. ustanovki_gruz.png`,
        `${pathToImgFolders.produkciya}/gallery/10. kalorifery_sbor.png`,
        `${pathToImgFolders.produkciya}/gallery/11. kalorifery_nestandart.png`,
        `${pathToImgFolders.produkciya}/gallery/12. kalorifery_blok.png`,
      ],
    },
    {
      url: `${SITE_URL}/kalorifery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kfb-m.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kfb-p.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kp.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kpps_kppu.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kpsk.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_kpvs_kpvu.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_ksk.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifer_tvv.png`,
        `${pathToImgFolders.produkciya}/kalorifery/kalorifery_vodianye_parovye.png`,
      ],
    },
    {
      url: `${SITE_URL}/otopitelnye-agregaty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      images: [
        `${pathToImgFolders.produkciya}/agregaty/agregat.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregat_ao2_p.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregat_ao2_v.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregat_avo_hl.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregat_std-300_p.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregat_std-300_v.png`,
        `${pathToImgFolders.produkciya}/agregaty/agregaty_vodianye_parovye.png`,
      ],
    },
    {
      url: `${SITE_URL}/vozduchonagrevatelnye-ustanovki`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        `${pathToImgFolders.produkciya}/ustanovki/vozduchonagrevatelnaya_ustanovka.png`,
        `${pathToImgFolders.produkciya}/ustanovki/electro_ustanovka.png`,
        `${pathToImgFolders.produkciya}/ustanovki/kalorifer_sfo.png`,
        `${pathToImgFolders.produkciya}/ustanovki/ustanovka_sfots.png`,
        `${pathToImgFolders.produkciya}/ustanovki/shkaf_shuk.png`,
        `${pathToImgFolders.produkciya}/ustanovki/ten_tenr.png`,
      ],
    },
  ];
}
