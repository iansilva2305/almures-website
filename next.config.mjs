/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = 'almures-website';
const basePath = isProd ? `/${repo}` : '';
const assetPrefix = isProd ? `/${repo}/` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;