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
  // Configuración para exportación estática
  generateStaticParams: async () => ({}),
  // Configuración de webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Configuración para la exportación estática
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/404': { page: '/404' },
    };
  },
};

export default nextConfig;