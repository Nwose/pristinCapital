import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [],
  },

  // ❗ Completely disable LightningCSS
  compiler: {
    styledComponents: true,
  },

  // ❗ This is the important part
  optimizeCss: false,

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
};

export default nextConfig;
