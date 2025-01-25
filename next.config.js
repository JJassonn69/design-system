/** @type {import('next').NextConfig} */
const nextConfig =
  {
    reactStrictMode: true,
    eslint:
      {
        // Your build will not fail if you have ESLint errors
        ignoreDuringBuilds: true,
        dirs: [
          ".",
        ],
      },
  };

module.exports =
  nextConfig;
