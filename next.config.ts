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
    ];
  },
};

export default nextConfig;
