import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  devIndicators: {
    buildActivity: false,
  },

  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
