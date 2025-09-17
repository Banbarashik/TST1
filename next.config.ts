import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/:slug((?!legacy/).+).html", // named param :slug with negative lookahead
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/raschet-online-vodianyh-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: true,
      },
      {
        source: "/raschet-online-parovyh-kaloriferov",
        destination: "/kalorifery-par",
        permanent: true,
      },
      {
        source: "/raschet-online-elektricheskih-kaloriferov",
        destination: "/elektronagrevateli",
        permanent: true,
      },
      {
        source: "/raschet-podbor-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: true,
      },
      {
        source: "/koefficient-teploperedachi-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: true,
      },
      {
        source: "/gidravlicheskoe-soprotivlenie-kaloriferov",
        destination: "/kalorifery-voda",
        permanent: true,
      },
      {
        source: "/podbor-raschet-kaloriferov",
        destination: "/kalorifery-par",
        permanent: true,
      },
      {
        source: "/koefficient-teploperedachi-parovyh-kaloriferov",
        destination: "/kalorifery-par",
        permanent: true,
      },
      {
        source: "/komplektatciia-kaloriferov",
        destination: "/",
        permanent: true,
      },
      {
        source: "/zamena-kaloriferov",
        destination: "/",
        permanent: true,
      },
      {
        source: "/kalorifery-kfb-kfs",
        destination: "/kalorifery-kfb",
        permanent: true,
      },
      {
        source: "/kalorifery-kms-kmb",
        destination: "/kalorifery-kfb-a",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
