import type { NextConfig } from "next";

const nextConfig: NextConfig =
  {
    reactStrictMode: true,
    eslint:
      {
        // Your build will not fail if you have ESLint errors
        ignoreDuringBuilds: false,
        dirs: [
          ".",
        ],
      },
  };

export default nextConfig;
