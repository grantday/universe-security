import { createRequire } from "module";
import { withPayload } from "@payloadcms/next/withPayload";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone bundle for GoDaddy VPS / cPanel Node.js (see deploy/godaddy/README.md).
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [],
  },
  transpilePackages: ["framer-motion", "react-hook-form"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "framer-motion": require.resolve("framer-motion"),
      "react-hook-form": require.resolve("react-hook-form"),
    };
    return config;
  },
  images: {
    // Avoid long hangs when picsum.photos is slow (service cards still use online mode).
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
