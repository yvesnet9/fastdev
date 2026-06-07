import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["fastdev.fr", "www.fastdev.fr"],
    },
  },
};

export default nextConfig;