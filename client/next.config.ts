import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    domains: ["localhost"], // ← skift til dit faktiske domæne
  },
  // ADD THIS BLOCK TO IGNORE ESLINT DURING THE BUILD STEP
  eslint: {
    // !! WARNING: Dangerously allow production builds to successfully complete even if
    // project has ESLint errors/warnings.
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
