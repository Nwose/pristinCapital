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

  devIndicators: false,

  // FIX for Vercel lightningcss build failure
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
