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
    ];
  },
};

export default nextConfig;
