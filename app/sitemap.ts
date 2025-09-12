import { categoryTree } from "@/data/categories";
import { productData } from "@/data/products";

import type { MetadataRoute } from "next";

import { Category, Product } from "@/types";

const SITE_URL = process.env.SITE_URL;

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
      url: `${SITE_URL}/category/${node.slug}`,
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

    return {
      url: `${SITE_URL}/${node.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
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
      images: [],
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
    },
    {
      url: `${SITE_URL}/kalorifery-par`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kalorifery-ksk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kalorifery-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kalorifery-tvv`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kalorifery-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kalorifery-kfb-a`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kalorifery-kfb`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ao2-ksk-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ao2-kpsk-ksk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/avo-tvv-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/std300-ksk-kpsk`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/std300-tvv-kp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/elektronagrevateli`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/teploventilyatory`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/shkafy-upravleniya`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
