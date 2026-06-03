import { createRequire } from "module";
import { withPayload } from "@payloadcms/next/withPayload";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const isSharedStatic = process.env.DEPLOY_TARGET === "godaddy-shared";
const nextConfig = {
  // Standalone bundle for GoDaddy VPS / cPanel Node.js; static export for GoDaddy basic shared.
  output: isSharedStatic ? "export" : "standalone",
  trailingSlash: isSharedStatic ? true : undefined,
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
    // `next/image` optimization requires a server. Shared hosting export must be unoptimized.
    unoptimized: isSharedStatic,
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

export default isSharedStatic ? nextConfig : withPayload(nextConfig);
