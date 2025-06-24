import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
    images: {
      remotePatterns:[
          {
              protocol: "https",
              hostname: "tailus.io",
              pathname: "/sources/blocks/stats-cards/preview/images/**"
          }
      ]
    }
};

export default nextConfig;
