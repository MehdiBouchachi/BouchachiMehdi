import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // Keep the dev server's assets separate from static export builds.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
