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
        source: "/:slug*.html",
        destination: "/:slug*",
        permanent: true, // 308 or 301, both are fine for SEO
      },
    ];
  },
};

export default nextConfig;
