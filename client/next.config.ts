import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  images: {
    domains: ["localhost"], // ← skift til dit faktiske domæne
  },
};

export default nextConfig;
